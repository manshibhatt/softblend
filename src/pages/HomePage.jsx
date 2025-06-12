import React, { useEffect, useState } from "react";
import "./HomePage.css";
import { FaSun, FaMoon } from "react-icons/fa";

const pageLayout = [1, 2, 3, "...", 8, 9, 10];

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const fetchPosts = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://dev.to/api/articles?per_page=6&page=${page}`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  const handlePageClick = (page) => {
    if (typeof page === "number") setCurrentPage(page);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="whole">
      {/* Navigation */}
      <div className="nav flex">
        <div className="left flex">Your Name</div>
        <div className="right flex">
          {["Blog", "Projects", "About", "Newsletter"].map((item) => (
            <span key={item}>{item}</span>
          ))}
          <button className="theme-toggle flex">
            <FaSun />
            <FaMoon />
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="title flex content-center">THE BLOG</div>

      {/* Section 3 - Recent blog posts (Static) */}
      <div className="section-3">
        <div className="title-1">Recent blog posts</div>
        <div className="flex gap-2">
          <div className="left flex-col gap-1">
            <img src="/src/assets/image-1.svg" alt="Post thumbnail" />
            <span className="place-date">Olivia Rhye • 1 Jan 2023</span>
            <h3>UX review presentations</h3>
            <p>How do you create compelling presentations that wow your colleagues and impress your managers?</p>
            <div className="tags flex">
              <span>Design</span>
              <span>Research</span>
              <span>Presentation</span>
            </div>
          </div>
          <div className="right flex-col">
            {[1, 2].map((_, idx) => (
              <div className="one flex" key={idx}>
                <img src="/src/assets/image-1.svg" alt="Post thumbnail" />
                <div className="flex-col">
                  <span className="place-date">Sunday, 1 Jan 2023</span>
                  <h3>Migrating to Linear 101</h3>
                  <p>How do you create compelling presentations that wow your colleagues and impress your managers?</p>
                  <div className="tags">
                    <span>Design</span>
                    <span>Research</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section 5 - All Blog Posts (From API) */}
      <div className="section-5 flex-col gap-2">
        <h2>All Blog Posts</h2>

        {loading && <p className="status">Loading posts...</p>}
        {error && <p className="status error">Error: {error}</p>}
        {!loading && !error && posts.length === 0 && <p className="status">No posts found.</p>}

        {!loading && !error && (
          <div className="block grid-3">
            {posts.map((post, index) => (
              <div key={index} className="card">
                <img src={post.social_image} alt={`Cover for ${post.title}`} className="cover"/>
                <span className="place-date">
                  {post.user.name} • {post.readable_publish_date}
                </span>
                <div className="title-2 flex">
                <div className="flex align-center content-between">
                <h3>{post.title}</h3>
                  <img src="src/assets/icon.svg" alt="" className="arrow"/>
                  </div>
                 
                </div>
                <p>{post.description}</p>
                <div className="tags">
                  {post.tag_list.map((tag) => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      <hr />
      <div className="pagination flex content-between">
        <button className="previous" onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </button>
        <div className="flex gap-2 pointer">
          {pageLayout.map((page, idx) => (
            <div
              key={idx}
              className={page === currentPage ? "active-page" : ""}
              onClick={() => handlePageClick(page)}
            >
              {page === currentPage ? <strong>{page}</strong> : <span>{page}</span>}
            </div>
          ))}
        </div>
        <button className="next" onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {/* Footer */}
      <div className="footer flex">
        {["© 2023", "Twitter", "LinkedIn", "Email", "RSS feed", "Add to Feedly"].map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
