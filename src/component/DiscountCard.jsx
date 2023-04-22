import { useContext } from "react";
import { Link } from "react-router-dom"
import { toast } from "react-toastify";
import { Constant, Fetch, Locale, Util } from "../common"
// import EyeIcon from './icons/Eye'
import EyeIcon from '../component/icons/eye.png'
import Izbrannyy from '../component/icons/izbrannyy.png'
import { Context } from "../Context";
export default function Card(props) {
    const { state } = useContext(Context);
    const handleFavorite = () => {
        if (!Util.getCookie('username')) {
            setIsOpen({ toggle: true })
        }
        {
            Util.getCookie("username") && Fetch("set-user-favorite", { "method": "POST", body: { "discount_id": Number(props.discount_id) } }).then((res) => {
                if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
                toast.success(res.body)
            }).catch((err) => toast.error(err.message));
        }
    }
    return (
        <div className="d-card">
            <div>
                <img src={props.image} className='d-card_img' alt="IMG" />
                {props.wishlist === 'true' && <img onClick={() => handleFavorite()} className="post-wishlist" src={Izbrannyy} alt="" />}
                <div style={{ height: '100%' }}>
                    <Link to={Constant._discounts + props.discount_id} style={{ textDecoration: 'none', color: 'black' }}>
                        <h3>{props.title}</h3>
                        <div>
                            <span className="post-create_date">{Util.dateFormat(new Date(props.created_at), '%d-%m-%Y', true)}</span>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                                <img src={EyeIcon} style={{ marginRight: '5px' }} alt="" />
                                <span>{props.views}</span>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}