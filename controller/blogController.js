const Blog = require('../schema/blogSchema');

const getBlog = async(req,res)=>{
    try{
        const fetchBlog = await Blog.find({});
        res.status(200).json(fetchBlog);
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

const createBlog = async(req,res)=>{
    try{
        
    }catch(error){
        res.status(400).json({message: error.message});
    }
}

module.exports ={getBlog, createBlog}