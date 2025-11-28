import { Question } from "@/lib/types";
import { Action, createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchQuestions = createAsyncThunk(
  "questions/fetchQuestions",
  async (skill: string) => {
    try {
      const result = await fetch(
        `/api/skills?skill=${encodeURIComponent(skill)}`
      );
      const json = await result.json();
      return json;
    } catch (err) {
      console.error(err);
    }
  }
);

interface QuestionareState {
  loading: boolean;
  hasError: boolean;
  questions: Question[];
}

const initialState: QuestionareState = {
  loading: false,
  hasError: false,
  questions: [],
};

const questionareSlice = createSlice({
  name: "Questionare",
  initialState,
  reducers: {
    removeQuestions: (state) => {
      state.questions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
        state.hasError = false;
        state.questions = [];
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.hasError = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state) => {
        state.loading = false;
        state.hasError = true;
      });
  },
});

export const { removeQuestions } = questionareSlice.actions;
export default questionareSlice.reducer;
