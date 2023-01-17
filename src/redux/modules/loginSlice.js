import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//import { getCookie } from "../../Cookie";
import { axiosInstance } from "../../request/request";
//import { getCookie } from "../../Cookie";
//import axios from "axios";

axiosInstance.defaults.withCredentials = true;
const initialState = {
  userList: [
    {
      username: "",
      password: "",
    },
  ],
  isLoading: false,
  error: null,
  isLogin: false,
};

export const __postUser = createAsyncThunk(
  "signup",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/users/signup", payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//로그인 POST요청
export const __postLogin = createAsyncThunk(
  "login",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axiosInstance
        .post("/users/login", payload, {
          withCredentials: true,
        })
        .then((res) => {
          sessionStorage.setItem("access_token", res.headers.access_token);
          sessionStorage.setItem("refresh_token", res.headers.refresh_token);
          console.log(res);
          console.log(payload);
          return res;
        });
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
//email전송기능
/* export const __emailCheck = createAsyncThunk(
  "emailcheck",
  async (payload, thunkAPI) => {
    //console.log(payload);
    const data1 = {
      id: 300,
      email: payload,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:3001/emailCheck",
        data1
      );
      console.log(payload);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
); */

const userList = createSlice({
  name: "userList",
  initialState,
  reducers: {},
  extraReducers: {
    //post
    [__postUser.pending]: (state) => {
      //보내는 도중, 진행중
      state.isLoading = true;
    },
    [__postUser.fulfilled]: (state, action) => {
      //연결후
      state.isLoading = false;
      alert("가입이 완료 되셨습니다!");
    },
    [__postUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }, //post
    [__postLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [__postLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isLogin = true;
      localStorage.setItem("userinfo", JSON.stringify(action.payload));
    },
    /*     [__postLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__emailCheck.pending]: (state) => {
      state.isLoading = true;
    },
    [__emailCheck.fulfilled]: (state, action) => {
      state.isLoading = false;
    },
    [__emailCheck.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }, */
  },
});

export default userList.reducer;
