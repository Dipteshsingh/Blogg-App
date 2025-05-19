import React, { useState, useRef } from 'react';
import './CreateBlog.css';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const imageUrl =
  'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

const initialPost = {
  title: '',
  description: '',
  image: '',
  category: '',
  tag: '',
  createdDate: new Date()
};

const CreateBlog = () => {
  const [post, setPost] = useState(initialPost);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleDeleteImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('description', post.description);
    formData.append('category', post.category);
    formData.append('tag', post.tag);
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:3000/api/blog/create', formData);
      console.log('Blog Created:', res.data);

      setPost(initialPost);
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
        navigate('/blogs')
      }
      
      
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className="create-blog-container">
      <div className="header-image">
        <img src={imageUrl} alt="Banner" />
        <div className="overlay">
          <h1>Create a New Blog</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-section">
        <label>Title:</label>
        <input
          type="text"
          value={post.title}
          onChange={handleChange}
          name="title"
          placeholder="Enter blog title"
          className="blog-input"
        />

        <label>Content:</label>
        <textarea
          value={post.description}
          onChange={handleChange}
          name="description"
          placeholder="Write your blog content here..."
          rows="10"
          className="blog-textarea"
        ></textarea>

        <div className='category-tag'>
          <label>Category:</label>
        <input
          type="text"
          value={post.category}
          onChange={handleChange}
          name="category"
          placeholder="e.g. Tech, Travel"
          className="blog-input"
        />

        <label>Tags:</label>
        <input
          type="text"
          value={post.tag}
          onChange={handleChange}
          name="tag"
          placeholder="e.g. react, frontend"
          className="blog-input"
        />
        </div>

        <label>Image:</label>
        <input
          type="file"
          accept="image/*"
          name="image"
          ref={fileInputRef}
          onChange={(e) => setImage(e.target.files[0])}
          className="image-input"
        />

        {image && (
          <div className="image-preview">
            <img src={URL.createObjectURL(image)} alt="Preview" />
            <button type="button" className="delete-button" onClick={handleDeleteImage}>
              <MdDelete /> Delete
            </button>
          </div>
        )}

        <button
         type="submit" className="submit-button">
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
