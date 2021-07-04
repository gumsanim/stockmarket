import {connect} from "react-redux";

function DetailModal({name, isDetailShow, setIsDetailShow}){
    return (
        <div className="detailBackground">
            <div className="detailModal">
                <div><h1>{name} 상세표</h1></div>
                <div>금액:<input placeholder="금액을 입력하세요"/></div>
                <div>수량:<input placeholder="수량을 입력하세요"/></div>
                <div>
                    <button>확인</button>
                    <button 
                        onClick={()=>{setIsDetailShow(!isDetailShow)}}
                    >취소</button>
                </div>
            </div>
        </div>
    )
}

function stateIntoProps(state){
    return {
        data:state.userReducer
    }
}

export default connect(stateIntoProps)(DetailModal)