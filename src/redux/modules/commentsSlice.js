import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// PostId 전체 댓글 GET
export const __getCommentsByPostId = createAsyncThunk(
  "GET_COMMENT_BY_POST_ID",
  async (arg, thunkAPI) => {
    try {
      const data = await axios.get(
        `${"http://localhost:3001"}/commentlist?postId=${arg}`
      );
      console.log("(id)전체 댓글", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.code);
    }
  }
);

// 댓글 삭제
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

// 댓글 수정
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

// 댓글 post
export const __addComment = createAsyncThunk(
  "ADD_COMMENT",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${"http://localhost:3001"}/commentlist`,
        arg
      );
      console.log("글 작성", data);
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

// 상세 댓글?
export const __getComment = createAsyncThunk(
  "GET_COMMENT",
  async (arg, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${"http://localhost:3001"}/commentlist/${arg}`
      );
      return thunkAPI.fulfillWithValue(data);
    } catch (e) {
      // console.log(e.response)
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const initialState = {
  commentlist: [],
  comments: {
    content: "",
    postId: 0,
  },
  isLoading: false,
  error: null,
  isGlobalEditmode: false,
  commentsByPostId: {
    comment: [],
    isLoading: false,
    error: null,
  },
};

export const commentsSlice = createSlice({
  name: "commentlist",
  initialState,
  reducers: {
    // clearComment: (state) => {
    //   state.comments.content = "";
    // },
    globalEditModeToggle: (state, action) => {
      state.isGlobalEditmode = action.payload;
    },
  },
  extraReducers: {
    // 댓글 조회 (postId)
    [__getCommentsByPostId.pending]: (state) => {
      state.commentsByPostId.isLoading = true;
    },
    [__getCommentsByPostId.fulfilled]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      state.commentsByPostId.comment = action.payload;
      console.log("풀필드", state.commentsByPostId.comment);
    },
    [__getCommentsByPostId.rejected]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      state.commentsByPostId.error = action.payload;
    },

    // 댓글 삭제
    [__deleteComment.pending]: (state) => {
      state.commentsByPostId.isLoading = true;
    },
    [__deleteComment.fulfilled]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      const target = state.commentsByPostId.comment.findIndex(
        (comment) => comment.id === action.payload
      );
      state.commentsByPostId.data.splice(target, 1);
    },
    [__deleteComment.rejected]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      state.commentsByPostId.error = action.payload;
    },

    // 댓글 수정
    [__updateComment.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateComment.fulfilled]: (state, action) => {
      const target = state.commentsByPostId.comment.findIndex(
        (comment) => comment.id === action.payload.id
      );
      state.isLoading = false;
      state.commentsByPostId.data.splice(target, 1, action.payload);
    },
    [__updateComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // 댓글 추가
    [__addComment.pending]: (state) => {
      state.commentsByPostId.isLoading = true;
    },
    [__addComment.fulfilled]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      state.commentsByPostId.comment.push(action.payload);
      console.log(action.payload);
    },
    [__addComment.rejected]: (state, action) => {
      state.commentsByPostId.isLoading = false;
      state.commentsByPostId.error = action.payload;
    },
    [__getComment.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__getComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
      console.log("누구세요?", action.payload);
    },
    [__getComment.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { globalEditModeToggle } = commentsSlice.actions;
export default commentsSlice.reducer;
