const express = require('express');
const plumbus = require('rickmortyapi')
const app = express();
const port = 3000;
//Loads the handlebars module
const handlebars = require('express-handlebars');
//Sets our app to use the handlebars engine
//instead of app.set('view engine', 'handlebars'); 
app.set('view engine', 'hbs');

//instead of app.engine('handlebars', handlebars({
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'planB',
    //new configuration parameter
    partialsDir: __dirname + '/views/partials/'
}));

app.use(express.static('public'))


app.get('/', async (req, res) => {
  const chars = await plumbus.getCharacter([2,3,4,5])
  res.render('main', {layout: 'index', chars: chars, listExists: true});
});

app.listen(port, () => console.log(`App listening to port ${port}`));