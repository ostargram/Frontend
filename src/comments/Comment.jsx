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
  const [updatedComment, setUpdatedComment] = useState("");

  const { content } = useSelector((state) => state.comment.data);
  const { isGlobalEditmode } = useSelector((state) => state.comment);

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
        username: comment.username,
        todoId: id,
      })
    );
    setIsEdit(false);
    dispatch(globalEditModeToggle(false));
  };

  const onChangeEditButtonHandler = () => {
    setIsEdit(true);
    dispatch(__getComment(comment.id));
    dispatch(globalEditModeToggle(true));
  };

  const onCancelButtonHandler = () => {
    setIsEdit(false);
    dispatch(clearComment());
    dispatch(globalEditModeToggle(false));
  };

  useEffect(() => {
    setUpdatedComment(content);
  }, [content]);

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
            <button onClick={onCancelButtonHandler}>
              <h5>취소</h5>
            </button>
            <button onClick={onUpdateButtonHandler}>
              <h5>저장</h5>
            </button>
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
              disabled={isGlobalEditmode}
              onClick={onChangeEditButtonHandler}
            ></button>
            <button
              onClick={onDeleteButtonHandler}
              disabled={isGlobalEditmode}
            ></button>
          </div>
        </>
      )}
    </div>
  );
};

export default Comment;
