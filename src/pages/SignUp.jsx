// src/pages/home.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import styled from "styled-components";
import logo from "../img/logo.jpg";
import { __postUser } from "../redux/modules/loginSlice";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialState = {
    username: "",
    email: "",
    password: "",
    check_password: "",
  };

  //유저 스테이트 생성
  const [user, setUser] = useState(initialState);

  //남성 여성 스테이트 생성
  const [gender, setGender] = useState();

  //유저 스테이트 구조분해 할당
  const { email, password, username, check_password } = user;

  //상태관리 위해 초기값 세팅
  const [usernameInput, setusernameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [passInput, setPassInput] = useState("");
  const [checkpassInput, setcheckpassInput] = useState("");

  //정규식
  const regEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  const regPassword = /^(?=.[A-Za-z])(?=.\\d)[A-Za-z\\d@$!%*#?&]{8,16}$/;
  const regusername = /^[a-z0-9_-]{4,20}$/;
  //유효성 검사 및 유저 스테이트 작성
  const onChangeUserHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === "username")
      !regusername.test(value)
        ? setusernameInput("소문자 + 숫자 + 언더바/하이픈 허용 4~20자리입니다.")
        : setusernameInput("");

    if (name === "email")
      !regEmail.test(value)
        ? setEmailInput("이메일 형식으로 입력해주세요.")
        : setEmailInput("");

    if (name === "password")
      !regPassword.test(value)
        ? setPassInput(
            `8~16자의 영문 대소문자와 숫자로 입력해주세요.
                           특수문자(!@#$%^&*)도 사용 가능합니다.`
          )
        : setPassInput("");

    if (name === "check_password")
      password !== value
        ? setcheckpassInput("비밀번호가 불일치합니다")
        : setcheckpassInput("");
  };

  // 회원가입 POST요청 및 공백 존재 시 경고창 생성
  const onSubmitUserHandler = (e) => {
    e.preventDefault();
    if (
      username.trim() === "" ||
      password.trim() === "" ||
      check_password.trim() === ""
    ) {
      return alert("아이디랑 비밀번호를 입력해주세요!");
    }

    dispatch(
      __postUser({
        username,
        password,
        check_password,
        email,
        gender,
      })
    );
    navigate("/");
  };
  console.log(email);
  return (
    <SignUpContainer>
      <SignUpFormImg />
      <SignUpForm onSubmit={onSubmitUserHandler}>
        <StH1>Sign up</StH1>
        <div>
          <StIput1
            type="text"
            name="username"
            value={username}
            placeholder="아이디를 입력해주세요"
            onChange={onChangeUserHandler}
          ></StIput1>
        </div>
        <p id="help-user" className="help">
          {usernameInput}
        </p>
        <div>
          <StIput1
            type="email"
            name="email"
            value={email}
            placeholder="이메일을 입력해주세요"
            onChange={onChangeUserHandler}
          ></StIput1>
          {/*          <button
            type="button"
            value={email}
            onClick={() => {
              dispatch(
                __emailCheck({
                  email,
                })
              );
            }}
          >
            인증하기
          </button> */}
        </div>

        <p id="help-user" className="help">
          {emailInput}
        </p>
        <div>
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={(e) => setGender(e.target.value)}
          />
          남성
          <input
            type="radio"
            name="gender"
            value="female"
            onChange={(e) => setGender(e.target.value)}
          />
          여성
        </div>
        <div>
          <StIput1
            type="password"
            name="password"
            value={password}
            placeholder="비밀번호를 입력하세요"
            onChange={onChangeUserHandler}
          ></StIput1>
        </div>
        <p id="help-password1" className="help">
          {passInput}
        </p>
        <div>
          <StIput1
            type="password"
            name="check_password"
            value={check_password}
            placeholder="비밀번호 확인해주세요"
            onChange={onChangeUserHandler}
          ></StIput1>
        </div>
        <p id="help-password2" className="help">
          {checkpassInput}
        </p>
        <StButton1>회원가입</StButton1>
      </SignUpForm>
    </SignUpContainer>
  );
};

export default SignUp;

const SignUpContainer = styled.div`
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

const SignUpFormImg = styled.div`
  background-image: url(${logo});
  background-size: cover;
  background-position: center;
  width: 35vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const SignUpForm = styled.form`
  background-color: #f2f2f5;
  background-size: cover;
  background-position: center;
  width: 25vw;
  height: 50vh;
  display: flex;
  flex-direction: column;
`;

const StIput1 = styled.input`
  margin-left: 30px;
  width: 20vw;
  height: 40px;
  border-radius: 5px;
`;

const StButton1 = styled.button`
  background: #f1fcf1;
  color: #f592f5;
  width: 20vw;
  height: 40px;
  margin: 15px;
  border-radius: 5px;
  border-color: #ddf8dd;
  margin-left: 50px;
`;

const StH1 = styled.h1`
  padding-top: 20px;
  padding-left: 40%;
`;
