import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AllBlogs.css';
import { MdDelete } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/blog/all');
        setBlogs(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        await axios.delete(`http://localhost:3000/api/blog/delete/${id}`);
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleSingleBlogs = (id) => {
    navigate(`/single/${id}`);
  };

  const publishedBlogs = blogs.filter(blog => !blog.isDraft);
  const draftBlogs = blogs.filter(blog => blog.isDraft);

  return (
    <div className="all-blogs-container">
      <h2>Published Blogs</h2>
      <div className="blogs-grid">
        {publishedBlogs.length === 0 && <p>No published blogs found.</p>}
        {publishedBlogs.map(blog => (
          <div key={blog._id} className="blog-card" onClick={() => handleSingleBlogs(blog._id)}>
            {blog.image && <img src={`http://localhost:3000/uploads/${blog.image}`} alt="Blog" />}
            <h3>Title: {blog.title}</h3>
            <p>{blog.description?.substring(0, 100)}...</p>
            <p><strong>Category:</strong> {blog.category}</p>
            <p><strong>Tags:</strong> {blog.tag}</p>
            <p><small>{new Date(blog.createdDate).toLocaleString()}</small></p>
            <div className='btns'>
              <button onClick={e => { e.stopPropagation(); handleEdit(blog._id); }} className='edit-btn'><FiEdit /></button>
              <button onClick={e => { e.stopPropagation(); handleDelete(blog._id); }} className='dlt-btn'><MdDelete /></button>
            </div>
          </div>
        ))}
      </div>

      <h2>Draft Blogs</h2>
      <div className="blogs-grid">
        {draftBlogs.length === 0 && <p>No drafts found.</p>}
        {draftBlogs.map(blog => (
          <div key={blog._id} className="blog-card" onClick={() => handleEdit(blog._id)}>
            {blog.image && <img src={`http://localhost:3000/uploads/${blog.image}`} alt="Blog" />}
            <h3>Title: {blog.title || "(Untitled Draft)"}</h3>
            <p>{blog.description?.substring(0, 100) || "(No content yet)"}</p>
            <p><strong>Category:</strong> {blog.category}</p>
            <p><strong>Tags:</strong> {blog.tag}</p>
            <p><small>{new Date(blog.createdDate).toLocaleString()}</small></p>
            <div className='btns'>
              <button onClick={e => { e.stopPropagation(); handleEdit(blog._id); }} className='edit-btn'><FiEdit /></button>
              <button onClick={e => { e.stopPropagation(); handleDelete(blog._id); }} className='dlt-btn'><MdDelete /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;
