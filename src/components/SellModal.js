import {connect} from "react-redux";
import {useState} from "react";

function SellModal(props){

    const [price,setPrice] = useState(props.price);

    function onSell(){

        let index = props.userData.stock.findIndex((elem)=>{
            return elem.id === props.id;
        })

        if(index === -1){
            props.setIsSellShow(!props.isSellShow);  
           return alert("해당 주식을 보유하고 있지 않습니다.");
        } 

        props.dispatch({type:"sell",payload:{
        name: props.name,
        id:props.id,
        price:price
        }})
        props.setIsSellShow(!props.isSellShow);   
    }
    

    return (
        <div className="sellBackground">
            <div className="sellModal">
                <div><h1>{props.name} 매도 주문표</h1></div>
                <div>금액:{price}</div>
                <div>수량:1</div>
                <div>
                    <button onClick={
                      onSell
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

export default connect(stateIntoProps)(SellModal)