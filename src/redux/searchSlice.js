import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name: "search",
    initialState: { searchData: [] },
    reducer: {
        setSearchData: (state, action) => {
            state.searchData = action.payload;
        }
    }
})

export const searchAction = searchSlice.actions
const searchReducer = searchSlice.reducer
export default searchReducer