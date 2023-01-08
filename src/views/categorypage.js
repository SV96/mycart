import React, { useEffect, useState } from "react"
import axios from "axios"
import { Card, CardActions, CardContent, Button, Typography, CircularProgress, Box } from "@mui/material"
import { useHistory } from "react-router-dom"

import { categoryUrl } from "../constants/cartConstants"

const Category = () => {
  const [allCategories, setAllCategories] = useState([])
  const [loader, setLoader] = useState(false)

  const history = useHistory()

  const fetchCategories = () => {
    setLoader(true)
    axios
      .get(categoryUrl)
      .then((res) => {
        if (res.status === 200) {
          setAllCategories(res.data)
        }
        setLoader(false)
      })
      .catch((err) => {
        setAllCategories("An error occured while fetching product")
        setLoader(false)
      })
  }

  const handleRedirectToProduct = (product) => {
    history.push({
      pathname: `/mystore/product/${product}`,
      state: { product: product }
    })
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <>
      {loader ? (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {allCategories?.map((value, index) => {
            return (
              <Card sx={{ minWidth: 75 }} key={index} className='productCard'>
                <CardContent>
                  <Typography variant='h5' component='div'>
                    {value}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size='small'
                    onClick={() => handleRedirectToProduct(value)}
                  >{`Click on this to buy ${value}`}</Button>
                </CardActions>
              </Card>
            )
          })}
        </>
      )}
    </>
  )
}

export default Category
