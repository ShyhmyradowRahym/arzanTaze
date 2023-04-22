import { Constant, Fetch, Locale, Tool, Util } from "../../common";
import { useEffect, useState } from "react";
import { useAppContext } from "../../Context"
import Loader from '../../component/Loader'
import EyeIcon from '../../component/icons/eye.png'
import Heart from '../../component/icons/heart.png'
import Chat from '../../component/icons/chat.png'
import AddUser from '../../component/icons/add-user.png'
import starIcon from '../../component/icons/starIcon.svg'
import '../Home/style.css'
import './index.css'

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
export default function Notifications() {

    const { state } = useAppContext(),
        [data, setData] = useState({ total: [], discounts: [], loading: true })
    const [type, setType] = useState('main')
    const navigate = useNavigate()
    useEffect(() => {
        if (!Util.getCookie("token")) { navigate('/') }
    }, [Util.getCookie('username')])
    useEffect(function () {
        Fetch("get-r-discounts", { qs: { page: '1', per_page: '20' } }).then(res => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message))
            res.body.loading = false
            setData(res.body)
        }).catch(err => toast.error(err.message))
    }, [state.lang])
    console.log(data);
    if (data.loading) {
        return <Loader />
    }
    return (
        <div style={{ maxWidth: "100vw", overflow: "hidden", marginBottom: 20 }} className="home-items">
            <div className="constant-page">
                <center>
                    <div className="mp_head1" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div
                            onClick={() => setType('main')}
                            style={type === "main" ? { 'background': '#3BC624' } : { 'backgroundColor': '#F6F6F6', color: '#625F5F' }}>
                            {Locale[state.lang].MainNot}<span>(+11)</span>
                        </div>
                        <div
                            onClick={() => setType('main1')}
                            style={type === "main1" ? { 'background': '#3BC624' } : { 'backgroundColor': '#F6F6F6', color: '#625F5F' }}>
                            {Locale[state.lang].PersonalNot}<span>(+12)</span>
                        </div>
                    </div>
                </center>
                <div style={{ marginTop: '20px' }}>
                    {type === 'main' ? <div className="discount-list_not">
                        {data.discounts &&
                            data.discounts.map((e, k) => (
                                <Link to={Constant._notification + e.rd_id} key={k}>
                                    <div className="discount-list_not-cart">
                                        <img className='discount-list_not-cart_img' src={e.image} />
                                        <div className="discount-list1-cart_body">
                                            <p className="discount-list_not-cart_title">{e.title}</p>
                                            <p className="discount-list_not-cart_content" dangerouslySetInnerHTML={{ __html: e.content }}></p>
                                            <div className="discount-list_not-cart_footer">
                                                <p className="discount-list1-cart_footer-date">{Util.dateFormat(new Date(e.created_at), '%d-%m-%Y', true)}</p>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src={EyeIcon} style={{ marginRight: '5px' }} />
                                                    <p> {e.views}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div> :
                        <div className="" style={{ width: '100%' }}>
                            <div className="card1">
                                <div>
                                    <div className="card1_img">
                                        <img src={Heart} alt="" />
                                    </div>
                                    <span style={{ textAlign: 'center' }}>Лайки</span>
                                    <span className="card1_view">139</span>
                                </div>
                                <div>
                                    <div className="card1_img">
                                        <img src={Chat} alt="" />
                                    </div>
                                    <span style={{ textAlign: 'center' }}>Комментарии</span>
                                    <span className="card1_view">139</span>
                                </div>
                                <div>
                                    <div className="card1_img">
                                        <img src={starIcon} alt="" />
                                    </div>
                                    <span style={{ textAlign: 'center' }}>Заработанные баллы</span>
                                    <span className="card1_view">139</span>
                                </div>
                                <div>
                                    <div className="card1_img">
                                        <img src={AddUser} alt="" />
                                    </div>
                                    <span style={{ textAlign: 'center' }}>Подписчики</span>
                                    <span className="card1_view">139</span>
                                </div>
                                <div style={{ display: 'inline-flex' }}>
                                    <Link to={Constant._OffAccAction} className="card1_link">Посмотреть все </Link>
                                </div>
                                <span className="card1_date">26.11.2022</span>
                            </div>
                            <div className="card1" style={{ marginTop: '10px' }}>
                                <span>В магазине женской одежды расспродажа покупая одну футболку еще одну получаете безплатно спешите распродажа ограничена супер акция действует неделю ограничена супер
                                    акция действует неделю распродажа   ограничена супер акция действует неделю ограничена супер расспродажа покупая одну футболку еще одну получаете безплатно спешите распродажа ограничена </span>
                                <span className="card1_date">26.11.2022</span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}