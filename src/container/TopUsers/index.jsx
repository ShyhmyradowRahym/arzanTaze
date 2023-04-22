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
import logo1 from '../../component/icons/1th.svg'
import logo2 from '../../component/icons/2nd.svg'
import logo3 from '../../component/icons/3rd.svg'
import { toast } from "react-toastify";
export default function TopUsers() {
	const NextArrow = ({ onClick }) => <div style={{ right: 10 }} className="home-arrows" onClick={onClick}><ArrowRight /></div>;
	const PrevArrow = ({ onClick }) => <div style={{ left: 10 }} className="home-arrows" onClick={onClick}><ArrowLeft /></div>;
	const { state } = useContext(Context);
	const [data, setData] = useState({ loading: true, images: [] })
	const [top, setTop] = useState(0)
	const [sort, setSort] = useState('')
	const settings = { infinite: true, speed: 500, autoplay: true, autoplaySpeed: 4000 };
	const [left, setLeft] = useState(false)
	const [right, setRight] = useState(false)
	const [type, setType]=useState('surat')
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
						<span className="tp_main_text">Top {top != 0 ? top : 'list'}</span>
						<div style={{ marginTop: 20 }}>
							<Slider {...settings} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
								{
									data.banners.map(i => (
										<div key={i}>
											<img src={i.image} alt="" className="home_car1" style={{ objectFit: 'fill' }} />
										</div>
									))
								}
							</Slider>
						</div>
						<div className="tp_title" style={{alignItems:'center'}}>
							<div className="tp-left">
								<img onClick={() => handleLeft()} src={MenuList} style={{ height: '18px', cursor: 'pointer' }} alt="img" />
								{left &&
									<div ref={ref} className="dropL">
										<p style={{ marginBottom: '5px' }}>{Locale[state.lang].SortLeft}</p>
										<div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
											<label style={{ cursor: 'pointer' }} htmlFor="1">Top 50</label>
											<input checked={top === 50} onChange={() => setTop(top != 50 ? 50 : 0)} type="checkbox" name="top50" id="1" />
										</div>
										<div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
											<label style={{ cursor: 'pointer' }} htmlFor="2">Top 100</label>
											<input checked={top === 100} onChange={() => setTop(top != 100 ? 100 : 0)} type="checkbox" name="top100" id="2" />
										</div>
										<div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
											<label style={{ cursor: 'pointer' }} htmlFor="3">Top 200</label>
											<input checked={top === 200} onChange={() => setTop(top != 200 ? 200 : 0)} type="checkbox" name="top50" id="3" />
										</div>
										<div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
											<label style={{ cursor: 'pointer' }} htmlFor="4">Top 500</label>
											<input checked={top === 500} onChange={() => setTop(top != 500 ? 500 : 0)} type="checkbox" name="top50" id="4" />
										</div>
									</div>}
							</div>
							<div className="mp_head3" style={{ display: 'flex', justifyContent: 'center' }}>
								<div
									onClick={() => setType('surat')}
									style={type === "surat" ? { 'background': 'linear-gradient(183.3deg, #1D823B 2.72%, #2D8346 2.73%, #03C93E 70.47%)' } : { 'backgroundColor': '#F6F6F6', color: '#625F5F' }}>
									{Locale[state.lang].SimpleUser}
								</div>
								<div
									onClick={() => setType('wideo')}
									style={type === "wideo" ? { 'background': 'linear-gradient(183.3deg, #1D823B 2.72%, #2D8346 2.73%, #03C93E 70.47%)' } : { 'backgroundColor': '#F6F6F6', color: '#625F5F' }}>
									{Locale[state.lang].OfficialUser}
								</div>
							</div>
							<div className="tp-right">
								<img onClick={() => handleRight()} src={OptionsIcon} style={{ cursor: 'pointer' }} alt="img1" />
								{right && <div ref={ref1} className="dropR">
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
						</div>
						{
							data.users.map((index, k) =>
							(

								<div key={index.position} className="card_user" style={{ background: k < 3 ? 'linear-gradient(180deg, #FFE600 0%, rgba(255, 230, 0, 0) 251.35%)' : index.is_reached ? 'rgb(237, 210, 104)' : 'white' }}>
									<div className="card_item_a">
										{k === 0 && <img src={logo1} className='top_image' />}
										{k === 1 && <img src={logo2} className='top_image' />}
										{k === 2 && <img src={logo3} className='top_image' />}
										{k > 2 && <span className="top_number">{k + 1}</span>}
										{index.avatar ?
											<a href={index.avatar} data-fancybox={index.avatar} data-caption={index.username}>
												<img src={index.avatar} className='top_profil' alt="img" />
											</a>
											:
											<div className="top_profil1" onClick={() => { toast.error(Locale[state.lang].SuratYok) }}>
												<img src={LogoIcon} />
											</div>
										}
										<span className="fontSize">{index.username}</span>
									</div>
									<div className="card_item_b">
										<span className="fontSize">{index.score}</span>
										<img src={starIcon} alt="img" />
									</div>
								</div>
							))
						}
					</div>
				</center>
			</div >
		</div >
	)
}