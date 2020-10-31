import * as ActionTypes from "../ActionTypes";

export const Stock = (
  state = {
    stock: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_STOCKS:
      return { ...state, stock: action.payload };

    default:
      return state;
  }
};
