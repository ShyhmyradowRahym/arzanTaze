import '../../container/StatusAccaunts/style.css'
import '../Home/style.css'
import './style.css'
import OfficialAcc from '../../component/icons/official_acc.png'
import { Locale } from '../../common'
import { useAppContext } from '../../Context'



export default function AskPoints() {
    const { state } = useAppContext()
    return (
        <div className="constant-page">
            <div style={{ display: [1].length ? 'block' : 'none' }}>
                <div className="profile">

                    <div style={{ position: 'relative', width: '100%' }}>
                        <img src={OfficialAcc} className='off_profile' alt="" />
                        <span className="system_ballow">Система Баллов</span>
                    </div>
                    <div style={{ marginTop: '25px' }}>
                        <form>
                            <center>
                                <div className="user-input-wrp">
                                    <input type="text" className="inputText" required />
                                    <span className="floating-label">Сколько</span>
                                </div>
                            </center>
                            <center>
                                <div className="user-input-wrp">
                                    <input type="text" className="inputText" required />
                                    <span className="floating-label">Кому</span>
                                </div>
                            </center>
                            <center>
                                <div className="user-textarea-wrp">
                                    <textarea type="text" className="inputText" required />
                                    <span className="floating-label">Текст</span>
                                </div>
                            </center>

                            <center>
                                <button className='button'>{Locale[state.lang].Send}</button>
                            </center>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}
