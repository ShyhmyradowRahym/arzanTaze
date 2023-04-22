import { Fetch, Locale, Tool, Util } from "../../common";
import "./style.css";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../Context"
import Loader from '../../component/Loader'
import Slider from "react-slick";
import ArrowRight from '../../component/icons/ArrowRight'
import ArrowLeft from '../../component/icons/ArrowLeft'
import starIcon from '../../component/icons/starIcon.svg'
import MenuList from '../../component/icons/Vector.svg'
import OptionsIcon from '../../component/icons/options.svg'
import '../Home/style.css'
import useOnClickOutside from '../../component/refComponent'
import LogoIcon from '../../component/icons/akLogo.svg'

import searchIcon from '../../component/icons/searchIcon.png'
import ListIcon from '../../component/icons/list.png'
import GridIcon from '../../component/icons/menu-grid.png'
import SquaredIcon from '../../component/icons/squaredMenu.svg'
import { toast } from "react-toastify";
export default function OfficialAcc() {
    const { state } = useContext(Context);
    const [data, setData] = useState({ loading: true, images: [] })
    const [top, setTop] = useState(0)
    const [sort, setSort] = useState('')

    const [left, setLeft] = useState(false)
    const [right, setRight] = useState(false)
    const [showmenu, setShowMenu] = useState(3)
    useEffect(function () {
        Fetch(`top-users?page=1&per_page=${top === 0 ? 20 : top}&top=${top}&sort=${sort}`, { headers: { Region: state.currentRegion }, qs: { is_web: 1 } }).then((res) => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
            setData({ ...res.body, loading: false })
            setLeft(false)
            setRight(false)

        }).catch((err) => toast.error(err.message));
        setData({ loading: true })
    }, [top, sort, state.currentRegion]);
    const ref = useRef();
    const ref1 = useRef();
    useOnClickOutside(ref, () => setLeft(false));

    useOnClickOutside(ref1, () => setRight(false));
    const handleLeft = () => {
        setLeft(!left)
    }
    const handleRight = () => {
        setRight(!right)
    }
    if (data.loading) {
        return <Loader />
    }
    return (
        <div style={{ maxWidth: "100vw", overflow: "hidden", marginBottom: 20 }} className="home-items">
            <div className="constant-page">
                <center>
                    <div style={{ width: '100%' }}>
                        <div className="off-title">{Locale[state.lang].OfficialAcc}</div>
                        <div className="tp_title">
                            <div className="tp-right">
                                <img onClick={() => handleRight()} src={OptionsIcon} style={{ cursor: 'pointer' }} alt="img1" />
                                {right && <div ref={ref1} className="dropR-off">
                                    <p style={{ marginBottom: '5px', fontSize: '1.1em' }}>{Locale[state.lang].SortRight}</p>
                                    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <label style={{ cursor: 'pointer' }} htmlFor="2">{Locale[state.lang].BalBoyunca}</label>
                                        <input checked={sort === 1} onChange={() => setSort(sort != 1 ? 1 : '')} type="checkbox" name="top50" id="2" />
                                    </div>
                                    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <label style={{ cursor: 'pointer' }} htmlFor="1">{Locale[state.lang].TazeleriOnde}</label>
                                        <input checked={sort === 2} onChange={() => setSort(sort != 2 ? 2 : '')} type="checkbox" name="top50" id="1" />
                                    </div>
                                    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <label style={{ cursor: 'pointer' }} htmlFor="3">{Locale[state.lang].PostBoyunca}</label>
                                        <input checked={sort === 3} onChange={() => setSort(sort != 3 ? 3 : '')} type="checkbox" name="top50" id="3" />
                                    </div>
                                    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <label style={{ cursor: 'pointer' }} htmlFor="3">{Locale[state.lang].Halananlar}</label>
                                        <input checked={sort === 4} onChange={() => setSort(sort != 4 ? 4 : '')} type="checkbox" name="top50" id="3" />
                                    </div>
                                </div>}
                            </div>
                            <form style={{ width: '100%' }}>
                                <div className="off-form">
                                    <input className="off-search" type="text" name="search" placeholder={Locale[state.lang].Search} />
                                    <img className="search-icon" src={searchIcon} alt="" />
                                </div>
                            </form>
                            <p style={{ margin: '0px 0px', cursor: 'pointer' }} onClick={() => setShowMenu(showmenu < 3 ? showmenu + 1 : 1)}>
                                {showmenu === 1 && <img className="discount-button_img" src={GridIcon} />}
                                {showmenu === 2 && <img className="discount-button_img" src={ListIcon} />}
                                {showmenu === 3 && <img className="discount-button_img" src={SquaredIcon} />}
                            </p>
                        </div>
                        {showmenu === 3 &&
                            data.users.map((index) =>
                            (

                                <div key={index.position} className="card_user1">
                                    <div className="card_item_a">
                                        {index.avatar ?
                                            <a href={index.avatar} data-fancybox={index.avatar} data-caption={index.username}>
                                                <img src={index.avatar} className='top_profil-acc' alt="img" />
                                            </a>
                                            :
                                            <div className="top_profil1-acc" onClick={() => { toast.error(Locale[state.lang].SuratYok) }}>
                                                <img src={LogoIcon} />
                                            </div>
                                        }
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: '16px' }}>
                                            <span className="fontSize1">{index.username}</span>
                                            <span style={{ fontSize: '.6em', marginTop: '0' }}>{Locale[state.lang].Followers} 1167</span>
                                        </div>
                                    </div>
                                    <div className="card_item_b1">
                                        <span className="fontSize">{Locale[state.lang].Subscribe}</span>
                                    </div>
                                </div>
                            ))
                        }
                        {showmenu === 2 &&
                            <div className="card-list">
                                {
                                    data.users.map((index) =>
                                    (

                                        <div key={index.position}>
                                            <div className="card-list_card_item_a">
                                                {index.avatar ?
                                                    <a href={index.avatar} data-fancybox={index.avatar} data-caption={index.username}>
                                                        <img src={index.avatar} className='top_profil-acc' alt="img" />
                                                    </a>
                                                    :
                                                    <div className="top_profil1-acc" onClick={() => { toast.error(Locale[state.lang].SuratYok) }}>
                                                        <img src={LogoIcon} />
                                                    </div>
                                                }
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '18px' }}>
                                                    <span className="fontSize1">{index.username}</span>
                                                    <span style={{ fontSize: '.6em', marginTop: '0' }}>{Locale[state.lang].Followers} 1167</span>
                                                </div>
                                                <span className="fontSize follow" style={{ marginTop: '10px' }}>{Locale[state.lang].Subscribe}</span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        }
                        {showmenu === 1 &&
                            <div className="card-list1">
                                {
                                    data.users.map((index) =>
                                    (

                                        <div key={index.position}>
                                            <div className="card-list_card_item_a">
                                                {index.avatar ?
                                                    <a href={index.avatar} data-fancybox={index.avatar} data-caption={index.username}>
                                                        <img src={index.avatar} className='top_profil-acc' alt="img" />
                                                    </a>
                                                    :
                                                    <div className="top_profil1-acc" onClick={() => { toast.error(Locale[state.lang].SuratYok) }}>
                                                        <img src={LogoIcon} />
                                                    </div>
                                                }
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '18px' }}>
                                                    <span className="fontSize1">{index.username}</span>
                                                    <span style={{ fontSize: '.6em', marginTop: '0' }}>{Locale[state.lang].Followers} 1167</span>
                                                </div>
                                                <span className="fontSize follow" style={{ marginTop: '10px' }}>{Locale[state.lang].Subscribe}</span>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        }
                    </div>
                </center>
            </div >
        </div >
    )
}