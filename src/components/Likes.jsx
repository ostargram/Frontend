import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import heart from "../img/heart.png";
import binheart from "../img/binheart.png";
import { __addLike } from "../redux/modules/postsSlice";

const Like = ({ postId }) => {
  const dispatch = useDispatch();

  // 아이콘 변경 state
  const [isLiked, setAction] = useState(false);

  return (
    <div>
      {isLiked ? (
        <div>
          <button
            type="submit"
            onClick={() => {
              console.log(2222, isLiked);
              setAction(false);

              console.log(1111, isLiked);
              dispatch(__addLike(postId));
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
              dispatch(__addLike(postId));
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
