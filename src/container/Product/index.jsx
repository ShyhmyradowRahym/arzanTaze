import Carusel from "../../component/Carusel";
import { useState, useContext, useEffect } from "react";
import DCard from '../../component/DiscountCard';
import {  Fetch,  Tool, Util } from "../../common";
import { Context } from '../../Context';
import { toast } from "react-toastify";
import "./style.css";

export default function Product(){


	const [active, setActive] = useState(0);

	const {state} = useContext(Context), 
	[home, setHome] = useState({loading: true, discounts: [], homeBanners: [], recommendedDiscounts: [], topUsers: []})


useEffect(function () {
	Fetch("get-home", { headers: {Region: state.currentRegion}, qs: { is_web: 1 } }).then((res) => {
		if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
		setHome({ ...res.body, loading: false})
	}).catch((err) => {
		toast.error(err.message);
	});

}, [state.currentRegion]);

  return (
		<div style={{ maxWidth: "100vw", minHeight: Util.getAvailableHeight(), overflow: "hidden", marginBottom: 20 }} className="home-items">
    	<div className="container">
      	<Carusel arrayImage={['/bann.png','/bann.png']} />
				<center>
					<h1>Ayakgaplar dunyasi</h1>
					<h2><img src="/icons/location-pin.png" alt="fd"/>AG</h2>
					<h2 className="tu_stat_text"><img src="/icons/favourites.png" alt="fd"/>1000</h2>
					<h2><img src="/icons/phone-call.png" alt="fd"/> +99362 00 00 00</h2>
					
					<div className="tu_title">
						<div>Rejected (26)</div>
						<div>Confirmed (125)</div>
						<div>Pending (150)</div>
					</div>

					<div className="tu_images">
						{home.discounts.map( d => (<div key={"dd_"+d.discount_id}><DCard {...d} lang={state.lang}/></div>))}
						{/* {
							images.map((elem, index)=>{
								return (
									<DCard {...d} lang={state.lang}/>
									// <img key={index} src={elem} style={{'width': imageSize, 'height': imageSize}} alt="img"/>
								)
							})
						} */}
					</div>
					<div className="tu_index">
						{
							images.map((_, index)=>{
								return (
									<div 
										className={index === active ? "tu_index_active" : "tu_index_default"}
										onClick={()=> setActive(index)}>
											{index + 1}
									</div>
								)
							})
						}
					</div>
				</center>		
    	</div>
		</div>
  )
}