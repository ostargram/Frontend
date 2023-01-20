import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Layout from "../components/Layout";
import {
  __getPostThunk,
  __updatePostThunk,
  __deletePostThunk,
} from "../redux/modules/postsSlice";
import CommentList from "../comments/CommentList";
import styled from "styled-components";
import Likes from "../components/Likes";
const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const navigate = useNavigate();
  // const [like, setLike] = useState();

  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedPost, setUpdatePost] = useState("");
  const post = useSelector((state) => state.posts.post);
  console.log("게시글 ", post.comments);

  useEffect(() => {
    dispatch(__getPostThunk(id));
  }, [dispatch, id]);

  // useEffect(() => {
  //   dispatch(__getPostThunk(id));
  //   return () => dispatch(clearPost());
  // }, [dispatch, id]);

  // undefined??
  useEffect(() => {
    setUpdatePost(post.content);
  }, [post]);

  const onSaveButtonHandler = () => {
    if (updatedPost.trim() === "") {
      return alert("입력된 내용이 없습니다.");
    }
    dispatch(
      __updatePostThunk({
        //...post,
        id: post.id,
        content: updatedPost,
        title: post.title,
      })
    );
    setIsEditMode(false);
  };

  const onDeleteHandler = () => {
    dispatch(__deletePostThunk(post.id));
    navigate("/Home");
  };

  return (
    <div>
      <Layout>
        <Header />
        {/* 수정하기모드가 아니면서 이전으로 버튼이 있다면 아랫줄 실행  */}
        {!isEditMode && (
          <div>
            <Likes postId={post.id} />
            <StHidden>id: ({post?.id})</StHidden>

            <StButton
              size="24"
              onClick={() => {
                navigate("/Home");
              }}
            >
              이전으로
            </StButton>
          </div>
        )}

        <StH1>{post?.title}</StH1>

        <Stimg src={post.image} />
        <StDiv1>
          {isEditMode ? (
            <>
              <STtextarea
                name="content"
                rows="10"
                maxLength={100}
                value={updatedPost}
                onChange={(event) => {
                  setUpdatePost(event.target.value);
                }}
              />
            </>
          ) : (
            <StDiv2>{post?.content}</StDiv2>
          )}
        </StDiv1>
        <div>
          {isEditMode ? (
            <StButton3 size="large" onClick={onSaveButtonHandler}>
              저장
            </StButton3>
          ) : (
            <div>
              <StBox>
                <StButton2
                  size="large"
                  onClick={() => {
                    setIsEditMode(true);
                  }}
                >
                  수정
                </StButton2>
              </StBox>
              <StBox>
                <StButton2
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    const result = window.confirm("이 게시물을 지울까요?");
                    if (result) {
                      return onDeleteHandler();
                    } else {
                      return;
                    }
                  }}
                >
                  삭제하기
                </StButton2>
              </StBox>
            </div>
          )}
        </div>

        {!isEditMode && <CommentList list={post.comments} />}
      </Layout>
    </div>
  );
};

export default Detail;

const Stimg = styled.img`
  width: 600px;
  height: 550px;
  margin-left: 300px;
  margin-top: 30px;
  float: left;
  display: flex;
  align-items: center;
`;
const StButton = styled.button`
  border: none;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  width: 120px;

  margin-left: 90%;
  &:hover {
    background: #b075fd;
    color: white;
    transition: 0.5s;
  }
`;
const StH1 = styled.h1`
  margin-left: 45%;
`;
const StDiv1 = styled.div`
  margin-top: 55%;
  margin-left: 22%;
`;

const StDiv2 = styled.div`
  margin-top: 55%;
  margin-right: 26%;
`;

const StBox = styled.div`
  margin-left: 260px;
  margin-top: 3%;
  width: 180px;
  float: left;
  align-items: center;
  display: flex;
`;

const StButton3 = styled.button`
  border: none;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  width: 120px;
  margin-top: 15%;
  margin-left: 44.5%;
`;

const StButton2 = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: none;

  height: 45px;
  cursor: pointer;
  border-radius: 10px;
  width: 120px;

  margin-left: 40%;
  &:hover {
    background: #b075fd;
    color: white;
    transition: 0.5s;
  }
`;
const StButton1 = styled.button`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border: none;

  height: 45px;
  cursor: pointer;
  border-radius: 10px;
  width: 120px;
  margin-top: 12%;
  margin-left: 45%;
  &:hover {
    background: #b075fd;
    color: white;
    transition: 0.5s;
  }
`;
const STtextarea = styled.textarea`
  display: flex;
  margin: -17.5%;
  width: 450px;
  margin: -17.5%;
`;
const StHidden = styled.div`
  display: none;
`;
