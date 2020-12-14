

const express = require('express')
const app =express()
const mongoose =require ('mongoose')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const Article = require('./models/article')
const bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost/blog', { useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true}, )
mongoose.Promise = global.Promise;

var nameSchema = new mongoose.Schema({
    username: String,
    password: String
});

app.post("/addaccount", (req, res) => {
    var myData = new User(req.body);
    myData.save()
      .then(item => {
        res.send("item saved to database");
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
    });
});

var User = mongoose.model("User", nameSchema)

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

app.get('/', async (req, res)=>{
    const articles = await Article.find().sort({ 
        createdAt: 'desc' })
        res.render('articles/index', {articles: articles})
})
app.use('/articles', articleRouter)

app.listen(3000)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));