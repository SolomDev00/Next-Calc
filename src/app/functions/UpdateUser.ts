import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserProfileState {
  name: string;
  email: string;
  address: string;
  image: string | null;
}

const initialState: UserProfileState = {
  name: "",
  email: "",
  address: "",
  image: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {
    updateUserProfile: (state, action: PayloadAction<UserProfileState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.image = action.payload.image;
    },
  },
});

export const { updateUserProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;
