import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getCommentsByPostId } from "../redux/modules/commentsSlice";
import Comment from "./Comment";
import AddComment from "./AddComment";

const CommentList = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isShow, setisShow] = useState(false);
  const data = useSelector((state) => state.commentlist.comment);
  console.log(data);

  useEffect(() => {
    if (isShow) {
      dispatch(__getCommentsByPostId(id));
    }
  }, [dispatch, id, isShow]);

  return (
    <StContainer isShow={isShow}>
      <StToggleContainer
        onClick={() => {
          setisShow((isOpen) => !isOpen);
        }}
      >
        <h5>{isShow ? "눌러서 댓글내리기" : "눌러서 댓글보기"}</h5>
      </StToggleContainer>
      <AddComment />
      <StCommentList>
        {data?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </StCommentList>
    </StContainer>
  );
};

export default CommentList;

const StContainer = styled.div`
  height: ${({ isShow }) => (isShow ? "400px" : "50px")};
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  background-color: #fff;
  transition: height 400ms ease-in-out;
`;

const StToggleContainer = styled.div`
  height: 50px;
  padding: 0 12px;
  border-top: 1px solid #eee;
`;

const StCommentList = styled.div`
  height: 350px;
  overflow: scroll;
`;
