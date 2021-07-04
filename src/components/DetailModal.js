import {connect} from "react-redux";
import {useState, useEffect} from "react";

function DetailModal(props){

    const [number,setNumber] = useState(0);
    const [profit, setProfit] = useState(0);
    const [profitRate, setProfitRate] = useState(0);

    useEffect(()=>{
        
        let quantity;

        props.userData.stock.forEach((elem)=>{
            if(elem.id===props.id){
                quantity = elem.quantity;
            }
        })

        let userPrice;
        
        props.userData.stock.forEach((elem)=>{
            if(elem.id===props.id){
                userPrice = elem.averagePrice()*elem.quantity;
            }
        })

        let companyPrice;

        props.companyData.forEach((elem)=>{
            if(elem.id===props.id){
                companyPrice = elem.price * quantity;
            }
        })
        setNumber(quantity);
        setProfit(companyPrice-userPrice);
        setProfitRate((((companyPrice-userPrice)/userPrice)*100).toFixed(2));
        
    })



    return (
        <div className="detailBackground">
            <div className="detailModal">
                <div><h1>{props.name} 상세표</h1></div>
                <div>수량:{number}개</div>
                <div>수익:{profit}원</div>
                <div>수익률:{profitRate}%</div>
                <div>
                    <button 
                        onClick={()=>{props.setIsDetailShow(!props.isDetailShow)}}
                    >확인</button>
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

export default connect(stateIntoProps)(DetailModal)