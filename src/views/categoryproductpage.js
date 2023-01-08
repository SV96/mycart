import axios from "axios"
import React, { useEffect, useState } from "react"
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  CircularProgress,
  Box
} from "@mui/material"
import { useLocation, useHistory } from "react-router-dom"
import { connect } from "react-redux"

import { categoryProductSortUrl } from "../constants/cartConstants"
import { addToCart, editCart } from "../Redux/actions/action"

const CategoryProduct = ({ addToCart, storeCartData, editCart }) => {
  const [product, setProduct] = useState([])
  const location = useLocation()
  const history = useHistory()
  const [loader, setLoader] = useState(false)
  const [sort, setSort] = useState("")

  const fetchProduct = (categoryName) => {
    setLoader(true)
    const productUrl = categoryProductSortUrl(categoryName, sort)
    axios
      .get(productUrl)
      .then((res) => {
        if (res.status === 200) {
          setProduct(res.data)
          setLoader(false)
        }
      })
      .catch((err) => {
        setLoader(false)
      })
  }

  const handleAddToCart = (productData) => {
    const productDataExists = storeCartData.filter((res) => res.id === productData.id)
    const preStoredQuantity = (productDataExists[0]?.quantity || 0) + 1
    const preStoredprice = (productDataExists[0]?.price || 0) + productData.price

    const productDataAdd = {
      id: productData.id,
      cartId: new Date().getTime(),
      name: productData.title,
      pricePerQuantity: productData.price,
      quantity: preStoredQuantity,
      price: preStoredprice
    }
    const removeData = storeCartData.filter((res) => res.id !== productData.id) || {}

    const payload = [...removeData, productDataAdd]
    addToCart(payload)
  }
  const handleSort = () => {
    if (sort === "") {
      setSort("desc")
    } else {
      setSort("")
    }
    fetchProduct(location.state.product)
  }

  useEffect(() => {
    fetchProduct(location.state.product)
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Grid container spacing={2}>
        {loader ? (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {product.map((value) => {
              return (
                <Grid item xs={4}>
                  <Card sx={{ maxWidth: 345 }} key={value.id}>
                    <CardMedia sx={{ height: 140 }} image={value.image} title='green iguana' />
                    <CardContent>
                      <Typography gutterBottom variant='h5' component='div'>
                        {value.title}
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        Price : {value.price}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size='small' onClick={() => handleAddToCart(value)}>
                        Add to cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            })}
            <Button onClick={() => history.push("/mystore/cart")}>Go to Cart</Button>
            <Button onClick={() => handleSort()}>Sort {sort === "" ? "Descending" : "Ascending"}</Button>
          </>
        )}
      </Grid>
    </>
  )
}

function mapStateToProps(state) {
  return {
    storeCartData: state.cartReducer.cartData
  }
}
const mapDispatchToProps = {
  addToCart: addToCart,
  editCart: editCart
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryProduct)
