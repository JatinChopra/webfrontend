import { configureStore } from "@reduxjs/toolkit";
import signupRolerReducer from "@/store/signupRoleSlice";
import signupStylistReducer from "@/store/stylistSignupSlice";
import signupSalonReducer from "@/store/salonSignupSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      signupRole: signupRolerReducer,
      signupStylist: signupStylistReducer,
      signupSalon: signupSalonReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
