import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"

import Login from "../views/loginpage"
import Category from "../views/categorypage"
import CategoryProduct from "../views/categoryproductpage"
import Cart from "../views/cartpage"
import PrivateRoute from "./PrivateRoute"
import HeaderFooter from "../components/headerfooter"

let allPrivateRoutes = [
  { path: "/mystore/category", component: Category, exact: false },
  { path: "/mystore/product/:name", component: CategoryProduct, exact: false },
  { path: "/mystore/cart", component: Cart, exact: false }
]

const AppRouter = () => {
  useEffect(() => {
    document.body.style.background = "#e6e6e6"
  }, [])

  return (
    <>
      <div>
        <HeaderFooter>
          <Router>
            <Switch>
              <Container maxWidth='xl'>
                <Box sx={{ bgcolor: "#cfe8fc", height: "100%" }}>
                  <Route exact={true} path='/mystore/login'>
                    <Login />
                  </Route>
                  {allPrivateRoutes.map((value, index) => {
                    return (
                      <PrivateRoute exact={value.exact} path={value.path} component={value.component} key={index} />
                    )
                  })}
                </Box>
              </Container>
            </Switch>
          </Router>
        </HeaderFooter>
      </div>
    </>
  )
}

export default AppRouter
