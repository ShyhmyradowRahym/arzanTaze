import { useEffect, useState } from "react"
import { Tool, Fetch, Util, Locale, Constant } from '../../common'
import { Link, useLocation, useNavigate } from "react-router-dom";
import Pagination from '../../component/Pagination'
import DCard from '../../component/DiscountCard'
import DCard1 from '../../component/DiscountCard1'
import Loader from '../../component/Loader'
import { useAppContext } from '../../Context'
import { toast } from "react-toastify";
import AppsIcon from '../../component/icons/Apps'
import '../RecommendedDiscounts/style.css'
import ListIcon from '../../component/icons/list.png'
import SquaredIcon from '../../component/icons/squaredMenu.svg'
import EyeIcon from '../../component/icons/eye.png'
import '../Home/style.css'
import useWindowDimensions from "../../component/getWindowSize";
export default function RD() {
    const { state } = useAppContext(),
        [data, setData] = useState({ total: [], discounts: [], loading: true }),
        navigate = useNavigate(),
        { pathname, search } = useLocation(),
        query = new URLSearchParams(search),
        page = Number(query.get("page")) || 1,
        per_page = 20;

    const [showmenu, setShowMenu] = useState(1)
    function GoNextPage(page) {
        query.set("page", page);
        navigate(pathname + "?" + query.toString());
    }
    useEffect(function () {
        Fetch("get-discounts", { headers: { Region: state.currentRegion }, qs: { is_web: 1, page, per_page } }).then(res => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message))
            res.body.loading = false
            setData(res.body)
        }).catch(err => toast.error(err.message))
    }, [state.lang, page, per_page, state.currentRegion])
    const { width } = useWindowDimensions()
    if (data.loading) {
        return <Loader />
    }
    return (
        <div className="container">
            <div className="header-links">
                <Link to={Constant._recommendedDiscounts}>{Locale[state.lang].RecommendedDiscounts}</Link>
                <Link className="active" to={Constant._discounts}>{Locale[state.lang].Discounts}</Link>
            </div>

            <div style={{ display: [1].length ? 'block' : 'none' }}>
                <div className="justify-content">
                    <p>{Locale[state.lang].Discounts} <span>({data.total})</span></p>
                    <p style={{ cursor: "pointer" }} onClick={() => setShowMenu(showmenu < 3 ? showmenu + 1 : 1)}>
                        {showmenu === 1 && <AppsIcon />}
                        {showmenu === 2 && <img className="discount-button_img" src={ListIcon} />}
                        {showmenu === 3 && <img className="discount-button_img" src={SquaredIcon} />}
                    </p>
                </div>
                {showmenu === 1 &&
                    <div className="discount-list" style={{ padding: 0, margin: 0 }}>
                        {
                            data.discounts.map(rd => (<DCard {...rd} lang={state.lang} key={"rd_" + rd.discount_id} />))
                        }
                    </div>}
                {showmenu === 2 &&
                    <div className="discount-list1">
                        {
                            data.discounts.map(e => (
                                <Link to={Constant._discounts + e.discount_id} style={{ textDecoration: 'none', color: 'black' }} key={e.discount_id}>
                                    <div className="discount-list1-cart" >
                                        <img className='discount-list1-cart_img' src={e.image} />
                                        <div className="discount-list1-cart_body" style={{ color: 'black !important' }}>
                                            <p className="discount-list1-cart_title">{e.title}</p>
                                            <p className="discount-list1-cart_content" dangerouslySetInnerHTML={{ __html: e.content }}></p>
                                            <div className="discount-list1-cart_footer">
                                                <p style={{ marginRight: '30px', fontSize: "0.9rem" }}>{Util.dateFormat(new Date(e.created_at), '%d-%m-%Y', true)}</p>
                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                    <img src={EyeIcon} alt="" style={{ marginRight: '5px' }} />
                                                    <p>{e.views}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }
                    </div>
                }
                {showmenu === 3 && <div className="discount-list3">
                    {
                        data.discounts.map(d => (<div key={"dd_" + d.discount_id}><DCard1 {...d} lang={state.lang} /></div>))
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

        </div>
    )
}
