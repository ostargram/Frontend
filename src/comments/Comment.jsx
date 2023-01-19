import React, { useEffect, useState } from "react";
// import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  __updateComment,
  __deleteComment,
} from "../redux/modules/commentsSlice";
import {
  clearComment,
  globalEditModeToggle,
  __getComment,
} from "../redux/modules/commentsSlice";

const Comment = ({ comment }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(comment.content);

  // const { content } = useSelector((state) => state.getcomment.content);
  // console.log("댓글내용", content);
  // const { isGlobalEditmode } = useSelector((state) => state.commentlist);

  const onDeleteButtonHandler = () => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      dispatch(__deleteComment(comment.id));
    } else {
      return;
    }
  };

  const onUpdateButtonHandler = () => {
    dispatch(
      __updateComment({
        id: comment.id,
        content: updatedComment,

        postId: id,
      })
    );
    setIsEdit(false);
    // dispatch(globalEditModeToggle(false));
  };

  const onChangeEditButtonHandler = () => {
    setIsEdit(true);
    // dispatch(__getComment(comment.id));
    // dispatch(globalEditModeToggle(true));
  };

  const onCancelButtonHandler = () => {
    setUpdatedComment(comment.content);
    setIsEdit(false);

    // dispatch(clearComment());
    // dispatch(globalEditModeToggle(false));
  };

  // useEffect(() => {
  //   setUpdatedComment(content);
  // }, [content]);

  return (
    <div>
      {isEdit ? (
        <>
          <div>
            <input
              type="text"
              value={updatedComment}
              maxlength={100}
              onChange={(event) => {
                setUpdatedComment(event.target.value);
              }}
            />
          </div>
          <div>
            <button onClick={onCancelButtonHandler}>취소</button>
            <button onClick={onUpdateButtonHandler}>저장</button>
          </div>
        </>
      ) : (
        <>
          <div>
            <div>{comment.username}</div>
            <div>{comment.content}</div>
          </div>

          <div>
            <button
              // disabled={isGlobalEditmode}
              onClick={onChangeEditButtonHandler}
            >
              수정
            </button>
            <button
              onClick={onDeleteButtonHandler}
              // disabled={isGlobalEditmode}
            >
              삭제
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Comment;
