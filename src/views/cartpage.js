import React from "react"
import { Card, CardContent, Typography, Button } from "@mui/material"
import { connect } from "react-redux"

import { addToCart } from "../Redux/actions/action"

const Cart = ({ storeCartData, addToCart }) => {
  const handleAddToCart = (productData) => {
    const productDataExists = storeCartData.filter((res) => res.id === productData.id)
    const preStoredQuantity = (productDataExists[0]?.quantity || 0) + 1
    const preStoredprice = (productDataExists[0]?.price || 0) + productData.price

    const productDataAdd = {
      id: productData.id,
      cartId: new Date().getTime(),
      name: productData.name,
      pricePerQuantity: productData.pricePerQuantity,
      quantity: preStoredQuantity,
      price: preStoredprice
    }
    const removeData = storeCartData.filter((res) => res.id !== productData.id) || {}

    const payload = [...removeData, productDataAdd]
    addToCart(payload)
  }

  return (
    <>
      {storeCartData.length > 0 ? (
        storeCartData?.map((value, index) => {
          return (
            <Card sx={{ minWidth: 75 }} key={index} className='productCard'>
              <CardContent>
                <Typography variant='h5' component='div'>
                  Product name : {value.name}
                </Typography>
                <Typography variant='h5' component='div'>
                  quantity: {value.quantity}{" "}
                  <Button size='small' onClick={() => handleAddToCart(value)}>
                    +
                  </Button>
                </Typography>
                <Typography variant='h5' component='div'>
                  price per quantity: {value.pricePerQuantity}
                </Typography>
                <Typography variant='h5' component='div'>
                  price: {value.price}
                </Typography>
              </CardContent>
            </Card>
          )
        })
      ) : (
        <Typography variant='h5' component='div'>
          You cart is empty
        </Typography>
      )}
    </>
  )
}

function mapStateToProps(state) {
  return {
    storeCartData: state.cartReducer.cartData
  }
}
const mapDispatchToProps = {
  addToCart: addToCart
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
