import { Link } from "react-router-dom";
import { Constant, Util } from "../common";
import EyeIcon from '../component/icons/eye.png'
export default function Card(props){
    return (
        // <Link to={Constant._recommendedDiscounts + props.rd_id} className="rd-card">
        //     <img src={props.image} style={{width:props.width}} alt="rd"/>
        // </Link>
        <div className="d-card">
            <div>
                <img src={props.image} className='d-card_img' alt="IMG" />
                <div>
                    <Link to={Constant._recommendedDiscounts + props.rd_id} style={{textDecoration:'none', color:'black'}}>
                        <h3>{props.title}</h3>
                        <div>
                            <p>{Util.dateFormat(new Date(props.created_at), '%d-%m-%Y', true)}</p>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent:"center" }}>
                                <img src={EyeIcon} style={{marginRight:'5px'}} alt="" />
                                <p> {props.views}</p>
                            </div>
                        </div> 
                    </Link>
                </div>
            </div>
        </div>
    )
}