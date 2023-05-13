import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createTour = createAsyncThunk(
    "tour/createTour",
    async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
        try {
            const response = await api.createTour(updatedTourData);
            toast.success("Tour Added Successfull");
            navigate("/");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getTours = createAsyncThunk(
    "tour/getTours",
    async (page, { rejectWithValue }) => {
        try {
            const response = await api.getTours(page);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getTour = createAsyncThunk(
    "tour/getTour",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.getTour(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getToursByUser = createAsyncThunk(
    "tour/getToursByUser",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.getToursByUser(userId);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteTour = createAsyncThunk(
    "tour/deleteTour",
    async ({ id, toast }, { rejectWithValue }) => {
        try {
            const response = await api.deleteTour(id);
            toast.success("Tour Deleted Successfully");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updateTour = createAsyncThunk(
    "tour/updateTour",
    async ({ id, updatedTourData, toast, navigate }, { rejectWithValue }) => {
        try {
            const response = await api.updateTour(updatedTourData, id);
            toast.success("Tour Updated Successfully");
            navigate("/dashboard");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const searchTours = createAsyncThunk(
    "tour/searchTours",
    async (searchQuery, { rejectWithValue }) => {
        try {
            const response = await api.getToursBySearch(searchQuery);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getToursByTag = createAsyncThunk(
    "tour/getToursByTag",
    async (tag, { rejectWithValue }) => {
        try {
            const response = await api.getToursByTag(tag);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const getRelatedTours = createAsyncThunk(
    "tour/getRelatedTours",
    async (tags, { rejectWithValue }) => {
        try {
            const response = await api.getRelatedTours(tags);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const likeTour = createAsyncThunk(
    "tour/likeTour",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await api.likeTour(id);

            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const tourSlice = createSlice({
    name: "tour",
    initialState: {
        tour: {},
        tours: [],
        userTours: [],
        tagTours: [],
        relatedTours: [],
        currentPage: 1,
        numberOfPages: null,
        error: "",
        loading: false,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    },

    extraReducers: {
        [createTour.pending]: (state, action) => {
            state.loading = true;
        },
        [createTour.fulfilled]: (state, action) => {
            state.tours = [action.payload];
            state.loading = false;
        },
        [createTour.rejected]: (state, action) => {
            state.error = action.payload.message;
            state.loading = false;
        },
        [getTours.pending]: (state, action) => {
            state.loading = true;
        },
        [getTours.fulfilled]: (state, action) => {
            state.tours = action.payload.data;
            state.numberOfPages = action.payload.numberOfPages;
            state.currentPage = action.payload.currentPage;
            state.loading = false;
        },
        [getTours.rejected]: (state, action) => {
            state.error = action.payload.message;
            state.loading = false;
        },
        [getTour.pending]: (state, action) => {
            state.loading = true;
        },
        [getTour.fulfilled]: (state, action) => {
            state.tour = action.payload;
            state.loading = false;
        },
        [getTour.rejected]: (state, action) => {
            state.error = action.payload.message;
            state.loading = false;
        },
        [getToursByUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getToursByUser.fulfilled]: (state, action) => {
            state.userTours = action.payload;
            state.loading = false;
        },
        [getToursByUser.rejected]: (state, action) => {
            state.error = action.payload.message;
            state.loading = false;
        },
        [deleteTour.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteTour.fulfilled]: (state, action) => {
            state.loading = false;
            const { id } = action.meta.arg;
            if (id) {
                state.userTours = state.userTours.filter(
                    (item) => item._id !== id
                );
                state.tours = state.tours.filter((item) => item._id !== id);
            }
        },
        [deleteTour.rejected]: (state, action) => {
            state.error = action.payload.message;
            state.loading = false;
        },
        [updateTour.pending]: (state, action) => {
            state.loading = true;
        },
        [updateTour.fulfilled]: (state, action) => {
            state.loading = false;
            const { id } = action.meta.arg;
            if (id) {
                state.userTours = state.userTours.map((item) =>
                    item._id === id ? action.payload : item
                );
                state.tours = state.tours.map((item) =>
                    item._id === id ? action.payload : item
                );
            }
        },
        [updateTour.rejected]: (state, action) => {
            state.error = action.payload.message;
            state.loading = false;
        },
        [searchTours.pending]: (state, action) => {
            state.loading = true;
        },
        [searchTours.fulfilled]: (state, action) => {
            state.tours = action.payload;
            state.loading = false;
        },
        [searchTours.rejected]: (state, action) => {
            state.error = action.payload.message;
            state.loading = false;
        },
        [getToursByTag.pending]: (state, action) => {
            state.loading = true;
        },
        [getToursByTag.fulfilled]: (state, action) => {
            state.tagTours = action.payload;
            state.loading = false;
        },
        [getToursByTag.rejected]: (state, action) => {
            state.error = action.payload.message;
            state.loading = false;
        },
        [getRelatedTours.pending]: (state, action) => {
            state.loading = true;
        },
        [getRelatedTours.fulfilled]: (state, action) => {
            state.relatedTours = action.payload;
            state.loading = false;
        },
        [getRelatedTours.rejected]: (state, action) => {
            state.error = action.payload.message;
            state.loading = false;
        },
        [likeTour.pending]: (state, action) => {},
        [likeTour.fulfilled]: (state, action) => {
            state.loading = false;
            const { id } = action.meta.arg;
            if (id) {
                state.tours = state.tours.map((item) =>
                    item._id === id ? action.payload : item
                );
            }
        },
        [likeTour.rejected]: (state, action) => {
            state.error = action.payload.message;
            state.loading = false;
        },
    },
});

export const { setCurrentPage } = tourSlice.actions;

export default tourSlice.reducer;
