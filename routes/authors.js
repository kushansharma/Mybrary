const express = require('express')
const router = express.Router()
//importing author module
const Author = require('../models/author')
//get to displays the route
//when link 'localhost:3000/authors': load file
//All Authors Route
router.get('/', async (req, res) => {
    let searchOption = {}
    if (req.query.name != null && req.query.name !== ''){
        searchOption.name = new RegExp(req.query.name, 'i')
    }

    try {
        const authors = await Author.find(searchOption)
        res.render('authors/index', { 
            authors: authors,
            searchOption: req.query
        })
    } catch {
        res.redirect('/')
    }
    //in views folder
})
//when link 'localhost:3000/authors/new', same as b4
//New Author Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() })//using authorSchema, var(send to ejs file ) which creates and edit author in db
})
//post to send data
//Creating Author routes
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name//post request sends info body string
    })
    try{
        const newAuthor = await author.save()//save author for certain condition, use await to wait async.. call to comp
        res.redirect('authors')
    } catch {//if there is an error
        res.render('authors/new', {                 //load same page having parnthese
            author: author,                         //author have same value
            errorMessage: 'Error Creating Author'   //and a error msg
        })
    }
    //res.send(req.body.name)//body to form posting to server
})

//important cuz I forgot that
module.exports = router