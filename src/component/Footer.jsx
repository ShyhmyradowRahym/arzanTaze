import { Link } from "react-router-dom";
import { Constant, Fetch, Locale, Tool } from "../common";

import InfoIcon from "./icons/Info";
import EditIcon from "./icons/Edit";
import IncomingCall from "./icons/IncomingCall";
import DownloadIcon from "./icons/Download";

import InstagramIcon from './icons/Instagram'
import TikTokIcon from './icons/TikTok'
import YoutubeIcon from './icons/Youtube'

import Google from '../assets/googleplay.png'
import Apple from '../assets/appstore.png'
import { useAppContext } from "../Context";
import { toast } from "react-toastify";
import Logo from './icons/logo1.svg'
import FAQ from './icons/faq.svg'
import footerLogo from './icons/footerLogo.svg'
import Wishlist from './icons/wishlist.png'
function Index() {
  const { state } = useAppContext()
  const handleClick = () => {
    Fetch("get-inc-web-android-downloads", { "method": "GET", "redirect": "follow" }).then((res) => {
      if (res.error) throw new Error(Tool.getStd(state.lang, "text", res.message));
    }).catch((err) => toast.error(err.message));
  }
  return (
    <footer id="footer">
      <div className="container grid-3" style={{ padding: "2rem 0" }}>
        <div className="footer-one">
          <ul className="info-arzan">
            <li><Link to={Constant._wishlist} style={{ display: 'flex', alignItems: 'center' }}><img src={Wishlist} alt="" width='22px' style={{ marginRight: '15px' }} />Wishlist</Link></li>
            <li><Link to={Constant._faq} style={{ display: 'flex', alignItems: 'center' }}><img src={FAQ} alt="" width='22px' style={{ marginRight: '15px' }} />FAQ</Link></li>
            <li><Link to={Constant._aboutUs}><InfoIcon /> {Locale[state.lang].AboutUs}</Link></li>
            <li><Link to={Constant._termsOfUse}><EditIcon /> {Locale[state.lang].TermsOfUse}</Link></li>
            <li><Link to={Constant._contactUs}><IncomingCall /> {Locale[state.lang].Contact}</Link></li>
            <li onClick={() => handleClick()}><a href="/last.apk" download><DownloadIcon /> {Locale[state.lang].Download} Arzan.apk</a></li>
          </ul>
        </div>
        <div className="f-center">
          <div className="footer-logo">
            <img src={footerLogo} className='footer1' />
            <img src={Logo} className='footer2' />
          </div>
          <p>
            {Locale[state.lang].FooterText}
          </p>
        </div>
        <div className="social-media">
          <ul>
            <li> <a target="_blank" href="https://www.youtube.com/channel/UC87LcYTNsVhadgUsdP08LfQ"><YoutubeIcon /></a> </li>
            <li> <a target="_blank" href="https://www.tiktok.com/@arzan_tm"><TikTokIcon /></a> </li>
            <li> <a target="_blank" href="https://www.instagram.com/arzan_tm/"><InstagramIcon /></a> </li>
          </ul>
          <div>
            <a target="_blank" href="https://play.google.com/store/apps/details?id=arzan.tm"><img alt="APpS" src={Google} /></a>
            <a target="_blank" href='https://apps.apple.com/us/app/arzantm/id6444165631'><img alt="APpS" src={Apple} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Index;
