const mongoose = require('mongoose')

const newsSchema = mongoose.Schema({
    title: String,
    description: String,
    category: String,
    imageUrl: String,
    sourceImage: String,
    date: Number,
})

const News = mongoose.model('News', newsSchema)

module.exports = News