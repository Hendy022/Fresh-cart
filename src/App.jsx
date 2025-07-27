import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Products from './Components/Products/Products.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Brands from './Components/Brands/Brands.jsx'
import Categories from './Components/Categories/Categories.jsx'
import Register from './Components/Register/Register.jsx'
import Login from './Components/Login/Login.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import UserContextProvider from './context/UserContext.jsx'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import CartContextProvider from './context/CartContext.jsx'
import { Toaster } from 'react-hot-toast'
import CheckOut from './Components/CheckOut/CheckOut';
import AllOrders from './Components/AllOrders/AllOrders';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import ForgotPassword from './Components/Login/ForgotPassword';
import ResetPassword from './Components/Login/ResetPassword';
import Profile from './Components/Profile/Profile';
import Wishlist from './Components/Wishlist/Wishlist';
import ManageAddresses from './Components/Addresses/ManageAddresses';
import ProductsByCategory from './Components/Products/ProductsByCategory';
import ProductsByBrand from './Components/Products/ProductsByBrand';
import OrderDetails from './Components/AllOrders/OrderDetails';
import VerifyResetCode from './Components/Login/VerifyResetCode';

const routers = createBrowserRouter([{
  path: '', element: <Layout />, children: [
    { path: 'register', element: <Register /> },
    { path: 'login', element: <Login /> },
    { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
    { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
    { path: 'cart', element: <ProtectedRoute> <Cart /> </ProtectedRoute> },
    { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
    { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
    { path: 'checkout', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
    { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
    { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
    { path: 'forgot-password', element: <ForgotPassword /> },
    { path: 'reset-password', element: <ResetPassword /> },
    { path: 'profile', element: <Profile /> },
    { path: 'wishlist', element: <Wishlist /> },
    { path: 'addresses', element: <ManageAddresses /> },
    { path: 'products/category/:categoryId', element: <ProductsByCategory /> },
    { path: 'products/brand/:brandId', element: <ProductsByBrand /> },
    { path: 'orders/:orderId', element: <OrderDetails /> },
    { path: 'verify-reset-code', element: <VerifyResetCode /> },
    { path: '*', element: <NotFound /> },
  ]
}])

const query = new QueryClient()

function App() {

  return (
    <>
      <Provider store={store}>

        <QueryClientProvider client={query} >
          <CartContextProvider>

            <UserContextProvider>
              <RouterProvider router={routers}></RouterProvider>
              <ReactQueryDevtools />
              <Toaster />
            </UserContextProvider>
          </CartContextProvider>

        </QueryClientProvider>
      </Provider>
    </>
  )
}

export default App
