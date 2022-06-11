import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom'
import UserListScreen from './screens/UserListScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'



function App() {
  return (
    <Router>
    <Header />
      
        <main className = "py-3">
          <Container>
            <Routes>
              <Route exact path="/" element ={ <HomeScreen/>}/>
              <Route exact path="/login" element ={ <LoginScreen/>}/>
              <Route exact path="/users" element ={ <UserListScreen/>}/>
              <Route exact path="/products" element ={ <ProductListScreen/>}/>
              <Route exact path="/register" element ={ <RegisterScreen/>}/>
              <Route exact path="/profile" element ={ <ProfileScreen/>}/>
              <Route exact path="/payment" element ={ <PaymentScreen/>}/>
              <Route exact path="/placeorder" element ={ <PlaceOrderScreen/>}/>
              <Route exact path="/orders/:id" element ={ <OrderScreen/>}/>
              <Route exact path="/productlist" element ={ <ProductListScreen/>}/>
              <Route exact path="/admin/product/:id/edit" element ={ <ProductEditScreen/>}/>
              <Route path="/product/:id" element ={ <ProductScreen/>}/>
              <Route path="/cart/">
                <Route path=":id" element ={ <CartScreen/>}/>
                <Route path="" element ={ <CartScreen/>}/>
              </Route>
            </Routes>
          </Container>
        </main>
        
    </Router>
    
  );
}


export default App;
