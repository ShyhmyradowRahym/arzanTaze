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
import '../../container/TopUsers/style.css'
export default function SeenLikes({ setLikesShow }) {
    const { state } = useAppContext()
    const [data, setData] = useState({ loading: true, users: [] }),
        navigate = useNavigate(),
        { pathname, search } = useLocation(),
        query = new URLSearchParams(search),
        page = Number(query.get("page")) || 1,
        per_page = 10;
    function GoNextPage(page) {
        query.set("page", page);
        navigate(pathname + "?" + query.toString());
    }
    useEffect(function () {
        Fetch(`top-users`, { headers: { Region: state.currentRegion }, qs: { is_web: 1, page, per_page } }).then((res) => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
            setData({ ...res.body, loading: false })
        }).catch((err) => toast.error(err.message));
    }, [page, state.currentRegion]);
    if (data.loading) {
        return <Loader />
    }
    return (
        <>
            <div className="my_popup_back"></div>
            <div className="likesPopUp" style={{ marginTop: 20, padding: '100px !important' }}>
                <img src={Close} onClick={() => { setLikesShow(false) }} className='close' alt="" />
                <div className='popLikes-title'>
                    <img src={EyeIcon} alt="" />
                    <span>{Locale[state.lang].SeenLikes} (2654)</span>
                </div>
                <div style={{ width: '100%' }}>
                    {data.users &&
                        data.users.map(e => (
                            <div className='user_profiles'>
                                {e.avatar ?
                                    <a href={e.avatar} data-fancybox={e.avatar} data-caption={e.username}>
                                        <img src={e.avatar} className='top_profil' alt="img" />
                                    </a>
                                    :
                                    <div className="top_profil1" onClick={() => { toast.error(Locale[state.lang].SuratYok) }}>
                                        <img src={LogoIcon} />
                                    </div>
                                }
                                <span style={{ fontWeight: '700' }}>{e.username}</span>
                            </div>
                        ))
                    }
                </div>
                <span style={{fontWeight:'700'}}>+2539 Не зарегестрированные</span>
                <div className="container" style={{ textAlign: "center" }}>
                    <Pagination lang={state.lang}
                        onChange={GoNextPage}
                        pageSize={per_page}
                        current={page}
                        total={100} />
                </div>
            </div>
        </>
    )
}
