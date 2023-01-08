import { ADD_TO_CART, EDIT_CART } from "../../constants/reduxConstants"

export const addToCart = (payload) => {
  return {
    type: ADD_TO_CART,
    payload: payload
  }
}

export const editCart = (payload) => {
  return {
    type: EDIT_CART,
    payload: payload
  }
}
