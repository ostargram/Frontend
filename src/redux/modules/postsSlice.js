import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;

// 상세 게시글 GET 요청
export const __getPostThunk = createAsyncThunk(
  "GET_POST",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${"http://localhost:3001"}/posts/${arg}`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// 게시물 post요청
export const __addPostThunk = createAsyncThunk(
  "ADD_POST",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${"http://localhost:3001"}/posts`,
        arg
        // {withCredentials: true}
      );
      console.log(data);
      return thunkAPI.fulfillWithValue(data);
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
      axios.delete(
        `${"http://localhost:3001"}/posts/${arg}`
        // {withCredentials: true}
      );
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
      const { data } = await axios.get(`${"http://localhost:3001"}/posts`);
      return thunkAPI.fulfillWithValue(data);
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
      axios.patch(`${"http://localhost:3001"}/posts/${arg.id}`, arg);
      return thunkAPI.fulfillWithValue(arg);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.code);
    }
  }
);

const initialState = {
  posts: [],
  post: {
    id: 0,
    title: "",
    body: "",
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
    // 전체 게시물 get
    [__getPostsThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
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
