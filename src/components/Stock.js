import {useEffect} from "react";
import {connect} from "react-redux";
import CompanyList from "./CompanyList";
import TableHead from "./TableHead";

function Stock(props){

    useEffect(()=>{
        let priceChanger = setInterval(()=>{
            let upOrDown = [];
            props.companyData.forEach(()=>{
                upOrDown.push(Math.floor(Math.random()*2));
            })
            props.dispatch({type:"fluctuation",payload:upOrDown});
        },3000)
        return ()=>{
            clearInterval(priceChanger);
        }
    },[])

    return (
        <>
            <div className="table-container">
                <table>
                    <TableHead/>
                    <tbody>
                        {
                            props.companyData.map((elem,idx)=>{
                                return ( 
                                    <CompanyList 
                                        key={idx}
                                        companyData={elem}
                                        userData={props.userData}
                                    />
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

function stateIntoProps(state){
    return {
        userData: state.userData,
        companyData: state.companyReducer
    }
}

export default connect(stateIntoProps)(Stock)
