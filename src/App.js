import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios"
import { Posts } from './components/Posts';
import Pagination from "./components/Pagination"
import Interview from "./components/Interview"
// import Pagination from 'react-js-pagination';
// import "bootstrap/less/bootstrap.less";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
      setPosts(res.data);
      setLoading(false)


    }

    fetchPosts();
  }, [])

  //Set current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (currentPagenumber) => {
    setCurrentPage(currentPagenumber)
  }

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Blog</h1>
      <Interview />
      <Posts posts={currentPosts} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />

    </div>
  );
}

export default App;
