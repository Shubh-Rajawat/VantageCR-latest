import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import searchReducer from "./searchSlice";
import categoryReducer from "./categorySlice";

const store = configureStore( {
    reducer: {
        menu: menuReducer,
        search: searchReducer,
        categoryID: categoryReducer
    }
} )

export default store