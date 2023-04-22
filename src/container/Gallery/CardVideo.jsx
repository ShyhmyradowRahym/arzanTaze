import { useContext, useState, useRef } from "react";
import EyeIcon from '../../component/icons/white-eye.png'
import DownloadIcon from '../../component/icons/download.png'
import PlayIcon from '../../component/icons/play.png'
import Close from '../../component/icons/close.svg'
import { Fetch, Locale } from "../../common";
import { Context } from "../../Context";
import { toast } from "react-toastify";

export default function CardVideo(props) {
    const { state } = useContext(Context);
    const [play, setPlay] = useState(false)
    const handlePlayVideo = () => {
        setPlay(true)
    }
    const handleDownload = async (e) => {
        e.preventDefault();
        fetchFile(props.src_web)
        Fetch("item-downloaded", { "method": "POST", "redirect": "follow", body: { "gi_id": props.gi_id } }).then((res) => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
        }).catch((err) => toast.error(err.message));
    }
    {
        play &&
            Fetch("item-previewed", { "method": "POST", "redirect": "follow", body: { "gi_id": props.gi_id } }).then((res) => {
                if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
                console.log(123);
            }).catch((err) => toast.error(err.message))
    }
    function fetchFile(url) {
        fetch(url).then(res => res.blob()).then(file => {
            let tempUrl = URL.createObjectURL(file);
            let aTag = document.createElement('a')
            aTag.href = tempUrl
            aTag.download = 'filename'
            document.body.appendChild(aTag)
            aTag.click()
            aTag.remove()
        })
    }
    return (
        <div style={{ position: 'relative', height: '100%', width: '100%' }}>
            {/* {play && <div className="my_popup_back" style={{ paddingTop: '100px' }}>
                <div style={{ maxWidth: "100vw", overflow: "hidden", marginBottom: 20 }} className="my_popup">
                    <img src={Close} onClick={() => { setPlay(false) }} className='close' alt="" style={{ top: '15px', right: '15px' }} />
                    <center>
                        <video muted autoPlay loop controls id="myVideo">
                            <source src={props.src_web} type="video/mp4" />
                        </video>
                    </center>
                </div>
            </div>} */}
            {/* <video muted loop id="myVideo">
                <source src={props.src_web} type="video/mp4" />
            </video> */}

            <video id="myVideo" muted loop>
                <source src={props.src_web} type="video/mp4" />
            </video>
            <div className="content">

                <div className="content1">
                    <a data-fancybox={'video_' + props.gi_id} href={props.src_web}>
                        <button id="myBtn" onClick={() => handlePlayVideo()}>{<img className="play" src={PlayIcon} />} <span>{Locale[state.lang].Play}</span></button>
                    </a>
                    <div className="content1-footer">
                        <div>
                            <img src={EyeIcon} alt="" />
                            <span>{props.views}</span>
                        </div>
                        <div>
                            <img onClick={handleDownload} src={DownloadIcon} alt="" style={{ cursor: 'pointer', zIndex: '9999' }} />
                            <span>{props.downloads}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}