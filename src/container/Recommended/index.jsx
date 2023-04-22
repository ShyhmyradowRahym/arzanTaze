import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Constant, Fetch, Locale, Tool, Util } from "../../common";
import ArrowRight from '../../component/icons/ArrowRight'
import ArrowLeft from '../../component/icons/ArrowLeft'
import Loader from '../../component/Loader'
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from '../../Context'
import Slider from "react-slick";
import EyeIcon from '../../component/icons/Eye'
import starIcon from '../../component/icons/starIcon.svg'
import Izbrannyy from '../../component/icons/izbrannyy.png'
import '../Home/style.css'
import './index.css'
import Complaint from "../../component/Popup/Complaint";
import User from '../../component/icons/user.svg'
import Lottie from 'react-lottie';
import Heart from '../../component/icons/heart.json'
import Popup from "../../component/Popup";
import Izbrannyy_acyk from '../../component/icons/izbrannyy_acyk.png'
const NextArrow = ({ onClick }) => <div style={{ right: 10 }} className="home-arrows" onClick={onClick}><ArrowRight /></div>;
const PrevArrow = ({ onClick }) => <div style={{ left: 10 }} className="home-arrows" onClick={onClick}><ArrowLeft /></div>;

export default function Recommended() {
  const [loading, setLoading] = useState(true)
  const { state } = useContext(Context),
    params = useParams(),
    [data, setData] = useState({}),
    settings = { infinite: true, speed: 500, autoplay: true, autoplaySpeed: 4000 };

  const [heartToggle, setheartToggle] = useState(false)
  const [Open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState({ id: 0, toggle: false })
  const [favorite, setFavorite] = useState(false)
  useEffect(function () {
    Fetch("recommended-discounts/" + params.recommend_id).then((res) => {
      if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
      if (res.body) {
        setData(res.body)
        setLoading(false)
        setheartToggle(false)
      }
    }).catch((err) => toast.error(err.message));
    if (!Util.getCookie('username')) { setheartToggle(false) }
  }, [params.recommend_id, Util.getCookie('username')]);

  const handleHeart = () => {
    if (!Util.getCookie('username')) {
      setIsOpen({ toggle: true })
    }
    {
      Util.getCookie("username") && Fetch("recommended-toggle-like", { "method": "PATCH", body: { "rd_id": Number(params.recommend_id) } }).then((res) => {
        if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
        setData(d => {
          setheartToggle(!d.user.is_liked)
          return { ...d, like_count: res.body.like_count, user: { ...d.user, score: res.body.score, is_liked: !d.user.is_liked } }
        })
      }).catch((err) => toast.error(err.message));
    }
  }
  const handleFavorite = () => {
    if (!Util.getCookie('username')) {
      setIsOpen({ toggle: true })
    }
    {
      Util.getCookie("username") && Fetch("set-user-favorite", { "method": "POST", body: { "discount_id": Number(data.discount_id) } }).then((res) => {
        if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
        console.log(res);
        if (res.body === 'ADDED') {
          setFavorite(true)
        } else setFavorite(false)
      }).catch((err) => toast.error(err.message));
    }
  }
  const defaultOptions = {
    loop: false,
    animationData: Heart,
  };
  if (loading) return <Loader />
  return (
    <div style={{ maxWidth: "100vw", overflow: "hidden", marginBottom: 20 }} className="home-items">
      {isOpen.toggle && <Popup setIsOpen={setIsOpen} id={isOpen.id} />}
      {Open &&
        <Complaint setOpen={setOpen} complaints={data.complaints} dis_id={data.discount_id} />
      }
      <div className="constant-page">
        {Util.getCookie('username') && <div className="header">
          <div>
            <img src={data.user.avatar ? data.user.avatar : User} alt="" className="header-profil_img" />
            <p>{Util.getCookie('username')}</p>
          </div>
          <div className="header_score">
            <p>{data.user.score}</p> <img src={starIcon} alt="" />
          </div>
        </div>}
        <div style={{ position: 'relative' }}>
          <Slider {...settings} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
            {
              data.images.map((i) => (
                <a key={i.large} href={i.large} data-fancybox='gallery' data-caption={data.title}>
                  <img src={i.large} className='home_car1' />
                </a>
              ))
            }
          </Slider>
          <img onClick={() => handleFavorite()} className="izbrannyy-img" src={favorite ? Izbrannyy : Izbrannyy_acyk} alt="" />
        </div>
        <div style={{ marginTop: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {String(data.prev_id) !== '-1' ? <Link to={Constant._recommendedDiscounts + data.prev_id} className="router-arrows"><ArrowLeft /></Link> : <span></span>}
          {String(data.next_id) !== '-1' ? <Link style={{ zIndex: '1' }} to={Constant._recommendedDiscounts + data.next_id} className="router-arrows"><ArrowRight /></Link> : <span></span>}
        </div>
        <h2 className="constant-page_text" style={{ padding: 0 }}>{data.title}</h2>
        <div className="justify-content eye-icon">
          <div>{Util.dateFormat(new Date(data.created_at), '%d-%m-%Y', true)}</div>
          <div><EyeIcon /> {data.views}</div>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'absolute', bottom: '35px', right: '-82px' }}>
              {heartToggle && <Lottie options={defaultOptions}
                height={260}
                width={300}
                isStopped={data.user.is_liked} />}
            </div>
            <div style={{ position: 'relative' }} className={`${data.user.is_liked ? 'animate' : ''} HeartAnimation`} id="container" onClick={() => handleHeart()}></div>
            <span style={{ marginLeft: '-15px' }}>{data.like_count}</span>
          </div>
        </div>

        <div className="justify-content datas">
          {data.start_date && <div className="data">
            {Util.dateFormat(new Date(data.start_date), '%d.%m.%Y', true)} - {Util.dateFormat(new Date(data.end_date), '%d.%m.%Y', true)}
          </div>}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {data.price && data.price != 0 ? <div style={{ textDecoration: "line-through", textDecorationColor: "red" }}>{data.price} {Locale.en.Manat}</div> : null}
            {data.sale_price != 0 && <div style={{ color: '#0BBD1D', fontSize: '1em', fontWeight: 600, marginLeft: 5 }}>{data.sale_price} {Locale.en.Manat}</div>}
            {data.price && data.price != 0 ? <div className="d_percentage">{Math.floor((1 / data.price * (data.price - data.sale_price)) * 100)}%</div> : null}
          </div>
        </div>
        {data.payload != undefined && <main style={{ wordWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: data.payload }} />}
        {data.phone && <span>Tel: <a href={`tel:${data.pone}`}>{data.phone}</a></span>}
        <div style={{ marginTop: '5px' }} className="discount_links">
          {data.hashtags && data.hashtags.length > 1 &&
            data.hashtags.split(',').map(e => (
              <Link style={{ marginRight: '20px' }} key={e} to={`/hashtags/${e.slice(1, e.length)}`}>{e}</Link>
            ))
          }
        </div>
        <div style={{ width: '100%', marginTop: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Util.getCookie('username') && <p style={{ textAlign: 'center', margin: '40px 0' }}>
            <button onClick={() => {
              setOpen(true), window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
              });
            }} className="discount_btn">{Locale[state.lang].Complain}</button>
          </p>}
        </div>
      </div>
    </div>
  );
}