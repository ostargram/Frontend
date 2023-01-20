import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../request/request";

axios.defaults.withCredentials = true;

// 상세 게시글 GET 요청
export const __getPostThunk = createAsyncThunk(
  "GET_POST",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/posts/${arg}`);
      /*  const { data } = await axios.get(
        `${"http://localhost:3001"}/posts/${arg}`

      ); */

      //);
      // console.log("상세 글", data);
      //return thunkAPI.fulfillWithValue(data);
      // 백엔드 서버랑은 아래
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// 게시물 post요청
export const __addPostThunk = createAsyncThunk(
  "ADD_POST",

  async (arg, thunkAPI) => {
    // 폼데이터로 묶어서 보내기
    const formData = new FormData();

    console.log(arg);
    /* const request = {
      name: arg.name,
      description: arg.description,
      price: arg.price,
    };
    const json = JSON.stringify(request);
    const blob = new Blob([json], { type: "application/json" }); */
    formData.append("title", arg.title);
    formData.append("content", arg.content);
    formData.append("image", arg.file);

    // 파일 하나하나 보내기
    // formData.append(“name”, payload.name);
    // formData.append(“description”, payload.description);
    // formData.append(“price”, payload.price);
    // formData.append(“category”, payload.category);
    // formData.append(“image_url”, payload.image_url);
    // formData.append(“request”, blob);
    // 폼데익터로 넘김?
    // const { data } = await axiosInstance.post(
    //   `/posts`,
    //   formData,
    try {
      /*    const { data } = await axios.post(
             `${"http://localhost:3001"}/posts/`,
        arg
      ); */
      const { data } = await axiosInstance.post(`/posts`, arg, {
        headers: { "Content-Type": "multipart/form-data" },
        /*  Authorization: 필요하시다면 주석처리 풀기
      "로그인토큰" */
      });
      // return thunkAPI.fulfillWithValue(data.data);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 게시물 delete 요청
export const __deletePostThunk = createAsyncThunk(
  "DELETE_POST",
  async (arg, thunkAPI) => {
    try {
      await axiosInstance.delete(`/posts/${arg}`);
      //axios.delete(`${"http://localhost:3001"}/posts/${arg}`);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// 전체 게시물 GET요청
export const __getPostsThunk = createAsyncThunk(
  "GET_POSTS",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get("/posts");
      //const { data } = await axios.get(`${"http://localhost:3001"}/posts/`);
      console.log(data);

      // 백엔드 서버와 연결시
      return thunkAPI.fulfillWithValue(data.data);
      //return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

//  Update patch 요청
export const __updatePostThunk = createAsyncThunk(
  "UPDATE_POST",
  async (arg, thunkAPI) => {
    try {
      //const postId = arg.postId;
      const content = arg.content;
      const title = arg.title;
      await axiosInstance.put(`/posts/${arg.id}`, { content, title });
      //분해해서 보내는 법
      //axios.patch(`${"http://localhost:3001"}/posts/${arg.id}`, arg);
      //console.log(postId);
      return thunkAPI.fulfillWithValue(arg);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

// 좋아요 post
export const __addLike = createAsyncThunk("ADD_like", async (arg, thunkAPI) => {
  try {
    console.log(1234, arg);
    const { data } = await axiosInstance.post(`/posts/${arg}/likes`);
    return thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue(e);
  }
});
// 좋아요 get요청
/* export const __getLike = createAsyncThunk("GET_POST", async (arg, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get(`/posts/${arg}/likes`);
    console.log(arg);
    return thunkAPI.fulfillWithValue(data);
  } catch (e) {
    return thunkAPI.rejectWithValue(e.code);
  }
}); */

const initialState = {
  posts: [],
  post: {
    id: 0,
    title: "",
    content: "",
  },
  error: null,
  isLoading: false,
  isSuccess: false,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    //   clearPost: (state, action) => {
    //     state.post = {
    //       id: 0,
    //       title: "",
    //       body: "",
    //     };
    //     state.isSuccess = false;
    //  },
  },
  extraReducers: {
    // 좋아요 post
    [__addLike.pending]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [__addLike.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.posts.push(action.payload);
    },
    [__addLike.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    /*  [__getLike.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [__getLike.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getLike.pending]: (state) => {
      state.isLoading = true;
    },
 */
    // 전체 게시물 get
    [__getPostsThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
      state.posts = action.payload;
    },
    [__getPostsThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getPostsThunk.pending]: (state) => {
      state.isLoading = true;
    },
    // 글작성 post
    [__addPostThunk.pending]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [__addPostThunk.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.posts.push(action.payload);
    },
    [__addPostThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 상세 게시물 get
    [__getPostThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [__getPostThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getPostThunk.pending]: (state) => {
      state.isLoading = true;
    },
    // 업데이트 patch
    [__updatePostThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.post = action.payload;
    },
    [__updatePostThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__updatePostThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 삭제 delete
    [__deletePostThunk.fulfilled]: (state, action) => {
      const target = state.posts.findIndex(
        (comment) => comment.id === action.payload
      );

      state.posts.splice(target, 1);
    },
    [__deletePostThunk.rejected]: () => {},
    [__deletePostThunk.pending]: () => {},
  },
});

// export const { clearPost } = postSlice.actions;
export default postSlice.reducer;
