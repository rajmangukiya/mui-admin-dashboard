// import {
//   REMOVE_USER_DATA,
//   USER_DATA,
//   USER_DATA_ERR,
// } from "../types";
import { createSlice } from '@reduxjs/toolkit'
import { ApiGet } from "../../utils/ApiData";
import AuthStorage from '../../utils/AuthStorage';

const initialState = {
  userData: {

  },
  userDataErr: null,
  isLogged: false
};

export const userData = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    loginAction: (state) => {
      state.isLogged = true
    },
    logoutAction: (state) => {
      AuthStorage.deauthenticateUser();
      state.isLogged = false
    },
    getUserData: (state, action) => {
      if(action.payload) {
        state.userData = action.payload
        state.isLogged = true
      }
      else {
        ApiGet("user/GetUser")
        .then((res) => {
          state.userData = res.data
          state.isLogged = true
        })
        .catch((error) => {
          state.userData = {}
          state.userDataErr = error
          state.isLogged = false
        });
      }
    },
    removeUserData: (state) => {
      state.userData = {}
      state.isLogged = false
    }
  },
})

export const { loginAction, logoutAction, getUserData, removeUserData } = userData.actions

export default userData.reducer