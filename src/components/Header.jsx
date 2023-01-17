import React from "react";
import styled from "styled-components";
import { RiMovieLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

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
