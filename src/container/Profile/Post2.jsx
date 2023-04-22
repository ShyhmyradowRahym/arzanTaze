import React, { useState, useRef, useEffect } from 'react'
import { Constant, Fetch, Locale, Tool, Util } from '../../common';
import More from '../../component/icons/more.png'
import Edit from '../../component/icons/edit.png'
import Trash from '../../component/icons/trash.png'
import Refresh from '../../component/icons/refresh.png'
import EyeIcon from '../../component/icons/eye.png'
import { useAppContext } from '../../Context'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
export default function Post2({ rd, setData, status }) {
    const { state } = useAppContext()
    const [postEdit, setPostEdit] = useState(false)
    const elementEdit = useRef(null)
    const deletePost = (id) => {
        Fetch("remove-discount2", { "method": "DELETE", body: { discount_id: id }, headers: { Region: state.currentRegion } }).then((res) => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));

            if (res.body === 'SUCCESS') {
                setData(d => {
                    d = d.filter(e => e.discount_id !== id)
                    return d;
                })
            }
        }).catch((err) => toast.error(err.message))
    }
    const refreshPost = (id) => {
        Fetch("discount-refresh0-position", { "method": "POST", body: { discount_id: id }, headers: { Region: state.currentRegion } }).then((res) => {
            if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
            console.log(res);

            if (res.body === 'SUCCESS') {
                toast.success('Postyň wagty üýtgedildi')
                setPostEdit(false)
            }
            if (res.message) {
                toast.error(res.message.text)
                setPostEdit(false)
            }
        }).catch((err) => toast.error(err.message))
    }
    useEffect(() => {
        function handler(event) {
            if (!elementEdit.current?.contains(event.target)) {
                setPostEdit(false)
            }
        }
        window.addEventListener('click', handler)
        return () => window.removeEventListener('click', handler)
    }, [])
    return (
        <div style={{position:'relative'}}>
            <div className="post-edit" ref={elementEdit}>
                <img onClick={() => setPostEdit(!postEdit)} className="profile_more" src={More} alt="" />
                <div style={{ display: postEdit ? 'flex' : 'none' }} className="profile_more-links">
                    {/* <div style={{ display: 'flex', alignItems: 'center' , cursor:'pointer' }}>
                                                        <img className="EditIcon" src={Edit} alt="" />
                                                        <span>{Locale[state.lang].PostEdit}</span>
                                                    </div> */}

                    {status === "active" && <div onClick={() => refreshPost(rd.discount_id)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', marginBottom: '5px' }}>
                        <img className="EditIcon" src={Refresh} alt="" />
                        <span>{Locale[state.lang].PostRefresh}</span>
                    </div>}
                    <div onClick={() => deletePost(rd.discount_id)} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                        <img className="EditIcon" src={Trash} alt="" />
                        <span style={{ color: 'red', fontWeight: '400' }}>{Locale[state.lang].PostDelete}</span>
                    </div>

                </div>
            </div>
            <Link to={Constant._userDiscounts + rd.discount_id} style={{ textDecoration: 'none', color: 'black' }} key={rd.discount_id}>
                <div className="discount-list1-cart" >
                    <img className='discount-list1-cart_img' src={rd.image} />
                    <div className="discount-list1-cart_body" style={{ color: 'black !important' }}>
                        <p className="discount-list1-cart_title">{rd.title}</p>
                        <p className="discount-list1-cart_content" style={{ fontSize: ".9em" }} dangerouslySetInnerHTML={{ __html: rd.content }}></p>
                        <div className="discount-list1-cart_footer">
                            <p style={{ marginRight: '30px', fontSize: "0.9rem" }}>{Util.dateFormat(new Date(rd.created_at), '%d-%m-%Y', true)}</p>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={EyeIcon} alt="" style={{ width: '25px', marginRight: '5px' }} />
                                <p>{rd.views}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}