import "./style.css";
import { Fetch, Locale, Util } from "../../common";
import Upload from '../../component/icons/gallery.svg'
import { useState } from "react";
import { useAppContext } from "../../Context";
import { toast } from "react-toastify";
import ShowPost from "../../component/Popup/ShowPost";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function AddPost() {
    const [file, setFile] = useState([])
    const [images, setImages] = useState([])
    const { state } = useAppContext();
    const [phoneShow, setPhoneShow] = useState(false)
    const [priceShow, setPriceShow] = useState(false)
    const [dateShow, setDateShow] = useState(false)
    const [privacyShow, setPrivacyShow] = useState(false)
    const navigate = useNavigate()
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    const [isopen, setIsOpen] = useState(false)
    const form = new FormData();
    today = yyyy + '-' + mm + '-' + dd;

    const handleFile = (event) => {
        for (let img of event.target.files) {
            setFile(o => [...o, img])
            setImages(o => [...o, URL.createObjectURL(img)])
        }
    }
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [phone, setPhone] = useState('')
    const [price, setPrice] = useState('')
    const [discount, setDiscount] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [hashtags, setHashtags] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
        file.map(r => {
            form.append('images', r)
        })
        form.append('title', e.currentTarget.elements.title.value)
        form.append('content', e.currentTarget.elements.desc.value)
        form.append('phone', e.currentTarget.elements.phone.value)
        form.append('sale_price', e.currentTarget.elements.discount.value)
        form.append('price', e.currentTarget.elements.price.value)
        form.append('start_date', `${dateShow ? e.currentTarget.elements.add_time.value : today}`)
        form.append('end_date', `${dateShow ? e.currentTarget.elements.add_time1.value : today}`)
        form.append("on_sale", `${priceShow ? "1" : "0"}`);
        form.append("is_view_phone", `${phoneShow ? "1" : "0"}`);
        form.append("is_view_deadline", `${dateShow ? "1" : "0"}`);
        form.append("hashtags", e.currentTarget.elements.hashtags.value);

        {
            privacyShow ? Fetch("add-discount1", { "method": "PATCH", body: form, form: true, headers: { Region: state.currentRegion } }).then((res) => {
                if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
                if (res.message){
                    toast.error(res.message.text)
                }
                if (res.body === 'SUCCESS') {
                    toast.success("Added post!!!")
                }
            }).catch((err) => toast.error(err.message)) : toast.error('check privacy')
        }
    }
    useEffect(() => {
        if (!Util.getCookie("token")) { navigate('/') }
    }, [Util.getCookie('username')])
    return (
        <div style={{ maxWidth: "100vw", overflow: "hidden", marginBottom: 20 }}>
            {
                isopen && <ShowPost
                    images={images}
                    title={title}
                    desc={desc}
                    phone={phoneShow ? phone : ''}
                    price={priceShow ? price : ''}
                    discount={priceShow ? discount : ''}
                    startDate={dateShow === false ? '' : startDate ? startDate : today}
                    endDate={dateShow === false ? '' : endDate ? endDate : today}
                    hashtags={hashtags}
                    setIsOpen={setIsOpen}
                />
            }
            <div className="constant-page">
                <h1 style={{ fontSize: '1.3em' }}>{Locale[state.lang].addPost}</h1>
                <form onSubmit={handleSubmit}>
                    <div className="ap_check_box">
                        <input type="file" id='actual-button' onChange={handleFile} multiple hidden />
                        <label htmlFor='actual-button' style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', cursor: 'pointer' }}>
                            <p>Upload photo</p>
                            <img src={Upload} style={{ width: '30px', marginLeft: 3 }} alt="" />
                        </label>
                    </div>
                    <div className="upload-images">
                        {images.map(e => (
                            <img src={e} alt="" />
                        ))
                        }
                    </div>
                    <div className="ap_label">
                        <div>{Locale[state.lang].Title}</div>
                        <div>0/30</div>
                    </div>
                    <input type='text' value={title} onChange={e => setTitle(e.target.value)} name="title" className="ap_input" style={{ 'height': '40px', width: '100%' }} />
                    <div className="ap_label">
                        <div>{Locale[state.lang].Desc}</div>
                        <div>0/300</div>
                    </div>
                    <textarea value={desc} onChange={e => setDesc(e.target.value)} className="ap_input" type='text' name="desc" style={{ 'height': '100px' }} />


                    <div className="ap_check_box">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="ap_a">
                                <input id="phoneShow" type='checkbox' onChange={() => setPhoneShow(!phoneShow)} defaultChecked={phoneShow} style={{ 'height': '20px', 'width': '20px' }} />
                            </div>
                            <label htmlFor="phoneShow" className="ap_b">
                                {Locale[state.lang].ShowNumber}
                            </label>
                        </div>
                        <div style={{ width: '100%' }}>
                            <input value={phone} onChange={e => setPhone(e.target.value)} name='phone' className="ap_mini_input" />
                        </div>
                    </div>

                    <div className="ap_check_box">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="ap_a">
                                <input className="checkBox" id="priceShow" onChange={() => setPriceShow(!priceShow)} defaultChecked={priceShow} type='checkbox' style={{ 'height': '20px', 'width': '20px' }} />
                            </div>
                            <label htmlFor="priceShow" className="ap_b">
                                {Locale[state.lang].ShowDiscount}
                            </label>
                        </div>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <div className="ap_c">
                                <label>{Locale[state.lang].Price}</label>
                                <input name='price' value={price} onChange={e => setPrice(e.target.value)} className="ap_mini_input" />
                            </div>
                            <div className="ap_d">
                                <label>{Locale[state.lang].Discount}</label>
                                <input value={discount} onChange={e => setDiscount(e.target.value)} name='discount' className="ap_mini_input" style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>
                    <div className="ap_check_box">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="ap_a">
                                <input id="date" onChange={() => { setDateShow(!dateShow) }} defaultChecked={dateShow} type='checkbox' style={{ 'height': '20px', 'width': '20px' }} />
                            </div>
                            <label htmlFor="date" className="ap_b">
                                {Locale[state.lang].PromotionPeriod}
                            </label>
                        </div>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <div className="ap_c">
                                <label>{Locale[state.lang].AddedTo}</label>
                                <input value={startDate} onChange={e => setStartDate(e.target.value)} name='add_time' className="ap_mini_input" type='date' style={{ 'fontSize': '17px' }} />
                            </div>
                            <div className="ap_d">
                                <label>{Locale[state.lang].ExpiresIn}</label>
                                <input value={endDate} onChange={e => setEndDate(e.target.value)} name='add_time1' className="ap_mini_input" type='date' style={{ 'fontSize': '17px' }} />
                            </div>
                        </div>
                    </div>
                    <div className="ap_label">
                        <div>{Locale[state.lang].Hashtags}</div>
                    </div>
                    <input value={hashtags} onChange={e => setHashtags(e.target.value)} type='text' name="hashtags" className="ap_input" style={{ 'height': '40px' }} />
                    <div className="ap_btn">
                        <div style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                            <input id="privacy" onChange={() => setPrivacyShow(!privacyShow)} type='checkbox' defaultChecked={privacyShow} style={{ 'height': '20px', 'width': '20px' }} />
                            <label style={{ marginLeft: 0 , fontSize:'.9em'}} htmlFor="privacy">{Locale[state.lang].Duzgun}</label>
                        </div>
                        <div className="ap_btn_style" onClick={() => { setIsOpen(true) }}>
                            {Locale[state.lang].Preview}
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <input type="submit" className="ap_btn_style" style={{ 'marginTop': '20px', textAlign: 'center' }} value={Locale[state.lang].addButton}></input>
                    </div>
                </form>
            </div>
        </div>
    )
}