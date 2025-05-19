import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './SingleBlog.css';

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

useEffect(() => {
  const fetchBlog = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/blog/${id}`);
      console.log("Fetched single blog:", response.data);
      setBlog(response.data.blog); // <-- Access blog inside response.data.blog
    } catch (error) {
      console.error('Error fetching blog:', error);
    }
  };

  if (id) fetchBlog();
}, [id]);



  if (!blog) {
    return <div>Loading blog...</div>;
  }

  return (
    <div className="single-blog-container">
      <h2>Title: {blog.title}</h2>
      {blog.image && (
        <img
          src={`http://localhost:3000/uploads/${blog.image}`}
          alt={blog.title}
          className="blog-image"
        />
      )}
      <p className="description">{blog.description}</p>
      <p><strong>Category:</strong> {blog.category}</p>
      <p><strong>Tags:</strong> {blog.tag}</p>
      <p className="date">Published on: {new Date(blog.createdDate).toLocaleString()}</p>
    </div>
  );
};

export default SingleBlog;
