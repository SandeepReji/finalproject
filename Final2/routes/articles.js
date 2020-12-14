//Sandeep Reji
const express = require('express')
const Article = require('./../models/article')
const router = express.Router()


router.get('/new', (req, res)=>{
    res.render('articles/new', {article: new Article()})
})


router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)
    res.render('articles/edit', { article: article })
  })


router.get('/:slug', async(req, res)=>{
    const article = await Article.findOne({ slug: req.params.slug})
    if(article == null) res.redirect('/')
    res.render('articles/show', {article: article})
    })
    

router.post('/', async(req, res, next)=>{
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async(req, res, next)=>{
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))


router.delete('/:id', async (req, res)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
function saveArticleAndRedirect(path){ 
    /*The Following saves the inputted values under article so that they may be printed and read by the user after there location is saved,
    Each tag goes refers to a different value (eg. Climate is the inputted climate of the location).*/
    return async (req, res)=>{
        
        let article = req.article

            article.title = req.body.title
            article.description = req.body.description
            article.climate= req.body.climate //Patrick Wood's additions start from here to crime
            article.locale=req.body.locale
            article.smith=req.body.smith
            article.farm=req.body.farm
            article.mage=req.body.mage
            article.faith=req.body.faith
            article.crime=req.body.crime
            article.words=req.body.words
            article.markdown = req.body.markdown
        try{
            article = await article.save()
            res.redirect(`/articles/${article.slug}`)
        }catch(e){
            res.render(`articles/${path}`, {article: article}
            )
        }
    }
}
    

module.exports = router