import React, { useContext, useEffect, useReducer, useRef, useState } from "react";
import { Fetch, Tool, Util } from "../../common";
import Loader from '../../component/Loader'
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from '../../Context'
import EyeIcon from '../../component/icons/eye.png'
import '../Home/style.css'
import './style.css'

export default function Notification() {
    const [loading, setLoading] = useState(true)
    const { state } = useContext(Context),
        params = useParams(),
        [data, setData] = useState({});

    console.log(params);
    useEffect(function () {
        Fetch("recommended-discounts/" + params.notification_id).then((res) => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
            if (res.body) {
                setData(res.body)
                setLoading(false)
            }
        }).catch((err) => toast.error(err.message));
    }, [params.notification_id]);

    if (loading) return <Loader />
    return (
        <div style={{ maxWidth: "100vw", overflow: "hidden", marginBottom: 20 }} className="home-items">
            <div className="constant-page">
                <span className="not_title">{data.title}</span>
                <img className="not_img" src={data.images[0].small} alt="" />
                {data.payload != undefined && <main className="not_body" dangerouslySetInnerHTML={{ __html: data.payload }} />}
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div style={{fontWeight:'700'}}>{Util.dateFormat(new Date(data.created_at), '%d-%m-%Y', true)}</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img src={EyeIcon} style={{ marginRight: '5px' }} />
                        <p> {data.views}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}