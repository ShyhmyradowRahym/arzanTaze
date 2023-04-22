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
export default function Comments() {

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
    if (data.loading) {
        return <Loader />
    }
    return (
        <div style={{ maxWidth: "100vw", overflow: "hidden", marginBottom: 20 }} className="home-items">
            <div className="constant-page">
                <center>
                    <span className="title" style={{ fontWeight: '700' }}>Комментарии 45/20</span>
                </center>
                <div style={{ marginTop: '20px' }}>

                    <div className="card" >
                        <div>
                            <div className="card-profile">
                                <img src='https://api.arzan.info/static/2022-12/discount_36208_1671113146.jpg' className='top_profil-acc' alt="img" />
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '16px' }}>
                                    <span className="fontSize1">Rahym</span>
                                    <span style={{ fontSize: '.6em', marginTop: '0' }}> Сегодня 21:00</span>
                                </div>
                            </div>
                            <span className="card-text">В магазине женской одежды расспродажа покупая одну футболку еще одну получаете безплатно спешите</span>
                        </div>

                        <div style={{ paddingLeft: '35px', marginTop: '10px' }}>
                            <div className="card-profile">
                                <img src='https://api.arzan.info/static/2022-12/discount_36208_1671113146.jpg' className='top_profil-acc' alt="img" />
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '16px' }}>
                                    <span className="fontSize1">Rahym</span>
                                    <span style={{ fontSize: '.6em', marginTop: '0' }}> Сегодня 21:00</span>
                                </div>
                            </div>
                            <span className="card-text">В магазине женской одежды расспродажа покупая одну футболку еще одну получаете безплатно спешите</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <Link className="card-link" style={{ textAlign: 'center' }}>Посмотреть все +25</Link>
                        </div>
                    </div>
                    <div className="card">
                        <div>
                            <div className="card-profile">
                                <img src='https://api.arzan.info/static/2022-12/discount_36208_1671113146.jpg' className='top_profil-acc' alt="img" />
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '16px' }}>
                                    <span className="fontSize1">Rahym</span>
                                    <span style={{ fontSize: '.6em', marginTop: '0' }}> Сегодня 21:00</span>
                                </div>
                            </div>
                            <span className="card-text">В магазине женской одежды расспродажа покупая одну футболку еще одну получаете безплатно спешите</span>
                        </div>
                    </div>
                    <div className="text">
                        <textarea className="text_textarea" name="" id="" cols="30" rows="5" placeholder="Ваше сообщение..."></textarea>
                    </div>
                    <div className="card-button">
                        <span className="fontSize">Отправить</span>
                    </div>
                </div>
            </div>
        </div >
    )
}