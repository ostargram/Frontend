// src/pages/home.js
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import logo from "../img/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { __postLogin } from "../redux/modules/loginSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //초기값
  const initialState = {
    username: "",
    password: "",
  };

  //유저 스테이트 생성
  const [user, setUser] = useState(initialState);

  //로그인 체크 전역변수 불러오기
  const loginCheck = useSelector((state) => state.userList.isLogin);

  //로그인에 필요한 인풋값 유저스테이트에 저장
  const onChangeLoginHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  //로그인 POST 요청
  const onSubmitLoginHandler = (e) => {
    e.preventDefault();
    if (user.username.trim() === "" || user.password.trim() === "") {
      alert("체크피료해");
    }
    dispatch(__postLogin(user));
  };

  //로그인 체크 확인 시 메인페이지로 이동
  useEffect(() => {
    loginCheck && navigate("/Home");
  }, [loginCheck, navigate]);

  return (
    <LoginContainer>
      <LoginFormImg />
      <LoginForm>
        <StH1>Sign In</StH1>
        <StIput
          required //아무것도 입력하지 않으면 안되게
          type="text"
          name="username"
          placeholder="아이디를 입력하세요"
          onChange={onChangeLoginHandler}
        ></StIput>
        <StIput
          required //아무것도 입력하지 않으면 안되게
          type="text"
          name="password"
          placeholder="password"
          onChange={onChangeLoginHandler}
        ></StIput>
        <StButton onClick={onSubmitLoginHandler}>로그인</StButton>
        <StButton
          onClick={() => {
            navigate("/SignUp");
          }}
        >
          회원가입
        </StButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default SignIn;

const LoginContainer = styled.form`
  background-color: #d8d8fa;
  background-size: cover;
  background-position: center;
  border: 2px solid #eee;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginFormImg = styled.div`
  background-image: url(${logo});
  background-size: cover;
  background-position: center;
  width: 35vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const LoginForm = styled.div`
  background-color: #f2f2f5;
  background-size: cover;
  background-position: center;
  width: 25vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
`;

const StIput = styled.input`
  padding-left: 20px;
  height: 40px;
  margin: 30px;
  border-radius: 5px;
`;

const StButton = styled.button`
  background: #f1fcf1;
  color: #f592f5;
  height: 40px;
  margin: 30px;
  border-radius: 5px;
  border-color: #ddf8dd;
`;

const StH1 = styled.h1`
  padding-top: 50px;
  padding-left: 40%;
`;
