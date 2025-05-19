import express from 'express';
import { allBlogs, createBlogs, deleteBlog, singleBlog, updateBlog } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
const blogRouter = express.Router();

blogRouter.post('/create', upload.single('image'), createBlogs);
blogRouter.get('/all',allBlogs)
blogRouter.delete('/delete/:id',deleteBlog)
blogRouter.get('/:id',singleBlog)
blogRouter.put('/update/:id',updateBlog)

export default blogRouter;
