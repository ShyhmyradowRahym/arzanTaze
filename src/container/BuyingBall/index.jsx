import '../../container/StatusAccaunts/style.css'
import '../Home/style.css'
import './style.css'
import OfficialAcc from '../../component/icons/official_acc.png'
import DepositIcon from '../../component/icons/deposit1.png'
import { Locale } from '../../common'
import { useAppContext } from '../../Context'



export default function BuyingBall() {
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
                            <div className='ballow'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input name='ballow' id='10 ball' type="radio" style={{ width: '20px', height: '20px', margin: '0px' }} />
                                    <label htmlFor='10 ball' style={{ margin: '0px 4px', cursor: 'pointer' }}>10 ball</label>
                                    <img src={DepositIcon} alt="" />
                                </div>
                                <span>1 TMT</span>
                            </div>
                            <div className='ballow'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input name='ballow' id='30 ball' type="radio" style={{ width: '20px', height: '20px', margin: '0px' }} />
                                    <label htmlFor='30 ball' style={{ margin: '0px 4px', cursor: 'pointer' }}>30 ball</label>
                                    <img src={DepositIcon} alt="" />
                                </div>
                                <span>2 TMT</span>
                            </div>
                            <div className='ballow'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input name='ballow' id='50 ball' type="radio" style={{ width: '20px', height: '20px', margin: '0px' }} />
                                    <label htmlFor='50 ball' style={{ margin: '0px 4px', cursor: 'pointer' }}>50 ball</label>
                                    <img src={DepositIcon} alt="" />
                                </div>
                                <span>3 TMT</span>
                            </div>
                            <div className='ballow'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input name='ballow' id='100 ball' type="radio" style={{ width: '20px', height: '20px', margin: '0px' }} />
                                    <label htmlFor='100 ball' style={{ margin: '0px 4px', cursor: 'pointer' }}>100 ball</label>
                                    <img src={DepositIcon} alt="" />
                                </div>
                                <span>5 TMT</span>
                            </div>
                            <div className='ballow'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input name='ballow' id='500 ball' type="radio" style={{ width: '20px', height: '20px', margin: '0px' }} />
                                    <label htmlFor='500 ball' style={{ margin: '0px 4px', cursor: 'pointer' }}>500 ball</label>
                                    <img src={DepositIcon} alt="" />
                                </div>
                                <span>20 TMT</span>
                            </div>
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
