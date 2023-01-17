// src/pages/home.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { __getPostsThunk } from "../redux/modules/postsSlice";
import PostCard from "../components/PostCard.jsx";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, posts, error } = useSelector((state) => state.posts);
  console.log("게시글 전체 조회", posts);

  useEffect(() => {
    dispatch(__getPostsThunk());
  }, [dispatch]);

  if (isLoading) {
    return <div> 로딩중 .... </div>;
  }
  if (error) return <div>알수 없는 에러가 발생했습니다.</div>;
  return (
    <div>
      <Layout>
        <Header />

        <div>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <button
          onClick={() => {
            navigate("/Write");
          }}
        >
          Write로 이동
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          SignIn으로 이동
        </button>
        <button
          onClick={() => {
            navigate("/SignUp");
          }}
        >
          SignUp으로 이동
        </button>
      </Layout>
    </div>
  );
};

export default Home;
