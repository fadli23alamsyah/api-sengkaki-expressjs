const { handle } = require('express/lib/application');
const News = require('../models/newsModel')

exports.createNews = async (req, res) => {
    const date = new Date().getTime();
    const {title, description, category, imageUrl, sourceImage} = req.body

    if(!title || !description || !category || !imageUrl || !sourceImage){
        return res.status(400).json({
            status: 'Failed',
            message: 'Please check, there is an empty data',
        })
    }

    const newNews = News({
        title: title,
        description: description,
        category: category,
        imageUrl: imageUrl,
        sourceImage: sourceImage,
        date: date,
    })

    const saveNews = await newNews.save()
    res.status(201).json({
        status: 'Success',
        message: 'News added successfully',
        data: saveNews,
    });
}

exports.getAllNews =  async (req, res) => {
    const {select, limit} = req.params
    var allNews

    if(select == 'all'){
        allNews = await News.find().limit(limit).sort({date: 'desc'})
    }else{
        allNews = await News.find({category: select}).limit(limit).sort({date: 'desc'})
    }
     
    res.status(200).json({
        status: 'Success',
        message: `Get ${select} News limit ${limit}`,
        data: allNews,
    });
}

exports.getNewsById = async (req, res) => {
    const id = req.params.id

    try {
        const newsById = await News.findById(id)

        res.status(200).json({
            status: 'Success',
            message: `Get News with id: ${id}`,
            data: newsById,
        });
    } catch (error) {
        res.status(404).json({
            status: 'Failed',
            message: `No match News with id: ${id}`,
        });
    }
}

exports.updateNews = async (req, res) => {
    const id = req.params.id
    const dataUpdate = req.body

    // this function cannot check model, if request model different, function run success
    try {
        await News.findByIdAndUpdate(id, {$set: dataUpdate})
        res.status(200).json({
            status: 'Success',
            message: `Data has been updated`,
        })
    } catch (error) {
        res.status(404).json({
            status: 'Failed',
            message: `No match News with id: ${id}`,
        })
    }
}

exports.deleteNews = async (req, res) => {
    const id = req.params.id

    try {
        await News.findByIdAndDelete(id)
        res.status(200).json({
            status: 'Success',
            message: `Data has been deleted`,
        })
    } catch (error) {
        res.status(404).json({
            status: 'Failed',
            message: `No match News with id: ${id}`,
        })
    }
}