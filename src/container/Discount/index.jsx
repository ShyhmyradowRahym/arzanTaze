import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Constant, Fetch, Locale, Tool, Util } from "../../common";
import ArrowRight from '../../component/icons/ArrowRight'
import ArrowLeft from '../../component/icons/ArrowLeft'
import Loader from '../../component/Loader'
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from '../../Context'
import Slider from "react-slick";
import starIcon from '../../component/icons/starIcon.svg'
import EyeIcon from '../../component/icons/eye.svg'
import LikeIcon from '../../component/icons/like.svg'
import DislikeIcon from '../../component/icons/dislike.svg'
import DolyDislike from '../../component/icons/DolyDislike.svg'
import DolyLike from '../../component/icons/DolyLike.svg'
import '../Home/style.css'
import Complaint from "../../component/Popup/Complaint";
import User from '../../component/icons/user.svg'
import Popup from "../../component/Popup";
import Lottie from 'react-lottie';
import Like from '../../component/icons/like.json'
import ReactHowler from 'react-howler'
import music from '../../component/icons/y2mate.com - Apple Pay Success Sound Effect.mp3'
import PopLikes from "../../component/Popup/PopLikes";
import SeenLikes from "../../component/Popup/SeenLikes";
import Izbrannyy from '../../component/icons/izbrannyy.png'
import Izbrannyy_acyk from '../../component/icons/izbrannyy_acyk.png'
const NextArrow = ({ onClick }) => <div style={{ right: 10 }} className="home-arrows" onClick={onClick}><ArrowRight /></div>;
const PrevArrow = ({ onClick }) => <div style={{ left: 10 }} className="home-arrows" onClick={onClick}><ArrowLeft /></div>;


