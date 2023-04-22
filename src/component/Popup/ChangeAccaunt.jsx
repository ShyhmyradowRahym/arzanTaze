import { useEffect, useState } from 'react';
import { Tool, Fetch, Locale } from '../../common'
import { useAppContext } from '../../Context';
import { useLocation, useNavigate } from "react-router-dom";
import '../../component/Popup/style.css'
import EyeIcon from '../../component/icons/eye.svg'
import Close from '../../component/icons/close.svg'
import Loader from '../../component/Loader'
import Pagination from '../Pagination';
import { toast } from 'react-toastify';
import LogoIcon from '../../component/icons/akLogo.svg'
import ReloadIcon from '../../component/icons/reload.png'
import addIcon from '../../component/icons/add-circle-outline.svg'
import '../../container/TopUsers/style.css'
export default function ChangeAccount({ setChangeAccaunt }) {
    const { state } = useAppContext()
    const [profile, setProfile] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(function () {
        Fetch("get-user-profile", { headers: { Region: state.currentRegion }, qs: { is_web: 1, page: '1', per_page: '20' } }).then(res => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message))
            setProfile(res.body)
            setLoading(false)
        }).catch(err => toast.error(err.message))
    }, [])
    return (
        <>
            <div className="my_popup_back"></div>
            <div className="change_accaunt" style={{ marginTop: 20, padding: '10px !important' }}>
                <img src={Close} onClick={() => { setChangeAccaunt(false) }} className='close' alt="" />
                {loading && <Loader />}
                <div style={{ width: '100%', margin:'10px 0' }}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        {profile.userinfo && <div className='user_profiles' style={{padding:'0'}}>
                            {profile.userinfo.avatar ?
                                <a href={profile.userinfo.avatar} data-fancybox={profile.userinfo.avatar} data-caption={profile.userinfo.username}>
                                    <img src={profile.userinfo.avatar}  className='top_profil'  alt="img" />
                                </a>
                                :
                                <div className="top_profil1" onClick={() => { toast.error(Locale[state.lang].SuratYok) }}>
                                    <img src={LogoIcon} />
                                </div>
                            }
                            <span style={{ fontWeight: '700' }}>{profile.userinfo.username}</span>
                        </div>}
                        <input type='checkbox'  style={{ 'height': '20px', 'width': '20px' }}/>
                    </div>
                </div>
                <div style={{ width: '100%' , margin:'5px 0'}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                        {profile.userinfo && <div className='user_profiles' style={{padding:'0'}}>
                            {profile.userinfo.avatar ?
                                <a href={profile.userinfo.avatar} data-fancybox={profile.userinfo.avatar} data-caption={profile.userinfo.username}>
                                    <img src={profile.userinfo.avatar}  className='top_profil'  alt="img" />
                                </a>
                                :
                                <div className="top_profil1" onClick={() => { toast.error(Locale[state.lang].SuratYok) }}>
                                    <img src={LogoIcon} />
                                </div>
                            }
                            <span style={{ fontWeight: '700' }}>{profile.userinfo.username}</span>
                        </div>}
                        <img src={ReloadIcon} alt="" style={{ 'height': '30px', 'width': '30px' }}/>
                    </div>
                </div>
                <div style={{ display:'flex', alignItems:'center',cursor:'pointer' }}><span style={{fontWeight: '700'}}>Добавить аккаунт</span> <img src={addIcon} style={{marginLeft:'5px',width:'15px', height:'15px'}} alt="" /></div>
            </div>
        </>
    )
}
