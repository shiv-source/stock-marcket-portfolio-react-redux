import * as ActionTypes from "../ActionTypes";

export const Stock = (
  state = {
    stock: [],
    isLoading : true,
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_STOCKS:
      return { ...state, isLoading: false ,stock: action.payload };

    default:
      return state;
  }
};
