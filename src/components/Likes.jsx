import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import heart from "../img/heart.png";
import binheart from "../img/binheart.png";
import { __addLike } from "../redux/modules/postsSlice";
import { useParams } from "react-router-dom";

const Like = ({ postId }) => {
  const { id } = useParams();
  const post = useSelector((state) => state.posts.post);
  console.log(post);
  const dispatch = useDispatch();
  /* useEffect(() => {
    dispatch(__getLike(id));
  }, [dispatch]); */
  console.log(id);
  // 아이콘 변경 state
  const [isLiked, setAction] = useState(false);
  //디테일 조회시 true false가 api에 있어야하지않나요?

  return (
    <div>
      {isLiked ? (
        <div>
          <button
            type="submit"
            onClick={() => {
              console.log(2222, isLiked);
              setAction(false);

              console.log(1234, postId);
              dispatch(__addLike(id));
            }}
          >
            <Heart src={heart} />
          </button>
        </div>
      ) : (
        <div>
          <button
            type="submit"
            onClick={() => {
              console.log(4444, isLiked);
              setAction(true);
              console.log(3333, isLiked);
              dispatch(__addLike(id));
            }}
          >
            <BinHeart src={binheart} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Like;

const Heart = styled.img`
  width: 30px;
  height: 30px;
`;

const BinHeart = styled.img`
  width: 30px;
  height: 30px;
`;
