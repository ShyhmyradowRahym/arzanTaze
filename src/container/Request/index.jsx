import '../RecommendedDiscounts/style.css'
import '../Home/style.css'
import './style.css'
import Stars from '../../component/icons/stars.png'
import Cart from '../../component/icons/card.png'
import TrashBallow from '../../component/icons/trashballow.png'
import Refresh from '../../component/icons/refresh.png'
import Ballow from '../../component/icons/ballow.png'
import OfficialAcc from '../../component/icons/official_acc.png'


export default function SystemBallow() {
    return (
        <div className="constant-page">
            <div style={{ display: [1].length ? 'block' : 'none' }}>
                <div className="profile">

                    <div style={{ position: 'relative', width: '100%' }}>
                        <img src={OfficialAcc} className='off_profile' alt="" />
                        <span className="system_ballow">Система Баллов</span>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <div className='ballow'>
                            <img src={Stars} alt="" />
                            <span>Купить оффициальную подписку</span>
                        </div>
                        <div className='ballow'>
                            <img src={Ballow} alt="" />
                            <span>Заработок баллов</span>
                        </div>
                        <div className='ballow'>
                            <img src={Refresh} alt="" />
                            <span>Спрашивать баллы</span>
                        </div>
                        <div className='ballow'>
                            <img src={TrashBallow} alt="" />
                            <span>Отправка баллов</span>
                        </div>
                        <div className='ballow'>
                            <img src={Cart} alt="" />
                            <span>Покупка баллов</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
