import { Route, Routes } from 'react-router-dom'
import Home from '../home/Home'
import BreweryForm from '../brewery/brewery_form/BreweryForm'

const Navigator = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/ajouter-une-brasserie' element={<BreweryForm />} />
    </Routes>
  )
}

export default Navigator