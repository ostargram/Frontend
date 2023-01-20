// src/pages/home.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { __getPostsThunk } from "../redux/modules/postsSlice";
import PostCard from "../components/PostCard.jsx";
import styled from "styled-components";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, posts, error } = useSelector((state) => state.posts);

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
          <Reveiw>
            내가 추천하는 OTT영상
            <StButtons
              onClick={() => {
                navigate("/Write");
              }}
            >
              글 작성
            </StButtons>
          </Reveiw>
        </div>
        <div>
          {posts?.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Home;

const StButtons = styled.button`
  border: 1px solid #ddd;

  height: 50px;
  width: 100px;
  margin-left: 82%;
  padding-left: 15px;
  border-radius: 10px;
  &:hover {
    background: #b075fd;
    color: white;
    transition: 0.5s;
  }
`;
const Reveiw = styled.h2`
  margin-left: 40%;
`;
