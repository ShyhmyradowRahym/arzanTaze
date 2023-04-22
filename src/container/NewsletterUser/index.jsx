import { useState } from 'react'
import OfficialAcc from '../../component/icons/official_acc.png'
import { Locale } from '../../common'
import { useAppContext } from '../../Context'
import Upload from '../../component/icons/gallery.svg'
import '../AddPost/style.css'
import '../../container/StatusAccaunts/style.css'
import '../Home/style.css'
import './style.css'

export default function NewsletterUser() {
    const { state } = useAppContext()
    const [file, setFile] = useState([])
    const [images, setImages] = useState([])
    const handleFile = (event) => {
        for (let img of event.target.files) {
            setFile(o => [...o, img])
            setImages(o => [...o, URL.createObjectURL(img)])
        }
    }
    return (
        <div style={{ maxWidth: "100vw", overflow: "hidden", marginBottom: 20 }}>

            <div className="constant-page">
                <h1 style={{ fontSize: '1.3em' }}>{Locale[state.lang].addPost}</h1>
                <div className="profile">
                    <div style={{ marginTop: '25px' }}>
                        <form>
                            <center>
                                <div className="user-input-wrp radios">
                                    <input type="file" id='actual-button' onChange={handleFile} multiple hidden />
                                    <label htmlFor='actual-button' style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold', cursor: 'pointer' }}>
                                        <p>Upload photo</p>
                                        <img src={Upload} style={{ width: '30px', marginLeft: 3 }} alt="" />
                                    </label>
                                </div>
                                <div className="user-input-wrp upload-images1">
                                    {images.map(e => (
                                        <img src={e} alt="" />
                                    ))
                                    }
                                </div>
                            </center>
                            <center>
                                <div className="user-textarea-wrp radios">
                                    <textarea type="text" className="inputText" required />
                                    <span className="floating-label">Текст</span>
                                </div>
                            </center>
                            <center>
                                <div className="user-input-wrp radios">
                                    <input type="text" className="inputText" style={{ textAlign: 'left' }} />
                                </div>
                            </center>
                            <center>
                                <div className="radios" style={{ alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <input name='dates' id='at this time' type="radio" />
                                        <label htmlFor='at this time' style={{ margin: '0px 4px', fontSize:'.9em', cursor: 'pointer' }}>Сейчас</label>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input name='dates' id='latest' type="radio"  />
                                            <label htmlFor='latest' style={{ margin: '0px 4px',fontSize:'.9em', cursor: 'pointer' }}>Отложить отправку</label>
                                        </div>
                                    </div>

                                </div>
                                <div className='radios news-dates'>
                                    <input name='add_time' className="" type='date' />
                                    <input name='add_time1' className="" type='time' />
                                </div>
                            </center>
                            <center style={{marginTop:'20px'}}>
                                <button className='button'>{Locale[state.lang].Send}</button>
                            </center>
                        </form>
                    </div>
                </div>
            </div >
        </div>
    )
}
