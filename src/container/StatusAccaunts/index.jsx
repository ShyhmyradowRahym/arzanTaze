
import '../Home/style.css'
import './style.css'
import OfficialAcc from '../../component/icons/official_acc.png'
import { Locale } from '../../common'
import { useAppContext } from '../../Context'
import starIcon from '../../component/icons/starIcon.svg'
import BottomIcon from '../../component/icons/bottom.png'
import DepositIcon from '../../component/icons/deposit.png'
import QRCode from "react-qr-code";
import { useState } from 'react'



export default function StatusAccaunts() {
    const { state } = useAppContext();
    const [storyBall, setStoryBall] = useState(false)
    return (
        <div className="constant-page">
            <div style={{ display: [1].length ? 'block' : 'none' }}>
                <div className="">

                    <div style={{ position: 'relative', width: '100%' }}>
                        <img src={OfficialAcc} className='off_profile' alt="" />
                        <span className="system_ballow">{Locale[state.lang].StatusAcc}</span>
                    </div>
                    <div style={{ marginTop: '20px', width: '100%' }}>
                        <p style={{ textAlign: 'center', fontWeight: '600', fontSize: '1.1em' }}>@ynamdar.com.tm</p>
                        <div className='ballow' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ marginRight: '5px' }}>3000</span>
                                <img src={starIcon} alt="" />
                            </div>
                            <h1 className='tooltip'>{Locale[state.lang].YouBalance}</h1>
                        </div>
                        <center>
                            <button className='button'>{Locale[state.lang].Participate}</button>
                        </center>
                        <div className='ballow' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ marginRight: '5px' }}>0</span>
                                <img src={DepositIcon} alt="" />
                            </div>
                            <h1 className='tooltip'>{Locale[state.lang].Competitive}</h1>
                        </div>
                        <center>
                            <span style={{ fontWeight: '600', fontSize: '1.1em' }}>{Locale[state.lang].ReferenceCode}: 202323654897</span>
                        </center>
                        <div style={{ height: "auto", margin: "10px auto", maxWidth: 80, width: "100%" }}>
                            <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={'Rahym'}
                            />
                        </div>
                        <center>
                            <span style={{ fontWeight: '600', fontSize: '1.1em', marginBottom: '10px' }}>{Locale[state.lang].AccExpirationDate}</span>
                        </center>
                        <div className='expiration-date'>
                            <div className='ballow1' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ marginRight: '5px' }}>22.01.2022</span>
                                <h1 className='tooltip'>{Locale[state.lang].Begins}</h1>
                            </div>
                            <span className='ver_line'></span>
                            <div className='ballow1' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ marginRight: '5px' }}>22.01.2023</span>
                                <h1 className='tooltip'>{Locale[state.lang].Ends}</h1>
                            </div>
                        </div>
                        <center>
                            <button className='button'>{Locale[state.lang].Extend}</button>
                        </center>
                        <div className='ballow' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <div onClick={() => setStoryBall(!storyBall)} style={{ cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ marginRight: '5px' }}>{Locale[state.lang].HistoryOfAllActions}</span>
                                <img style={{ transform: storyBall ? `scaleY(${-1})` : '', transition:'.5s all' }} className='right_chron' src={BottomIcon} alt="" />
                            </div>
                            <h1 className='tooltip'>{Locale[state.lang].Competitive}</h1>
                            {storyBall && <div style={{ width: '100%', transition:'.5s all' }}> <div className='expiration-date1'>
                                <div className='ballow1' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ marginRight: '5px' }}>22.01.2022</span>
                                    <h1 className='tooltip'>{Locale[state.lang].Begins}</h1>
                                </div>
                                <span className='ver_line'></span>
                                <div className='ballow1' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ marginRight: '5px' }}>22.01.2023</span>
                                    <h1 className='tooltip'>{Locale[state.lang].Ends}</h1>
                                </div>
                            </div>
                                <div className='expiration-date1'>
                                    <div className='ballow1' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ marginRight: '5px' }}>22.01.2022</span>
                                        <h1 className='tooltip'>{Locale[state.lang].Begins}</h1>
                                    </div>
                                    <span className='ver_line'></span>
                                    <div className='ballow1' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ marginRight: '5px' }}>22.01.2023</span>
                                        <h1 className='tooltip'>{Locale[state.lang].Ends}</h1>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
