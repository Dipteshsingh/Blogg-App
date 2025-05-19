import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditBlog.css'

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: '',
    description: '',
    category: '',
    tag: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const typingTimeoutRef = useRef(null);
  const autoSaveIntervalRef = useRef(null);

  // Fetch blog on load
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/blog/${id}`);
        const data = response.data.blog;
        setPost({
          title: data.title || '',
          description: data.description || '',
          category: data.category || '',
          tag: data.tag || '',
        });
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();

    // Setup auto-save every 30 seconds
    autoSaveIntervalRef.current = setInterval(() => {
      saveDraft();
    }, 30000);

    return () => {
      clearInterval(autoSaveIntervalRef.current);
    };
  }, [id]);

  // auto-save on typing stops after 5 seconds
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      saveDraft();
    }, 5000);
  };

  const saveDraft = async () => {
    setIsSaving(true);
    try {
      const response = await axios.put(`http://localhost:3000/api/blog/update/${id}`, {
        ...post,
        isDraft: true, 
      });
    
    } catch (error) {
      console.error('Auto-save error:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 
      await axios.put(`http://localhost:3000/api/blog/update/${id}`, {
        ...post,
        isDraft: false,
      });
      navigate('/blogs');
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div className="edit-blog-container">
      <h2>Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" value={post.title} onChange={handleChange} placeholder="Title" />
        <textarea name="description" value={post.description} onChange={handleChange} placeholder="Description" />
        <input type="text" name="category" value={post.category} onChange={handleChange} placeholder="Category" />
        <input type="text" name="tag" value={post.tag} onChange={handleChange} placeholder="Tags" />
        <button type="submit">Publish Blog</button>
        {isSaving && <p>Auto-saving draft...</p>}
      </form>
    </div>
  );
};

export default EditBlog;
