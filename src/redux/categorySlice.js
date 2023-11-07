import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice( {
    name: "category id",
    initialState: {
        catID: ""
    },
    reducers: {
        setCatID: ( state, action ) => {
            state.catID = action.payload
        }
    }
} )

export const categoryAction = categorySlice.actions
const categoryReducer = categorySlice.reducer
export default categoryReducer