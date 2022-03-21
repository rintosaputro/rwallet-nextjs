const topupState = {
  isLoading: false,
  isError: false,
  results: {},
  message: null
}

export const topUp = (state = topupState, action) => {
  switch (action.type) {
    case 'TOPUP_PENDING': {
      state.isError = false;
      state.results = {};
      state.message = null;
      state.isLoading = true;
      return { ...state };
    }
    case 'TOPUP_FULFILLED': {
      const { data } = action.payload;
      state.isError = false;
      state.isLoading = false;
      state.results = data.results;
      state.message = data.message;
      return { ...state };
    }
    case 'TOPUP_REJECTED': {
      const { message } = action.payload.response.data;
      state.isError = true;
      state.isLoading = false;
      state.results = {};
      state.message = message;
      return { ...state };
    }
    default: {
      return { ...state };
    }
  }
}