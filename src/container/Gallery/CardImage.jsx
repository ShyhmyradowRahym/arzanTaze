import { Fetch } from '../../common';
import EyeIcon from '../../component/icons/eye.png'
import Upload from '../../component/icons/gallery.svg'
import { useEffect } from 'react'
export default function CardImage(props) {
    const handleImagePreview = () => {
        Fetch("item-previewed", { "method": "POST", "redirect": "follow", body: { "gi_id": props.gi_id } }).then((res) => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
        }).catch((err) => toast.error(err.message))
    }

    // const donwloadIcon = document.getElementById('myBtn')
    // function myFunction() {
    //     alert('123')
    // }
    // useEffect(function () {
    //     donwloadIcon.addEventListener("click", myFunction);
    // }, [])

    return (
        <div className="gallery-card">
            <div style={{ width: '100%' }}>
                <img src={props.image_web} className='gallery-card_img' alt="IMG" />
                <button id="myBtn">Try it</button>
                <div style={{ height: '100%' }}>
                    <a onClick={() => handleImagePreview()} href={props.image_web} data-fancybox={props.title} data-caption={props.title} style={{ textDecoration: 'none', color: 'black' }}>
                        <h3>{props.title}</h3>
                        <div className="gallery-icons">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                                <img src={Upload} style={{ marginRight: '5px' }} alt="" />
                                <span>{props.total}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center" }}>
                                <img src={EyeIcon} style={{ marginRight: '5px' }} alt="" />
                                <span>{props.views}</span>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}