import { Route, Routes } from 'react-router-dom'
import Home from '../home/Home'
import BreweryForm from '../brewery/brewery_form/BreweryForm'
import Brewery from '../brewery/Brewery'
import ProductForm from '../product/product_form/ProductForm'
import ProductCrud from '../product/ProductCrud'


const Navigator = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/ajouter-une-brasserie' element={<BreweryForm />} />
      <Route path='/brasserie/:id' element={<Brewery />} />
      <Route path='/gestion-brasserie/:id' element={<ProductCrud />} />
      <Route path='/ajouter-un-produit/:id' element={<ProductForm />} />
    </Routes>
  )
}

export default Navigator