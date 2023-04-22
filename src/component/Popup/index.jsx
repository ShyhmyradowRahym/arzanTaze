import { useEffect, useState } from "react";
import "./style.css";
import { Tool, Util, Fetch, Locale } from '../../common'
import { useAppContext } from "../../Context";
import { toast } from "react-toastify";
import Close from '../icons/close.svg'
import Loader from '../../component/Loader'
function Popup({ setIsOpen, id }) {

    const [type, setType] = useState(id === 0 ? 'login' : 'create')

    // const [type, setType] = useState('forget_next')

    const [numb, setNumb] = useState([])
    const [data, setData] = useState()
    const { state, dispatch } = useAppContext();
    const [forgotPass, setForgotPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const SignUp = (e) => {
        e.preventDefault()
        setLoading(true)
        setData({
            phone: e.target.elements.phone.value,
            username: e.target.elements.username.value,
            password: e.target.elements.password.value,
            confirm_password: e.target.elements.confirm_password.value
        })
        Fetch("auth/start-verification", { "method": "POST", body: { "phone": e.target.elements.phone.value, "action": "signup" } }).then((res) => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
            if (res.body === "redirect_to_signin") {
                setType('create')
                setLoading(false)
            }
            if (res.body === 'success') {
                setType("check")
                setLoading(false)

            }
        }).catch((err) => {
            toast.error(err.message)
            setLoading(false)
        })
    }
    const Check = (e) => {
        e.preventDefault()
        setLoading(true)
        Fetch("auth/signup", { "method": "PUT", body: { phone: data.phone, username: data.username, password: data.password, confirm_password: data.confirm_password, code: numb[0] + numb[1] + numb[2] + numb[3] + numb[4] + numb[5] } }).then((res) => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message))
            if (forgotPass) {
                setType('forget_next')
            }
            if (res.error === false) {
                dispatch({ type: 'LOGIN_USER', user: res.body, date: 1 })
                setType('close')
                setLoading(false)
            }
        }).catch((err) => {
            toast.error(err.message)
            setLoading(false)
        });
    }
    const Login = (e) => {
        setLoading(true)
        e.preventDefault()
        Fetch("auth/signin", { "method": "POST", body: { username: e.target.elements.username.value, password: e.target.elements.password.value, } }).then((res) => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
            if (res.error === false) {
                dispatch({ type: 'LOGIN_USER', user: res.body, date: rememberMe ? 90 : 1 })
                setType('close')
                setLoading(false)
                setIsOpen({ toggle: false })
            }
        }).catch((err) => {
            toast.error(err.message)
            setLoading(false)
        })
    }
    const forgotNumber = (e) => {
        e.preventDefault()
        setLoading(true)
        setData({
            phone: e.target.elements.phone.value,
        })
        Fetch("auth/start-verification-for-forgot-password", { "method": "POST", body: { phone: e.target.elements.phone.value } }).then((res) => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
            if (res.body === 'success') {
                setType('forget_next')
                setLoading(false)
            }
        }).catch((err) => { toast.error(err.message), setLoading(false) });
    }
    const forgetNext = (e) => {
        e.preventDefault()
        setLoading(true)
        Fetch("auth/user-forgot-password____0", { "method": "PATCH", body: { phone: data.phone, password: e.target.elements.password.value, confirm_password: e.target.elements.confirm_password.value, code: numb[0] + numb[1] + numb[2] + numb[3] + numb[4] + numb[5] } }).then((res) => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
            if (res.body === 'SUCCESS') {
                setLoading(false)
                setType('create')
            }
        }).catch((err) => { toast.error(err.message), setLoading(false) });
    }
    if (loading) {
        return <Loader />
    }
    if (type !== "close") {
        return (
            <>
                <div className="my_popup_back"></div>
                <div className="my_register">
                    <img src={Close} onClick={() => { setIsOpen({ toggle: false }) }} className='close' alt="" />
                    {
                        type === "login" || type === "create" ?
                            <div className="mp_head">
                                <div
                                    onClick={() => setType('create')}
                                    style={type === "create" ? { 'backgroundColor': 'green' } : { 'backgroundColor': 'gray' }}>
                                    {Locale[state.lang].Signin}
                                </div>
                                <div
                                    onClick={() => setType('login')}
                                    style={type === "login" ? { 'backgroundColor': 'green' } : { 'backgroundColor': 'gray' }}>
                                    {Locale[state.lang].Signup}
                                </div>
                            </div>
                            : null
                    }
                    {
                        type === "login" ?
                            <form onSubmit={SignUp}>
                                <div className="login">
                                    <div className="mp_input">
                                        <span>{Locale[state.lang].YourPhoneNumber}</span>
                                        <input name="phone" type="text" />
                                    </div>
                                    <div className="mp_input">
                                        <span>
                                            {Locale[state.lang].YourName}
                                        </span>
                                        <input name='username' type="text" />
                                    </div>
                                    <div className="mp_input">
                                        <span>
                                            {Locale[state.lang].Password}
                                        </span>
                                        <input name="password" type="password" />
                                    </div>
                                    <div className="mp_input">
                                        <span>
                                            {Locale[state.lang].ConfirmPass}
                                        </span>
                                        <input name="confirm_password" type="password" />
                                    </div>
                                    <div className="mp_aggree">
                                        <div>
                                            <input type="checkbox" />
                                            <span>
                                                {Locale[state.lang].Duzgun}
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'center', padding: 0, marginTop: '10px' }}>
                                        <input type={"submit"} className="mp_btn" value={Locale[state.lang].Register} />
                                    </div>
                                </div>
                            </form>
                            : type === "create" ?
                                <form onSubmit={Login}>
                                    <div className="login">
                                        <div className="mp_input">
                                            <span>
                                                {Locale[state.lang].YourName}
                                            </span>
                                            <input type="text" name="username" />
                                        </div>
                                        <div className="mp_input">
                                            <span>
                                                {Locale[state.lang].Password}
                                            </span>
                                            <input type="password" name='password' />
                                        </div>
                                        <div className="mp_aggree">
                                            <div>
                                                <input onChange={() => setRememberMe(!rememberMe)} id="remember" checked={rememberMe} type="checkbox" />
                                                <label htmlFor="remember" style={{ cursor: 'pointer' }}>{Locale[state.lang].RemerberMe}</label>
                                            </div>
                                            <div onClick={() => { setType("forget"), setForgotPass(true) }}>{Locale[state.lang].ForgotPass}</div>
                                        </div>
                                        <p style={{ textAlign: 'center' }}>
                                            <input type='submit' className="mp_btn" value={Locale[state.lang].Signin} />
                                        </p>
                                    </div>
                                </form>
                                : type === "forget" ?
                                    <form onSubmit={forgotNumber} style={{ width: '100%' }}>
                                        {Locale[state.lang].EnterPhoneNumberForConfirmCode}
                                        <div className="mp_input" >
                                            {Locale[state.lang].YourPhoneNumber}
                                            <input type="text" name="phone" />
                                        </div>
                                        <p style={{ textAlign: 'center' }}>
                                            <input type='submit' className="mp_btn" value={Locale[state.lang].Send} />
                                        </p>
                                    </form>
                                    : type === "check" ?
                                        <form onSubmit={Check} style={{ width: '100%' }}>
                                            <p style={{ margin: '0px !important' }}>{Locale[state.lang].CheckPass}</p>
                                            <input className="check_input1" maxLength={6} pattern="[0-9]{6}" onChange={(e) => { setNumb(e.target.value.split("")) }} />
                                            <div className="check_numb1">
                                                <div>{numb[0] != null ? numb[0] : ""}</div>
                                                <div>{numb[1] != null ? numb[1] : ""}</div>
                                                <div>{numb[2] != null ? numb[2] : ""}</div>
                                                <div>{numb[3] != null ? numb[3] : ""}</div>
                                                <div>{numb[4] != null ? numb[4] : ""}</div>
                                                <div>{numb[5] != null ? numb[5] : ""}</div>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                Отправить код снова
                                                <input type="submit" className="mp_btn" value='Отправить' />
                                            </div>
                                        </form>
                                        : type === 'forget_next' && <form onSubmit={forgetNext} style={{ width: '100%' }}>
                                            {Locale[state.lang].ConfirmPassword}
                                            <input className="check_input" maxLength={6} pattern="[0-9]{6}" onChange={(e) => { setNumb(e.target.value.split("")) }} />
                                            <div className="check_numb">
                                                <div>{numb[0] != null ? numb[0] : ""}</div>
                                                <div>{numb[1] != null ? numb[1] : ""}</div>
                                                <div>{numb[2] != null ? numb[2] : ""}</div>
                                                <div>{numb[3] != null ? numb[3] : ""}</div>
                                                <div>{numb[4] != null ? numb[4] : ""}</div>
                                                <div>{numb[5] != null ? numb[5] : ""}</div>
                                            </div>
                                            <div className="mp_input">
                                                {Locale[state.lang].Password}
                                                <input type="text" name='password' />
                                            </div>
                                            <div className="mp_input">
                                                {Locale[state.lang].ConfirmPass}
                                                <input type="password" name='confirm_password' />
                                            </div>
                                            <p style={{ textAlign: 'center' }}>
                                                <input type='submit' className="mp_btn" value={Locale[state.lang].Save} />
                                            </p>
                                        </form>
                    }
                </div>
            </>
        )
    }
}

export default Popup;