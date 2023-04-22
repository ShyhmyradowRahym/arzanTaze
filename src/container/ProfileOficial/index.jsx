import { useEffect, useState } from "react"
import { Tool, Fetch, Util, Locale, Constant } from '../../common'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from '../../component/Pagination'
import Loader from '../../component/Loader'
import { useAppContext } from '../../Context'
import { toast } from "react-toastify";
import '../RecommendedDiscounts/style.css'
import ListIcon from '../../component/icons/list.png'
import GridIcon from '../../component/icons/menu-grid.png'
import SquaredIcon from '../../component/icons/squaredMenu.svg'
import '../Home/style.css'
import './style.css'
import MarkerIcon from '../../component/icons/marker.svg'
import Chat from '../../component/icons/message.png'
import Phone from '../../component/icons/phone.svg'
import Post1 from "../Profile/Post1";
import Post2 from "../Profile/Post2";
import Post3 from "../Profile/Post3";
import NotificationIcon from '../../component/icons/notification.png'



export default function ProfileOfficial() {
    const { state } = useAppContext(),
        [data, setData] = useState({ total: [], discounts: [], loading: true }),
        navigate = useNavigate(),
        { pathname, search } = useLocation(),
        query = new URLSearchParams(search),
        page = Number(query.get("page")) || 1,
        per_page = 20;

    const [showmenu, setShowMenu] = useState(1)
    const [profile, setProfile] = useState([])
    const [status, setStatus] = useState('active')
    function GoNextPage(page) {
        query.set("page", page);
        navigate(pathname + "?" + query.toString());
    }
    useEffect(function () {
        {
            Util.getCookie('token') && Fetch("get-user-discounts", { headers: { Region: state.currentRegion }, qs: { is_web: 1, page, per_page, status: status } }).then(res => {
                if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message))
                setData(res.body)
            }).catch(err => toast.error(err.message))
        }
    }, [state.lang, page, per_page, state.currentRegion, status])
    useEffect(function () {
        {
            Util.getCookie('token') && Fetch("get-user-profile", { headers: { Region: state.currentRegion }, qs: { is_web: 1, page: '1', per_page: '20' } }).then(res => {
                if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message))
                setProfile(res.body)
            }).catch(err => toast.error(err.message))
        }
    }, [])
    useEffect(() => {
        if (!Util.getCookie("token")) {
            navigate('/')
        }
    }, [Util.getCookie("token")])
    if (data.loading) {
        return <Loader />
    }
    return (
        <div className="constant-page">
            <div style={{ display: [1].length ? 'block' : 'none' }}>
                <div className="profile">
                    {profile.length != 0 &&
                        <div style={{ position: 'relative', width: '100%' }}>
                            <a href={profile.userinfo.avatar} data-fancybox={profile.userinfo.avatar} data-caption={profile.userinfo.username}>
                                <img src={profile.userinfo.avatar} className='off_profile' alt="" />
                            </a>
                            <img className="off_profile1" src={profile.userinfo.avatar} alt="" />
                        </div>
                    }
                    <div className="messages">
                        <Link to={Constant._comments} className="message">
                            <img src={Chat} alt="" />
                            <span>23</span>
                        </Link>
                        <Link to={Constant._notifications} className="message">
                            <img className="message_not" src={NotificationIcon} alt="" />
                            <span>23</span>
                        </Link>
                    </div>
                    {profile.length != 0 && <h2 className="profile-text">{profile.userinfo && profile.userinfo.username}</h2>}
                    <div className="profile-region">
                        <img src={MarkerIcon} alt="" />
                        {profile.length != 0 && <h2 className="profile-text">{profile.region && profile.region.name}</h2>}
                    </div>
                    <div className="profile-region">
                        <img src={Phone} alt="" />
                        {profile.length != 0 && <h2 className="profile-text">{profile.userinfo.phone}</h2>}
                    </div>
                    <span>В магазине женской одежды расспродажа покупая одну футболку еще одну получаете безплатно спешите распродажа ограничена супер акция действует неделю ограничена супер...
                    </span>
                    <div className="profile-badgets">
                        <h2 onClick={() => setStatus('pending')} style={{ cursor: 'pointer' }}>Post <span className="greenColor">(26)</span></h2>
                        <h2 onClick={() => setStatus('pending')} style={{ cursor: 'pointer' }}>{Locale[state.lang].Pending} <span className="greenColor">({profile.userinfo && profile.userinfo.pendingDiscounts})</span></h2>
                        <h2 onClick={() => setStatus('rejected')} style={{ cursor: 'pointer' }}>{Locale[state.lang].Rejected} <span className="greenColor">({profile.userinfo && profile.userinfo.rejectedDiscounts})</span></h2>
                        <h2 onClick={() => setStatus('active')} style={{ cursor: 'pointer' }}>{Locale[state.lang].Accepted} <span className="greenColor">({profile.userinfo && profile.userinfo.acceptedDiscounts})</span></h2>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p style={{ cursor: "pointer" }} onClick={() => setShowMenu(showmenu < 3 ? showmenu + 1 : 1)}>
                        {showmenu === 1 && <img className="discount-button_img" src={GridIcon} />}
                        {showmenu === 2 && <img className="discount-button_img" src={ListIcon} />}
                        {showmenu === 3 && <img className="discount-button_img" src={SquaredIcon} />}
                    </p>
                </div>
                {showmenu === 1 &&
                    <div className="discount-list_profile" style={{ padding: 0, margin: 0 }}>
                        {
                            data && data.map(rd => (
                                <Post1 key={rd.discount_id} rd={rd} setData={setData} status={status} />
                            ))
                        }
                    </div>}
                {showmenu === 2 &&
                    <div className="discount-list1">
                        {
                            data && data.map(rd => (
                                <Post2 key={rd.discount_id} rd={rd} setData={setData} status={status} />
                            ))
                        }
                    </div>
                }
                {showmenu === 3 && <div className="discount-list_profile1">
                    {
                        data && data.map(rd => (
                            <Post3 key={rd.discount_id} rd={rd} setData={setData} status={status} />
                        ))
                    }
                </div>}
                <div className="container" style={{ textAlign: "center" }}>
                    <Pagination lang={state.lang}
                        onChange={GoNextPage}
                        pageSize={per_page}
                        current={page}
                        total={data.total} />
                </div>
            </div>
        </div >
    )
}
