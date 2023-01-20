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
import styled from "styled-components";

const Comment = ({ text, id }) => {
  console.log(1234, text, id);
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(text);

  // const { text } = useSelector((state) => state.getcomment.text);
  // console.log("댓글내용", text);
  // const { isGlobalEditmode } = useSelector((state) => state.commentlist);

  const onDeleteButtonHandler = () => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      dispatch(__deleteComment(id));
    } else {
      return;
    }
  };

  const onUpdateButtonHandler = () => {
    dispatch(
      __updateComment({
        id: id,
        text: updatedComment,
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
    setUpdatedComment(text);
    setIsEdit(false);

    // dispatch(clearComment());
    // dispatch(globalEditModeToggle(false));
  };

  // useEffect(() => {
  //   setUpdatedComment(text);
  // }, [text]);

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
          {
            <div>
              {/* <div>{id}</div> */}
              <div>{text}</div>
            </div>
          }

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

const StButton = styled.button`
  border: none;
  height: 40px;
  cursor: pointer;
  margin: 120px;
  border-radius: 10px;
  width: 120px;
  font-weight: 700;
  margin-top: 70%;
  &:hover {
    background: #b075fd;
    color: white;
    transition: 0.5s;
  }
`;
