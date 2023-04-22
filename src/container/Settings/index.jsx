import { useEffect, useReducer, useState } from 'react';
import { Tool, Fetch, Util, Locale, Constant } from '../../common'
import { useAppContext } from '../../Context';

import '../RecommendedDiscounts/style.css'
import './index.css'
import '../../component/Popup/style.css'
import Upload from '../../component/icons/gallery.svg'
import { toast } from 'react-toastify';
import Exit from '../../component/icons/exit.png'
import Trash from '../../component/icons/trash.png'
import Close from '../../component/icons/close.svg'
import Loader from '../../component/Loader'
export default function Settings({ setOptionsShow }) {
    const [file, setFile] = useState(false)
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
    const form = new FormData();
    const handleFile = (event) => {
        setFile(event.target.files[0])
    }
    const { state, dispatch } = useAppContext()
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault();
        {
            e.currentTarget.elements.username.value &&
                Fetch("change-user-username", { "method": "POST", body: { "username": e.currentTarget.elements.username.value }, headers: { Region: state.currentRegion } }).then((res) => {
                    if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
                    if (res.body === 'SUCCESS') {
                        setLoading(false)
                        toast.success('Changed user name')
                    }
                }).catch((err) => {toast.error(err.message), setLoading(false)})
        }
        form.append('avatar', file)
        {
            file && setLoading(true)
            Fetch("change-user-avatar", { "method": "POST", body: form, form: true, headers: { Region: state.currentRegion } }).then((res) => {
                if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
                console.log(res);
                if (res.error === false) {
                    Util.setCookie("avatar", res.body)
                    setLoading(false)
                    toast.success("Changed user avatar")
                }
            }).catch((err) => {toast.error(err.message), setLoading(false)})
        }
    }
    const handleDelete = () => {
        setLoading(true)
        Fetch("remove-user-account--auth", { "method": "DELETE", headers: { Region: state.currentRegion } }).then((res) => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
            if (res.body === 'SUCCESS') {
                toast.success('Removed accaunts')
                dispatch({ type: 'LOGOUT_USER' })
                setOptionsShow(false)
                setLoading(false)
            }
        }).catch((err) => {
            toast.error(err.message)
            setLoading(false)
        })
    }
    const LogOut = () => {
        setLoading(true)
        Fetch("auth/signout", { "method": "DELETE", body: {} }).then((res) => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
            if (res.body === 'SUCCESS') {
                setLoading(false)
                dispatch({ type: 'LOGOUT_USER' })
                toast.success('Log out')
                setOptionsShow(false)
            }
        }).catch((err) => {toast.error(err.message), setLoading(false)});
    }
    if (loading) {
        return <Loader />
    }
    return (
        <>
            <div className="my_popup_back"></div>
            <div style={{ marginTop: 20, padding: '3px !important' }} className="my_popup">
                <img src={Close} onClick={() => { setOptionsShow(false) }} className='close' alt="" />
                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                    <p className='setting-title'>{Locale[state.lang].Settings}</p>
                    <div className='settings'>
                        <div onClick={() => LogOut()} className='settings_1'>
                            <img src={Exit} alt="" />
                            <span>{Locale[state.lang].Logout1}</span>
                        </div>
                        <div onClick={() => handleDelete()} className='settings_2'>
                            <img src={Trash} alt="" />
                            <span>{Locale[state.lang].DeleteAccount}</span>
                        </div>
                    </div>
                    <div className="set_input">
                        <span style={{fontSize:'1em'}}>{Locale[state.lang].ChangeName}</span>
                        <input name='username' type="text" placeholder={Locale[state.lang].UserName} />
                    </div>
                    <div className='set_images'>
                        <div>
                            <input type="file" id='actual-button' onChange={handleFile} hidden />
                            <label htmlFor='actual-button' style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', cursor: 'pointer' }}>
                                <p style={{ border: 'none' }}>{Locale[state.lang].UploadPhoto}</p>
                                <img src={Upload} style={{ width: '30px', marginLeft: 3 }} alt="" />
                            </label>
                        </div>
                        {Util.getCookie('avatar') && <img src={Util.getCookie('avatar')} alt="" />}
                    </div>
                    <p style={{ textAlign: 'center' }}>
                        <input type='submit' className='setting-button' value={Locale[state.lang].Save} />
                    </p>
                </form>
            </div>
        </>
    )
}
