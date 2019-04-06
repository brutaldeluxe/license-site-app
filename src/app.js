const path = require('path')
const express = require('express')
const hbs = require('hbs')
const parsepage = require('./parsepage')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

//set static dir to serve
app.use(express.static(publicDirPath))

//set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.get('', (req, res) => {
    res.render('index')
})

app.get('/licensedcompanies', (reg, res) => {
    parsepage.parsepage1((error, data) => {
        if(error){
            console.log(error)
        }
        else {
            parsepage.buildList(data, (list) => {
                res.send({
                    source: parsepage.url,
                    size: list.length,
                    list: list
                })       
            })
        }
    })    
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Sorry, but the page you were trying to view does not exist.'
    })
})

app.listen(port, () => {
     console.log('Server is up on port '+ port)
})