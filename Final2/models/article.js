//Sandeep Reji
const mongoose = require('mongoose')
const marked = require ('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)


const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  climate: {                                                                                                                        //Patrick Wood's addtions start from here to crime
    type: String,
    enum: ["Cave","Desert","Dungeon","Forest","Frozen","Island","Jungle","Mountain","Oceanic","Savannah","Swamp","Temperate","Wasteland"]
  },
  locale: {
    type: String,
    enum: ["Hamlet","Village","Town","City","Keep","Fort","Castle","Stronghold","Capital"]
  },
  smith: {
    type: String,
    enum: ["Blacksmith","Fletcher","Goldsmith","Gunsmith","Locksmith","Pewtersmith","Silversmith"]
  },
  farm: {
    type: String,
    enum: ["Beekeeper","Farmer","Herbalist","Orchadist","Rancher"]
  },
  mage: {
    type: String,
    enum: ["Alchemist","Enchanter","Fortune Teller","Healer","Potion Seller"]
  },
  faith: {
    type: String,
    enum: ["Graveyard","Shrine","Temple"]
  },
  crime: {
    type: String,
    enum: ["Black Market","Bootlegger","Corrupt Official","Fence","Gang","Pirate Den","Smuggler"]
  },
  words: {
    type: String,
    enum: ["Book Merchant","Calligrapher","Cartographer","Crier","Courier","Library","Printer"]
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  slug:{
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
      type: String,
      required:true
  }
})

articleSchema.pre('validate', function(next){
    if(this.title){
        this.slug =slugify(this.title, {lower: true,
             strict:true })
        }
        if(this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    }
        next()
})



module.exports = mongoose.model('Article', articleSchema)