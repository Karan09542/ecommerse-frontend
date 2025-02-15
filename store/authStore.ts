import { create } from "zustand";
import { productInitialState, ProductProps } from "../src/utils/types";

// types
type IsLoggedInState = {
  isLoggedIn: boolean | null;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

type User = {
  _id: string;
  username: string;
  email: string;
  active: Boolean;
  role: string;
} | null;
type UserState = {
  user: User;
  setUser: (user: User) => void;
};
type AccessTokenState = {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
};
type BaseURLState = {
  baseURL: string;
  setBaseURL: (baseURL: string) => void;
};
type ShouldFetchUserState = {
  shouldFetchUser: Boolean;
  setShouldFetchUser: (shouldFetchUser: Boolean) => void;
};

type OtpState = {
  otp: string | number;
  setOtp: (otp: string) => void;
};

type OpenModelState = {
  openModel: string | null;
  setOpenModel: (openModel: string | null) => void;
};

// stores

// `--> useOpenModelStore
export const useOpenModelStore = create<OpenModelState>((set) => ({
  openModel: null,
  setOpenModel: (openModel) => set({ openModel }),
}));
// `--> useIsLoggedInStore
export const useIsLoggedInStore = create<IsLoggedInState>((set) => ({
  isLoggedIn: null,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
}));
// `--> useUserStore
export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
// `--> useAccessTokenStore
export const useAccessTokenStore = create<AccessTokenState>((set) => ({
  accessToken: null,
  setAccessToken: (accessToken) => set({ accessToken }),
}));
// `--> useBaseURLStore
export const useBaseURLStore = create<BaseURLState>((set) => ({
  baseURL: "",
  setBaseURL: (baseURL) => set({ baseURL }),
}));
// `--> useShouldFetchUserStore
export const useShouldFetchUserStore = create<ShouldFetchUserState>((set) => ({
  shouldFetchUser: false,
  setShouldFetchUser: () =>
    set((state) => ({ shouldFetchUser: !state.shouldFetchUser })),
}));
// `--> useOtpStore
export const useOtpStore = create<OtpState>((set) => ({
  otp: "",
  setOtp: (otp) => set({ otp }),
}));
// `--> useProductStore
export const useProductStore = create<{
  // initialize
  initializeProduct: ProductProps;
  setInitializeProduct: (product: ProductProps) => void;
  // update
  isToUpdate: boolean;
  setIsToUpdate: (isToUpdate: boolean) => void;
  // data
  productData: ProductProps[];
  setProductData: (productData: ProductProps[]) => void;
  // id
  productId: string;
  setProductId: (productId: string) => void;
}>((set) => ({
  initializeProduct: productInitialState,
  setInitializeProduct: (initializeProduct) => set({ initializeProduct }),
  isToUpdate: false,
  setIsToUpdate: (isToUpdate: boolean) => set({ isToUpdate }),
  productData: [],
  setProductData: (productData) => set({ productData }),
  productId: "",
  setProductId: (productId) => set({ productId }),
}));
