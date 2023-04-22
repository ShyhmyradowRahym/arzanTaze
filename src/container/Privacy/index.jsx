import { useEffect, useRef } from "react"
import {useAppContext} from '../../Context'
import { Tool, Fetch, Util } from '../../common'
import { toast } from "react-toastify";

export default function AboutUs(){
    const title = useRef(), content = useRef(), {state} = useAppContext();
    useEffect(function(){
        Fetch("pg/terms-of-use", {qs: {lang: state.lang}}).then(res => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message))
            title.current.innerHTML = res.body.title;
            content.current.innerHTML = res.body.content;
        }).catch(err => toast.error(err.message))
    }, [state.lang])
    
    return (
        <div className="constant-page" style={{minHeight: Util.getAvailableHeight()}}>
            <h1 ref={title}> </h1>
            <div ref={content}> </div>
        </div>
    )
}