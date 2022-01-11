import { createStore , combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers,productDetailsReducers } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { orderCreateReducer } from './reducers/orderReducers'
import { userLoginReducers,userRegisterReducers,userDetailsReducers,userUpdateProfileReducers, } from './reducers/userReducers'


const reducer  = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    cart: cartReducer,
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails:userDetailsReducers,
    userUpdateProfile:userUpdateProfileReducers,
    orderCreate: orderCreateReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const initalState = {
    cart:{ cartItems : cartItemsFromStorage},
    userLogin: {userInfo:userInfoFromStorage}
}

const middleware= [thunk]

const store = createStore(reducer,initalState,composeWithDevTools(applyMiddleware(...middleware)))

export default store
