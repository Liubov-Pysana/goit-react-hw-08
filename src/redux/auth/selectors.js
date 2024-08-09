export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => state.auth.user;

export const selectIsRefreshing = (state) => state.auth.IsRefreshing;

export const selectError = (state) => state.auth.error;
export const selectIsLoading = (state) => state.auth.isLoading;
