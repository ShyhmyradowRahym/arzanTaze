import { useEffect, useState } from "react";
import { Tool, Util, Fetch, Locale } from '../../common'
import { useAppContext } from "../../Context";
import { toast } from "react-toastify";
import Close from '../../component/icons/close.svg'
import Loader from '../../component/Loader'
function RD() {
    const { state } = useAppContext()
    const [loading, setLoading] = useState(false)
    const handleContact = (e) => {
        e.preventDefault();
        {
            Util.getCookie("username") ? Fetch("add-feedback", { "method": "PATCH", body: { "contact": e.target.elements.email.value, "content": e.target.elements.text.value }, redirect: "follow" }).then((res) => {
                if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
                setLoading(true)
                if (res.body === 'SUCCESS') {
                    setLoading(false)
                    toast.success("Tekst ugradyldy...")
                }
            }).catch((err) => toast.error(err.message))
            : toast.error("Ulanyjy boluň")
        }
    }
    if (loading) {
        return <Loader />
    }
    return (
        <div style={{ maxWidth: "100vw", overflow: "hidden", marginBottom: 20 }}>
            <form onSubmit={handleContact} className="constant-page">
                <div className="mp_input">
                    {Locale[state.lang].Email}
                    <input type="text" name='email' />
                </div>
                <div className="mp_input">
                    {Locale[state.lang].Text}
                    <textarea type='text' name="text" style={{ 'height': '100px' }} />
                </div>
                <p style={{ textAlign: 'center' }}>
                    <input type='submit' className="mp_btn" value={Locale[state.lang].Send} />
                </p>
            </form>
        </div>
    )
}

export default RD;