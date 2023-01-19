import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { __deletePostThunk } from "../redux/modules/postsSlice";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { useState } from "react";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [like, setLike] = useState(false, 0);

  const likeClick = () => {
    // ***
    if (like) {
      setLike(false);
      // 좋아요를 누르면 firebase, redux에 like_cnt + 1
    } else {
      setLike(true);
      // 좋아요 해제하면 firebase, redux에 like_cnt - 1
    }
  };

  const onDeleteHandler = () => {
    dispatch(__deletePostThunk(post.id));
  };

  return (
    <StCard>
      <h2>{post.title}</h2>
      <div>
        <StButton
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
        </StButton>
        <StButton
          type="button"
          onClick={() => {
            navigate(`/Detail/${post.id}`);
          }}
        >
          자세히 보기
        </StButton>
        {!setLike ? (
          <HiOutlineHeart size="50" color="#e22c2c" />
        ) : (
          <div>
            <HiHeart
              size="20"
              color="#e22c2c"
              onClick={() => {
                setLike(like + 1);
              }}
            />
            {like}
          </div>
        )}
      </div>
    </StCard>
  );
};
export default PostCard;

// const StCardBox = styled.div`
//   display: flex;
//   padding: 12px;
//   height: 90px;
//   border: 1px solid #ddd;
//   background-color: #fff;
//   border-radius: 12px;
//   width: 100%;
//   margin-bottom: 12px;
// `;

const StCard = styled.div`
  width: 400px;
  height: 450px;
  margin-top: 30px;
  float: left;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;
`;

const StButton = styled.button`
  border: none;
  height: 40px;
  cursor: pointer;
  border-radius: 10px;
  width: 120px;
  font-weight: 700;
  margin: 5px;
  &:hover {
    background: #b075fd;
    color: white;
    transition: 0.5s;
  }
`;
