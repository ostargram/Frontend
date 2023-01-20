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
    window.location.reload();
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
            <StInput
              type="text"
              value={updatedComment}
              maxlength={50}
              onChange={(event) => {
                setUpdatedComment(event.target.value);
              }}
            />
          </div>
          <div>
            <StButton onClick={onCancelButtonHandler}>취소</StButton>
            <StButton onClick={onUpdateButtonHandler}>저장</StButton>
          </div>
        </>
      ) : (
        <div>
          <StDiv>{text}</StDiv>
          <StDiv1>
            <StButton
              // disabled={isGlobalEditmode}
              onClick={onChangeEditButtonHandler}
            >
              수정
            </StButton>

            <StButton
              onClick={onDeleteButtonHandler}
              // disabled={isGlobalEditmode}
            >
              삭제
            </StButton>
          </StDiv1>
        </div>
      )}
    </div>
  );
};
export default Comment;

const StButton = styled.button`
  border: none;
  height: 40px;
  border-radius: 10px;
  margin: 10px;
  width: 120px;
  font-weight: 700;
  &:hover {
    background: #b075fd;
    color: white;
    transition: 0.5s;
  }
`;

const StDiv = styled.div`
  margin-left: 30px;
  margin-top: 40px;
`;

const StDiv1 = styled.div`
  margin-left: 10px;
  margin-top: 20px;
`;
const StInput = styled.input`
  width: 500px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  margin-left: 20px;
`;
