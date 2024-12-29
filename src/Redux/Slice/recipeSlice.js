import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../Api/AxiosInstance';
import {endPoint} from '../../Api/api';

export const fetchRecipes = createAsyncThunk('recipes/fetchRecipes', async () => {
    const response = await axiosInstance.get(endPoint.recipes);
    return response.data.recipes;
});

export const recipeDetail = createAsyncThunk('recipes/recipeDetail', async (id) => {
    const response = await axiosInstance.get(`${endPoint.recipes}/${id}`);
    return response.data;
});

export const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
        status: null,
        recipe: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchRecipes.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchRecipes.fulfilled, (state, action) => {
            state.recipes = action.payload;
            state.status = 'success';
        });
        builder.addCase(fetchRecipes.rejected, (state) => {
            state.status = 'failed';
        });
        builder.addCase(recipeDetail.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(recipeDetail.fulfilled, (state, action) => {
            state.recipe = action.payload;
            state.status = 'success';
        });
        builder.addCase(recipeDetail.rejected, (state) => {
            state.status = 'failed';
        });
    }
});

export default recipeSlice.reducer;