import React, { useEffect, useState } from "react";
import { Constant, Fetch, Locale, Tool, Util } from "../../common";
import ArrowRight from '../../component/icons/ArrowRight'
import ArrowLeft from '../../component/icons/ArrowLeft'
import DCard from '../../component/DiscountCard'
import DCard1 from '../../component/DiscountCard1'
import Loader from '../../component/Loader'
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppContext } from '../../Context'
import Slider from "react-slick";
import ListIcon from '../../component/icons/list.png'
import GridIcon from '../../component/icons/menu-grid.png'
import SquaredIcon from '../../component/icons/squaredMenu.svg'
import EyeIcon from '../../component/icons/eye.png'
import Close from '../../component/icons/close.svg'
import './style.css'

const NextArrow = ({ onClick }) => <div style={{ right: 10 }} className="home-arrows" onClick={onClick}><ArrowRight /></div>;
const PrevArrow = ({ onClick }) => <div style={{ left: 10 }} className="home-arrows" onClick={onClick}><ArrowLeft /></div>;

export default function Home() {
  const { state } = useAppContext(),
    [home, setHome] = useState({ loading: true, discounts: [], homeBanners: [], recommendedDiscounts: [], topUsers: [], total: 0 });
  const settings = { infinite: true, speed: 500, autoplay: true, autoplaySpeed: 4000 };
  const [showmenu, setShowMenu] = useState(1)
  const [page, setPage] = useState(2)

  useEffect(function () {
    Fetch("get-home", { headers: { Region: state.currentRegion }, qs: { is_web: 1 } }).then((res) => {
      if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
      setHome({ ...res.body, loading: false })
    }).catch((err) => {
      toast.error(err.message);
    });
  }, [state.currentRegion])
  const handleView = () => {
    Fetch(`get-discounts`, { headers: { Region: state.currentRegion }, qs: { is_web: 1, page, per_page: '20' } }).then((res) => {
      if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
      setHome(function (home) {
        home.discounts = [...home.discounts, ...res.body.discounts];
        return home
      })
      setPage(pg => pg + 1)
    }).catch((err) => {
      toast.error(err.message);
    });
  }
  useEffect(() => {
    if (!Util.getItem('uuid')) {
      Util.setItem('uuid', Util.uuidv4())
    }
    if (!Util.getCookie('popHome')) {
      if (home.popup_ad) { Util.setCookie('popHome', home.popup_ad.content) }
    }
  }, [home])

  const [badges, setBadges] = useState([])
  useEffect(() => {
    Fetch(`get-home-badges`, { headers: { Region: state.currentRegion }, qs: { is_web: 1 } }).then((res) => {
      if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
      setBadges(res.body)
    }).catch((err) => {
      toast.error(err.message);
    });
  }, [])
  const is_pinnedCount = 2;
  const settings1 = {
    infinite: true,
    // slidesToShow: home.recommendedDiscounts.length < 5 ? home.recommendedDiscounts.length : 5,
    slidesToShow: is_pinnedCount,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: is_pinnedCount,
          infinite: true,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: is_pinnedCount,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: is_pinnedCount,
          slidesToScroll: 1
        }
      }
    ]
  };
  const settings2 = {
    infinite: true,
    arrows: false,
    // slidesToShow: home.recommendedDiscounts.length < 5 ? home.recommendedDiscounts.length : 5,
    slidesToShow: 5 - is_pinnedCount,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4 - is_pinnedCount,
          infinite: true,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3 - is_pinnedCount,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: is_pinnedCount,
          slidesToScroll: 1
        }
      }
    ]
  }
  const [popUp, setPopUp] = useState(Util.getCookie('popHome') != '' ? true : false)
  const [webBanners, setWebBanners] = useState([])
  const [appBanners, setAppBanners] = useState([])

  useEffect(() => {
    home.homeBanners.map(e => {
      e.is_web ? setWebBanners(r => [...r, e]) : setAppBanners(r => [...r, e])
    })
  }, [home])
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  if (home.loading) {
    return <Loader />
  }
  return (
    <>
      <div style={{ maxWidth: "100vw", overflow: "hidden", marginBottom: 20 }} className="home-items">
        {
          Util.getCookie('popHome') && !popUp && <div className="my_popup_back" style={{ paddingTop: '60px' }}>
            <div style={{ maxWidth: "100vw", minHeight: Util.getAvailableHeight(), overflow: "hidden", marginBottom: 20 }} className="my_popup">
              <img src={Close} onClick={() => { setPopUp(true) }} className='close' alt="" style={{ top: '15px', right: '15px' }} />
              <center>
                <a href={home.popup_ad.hyperlink}>
                  <img src={home.popup_ad.content} className='homePopUp' alt="" />
                </a>
              </center>
            </div>
          </div>
        }
        <div className="container">
          <Slider {...settings} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
            {width > 900 ?
              webBanners.map(b => (
                <Link key={b.banner_id + "_herebann"} to={b.hyperlink ? b.hyperlink : "#"}>
                  <img src={b.image} alt="bann" className="home_car1" style={{ objectFit: 'fill' }} />
                </Link>
              )) :
              appBanners.map(b => (
                <Link key={b.banner_id + "_herebann"} to={b.hyperlink ? b.hyperlink : "#"}>
                  <img src={b.image} alt="bann" className="home_car1" style={{ objectFit: 'fill' }} />
                </Link>
              ))
            }
          </Slider>
        </div>
        <div className="container" style={{ display: home.topUsers.length ? 'block' : 'none' }}>
          <h2 className="title">{Locale[state.lang].TopUsers} <span className="greenColor">(+{badges.topUsers})</span></h2>
          <Slider {...settings} swipe={false}>
            {
              home.topUsers.map(b => (
                <Link key={b.banner_id + "_herebann"} to={Constant._topUsers}>
                  <img src={b.image} alt="bann" className="home_car2" />
                </Link>
              ))
            }
          </Slider>
        </div>



        <div className="container">
          <div className="home-galleries">
            {home.gallery.length > 0 && <Link to={Constant._gallery} className="home-gallery">
              <h2 className="title">{Locale[state.lang].Gallery} <span className="greenColor">(+{badges.gallery})</span></h2>
              <img className="home_car1" src={home.gallery[0].image} alt="" style={{ objectFit: 'fill' }} />
            </Link>}
            {home.officials.length > 0 && <Link to={Constant._offacc} className="home-offaccaunt">
              <h2 className="title">{Locale[state.lang].OffAcc} <span className="greenColor">(+{badges.officials})</span></h2>
              <img className="home_car1" src={home.officials[0].image} alt="" style={{ objectFit: 'fill' }} />
            </Link>}
          </div>
        </div>
        <div className="container" style={{ display: home.recommendedDiscounts.length ? 'block' : 'none', marginBottom: 20 }}>
          <div className="justify-content">
            <h2 className="title">{Locale[state.lang].RecommendedDiscounts} <span className="greenColor">(+{badges.recommendedDiscounts})</span></h2>
            <div className="discount-button">
              <Link to={Constant._recommendedDiscounts}>{Locale[state.lang].SeeAll} </Link>
            </div>
          </div>

          <div style={{ width: '100%', display: 'flex' }}>
            <div style={{ width: `${is_pinnedCount * 20}%` }}>

              <Slider {...settings1}>
                {
                  home.recommendedDiscounts.map(rd => (
                    <div>
                      {
                        rd.is_pinned === false && <Link to={Constant._recommendedDiscounts + rd.rd_id} key={rd.rd_id}>
                          <img className="slider1" src={rd.image} alt="rd" />
                        </Link>
                      }
                    </div>
                  ))
                }
              </Slider>
            </div>
            <div style={{ width: `${100 - (is_pinnedCount * 20)}%` }}>

              <Slider {...settings2}>
                {
                  home.recommendedDiscounts.map(rd => (
                    <div>
                      {
                        rd.is_pinned === false && <Link to={Constant._recommendedDiscounts + rd.rd_id} key={rd.rd_id}>
                          <img className="slider1" src={rd.image} alt="rd" />
                        </Link>
                      }
                    </div>
                  ))
                }
              </Slider>
            </div>
          </div>
        </div>

        <div className="container" style={{ display: home.discounts.length ? 'block' : 'none' }}>
          <div className="justify-content" style={{ display: 'flex', alignItems: 'center' }}>
            <h2 className="title">{Locale[state.lang].Discounts} <span className="greenColor">(+{badges.discounts})</span></h2>
            <div className="discount-button">
              <Link to={Constant._discounts}>{Locale[state.lang].SeeAll} </Link>
              <p style={{ margin: '0px 0px', cursor: 'pointer' }} onClick={() => setShowMenu(showmenu < 3 ? showmenu + 1 : 1)}>
                {showmenu === 1 && <img className="discount-button_img" src={GridIcon} />}
                {showmenu === 2 && <img className="discount-button_img" src={ListIcon} />}
                {showmenu === 3 && <img className="discount-button_img" src={SquaredIcon} />}
              </p>
            </div>
          </div>

          <div>

            {showmenu === 1 && <div className="discount-list">
              {home.discounts &&
                home.discounts.map(d => (<div key={d.discount_id}><DCard {...d} lang={state.lang} /></div>))
              }
            </div>}

            {showmenu === 2 &&
              <div className="discount-list1">
                {home.discounts &&
                  home.discounts.map(e => (
                    <Link to={Constant._discounts + e.discount_id}>
                      <div className="discount-list1-cart" key={e.discount_id}>
                        <img className='discount-list1-cart_img' src={e.image} />
                        <div className="discount-list1-cart_body">
                          <p className="discount-list1-cart_title">{e.title}</p>
                          <p className="discount-list1-cart_content" dangerouslySetInnerHTML={{ __html: e.content }}></p>
                          <div className="discount-list1-cart_footer">
                            <p className="discount-list1-cart_footer-date">{Util.dateFormat(new Date(e.created_at), '%d-%m-%Y', true)}</p>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                              <img src={EyeIcon} style={{ marginRight: '5px' }} />
                              <p> {e.views}</p>
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
              {home.discounts &&
                home.discounts.map(d => (<div key={d.discount_id}><DCard1 {...d} lang={state.lang} /></div>))
              }
            </div>}
          </div>
          <div style={home.discounts && home.discounts.length === home.total ? { display: 'none' } : { display: 'block' }} className="view-all greenColor" onClick={() => handleView()}>
            <h2 style={{ textAlign: 'center' }} className="title" to={Constant._discounts}>{Locale[state.lang].SeeAll}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
