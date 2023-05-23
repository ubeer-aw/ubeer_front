import { Route, Routes } from 'react-router-dom'
import Home from '../home/Home'
import BreweryForm from '../brewery/brewery_form/BreweryForm'
import Brewery from '../brewery/Brewery'
import ProductForm from '../product/product_form/ProductForm'
import ProductCrud from '../product/ProductCrud'
import Product from '../product/Product'
import Profile from '../User/Profile/Profile'
import AuthRedirect from '../Auth/Redirect/Login/AuthRedirect'
import LogoutRedirect from '../Auth/Redirect/Logout/LogoutRedirect'


const Navigator = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      
      <Route path='/brasserie/:id' element={<Brewery />} />
      <Route path='/brasserie/:brewery/:product' element={<Product />} />

      <Route path='/gestion-brasserie/:id' element={<ProductCrud />} />

      <Route path='/ajouter-une-brasserie' element={<BreweryForm edit={false} />} />
      <Route path='/modifier-une-brasserie/:id' element={<BreweryForm edit={true} />} />

      <Route path='/ajouter-un-produit/:id' element={<ProductForm  edit={false} />} />
      <Route path='/modifier-un-produit/:id' element={<ProductForm edit={true} />} />

      <Route path='/profile' element={<Profile />} />

      <Route path='/auth_redirect' element={<AuthRedirect />} />
      <Route path='/logout_redirect' element={<LogoutRedirect />} />
    </Routes>
  )
}

export default Navigator