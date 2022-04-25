const express = require('express')
const { createNews, getAllNews, getNewsById, updateNews, deleteNews } = require('../controllers/newsController')

const newsRoute = express.Router()

newsRoute.route('/').post(createNews)
newsRoute.route('/:select/:limit').get(getAllNews)
newsRoute.route('/:id').get(getNewsById).put(updateNews).delete(deleteNews)

module.exports = newsRoute