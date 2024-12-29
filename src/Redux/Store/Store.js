import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from "../Slice/recipeSlice";
import tagsReducer from "../Slice/tagsSlice";

export const store = configureStore({
    reducer: {
        recipes: recipeReducer,
        tags: tagsReducer,
    },
});
export default store;