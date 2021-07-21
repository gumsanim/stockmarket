import { useState } from "react";
import BuyModal from "./BuyModal"
import SellModal from "./SellModal";
import DetailModal from "./DetailModal";

function CompanyList({companyData}){

    const [isBuyShow,setIsBuyShow] = useState(false);
    const [isSellShow,setIsSellShow] = useState(false);
    const [isDetailShow,setIsDetailShow] = useState(false);

    function onBuyClick(){
        setIsBuyShow(!isBuyShow);
    }

    function onSellClick(){
        setIsSellShow(!isSellShow);
    }

    function onDetailClick(){
        setIsDetailShow(!isDetailShow);
    }

    return (
        <>
            <tr className={companyData.fluctuation()>0?"isPlus":companyData.fluctuation()===0?"isZero":"isMinus"}>
                <td>{companyData.name}</td>
                <td>{companyData.price}</td>
                <td>{companyData.fluctuation()}</td>
                <td>{companyData.fluctuationRate().toFixed(2)+"%"}</td>
                <td>
                    <ul>
                        <li><button onClick={onBuyClick}>매수</button></li>
                        <li><button onClick={onSellClick}>매도</button></li>
                        <li><button onClick={onDetailClick}>상세보기</button></li>
                    </ul>
                </td>
            </tr>
            {    
                isBuyShow?
                 <BuyModal 
                    name={companyData.name} 
                    isBuyShow={isBuyShow} 
                    setIsBuyShow={setIsBuyShow} 
                    id={companyData.id}
                    price={companyData.price}
                 />
                 :null
            }
            {
                isSellShow?
                <SellModal 
                    name={companyData.name} 
                    isSellShow={isSellShow} 
                    setIsSellShow={setIsSellShow} 
                    id={companyData.id}
                    price={companyData.price}
                />
                :null 
            }
            {
                isDetailShow?
                <DetailModal 
                    name={companyData.name} 
                    isDetailShow={isDetailShow} 
                    setIsDetailShow={setIsDetailShow} 
                    id={companyData.id}
                    price={companyData.price}
                />
                :null
            }
        </>
    )
}


export default CompanyList;

