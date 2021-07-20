const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Blogs = require('./model/blogSchema');
const morgan = require('morgan')
const moment = require('moment');

//db
const dbURI = 'mongodb+srv://paul:test12345@horsemen.qfcwh.mongodb.net/inventory?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => {
        console.log('db connected')
        app.listen(8000)
    })
    .catch((err) => console.log(err));
    

    //view engine
app.set('view engine', 'ejs')

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.get('/',(req, res) =>{
    const blog = {
        body: 'this is a blog',
        display: 'this is a blog'
    }
    res.render('index', { title: 'home' , blog })
    
})
app.get('/about',(req, res) =>{
    res.render('about', {title: 'About'})
    
})
app.get('/morning-pages',(req, res) =>{
    Blogs.find().sort({ createdAt: -1 })
    .then(result => res.render('morning-pages', {title: 'Morning pages', blogCollection: result, moment: moment }))
    .catch(err => console.log(err))
})
app.post('/morning-pages',(req, res) =>{
    console.log(req.body)
    const blog = new Blogs(req.body);
    
    blog.save()
    .then(result => res.redirect('/admin'))
    .catch(err => console.log(err))
})
app.get('/morning-page',(req, res) =>{
    const blog = new Blogs({
        title: 'the title',
        display: 'the display',
        body: 'the body'
    })
    blog.save()
    .then(result => res.render('morning-page', {title: 'Morning page'}))
    .catch(err => console.log(err));
})
app.get('/admin',(req, res) =>{
    Blogs.find().sort({ createdAt: -1 })
        .then((result) =>{
            res.render('admin', {title: 'Admin', blogCollection: result, moment: moment})})
            .catch(err => console.log(err));
})
app.get('/admin/blog-edit',(req, res) =>{
    res.render('blog-edit')
})
app.delete('/admin/:id',(req, res) =>{
            const id = req.params.id;
            console.log(id)
            Blogs.findByIdAndDelete(id)
                .then(result => res.json({redirect: '/'}))
                .catch(err => console.log(err))
})