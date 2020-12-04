const express = require('express')
const plumbus = require('rickmortyapi')
const app = new express()
const port = 8080
const handlebars = require('express-handlebars')

app.set('view engine', 'hbs')

app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'planB',
    partialsDir: __dirname + '/views/partials/'
}))

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('intro', {layout: 'index', nome : req.query.nome, cognome : req.query.cognome, eta : req.query.eta, country : req.headers["accept-language"].substr(0,2), saluto : "Hello man"})
})

app.get('/characters', async (req, res) => {
  const chars = (await plumbus.getCharacter({
    name: req.query.nome,
    status: req.query.status,
    species : req.query.species
  }))
  if(req.headers["accept-language"].substr(0,2)==="it"){
    res.render('main', {layout: 'index', chars: chars.results, saluto : "Ciao uomo! ecco i personaggi squanchosi!"})
  }else{
    res.render('main', {layout: 'index', chars: chars.results, saluto : "Hello man! here your squancheos characters!"})
  }
})

app.listen(port, () => console.log(`App listening to port ${port}`))
