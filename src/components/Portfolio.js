import { connect } from "react-redux"
import {useState,useEffect} from "react";



function Portfolio(props){


    useEffect(()=>{

        let eachCompanyprice = props.companyData.map((elem)=>{
            return elem.price;
        })




        
    })


    return (
        <>
            <h1 className="myasset">{props.userData.name}님의 자산</h1>
            <div className="myasset-status">
                <div className="possessedStock">
                    <div>보유주식:</div> 
                    {
                        props.userData.stock.map((elem,idx)=>{
                            return <div key={idx}>{elem.name}</div>
                        })
                    }
                </div>
                <div>보유현금: {props.userData.cash}원</div>
                <div>보유자산(현금+주식): </div>
                <div>손익금액:원</div>
                <div>손익률:%</div>
            </div>
            <div className="myasset-illustration">
                <div>수익률 막대그래프</div>
                <div>수익률 꺾은선그래프</div>
                <div>보유종목 포트폴리오</div>
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