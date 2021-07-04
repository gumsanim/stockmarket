import {connect} from "react-redux";
import {useState} from "react";

function BuyModal(props){

    const [price,setprice]= useState(props.price)

    function onBuy(){
        props.dispatch({type:"buy",payload:{
            name: props.name,
            id:props.id,
            price:price
        }})
        props.setIsBuyShow(!props.isBuyShow);
    }

    return (
        <div className="buyBackground">
            <div className="buyModal">
                <div><h1>{props.name} 매수 주문표</h1></div>
                <div>금액:{price}</div>
                <div>수량:1</div>
                <div>
                    <button onClick={
                        onBuy
                    }>확인</button>
                </div>
            </div>
        </div>
    )
}

function stateIntoProps(state){
    return {
        userData:state.userReducer,
        companyData:state.companyReducer
    }
}

export default connect(stateIntoProps)(BuyModal)