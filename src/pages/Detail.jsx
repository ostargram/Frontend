import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { __getPostThunk, __updatePostThunk } from "../redux/modules/postsSlice";
import CommentList from "../comments/CommentList";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const navigate = useNavigate();
  // const [like, setLike] = useState();

  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedPost, setUpdatePost] = useState("");
  const post = useSelector((state) => state.posts.post);
  // console.log("게시글 ", post);

  useEffect(() => {
    dispatch(__getPostThunk(id));
  }, [dispatch, id]);

  // useEffect(() => {
  //   dispatch(__getPostThunk(id));
  //   return () => dispatch(clearPost());
  // }, [dispatch, id]);

  // useEffect(() => {
  //   setUpdatePost(post.body);
  // }, [post]);

  const onSaveButtonHandler = () => {
    if (updatedPost.trim() === "") {
      return alert("입력된 내용이 없습니다.");
    }
    dispatch(
      __updatePostThunk({
        ...post,
        content: updatedPost,
      })
    );
    setIsEditMode(false);
  };

  return (
    <div>
      <Layout>
        <Header />
        {/* {setLike ? (
          <HiOutlineHeart size="50" color="#e22c2c" />
        ) : (
          <HiHeart size="50" color="#e22c2c" />
        )} */}
        {/* 수정하기모드가 아니면서 이전으로 버튼이 있다면 아랫줄 실행  */}
        {!isEditMode && (
          <div>
            id: ({post?.id})
            <button
              size="24"
              onClick={() => {
                navigate("/Home");
              }}
            >
              이전으로
            </button>
          </div>
        )}
        <div>{post?.title}</div>
        <div>
          {isEditMode ? (
            <>
              <textarea
                name="body"
                rows="10"
                maxLength={100}
                value
                onChange={(event) => {
                  setUpdatePost(event.target.value);
                }}
              />
            </>
          ) : (
            <div>{post?.content}</div>
          )}

          <div>
            {isEditMode ? (
              <button size="large" onClick={onSaveButtonHandler}>
                저장
              </button>
            ) : (
              <button
                size="large"
                onClick={() => {
                  setIsEditMode(true);
                }}
              >
                수정
              </button>
            )}
          </div>
        </div>
        {!isEditMode && <CommentList />}
      </Layout>
    </div>
  );
};

export default Detail;
