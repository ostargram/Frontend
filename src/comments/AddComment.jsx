import React, { useState } from "react";
// import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { __addComment } from "../redux/modules/commentsSlice";
import styled from "styled-components";

const AddComment = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [comment, setComment] = useState({
    content: "",
  });

  const onAddCommentButtonHandler = (event) => {
    event.preventDefault();
    if (comment.content.trim() === "") {
      return alert("모든 항목을 입력해주세요.");
    }
    dispatch(__addComment({ postId: id, content: comment.content }));
    setComment({
      content: "",
    });
  };

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  return (
    <form onSubmit={onAddCommentButtonHandler}>
      <div></div>
      <StInput
        placeholder="댓글을 추가하세요. (50자 이내)"
        value={comment.content}
        name="content"
        type="text"
        onChange={onChangeInputHandler}
        maxLength={100}
      />
      <StButtons type="submit" onClick={onAddCommentButtonHandler}>
        추가하기
      </StButtons>
    </form>
  );
};

export default AddComment;

const ReCm = styled.form`
  margin-left: 20px;
`;

const StInput = styled.input`
  width: 500px;
  height: 30px;
  border-radius: 10px;
  margin-left: 20px;
`;
const StButtons = styled.button`
  border: 1px solid #ddd;
  height: 50px;
  width: 100px;
  margin-left: 10%;
  padding-left: 15px;
  border-radius: 10px;
  &:hover {
    background: #b075fd;
    color: white;
    transition: 0.5s;
  }
`;
