import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LogintScreen from './screens/LoginScreen'
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom'


function App() {
  return (
    <Router>
    <Header />
      
        <main className = "py-3">
          <Container>
            <Routes>
              <Route exact path="/" element ={ <HomeScreen/>}/>
              <Route exact path="/login" element ={ <LogintScreen/>}/>
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
