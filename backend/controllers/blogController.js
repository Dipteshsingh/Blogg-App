import blogModel from '../model/blogModel.js';
import multer from 'multer';

const storage = multer.memoryStorage();
export const upload = multer({ storage });

// create blogs-
const createBlogs = async (req, res) => {
  try {
    const { title, description, category, tag,isDraft } = req.body;if (!title || !description) {
      return res.status(400).json({ error: 'Title and Description are required' });
    }


    const imagePath = req.file && req.file.filename ? req.file.filename.toString() : null;



    const blog = new blogModel({
      title,
      description,
      category,
      tag,
      isDraft: isDraft || false,
      image: imagePath, 
      createdDate: new Date()
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error('Error in createBlogs:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// get all blogs-
const allBlogs = async (req,res)=>{
  try {
    const blog = await blogModel.find()
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ success: false, message: err.message });
  }
}

// get a single blog-
const singleBlog = async (req,res)=>{
  try {
    const blog = await blogModel.findById(req.params.id)
    res.status(200).json({ success: true, blog });
  } catch (error) {
    res.status(404).json({ success: false, message: "Blog not found" });
  }

}


// Update any blog -
const updateBlog = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    const blogId = req.params.id;

    const updateData = {
      title,
      description,
      category,
      tags,
      isDraft
    }

    if (req.file) {
      updateData.image = req.file.filename; 
    }

    const updatedBlog = await blogModel.findByIdAndUpdate(blogId, updateData, {
      new: true, 
    });

    if (!updatedBlog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.status(200).json({ success: true, blog: updatedBlog });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete a blog -
const deleteBlog = async (req,res)=>{
  try {
      const blog = await blogModel.findByIdAndDelete(req.params.id)
  
      res.status(200).json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
      res.status(404).json({ success: false, message: err.message });
  }
}

export {createBlogs,allBlogs,singleBlog,updateBlog,deleteBlog}

