import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { __logoutUser } from "../redux/modules/loginSlice";
import { RiMovieLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <StContainer>
      {/* 아이콘 */}
      <RiMovieLine
        size="50"
        color="#000000"
        type="buttton"
        onClick={() => {
          navigate("/Home");
        }}
      />
      <span>ostargram</span>
      <StButtons
        onClick={() => {
          dispatch(__logoutUser({}));
          navigate("/");
        }}
      >
        로그아웃
      </StButtons>
    </StContainer>
  );
};
export default Header;

const StContainer = styled.div`
  border: 1px solid #ddd;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  margin-bottom: 24px;
`;

const StButtons = styled.div`
  border: 1px solid #ddd;
  height: 40px;
  width: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 40px;
  border-radius: 10px;
  &:hover {
    background: #d675fd;
    color: white;
    transition: 0.5s;
  }
`;
