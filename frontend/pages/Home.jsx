import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const imageUrl = 'https://lipstickwithsomesunshine.wordpress.com/wp-content/uploads/2014/02/bloggingphotographytips.jpg'
  return (
    <div className="home-container">
      <section className="hero-section">
  <div>
    <h1>Welcome to BloggApp</h1>
    <p>Write, share, and discover powerful stories from around the world.</p>
    <div className="hero-buttons">
      <Link to="/create" className="btn-primary">Write a Blog</Link>
      <Link to="/blogs" className="btn-secondary">Explore Blogs</Link>
    </div>
  </div>
  <img src={imageUrl} alt="Blogging setup" />
</section>


      <section className="featured-blogs">
        <h2>Featured Blogs</h2>
        <div className="blogs-grid">
          <div className="blog-card">
            <h3>Why Writing is Powerful</h3>
            <p>A short glimpse into how blogging changed lives...</p>
            <Link to="/blogs/1">Read More →</Link>
          </div>
          <div className="blog-card">
            <h3>Top 5 Productivity Hacks</h3>
            <p>Boost your daily workflow with these actionable tips.</p>
            <Link to="/blogs/2">Read More →</Link>
          </div>
          <div className="blog-card">
            <h3>Journey to the Mountains</h3>
            <p>Experience the Himalayas through the eyes of a traveler.</p>
            <Link to="/blogs/3">Read More →</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
