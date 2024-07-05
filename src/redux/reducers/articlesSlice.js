// setLoadingStatus
// getArticles

import { createSlice } from "@reduxjs/toolkit"

export const initialState = {
    loading : false,
    articles : [],
}

const articlesSlice = createSlice ({
    name: 'articles',
    initialState,
    reducers: {
        setLoadingStatus(state, action) {
            state.loading = action.payload;
        },
        getArticles(state, action) {
            state.articles = action.payload;
            
        }
    }
})

export const {setLoadingStatus, getArticles} = articlesSlice.actions;
export default articlesSlice.reducer;
