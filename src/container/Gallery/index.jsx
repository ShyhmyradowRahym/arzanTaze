import { Fetch, Locale, Tool } from "../../common";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../Context"
import Loader from '../../component/Loader'
import DCard from '../Gallery/CardImage'

import EyeIcon from '../../component/icons/show.png'


import '../Home/style.css'
import './style.css'

import { toast } from "react-toastify";
import Pagination from "../../component/Pagination";
import { useLocation, useNavigate } from "react-router-dom";
import CardVideo from "./CardVideo";
export default function Gallery() {
    const [loading, setLoading] = useState(true)
    const { state } = useContext(Context);
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [type, setType] = useState('surat');
    const navigate = useNavigate(),
        { pathname, search } = useLocation(),
        query = new URLSearchParams(search),
        page = Number(query.get("page")) || 1,
        per_page = 20;
    function GoNextPage(page) {
        query.set("page", page);
        navigate(pathname + "?" + query.toString());
    }
    useEffect(function () {
        {
            type === 'surat' ? Fetch(`get-gallery-image-group?page=${page}&per_page=${per_page}`, { headers: { Region: state.currentRegion }, qs: { is_web: 1 } }).then((res) => {
                if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
                setImages(res.body)
                setLoading(false)
            }).catch((err) => {
                toast.error(err.message);
            }) :
                Fetch(`get-gallery-videos?page=${page}&per_page=${per_page}`, { headers: { Region: state.currentRegion }, qs: { is_web: 1 } }).then((res) => {
                    if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
                    setVideos(res.body)
                    console.log(res.body);
                    setLoading(false)
                }).catch((err) => {
                    toast.error(err.message);
                })
        }
    }, [state.currentRegion, page, type])
   
    if (loading) {
        return <Loader />
    }
    return (
        <div style={{ maxWidth: "100vw", overflow: "hidden", marginBottom: 20 }} className="home-items">
            <div className="constant-page">
                <center>
                    <div className="mp_head1" style={{ display: 'flex', justifyContent: 'center' }}>
                        <div
                            onClick={() => setType('surat')}
                            style={type === "surat" ? { 'background': '#3BC624' } : { 'backgroundColor': '#F6F6F6', color: '#625F5F' }}>
                            {Locale[state.lang].Photo}
                        </div>
                        <div
                            onClick={() => setType('wideo')}
                            style={type === "wideo" ? { 'background': '#3BC624' } : { 'backgroundColor': '#F6F6F6', color: '#625F5F' }}>
                            {Locale[state.lang].Wideo}
                        </div>
                    </div>
                </center>
                {type === 'surat' ? <div className="gallery-list">
                    {images &&
                        images.map(d => (<div key={d.gallery_id}><DCard {...d} lang={state.lang} /></div>))
                    }
                </div> :
                    <div style={{ marginTop: '20px' }}>
                        {videos.map(e => (
                            <CardVideo key={e.gi_id} {...e} />
                        ))
                        }
                    </div>
                }
                <div className="container" style={{ textAlign: "center", color:'white' }}>
                    <Pagination lang={state.lang}
                        onChange={GoNextPage}
                        pageSize={per_page}
                        current={page}
                        total={type === 'surat' ? images.length : videos.length} />
                </div>
            </div>
        </div >
    )
}