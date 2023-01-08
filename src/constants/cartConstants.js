export const productBaseUrl = process.env.REACT_APP_PRODUCT_URL
export const loginUrl = `${productBaseUrl}auth/login`
export const categoryUrl = `${productBaseUrl}products/categories`

export const categoryProductUrl = (categoryName) => {
  return `${productBaseUrl}products/category/${categoryName}`
}

export const categoryProductSortUrl = (categoryName, sortWay) => {
  if (sortWay === "desc") {
    return `${productBaseUrl}products/category/${categoryName}?sort=desc`
  } else {
    return `${productBaseUrl}products/category/${categoryName}`
  }
}
