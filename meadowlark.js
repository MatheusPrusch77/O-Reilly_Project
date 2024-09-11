const express = require('express')
const {engine} = require('express-handlebars')

const app = express()

//permite que o diretorio 'public' seja realmente publico no server index.js
app.use(express.static(__dirname + '/public'))

//Configure o view engine Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars')
const port = process.env.PORT || 3000

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about', { fortune: randomFortune})
})
// pagina 404 personalizada
app.use((req, res) => {
    res.status(404)
    res.send('404 - Not Found')
})

// pagina 500 personalizada
app.use((err, req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

const fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
]


app.listen(port, () => console.log(
    `Express started on http://localhost:${port}; `
    + `press CRTL-C to terminate`
))