import { configureStore } from '@reduxjs/toolkit';
import mainCategoryReducer from '../Redux/mainCategorySlice';
import subCategoryReducer from '../Redux/subCategorySlice';
import shopCategoryReducer from '../Redux/shopCategorySlice';
import productCategoryReducer from '../Redux/productCategorySlice';
import loginDataReducer from '../Redux/LoginSlice'
export const store = configureStore({
  reducer: {
    mainCategory: mainCategoryReducer,
    subCategory: subCategoryReducer,
    shopCategory: shopCategoryReducer,
    productCategory: productCategoryReducer,
    loginData: loginDataReducer,
  },
});
