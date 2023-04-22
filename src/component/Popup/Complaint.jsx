import "./style.css";
import { Fetch, Locale, Util } from "../../common";
import '../../container/Home/style.css'
import '../../container/AddPost/style.css'
import { useState } from "react";
import _ from 'lodash'
import { toast } from "react-toastify";
import Close from '../icons/close.svg'
import { useAppContext } from "../../Context";
export default function Complaint(props) {
    console.log(props);
    const { state } = useAppContext();
    const [top, setTop] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        {
            top ? Fetch("add-complaint", { "method": "PATCH", headers: { Region: state.currentRegion }, body: { "note": top === 6 ? e.target.elements.note.value : '', "complaint_id": Number(top), "discount_id": Number(props.dis_id) } }).then((res) => {
                if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
                if (res.body === 'SUCCESS') {
                    toast.success('Added!!!')
                    props.setOpen(false)
                }
            }).catch((err) => toast.error(err.message)) : toast.error('choose checkbox')
        }
    }
    console.log(props.dis_id);
    return (
        <div>
            <div className="my_popup_back"></div>
            <div style={{ maxWidth: "100vw", minHeight: Util.getAvailableHeight(), overflow: "hidden", marginBottom: 20 }} className="my_popup">
                <center>
                    <div className="ap_div" style={{ border: 'none' }}>
                        <img src={Close} onClick={() => { props.setOpen(false) }} className='close' alt="" />
                        <h1 style={{ fontSize: '1.2em' }}>{Locale[state.lang].ChooseAnOption}</h1>
                        <form onSubmit={handleSubmit}>

                            {props.complaints.map((e, i) => (
                                <div className="ap_check_box" key={i}>
                                    <div className="ap_a" style={{ display: 'flex', alignItems: 'center', width: '100%', height: '10px' }}>
                                        <input id={i + 1} className="myCheckbox" checked={top === i + 1} onChange={() => setTop(top != i + 1 ? i + 1 : 0)} name={e.complaint_id} type="checkbox" style={{ 'height': '20px', 'width': '20px', cursor: 'pointer' }} />
                                        <label htmlFor={i + 1} style={{ marginLeft: '6px', cursor: 'pointer' }}>{state.lang === 'tm' && e.title}{state.lang === 'en' && e.title_en}{state.lang === 'ru' && e.title_ru}</label>
                                    </div>
                                </div>
                            ))
                            }
                            {top === 6 && <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <div className="ap_label">
                                    <div>text</div>
                                    <div>0/100</div>
                                </div>
                                <textarea className="ap_input" type='text' name="note" style={{ 'height': '100px' }} />
                            </div>
                            }
                            <input type="submit" className="ap_btn_style" style={{ 'marginTop': '70px' }} value={Locale[state.lang].Send}></input>
                        </form>
                    </div>
                </center>
            </div>
        </div>
    )
}