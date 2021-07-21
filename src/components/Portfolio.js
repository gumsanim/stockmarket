import { connect } from "react-redux"
import {useState,useEffect} from "react";

function Portfolio(props){

    const [totalReturn, setTotalReturn] = useState(null);
    const [totalReturnRate, setTotalReturnRate] = useState(null);
    const [totalAsset, setTotalAsset] = useState(null);
    const [stock,setStock] = useState(null);
    const [cash,setCash] = useState(null);

    useEffect(()=>{

        let idArr = props.userData.stock.map((elem)=>{
           return elem.id;
        })

        let companyArr = [];

        idArr.forEach((idElem)=>{
            props.companyData.forEach((companyElem)=>{
                if(idElem===companyElem.id){
                    companyArr.push(companyElem);
                }
            })
        })

        let userSum = 0;
        props.userData.stock.forEach((elem)=>{
            userSum+=(elem.averagePrice()*elem.quantity)
        })

        let companySum = 0;
        props.userData.stock.forEach((elem)=>{
            companyArr.forEach((companyElem)=>{
                if(elem.id===companyElem.id){
                    companySum+=(companyElem.price*elem.quantity);
                }
            })
        })

        setStock(companySum);
        setTotalReturn(companySum-userSum);

        let rawReturnRate = ((companySum-userSum)/userSum)*100;
        setTotalReturnRate(rawReturnRate.toFixed(2));

        let userCash = props.userData.cash;
        setCash(userCash);

        setTotalAsset(companySum+cash);
    })

    return (
        <>
            <h1 className="myasset">{props.userData.name}님의 자산</h1>
            <div className="myasset-status">
                <div className="possessedStock">
                    <div>보유주식명:</div> 
                    {
                        props.userData.stock.map((elem,idx)=>{
                            return <div key={idx}>{elem.name}</div>
                        })
                    }
                </div>
                <div>보유현금: {props.userData.cash}원</div>
                <div>보유주식가치: {stock}원</div>
                <div>보유자산(현금+주식): {totalAsset}원</div>
                <div 
                    className={totalReturn>0?"isPlus":totalReturn<0?"isMinus":"isZero"}
                >손익금액: {isNaN(totalReturn)?0:totalReturn}원
                </div>
                <div 
                    className={totalReturnRate>0?"isPlus":totalReturnRate<0?"isMinus":"isZero"}
                >손익률: {isNaN(totalReturnRate)?0:totalReturnRate}%
                </div>
            </div>
        </>
    )
}

function stateIntoProps(state){
    return {
        userData:state.userReducer,
        companyData: state.companyReducer
    }
}

export default connect(stateIntoProps)(Portfolio)