export default function Discount() {
  const { state } = useContext(Context),
    params = useParams(),
    [data, setData] = useState({ loading: true, images: [] }),
    settings = { infinite: true, speed: 500, autoplay: true, autoplaySpeed: 4000 };

  const [Open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState({ id: 0, toggle: false })
  const [like, setLike] = useState(null)
  const [showLike, setShowLike] = useState(false)
  const [favorite, setFavorite] = useState(false)
  const handleLike = () => {
    if (!Util.getCookie('username')) {
      setIsOpen({ toggle: true })
    }
    {
      Util.getCookie("username") && Fetch("discount-toggle-like", { "method": "PATCH", body: { "discount_id": Number(params.discount_id), "is_like": 1 } }).then((res) => {
        if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
        if (res.error === false) {
          setLike(1)
          setShowLike(true)
          setData(d => {
            return { ...d, like_count: res.body.like_count, dislike_count: res.body.dislike_count, user: { ...d.user, score: res.body.score } }
          })
        }
      }).catch((err) => toast.error(err.message));
    }
  }

  const handleDisLike = () => {
    if (!Util.getCookie('username')) {
      setIsOpen({ toggle: true })
    }
    {
      Util.getCookie("username") && Fetch("discount-toggle-like", { "method": "PATCH", body: { "discount_id": Number(params.discount_id), "is_like": 0 } }).then((res) => {
        if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
        if (res.error === false) {
          setLike(-1)
          setData(d => {
            return { ...d, like_count: res.body.like_count, dislike_count: res.body.dislike_count, user: { ...d.user, score: res.body.score } }
          })
        }
      }).catch((err) => toast.error(err.message));
    }
  }
  const handleFavorite = () => {
    if (!Util.getCookie('username')) {
      setIsOpen({ toggle: true })
    }
    {
      Util.getCookie("username") && Fetch("set-user-favorite", { "method": "POST", body: { "discount_id": Number(params.discount_id) } }).then((res) => {
        if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
        toast.success(res.body)
        if (res.body === 'ADDED') {
          setFavorite(true)
        } else setFavorite(false)
      }).catch((err) => toast.error(err.message));
    }
  }

  useEffect(function () {
    Fetch("discount/" + params.discount_id).then((res) => {
      if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
      setData({ ...res.body, loading: false })
      setLike(res.body.user.is_liked)
    }).catch((err) => toast.error(err.message));
  }, [params.discount_id, Util.getCookie('username')]);


  const defaultOptions = {
    loop: false,
    animationData: Like,
  };
  useEffect(() => {
    setTimeout(() => setShowLike(false), 3000)
  }, [showLike])
  const [likesShow, setLikesShow] = useState(false)
  const [seenShow, setSeenShow] = useState(false)
  if (data.loading) {
    return <Loader />
  }
  return (
    <div style={{ maxWidth: "100vw", overflow: "hidden", marginBottom: 20 }} className="">
      {isOpen.toggle && <Popup setIsOpen={setIsOpen} id={isOpen.id} />}
      <div>
        {Open &&
          <Complaint setOpen={setOpen} complaints={data.complaints} dis_id={params.discount_id} />
        }
        {
          likesShow &&
          <PopLikes setLikesShow={setLikesShow} />
        }
        {
          seenShow &&
          <SeenLikes setLikesShow={setSeenShow} />
        }
      </div>
      <div className="constant-page">

        {Util.getCookie('username') && <div className="header">
          <div>
            <img src={data.user.avatar ? data.user.avatar : User} alt="" className="header-profil_img" style={{ objectFit: 'contain' }} />
            <p>{Util.getCookie('username')}</p>
          </div>
          <div className="header_score">
            <p>{data.user.score}</p> <img src={starIcon} alt="" />
          </div>
        </div>}
        <div style={{ position: 'relative' }}>
          <Slider {...settings} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
            {
              data.images && data.images.map(i => (

                <a key={i.large} href={i.large} data-fancybox='gallery'
                  data-download-src={i.large} data-caption={data.title}>
                  <img src={i.large} className='home_car1' />
                </a>
              ))
            }
          </Slider>
          <img onClick={() => handleFavorite()} className="izbrannyy-img" src={favorite ? Izbrannyy : Izbrannyy_acyk} alt="" />
        </div>
        {showLike && <div className="showLike" style={{ transform: `scaleX(${-1})` }}>
          <Lottie options={defaultOptions}
            height={260}
            width={300}
            isPaused={''}
            isStopped={''} />
        </div>}
        {showLike && <ReactHowler
          src={music}
          playing={showLike}
        />}
        <div style={{ marginTop: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {String(data.prev_id) !== '-1' ? <Link to={Constant._discounts + data.prev_id} className="router-arrows"><ArrowLeft /></Link> : <span></span>}
          {String(data.next_id) !== '-1' ? <Link to={Constant._discounts + data.next_id} className="router-arrows"><ArrowRight /></Link> : <span></span>}
        </div>
        <h2 className="constant-page_text" style={{ padding: 0 }}>{data.title}</h2>
        <div className="justify-content eye-icon" style={{ marginBottom: 10 }}>
          <div>{Util.dateFormat(new Date(data.created_at), '%d-%m-%Y', true)}</div>
          <div style={{ display: 'flex', alignItems: 'center' }}><img className="eye-icon1" src={EyeIcon} alt="" /><span style={{ cursor: 'pointer' }} onClick={() => setSeenShow(true)}>{data.views}</span></div>

          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><img className="eye-icon2" src={like === -1 ? DolyDislike : DislikeIcon} onClick={() => handleDisLike()} /> {data.dislike_count}</div>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}><img className="eye-icon3" src={like === 1 ? DolyLike : LikeIcon} onClick={() => handleLike()} /><span onClick={() => setLikesShow(true)}>{data.like_count}</span></div>

        </div>

        <div className="justify-content datas">
          {data.start_date && <div className="data">
            {Util.dateFormat(new Date(data.start_date), '%d.%m.%Y', true)} - {Util.dateFormat(new Date(data.end_date), '%d.%m.%Y', true)}
          </div>}
          <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {data.price && data.price != 0 ? <div style={{ textDecoration: "line-through", textDecorationColor: "red" }}>{data.price} {Locale.en.Manat}</div> : null}
            {data.sale_price != 0 && <div style={{ color: '#0BBD1D', fontSize: 24, fontWeight: 600 }}>{data.sale_price} {Locale.en.Manat}</div>}
            {data.price && data.price != 0 ? <div className="d_percentage">{Math.floor((1 / data.price * (data.price - data.sale_price)) * 100)}%</div> : null}
          </div>
        </div>
        <main style={{ fontSize: '.8em', wordWrap: 'break-word' }} dangerouslySetInnerHTML={{ __html: data.payload }} />
        {data.phone && <span>Tel: <a href={`tel:${data.pone}`}>{data.phone}</a></span>}
        <div style={{ marginTop: '5px' }} className="discount_links">
          {data.hashtags && data.hashtags.length > 1 &&
            data.hashtags.split(',').map(e => (
              <Link style={{ marginRight: '20px' }} key={e} to={`/hashtags/${e.slice(1, e.length)}`}>{e}</Link>
            ))
          }
        </div>
        {Util.getCookie('username') && <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
          <button onClick={() => {
            setOpen(true), window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth"
            });
          }} className="discount_btn">{Locale[state.lang].Complain}</button>
        </div>}
      </div >
    </div >
  );
}