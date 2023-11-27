import {
  SIGNUP,
  SIGNIN,
  LOGOUT,
  FETCH_USER,
  ADD_TO_SAVED,
  REMOVE_FROM_SAVED,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INCREMENT_QTE,
  DECREMENT_QTE,
  ADD_ORDER,
  DELETE_ACCOUNT,
} from "../constants";
const initialState = { user: null, isLoggedIn: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN:
    case SIGNUP:
      return { user: action.payload, isLoggedIn: true };

    case FETCH_USER:
      return { user: action.payload, isLoggedIn: true };

    case LOGOUT:
    case DELETE_ACCOUNT:
      return { user: null, isLoggedIn: false };

    case ADD_TO_SAVED:
    case REMOVE_FROM_SAVED: {
      const { user } = state;
      return { user: { ...user, saved: action.payload }, isLoggedIn: true };
    }

    case ADD_TO_CART:
    case REMOVE_FROM_CART:
    case INCREMENT_QTE:
    case DECREMENT_QTE: {
      const { user } = state;
      return { user: { ...user, cart: action.payload }, isLoggedIn: true };
    }

    case ADD_ORDER: {
      const { orders, cart } = action.payload;
      return { user: { ...state.user, orders, cart }, isLoggedIn: true };
    }

    default:
      return state;
  }
};

export default reducer;
