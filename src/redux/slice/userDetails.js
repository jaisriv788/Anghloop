import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  walletAddress: null,
  refresher: false,
  USDTAddress: "0xd1b7916d20F3b9D439B66AF25FC45f6A28c157d0",
  contractAddress: "0x5A40f99dA908c1880F834b99211e704D1811F694",
  companyWalletAddress: "0x6Fdd0f90e8D74e876c59FC24d044E9f2bAE13b53",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.walletAddress = action.payload;
    },
    setConnection: (state, action) => {
      state.isConnected = action.payload;
    },
    refresh: (state, action) => {
      state.refresher = action.payload;
    },
  },
});

export const { setAddress, setConnection, refresh } = userSlice.actions;
export default userSlice.reducer;
