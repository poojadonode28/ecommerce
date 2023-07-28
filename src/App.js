import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './components/Components/Home';
import Login from './components/Components/Login';
import Signup from './components/Components/Signup';


import Cart from './components/Components/Cart';
import UserProfile from './components/Components/UserProfile';
import AllProductPage from './components/Components/AllProductPage';



import PgFOF from './components/Components/PgFOF';
import AddProduct from './components/Components/AddProduct';
import SpecificProductPage from './components/Components/SpecificProductPage';



function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/home" element={<Home/>}></Route>
        <Route exact path="/signup" element={<Signup/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/cartdata" element={<Cart/>}></Route>
        <Route exact path="/userprofile" element={<UserProfile/>}></Route>
        <Route exact path="/sellproduct" element={<AddProduct/>}></Route>
        <Route exact path="/product-type/Shirts" element={<AllProductPage   type={'Shirts'}/>}></Route>
        <Route exact path="/product-type/saree" element={<AllProductPage   type={'Sarees'}/>}></Route>
        <Route exact path="/product-type/dresses" element={<AllProductPage   type={'Dresses'}/>}></Route>
        <Route exact path="/product-type/mobiles" element={<AllProductPage   type={'Mobile'}/>}></Route>
        <Route path="/product/:producttype/:id" element={<SpecificProductPage/>}></Route>
        
        
        <Route exact path="*" element={<PgFOF/>}></Route>

      </Routes>
   </BrowserRouter>
  );
}

export default App;
