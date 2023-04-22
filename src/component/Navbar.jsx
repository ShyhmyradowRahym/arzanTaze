import { useContext, useEffect, useRef } from "react";
import { Context } from "../Context";
import { Constant, Fetch, Tool, Locale, Util } from "../common";
import { toast } from "react-toastify";
import { useState } from "react";

import MarkerIcon from './icons/marker.svg'
import LogoIcon from './icons/footerLogo.svg'
import Logo from './icons/logo1.svg'
import addIcon from '../component/icons/add-circle-outline.svg'
import { Link } from "react-router-dom";
import Popup from "./Popup";
import Settings from "../container/Settings";
import User from '../component/icons/user.svg'
import Loader from '../component/Loader'
import NotificationIcon from '../component/icons/notification.png'
import starIcon from '../component/icons/starIcon.svg'
import ChangeAccount from "./Popup/ChangeAccaunt";
function Navbar() {
    const { state, dispatch } = useContext(Context),
        [dropdown, setDropdown] = useState(0),
        [changeAccaunt, setChangeAccaunt] = useState(false)


    useEffect(function () {
        if (state.regions.length === 0) {
            Fetch("get-regions").then(res => {
                if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message))
                dispatch({ type: "SET_REGIONS", regions: res.body })
            }).catch(err => {
                toast.error(err.message)
            })
        }
    }, [])

    function setCurrentRegion(region_id) {
        setDropdown(0)
        dispatch({ type: "SET_CURRENT_REGION", region_id })
    }
    const currentRegion = state.regions.find(reg => String(reg.region_id) === String(state.currentRegion))
    const [showProf, setShowProf] = useState(false)
    const toggleAuth = () => {
        setShowProf(!showProf)
    }

    const elementRef = useRef(null)
    useEffect(() => {
        function handler(event) {
            if (!elementRef.current?.contains(event.target)) {
                setShowProf(false)
            }
        }
        window.addEventListener('click', handler)
        return () => window.removeEventListener('click', handler)
    }, [])


    const elementRegions = useRef(null)
    useEffect(() => {
        function handler(event) {
            if (!elementRegions.current?.contains(event.target)) {
                setDropdown(0)
            }
        }
        window.addEventListener('click', handler)
        return () => window.removeEventListener('click', handler)
    }, [])


    const [isOpen, setIsOpen] = useState({ id: 0, toggle: false })
    const setShow = (e) => {
        setIsOpen({ id: e, toggle: true })
    }
    const [loading, setLoading] = useState(false)

    const [optionsShow, setOptionsShow] = useState(false)
    const [profile, setProfile] = useState()
    const handleLogOut = () => {
        setLoading(true)
        Fetch("auth/signout", { "method": "DELETE", body: {} }).then((res) => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
            if (res.body === 'SUCCESS') {
                dispatch({ type: 'LOGOUT_USER' })
                setLoading(false)
            }
        }).catch((err) => toast.error(err.message));
    }
    useEffect(function () {
        {
            Util.getCookie('username') ? Fetch("get-user-profile", { headers: { Region: state.currentRegion }, qs: { is_web: 1, page: '1', per_page: '20' } }).then(res => {
                if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message))
                setProfile(res.body)
            }).catch(err => toast.error(err.message)) : setProfile(undefined)
        }
    }, [Util.getCookie('avatar')])

    const [header, setHeader] = useState("navbar");

    const listenScrollEvent = () => {
        if (window.scrollY < 200) {
            return setHeader("navbar");
        } else if (window.scrollY > 400) {
            return setHeader("navbar navbar-fixed");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);

        return () => window.removeEventListener("scroll", listenScrollEvent);
    }, []);
    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <nav className={header} id="navbar">
                <div className="container">
                    <div className="first-items">
                        <Link to={Constant._home} className="logos">
                            <img src={LogoIcon} alt="" className="logo1" />
                            <img src={Logo} className='logo2' />
                        </Link>
                        <div ref={elementRegions} className="regions">
                            <button onClick={() => setDropdown(v => !v)}>
                                <p>
                                    {Tool.getStd(state.lang, "name", currentRegion)}
                                </p>
                                <img src={MarkerIcon} alt="" />
                            </button>
                            <ul className={dropdown ? "opened" : ''}>
                                {
                                    state.regions.map(e => (
                                        <li onClick={() => setCurrentRegion(e.region_id)} key={e.region_id}>{Tool.getStd(state.lang, "name", e)}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="first-items">
                        {Util.getCookie('username') && <Link to={Constant._notifications} className="notification">
                            <img src={NotificationIcon} alt="" />
                            <span>23</span>
                        </Link>}
                        <ul className="language">
                            <li onClick={() => dispatch({ type: "CHANGE_LANGUAGE", lang: "en" })} className={state.lang === "en" ? "active" : ""}>EN</li>
                            <li onClick={() => dispatch({ type: "CHANGE_LANGUAGE", lang: "tm" })} className={state.lang === "tm" ? "active" : ""}>TM</li>
                            <li onClick={() => dispatch({ type: "CHANGE_LANGUAGE", lang: "ru" })} className={state.lang === "ru" ? "active" : ""}>RU</li>
                        </ul>
                        {<div ref={elementRef} onClick={() => toggleAuth()} className="auth">
                            <img src={profile ? profile.userinfo.avatar : User} alt="" />
                        </div>}
                        {showProf && <div className="auth-profil">
                            <Link to={Constant._profileOfficial} style={{ textAlign: 'center' }}><img src={profile ? profile.userinfo.avatar : User} style={{ border: '0.5px solid rgb(217, 217, 217)' }} alt="" /></Link>
                            <p style={{ fontWeight: "bold", margin: '2px 0' }}>{Util.getCookie('username')}</p>
                            <Link to={Constant._offStatus} className="header_status">
                                <img className="header_status-img" src={starIcon} alt="" />
                                <span>Ваш статус</span>
                            </Link>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {Util.getCookie('username') && <div style={{ display: 'flex', flexDirection: 'column' }}>

                                    <p onClick={() => setChangeAccaunt(true)} className="auth-profil_button">{Locale[state.lang].ChangeAccount}</p>
                                    <p onClick={() => setOptionsShow(true)} className="auth-profil_button">{Locale[state.lang].ProOptions}</p>
                                    {/* <Link to='/add-post' className="auth-profil_button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src={addIcon} alt="" style={{ width: 20, height: 20, margin: 0, paddingRight: 0 }} />
                                        {Locale[state.lang].addPost}
                                    </Link> */}
                                </div>}
                                {Util.getCookie('username') && <p className="auth-profil_button" onClick={() => handleLogOut()}>{Locale[state.lang].Logout}</p>}
                                {!Util.getCookie('username') && <p className="auth-profil_button" onClick={() => setShow(0)}>{Locale[state.lang].Signup}</p>}
                                {!Util.getCookie('username') && <p className="auth-profil_button" onClick={() => setShow(1)}>{Locale[state.lang].Signin}</p>}
                            </div>
                        </div>}
                    </div>
                </div>
            </nav>
            {isOpen.toggle && <Popup setIsOpen={setIsOpen} id={isOpen.id} />}
            {optionsShow && <Settings setOptionsShow={setOptionsShow} />}
            {changeAccaunt && <ChangeAccount setChangeAccaunt={setChangeAccaunt} />}

        </div>
    )
}

export default Navbar;