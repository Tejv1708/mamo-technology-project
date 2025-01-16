import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../instance";

export const createMeet = createAsyncThunk(
  "meeting/createMeet",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await instance.post(
        `/time/createSlot/${data.userId}`,
        data.meetingDetails,
        {
          headers: {
            Authorization: "Bearer " + data.token,
          },
        }
      );
      console.log(response);
      console.log(data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllMeeting = createAsyncThunk(
  "meeting/getAllMeet",
  async (_, { rejectWithValue }) => {
    try {
      const response = await instance.get("/time/allMeeting", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteAMeeting = createAsyncThunk(
  "meeting/deleteMeet",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await instance.delete(`/time/deleteSlot/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateMeeting = createAsyncThunk(
  "meeting/updateMeet",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await instance.put(`/time/updateSlot/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const meetingSlice = createSlice({
  name: "meeting",
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createMeet.pending, (state) => {
        state.loading = true;
      })
      .addCase(createMeet.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createMeet.rejected, (state, action) => {
        state.loading = false;
        state.data = action.error.message;
      });

    builder
      .addCase(getAllMeeting.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllMeeting.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllMeeting.rejected, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });

    builder
      .addCase(updateMeeting.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMeeting.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateMeeting.rejected, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      });
  },
});

export default meetingSlice.reducer;
