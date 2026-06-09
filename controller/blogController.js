const Blog = require('../schema/blogSchema');
const cloudinary = require('../config/cloudinary');
const mongoose = require('mongoose');

const getBlog = async(req,res)=>{
    try{
        const fetchBlog = await Blog.find({});
        res.status(200).json(fetchBlog);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

const createBlog = async(req,res)=>{
    const {title, category, excerpt, readingTime} = req.body;
    try{
        if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path);

    const data = await Blog.create({
        title,
        category,
        excerpt,
        readingTime,
        featuredImage: result.secure_url,
        image_id:result.public_id,

    })
    res.status(200).json(data);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

const updateBlog = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Blog not found'});
    }
    try{
        const updateBlog = await Blog.findById(id);
        if(!updateBlog){
            return res.status(404).json({message: 'Blog not found'});
        }

        if(req.file){
            await cloudinary.uploader.destroy(updateBlog.image_id);
            const result = await cloudinary.uploader.upload(req.file.path);
            req.body.featuredImage = result.secure_url;
            req.body.image_id = result.public_id;
        }
        const updatedBlog = await Blog.findOneAndUpdate({_id:id}, req.body, { new: true })
        res.status(200).json(updatedBlog);
    }catch(error){
        res.status(500).json({message: error.message});
    }
}


const deleteBlog = async(req,res)=>{
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({message: 'Blog not found'});
    }try{
        
        const deleteBlog = await Blog.findById(id);
        if(!deleteBlog){
            return res.status(404).json({message: 'Blog not found'});
        }
        await cloudinary.uploader.destroy(deleteBlog.image_id);

        await deleteBlog.deleteOne();
        res.status(200).json({message: 'Blog deleted successfully'});
    
    }catch(error){
        res.status(500).json({message: error.message});
    }
}

module.exports ={getBlog, createBlog, updateBlog, deleteBlog}