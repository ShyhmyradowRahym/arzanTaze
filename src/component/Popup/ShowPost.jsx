import "./style.css";
import { Locale, Util } from "../../common";
import '../../container/Home/style.css'
import '../../container/AddPost/style.css'
import Close from '../icons/close.svg'
import EyeIcon from '../../component/icons/Eye'
import LikeIcon from '../../component/icons/like.svg'
import DislikeIcon from '../../component/icons/dislike.svg'
export default function ShowPost({ setIsOpen, images, title, desc, phone, price, discount, startDate, endDate, hashtags }) {
    const settings = { infinite: true, speed: 500, slidesToShow: 1, autoplay: true, autoplaySpeed: 4000 };
    console.log(title, desc, phone, price, discount, startDate, endDate, hashtags);
    return (
        <div>
            <div className="my_popup_back"></div>
            <div style={{ maxWidth: "100vw", minHeight: Util.getAvailableHeight(), overflow: "hidden" }} className="my_popup showPost">
                <img src={Close} onClick={() => { setIsOpen(false) }} className='close' alt="" />
                <div className="" style={{ width: '100%', marginTop: '20px' }}>
                    {Util.getCookie('username') && <div className="header" >
                        <div>
                            <p>{Util.getCookie('username')}</p>
                        </div>
                        <div className="header_score">
                        </div>
                    </div>}
                    {images.length > 0 &&
                        <img src={images[0]} alt="" className='home_car1' />
                    }
                    <h2 className="constant-page_text" style={{ padding: 0, margin: 0 }}>{title}</h2>
                    <div className="justify-content eye-icon">
                        <div>{Util.dateFormat(new Date(), '%d-%m-%Y', true)}</div>
                        <div><EyeIcon />0</div>
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><p><img className="eye-icon2" src={DislikeIcon} /></p>0</div>
                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><p><img className="eye-icon3" src={LikeIcon} alt="" /></p>0</div>
                    </div>
                    <div className="justify-content dates">
                        {startDate && <div>
                            {Util.dateFormat(new Date(startDate), '%d.%m.%Y', true)} - {Util.dateFormat(new Date(endDate), '%d.%m.%Y', true)}
                        </div>}
                        <div>
                            {price ? <div style={{ textDecoration: "line-through", textDecorationColor: "red" }}>{price} {Locale.en.Manat}</div> : null}
                            {discount != '' && <div style={{ color: '#0BBD1D', fontSize: '1em', fontWeight: 600 }}>{discount} {Locale.en.Manat}</div>}
                            {discount ? <div className="d_percentage">{Math.floor((1 / price * (price - discount)) * 100)}%</div> : null}
                        </div>
                    </div>
                    <div>
                        {phone && <p>Tel: <span>{phone}</span></p>}
                        <p style={{ color: 'black' }}>{desc}</p>
                    </div>
                    <div className="discount_links">
                        {hashtags &&
                            hashtags.split(' ').map(e => (
                                <p style={{ color: '#21D804', marginRight: '20px' }}>{e[0] != '#' ? '#' + e : e}</p>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}