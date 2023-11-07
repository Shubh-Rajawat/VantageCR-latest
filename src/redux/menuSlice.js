import { createSlice } from "@reduxjs/toolkit";

const menuDataSlice = createSlice({
    name: "menu",
    initialState: { menuData: [], menuID: 1 },
    reducers: {
        setMenuData: (state, action) => {
            state.menuData = action.payload;
        },
        setMenuId: (state, action) => {
            state.menuID = action.payload
        }
    }
})

export const menuActions = menuDataSlice.actions
const menuReducer = menuDataSlice.reducer
export default menuReducer