import { ADD_TO_CART, EDIT_CART } from "../../constants/reduxConstants"

const initialTodos = {
  cartData: []
}

const cartReducer = (state = initialTodos, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_TO_CART:
      return { ...state, cartData: payload }
    case EDIT_CART:
      const newCartData = state?.cartData.filter((res) => res.cartId !== payload)
      return { ...state, cartData: newCartData }
    default:
      return state
  }
}

export default cartReducer
