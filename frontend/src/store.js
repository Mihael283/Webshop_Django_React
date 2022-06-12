import { createStore , combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducers,productDetailsReducers,productDeleteReducer, productCreateReducer ,productUpdateReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { orderCreateReducer, orderDeliverReducer, orderDetailsReducer, orderListMyReducer, orderListReducer, orderPayReducer} from './reducers/orderReducers'
import { userLoginReducers,userRegisterReducers,userDetailsReducers,userUpdateProfileReducers,userListReducer,userDeleteReducer} from './reducers/userReducers'


const reducer  = combineReducers({
    productList: productListReducers,
    productDetails: productDetailsReducers,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate:productUpdateReducer,

    cart: cartReducer,
    
    userLogin: userLoginReducers,
    userRegister: userRegisterReducers,
    userDetails:userDetailsReducers,
    userUpdateProfile:userUpdateProfileReducers,
    userList : userListReducer,
    userDelete : userDeleteReducer,

    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
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
