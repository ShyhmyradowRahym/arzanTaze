import '../RecommendedDiscounts/style.css'
import '../Home/style.css'
import './style.css'
import OfficialAcc from '../../component/icons/official_acc.png'
import starIcon from '../../component/icons/starIcon.svg'
import DepositIcon from '../../component/icons/deposit1.png'
import Users from '../../component/icons/users.png'
import Calendar from '../../component/icons/calendar.png'
import Post from '../../component/icons/post.png'
import UserAdd from '../../component/icons/user-add.png'
import Messages from '../../component/icons/messages-3.png'
import Heart from '../../component/icons/heart.png'
import People from '../../component/icons/people.png'
import { useState } from 'react'
import { Locale } from '../../common'
import { useAppContext } from '../../Context'



export default function OfficialAccauntAction() {
    const [type, setType] = useState('main');
    const { state } = useAppContext()
    return (
        <div className="constant-page">
            <div style={{ display: [1].length ? 'block' : 'none' }}>
                <div className="profile">

                    <div style={{ position: 'relative', width: '100%' }}>
                        <img src={OfficialAcc} className='off_profile' alt="" />
                        <span className="system_ballow">Система Баллов</span>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <div className='offaccaction-title'>
                            <img src={starIcon} alt="" />
                            <span className='title'>Ynamdar.tm</span>
                        </div>
                        <div className='offaccaction-title'>
                            <span className='title' style={{ color: '#259F31', marginRight: '5px', fontWeight: '500' }}>200.50</span>
                            <img src={DepositIcon} alt="" />
                        </div>
                        <center>
                            <div className="mp_head1" style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                                <div
                                    onClick={() => setType('main')}
                                    style={type === "main" ? { 'background': '#3BC624' } : { 'backgroundColor': '#F6F6F6', color: '#625F5F' }}>
                                    {Locale[state.lang].MyAction}
                                </div>
                                <div
                                    onClick={() => setType('main1')}
                                    style={type === "main1" ? { 'background': '#3BC624' } : { 'backgroundColor': '#F6F6F6', color: '#625F5F' }}>
                                    {Locale[state.lang].TheArrivals}
                                </div>
                            </div>
                        </center>
                        <div className='offaccaction-body'>
                            <span>{Locale[state.lang].Types}:</span>
                            <span>{Locale[state.lang].Action}</span>
                        </div>
                        {type === 'main' ? <div>
                            <div className='ballow'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={Users} alt="" />
                                    <span>{Locale[state.lang].ReferenceCode}</span>
                                </div>
                                <span>12</span>
                            </div>
                            <div className='ballow'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={Heart} alt="" />
                                    <span>{Locale[state.lang].LikeCount}</span>
                                </div>
                                <span>12</span>
                            </div>
                            <div className='ballow'>
                                <div style={{ display: 'flex' }}>
                                    <img src={Calendar} alt="" />
                                    <span>{Locale[state.lang].dayEntry}</span>
                                </div>
                                <span>12</span>
                            </div>
                            <div className='ballow'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={Post} alt="" />
                                    <span>{Locale[state.lang].PostedPost}</span>
                                </div>
                                <span>12</span>
                            </div>
                            <div className='ballow'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={UserAdd} alt="" />
                                    <span>{Locale[state.lang].Follow}</span>
                                </div>
                                <span>12</span>
                            </div>
                            <div className='ballow'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={starIcon} alt="" />
                                    <span>{Locale[state.lang].OfficialStatus}</span>
                                </div>
                                <span>12</span>
                            </div>
                            <div className='ballow'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={Messages} alt="" />
                                    <span>{Locale[state.lang].Comments}</span>
                                </div>
                                <span>12</span>
                            </div>
                        </div> : <div>
                            <div className='ballow'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={Heart} alt="" />
                                    <span>{Locale[state.lang].LikeCount}</span>
                                </div>
                                <span>12</span>
                            </div>
                            <div className='ballow'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={UserAdd} alt="" />
                                    <span>{Locale[state.lang].Follow}</span>
                                </div>
                                <span>12</span>
                            </div>
                            <div className='ballow'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={Messages} alt="" />
                                    <span>{Locale[state.lang].Comments}</span>
                                </div>
                                <span>12</span>
                            </div>
                            <div className='ballow'>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={People} alt="" />
                                    <span>{Locale[state.lang].Visitors}</span>
                                </div>
                                <span>12</span>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div >
    )
}
