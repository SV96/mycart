import React from "react"
import "./style.css"
import { useHistory } from "react-router-dom"

/* eslint-disable */
const HeaderFooter = ({ children }) => {
  const history = useHistory()
  return (
    <div>
      <header className='site-header'>
        <div className='site-identity'>
          <h1>
            <a>My Store</a>
          </h1>
        </div>
        <nav className='site-navigation'>
          <ul className='nav'>
            <li>
              <a onClick={()=>history.push('/mystore/category')}>Category</a>
            </li>
            <li>
              <a onClick={()=>history.push('/mystore/cart')}>Cart</a>
            </li>
          </ul>
        </nav>
      </header>
      <div>{children}</div>
      <footer>
        <div>
          <p>
            This website copyright notice and disclaimer can be used by any website or blog or ecommerce store. All
            websites can use this to indicate to readers and users of their website the legal conditions that restrict
            the use of information and any other sensitive data or details displayed on the website.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default HeaderFooter
