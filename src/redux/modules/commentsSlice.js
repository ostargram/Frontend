import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 전체 댓글 get
export const __getCommentListThunk = createAsyncThunk(
  "GET_COMMENTLIST",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${"http://localhost:3001"}/commentlist`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __getCommentsByPostId = createAsyncThunk(
  "GET_COMMENT_BY_POST_ID",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${"http://localhost:3001"}/commentlist?postId=${arg}`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __deleteComment = createAsyncThunk(
  "DELETE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      await axios.delete(`${"http://localhost:3001"}/commentlist/${arg}`);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

export const __updateComment = createAsyncThunk(
  "UPDATE_COMMENT",
  async (arg, thunkAPI) => {
    try {
      axios.patch(`${"http://localhost:3001"}/commentlist/${arg.id}`, arg);
      return thunkAPI.fulfillWithValue(arg);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const __addComment = createAsyncThunk(
  "ADD_COMMENT",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${"http://localhost:3001"}/comments`,
        arg
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  commentlist: {
    data: [],
    isLoading: false,
    error: null,
  },
  commentsByPostId: {
    data: [],
    isLoading: false,
    error: null,
  },
};

export const commentsSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    // clearTodo: (state) => {
    //   state.comments = null;
    // },
  },
  extraReducers: {
    // 전체 댓글 조회
    [__getCommentListThunk.pending]: (state) => {
      state.commentlist.isLoading = true;
    },
    [__getCommentListThunk.fulfilled]: (state, action) => {
      state.commentlist.isLoading = false;
      state.commentlist.data = action.payload;
    },
    [__getCommentListThunk.rejected]: (state, action) => {
      state.commentlist.isLoading = false;
      state.commentlist.error = action.payload;
    },

    // 댓글 조회 (todoId)
    [__getCommentsByPostId.pending]: (state) => {
      state.commentsByPostId.isLoading = true;
    },
    [__getCommentsByPostId.fulfilled]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      state.commentsByPostId.data = action.payload;
    },
    [__getCommentsByPostId.rejected]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      state.commentsByPostId.error = action.payload;
    },

    // 댓글 삭제
    [__deleteComment.pending]: (state) => {
      state.commentsByTodoId.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      const target = state.commentsByTodoId.data.findIndex(
        (comment) => comment.id === action.payload
      );
      state.commentsByTodoId.data.splice(target, 1);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      state.commentsByTodoId.error = action.payload;
    },

    // 댓글 수정
    [__updateComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateComment.fulfilled]: (state, action) => {
      const target = state.commentsByTodoId.data.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.isLoading = false;
      state.commentsByTodoId.data.splice(target, 1, action.payload);
    },
    [__updateComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 댓글 추가
    [__addComment.pending]: (state) => {
      state.commentsByTodoId.isLoading = true;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      state.commentsByTodoId.data.push(action.payload);
    },
    [__addComment.rejected]: (state, action) => {
      state.commentsByTodoId.isLoading = false;
      state.commentsByTodoId.error = action.payload;
    },
  },
});

export default commentsSlice.reducer;
