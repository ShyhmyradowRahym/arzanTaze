import { useEffect, useRef, useState } from "react"
import { useAppContext } from '../../Context'
import { Tool, Fetch, Util } from '../../common'
import { toast } from "react-toastify";

export default function AboutUs() {
    const title = useRef(), content = useRef(), { state } = useAppContext();
    const [data, setData] = useState([])
    useEffect(function () {
        Fetch("pg/terms-of-use", { qs: { lang: state.lang } }).then(res => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message))
            setData(res.body)
        }).catch(err => toast.error(err.message))
    }, [state.lang])
    console.log(data);
    return (
        <div className="constant-page">
            <h1 className="about_title" dangerouslySetInnerHTML={{ __html: data && data.title }}></h1>
            <div dangerouslySetInnerHTML={{ __html: data && data.content }}></div>
        </div>
    )
}