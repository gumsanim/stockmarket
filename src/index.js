import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import { createStore, combineReducers } from 'redux';

const initialCompanyData = [
    {
      id: 1,
      name:"삼성후자",
      originalPrice:80000,
      price:80000,
      fluctuation(){
        return this.price-this.originalPrice;
      },
      fluctuationRate(){
        if(this.price>this.originalPrice){
          return ((this.price-this.originalPrice)/this.originalPrice) * 100;
        } else if(this.price===this.originalPrice){
          return 0;
        } else {
          return (((this.price-this.originalPrice)/this.originalPrice) * 100)  
        }
      },
    }, 
    {
        id: 2,
        name:"코코아",
        originalPrice:150000,
        price:150000,
        fluctuation(){
          return this.price-this.originalPrice;
        },
        fluctuationRate(){
          if(this.price>this.originalPrice){
            return ((this.price-this.originalPrice)/this.originalPrice) * 100;
          } else if(this.price===this.originalPrice){
            return 0;
          } else {
            return (((this.price-this.originalPrice)/this.originalPrice) * 100)  
          }
        },
    },
    {
        id: 3,
        name:"LG후자",
        originalPrice:170000,
        price: 170000,
        fluctuation(){
          return this.price-this.originalPrice;
        },
        fluctuationRate(){
          if(this.price>this.originalPrice){
            return ((this.price-this.originalPrice)/this.originalPrice) * 100;
          } else if(this.price===this.originalPrice){
            return 0;
          } else {
            return (((this.price-this.originalPrice)/this.originalPrice) * 100)  
          }
        },
    },
    {
        id: 4,
        name:"근대자동차",
        originalPrice:200000,
        price: 200000,
        fluctuation(){
          return this.price-this.originalPrice;
        },
        fluctuationRate(){
          if(this.price>this.originalPrice){
            return ((this.price-this.originalPrice)/this.originalPrice) * 100;
          } else if(this.price===this.originalPrice){
            return 0;
          } else {
            return (((this.price-this.originalPrice)/this.originalPrice) * 100)  
          }
        },
    },
    {
        id: 5,
        name:"재호컴퍼니",
        originalPrice:300000,
        price:300000,
        fluctuation(){
          return this.price-this.originalPrice;
        },
        fluctuationRate(){
          if(this.price>this.originalPrice){
            return ((this.price-this.originalPrice)/this.originalPrice) * 100;
          } else if(this.price===this.originalPrice){
            return 0;
          } else {
            return (((this.price-this.originalPrice)/this.originalPrice) * 100)  
          }
        },
    },
    {
      id: 6,
      name:"SK바이닉스",
      originalPrice:400000,
      price:400000,
      fluctuation(){
        return this.price-this.originalPrice;
      },
      fluctuationRate(){
        if(this.price>this.originalPrice){
          return ((this.price-this.originalPrice)/this.originalPrice) * 100;
        } else if(this.price===this.originalPrice){
          return 0;
        } else {
          return (((this.price-this.originalPrice)/this.originalPrice) * 100)  
        }
      },
    },
    {
      id: 7,
      name:"아내일퍼시픽",
      originalPrice:400000,
      price:400000,
      fluctuation(){
        return this.price-this.originalPrice;
      },
      fluctuationRate(){
        if(this.price>this.originalPrice){
          return ((this.price-this.originalPrice)/this.originalPrice) * 100;
        } else if(this.price===this.originalPrice){
          return 0;
        } else {
          return (((this.price-this.originalPrice)/this.originalPrice) * 100)  
        }
      },
    },
    {
      id: 8,
      name:"셀트리오프",
      originalPrice:100000,
      price:100000,
      fluctuation(){
        return this.price-this.originalPrice;
      },
      fluctuationRate(){
        if(this.price>this.originalPrice){
          return ((this.price-this.originalPrice)/this.originalPrice) * 100;
        } else if(this.price===this.originalPrice){
          return 0;
        } else {
          return (((this.price-this.originalPrice)/this.originalPrice) * 100)  
        }
      },
    },
    {
      id: 9,
      name:"바이브",
      originalPrice:70000,
      price:70000,
      fluctuation(){
        return this.price-this.originalPrice;
      },
      fluctuationRate(){
        if(this.price>this.originalPrice){
          return ((this.price-this.originalPrice)/this.originalPrice) * 100;
        } else if(this.price===this.originalPrice){
          return 0;
        } else {
          return (((this.price-this.originalPrice)/this.originalPrice) * 100)  
        }
      },
    }
]

function companyReducer(state=initialCompanyData,action){
  if(action.type==="fluctuation"){
    let copy = [];
    let upOrDown = [...action.payload];
    console.log(upOrDown);
    state.forEach((elem,idx)=>{
      if(upOrDown[idx]===1){
        copy = [...state];
        copy[idx].price+=500;
      } else {
        copy = [...state];
        copy[idx].price-=500;
      }
    })
    return copy;
  } else {
    return state;
  }
}

const initialUserData = {
  name:"재호",
  cash: 100000000,
  stock: [
    {
      id:1,
      name:"삼성후자",
      price:80000,
      quantity:1,
      totalPrice(){
        return this.price*this.quantity
      }
    }
  ]
}

function userReducer(state=initialUserData, action){
  if(action.type==="buy"){
    let copy = {...state}
    copy.cash-=action.payload.price;
    let index = copy.stock.findIndex((elem)=>{
      return elem.id === action.payload.id;
    })
    if(index!==-1){
      copy.stock[index].quantity++;
      copy.stock[index].price+=action.payload.price;
    } else {
      copy.stock.push({
        id: action.payload.id,
        name:action.payload.name,
        quantity: 1,
        price: action.payload.price,
        totalPrice(){
          return this.price*this.quantity
        }
      })
    }
    console.log(copy);
    return copy;
  } else if(action.type==="sell"){
    let copy = {...state};
    let index = copy.stock.findIndex((elem)=>{
      return elem.id===action.payload.id;
    })
    if(index!==-1){
      if(copy.stock[index].quantity===0){
          return;
      } else {
        copy.cash+=action.payload.price;
        copy.stock[index].quantity--;
        copy.stock[index].price-=action.payload.price;
        if(copy.stock[index].quantity===0){
          copy.stock.splice(index,1);
        }
      }
    } else {
      return;
    }
    console.log(copy);
    return copy;
  }
  return state;
}

let store = createStore(combineReducers({companyReducer,userReducer}));

ReactDOM.render(

  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
