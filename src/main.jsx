import React from "react"
import { Suspense, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import { Provider } from "./Context";
import { Constant } from './common';

import Footer from './component/Footer';
import Navbar from './component/Navbar';



import {
  Home,
  RecommendedDiscounts,
  Privacy,
  AboutUs,
  TopUsers,
  Discounts,
  Discount,
  ContactUs,
  TermsOfUse,
  AddPost,
  Product,
  Recommended,
  Settings,
  Hashtags,
  Profile,
  FAQ,
  UserDiscounts,
  Notifications,
  Gallery,
  OfficialAcc,
  Notification,
  ProfileOfficial,
  Comments,
  SystemBallow,
  StatusAccaunts,
  OfficialAccauntAction,
  BuyingBall,
  SendingPoints,
  AskPoints,
  NewsletterUser,
  Wishlist
} from './container';

import 'react-toastify/dist/ReactToastify.css';
import './assets/global.css'
import './assets/fonts.css'
import './assets/slick.min.css'
const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children
}
ReactDOM.createRoot(document.getElementById("a31a391851984167c4cf85c3766f6c76")).render(
  <Provider>
    <Router onUpdate={() => window.scrollTo(0, 0)} >
      <Navbar />
      <Suspense fallback={<div> Something went wrong </div>}>
        <Wrapper>

          <Routes>
            <Route path={Constant._home} element={<Home />} />
            <Route path={Constant._recommendedDiscounts} element={<RecommendedDiscounts />} />

            <Route path={Constant._recommendedDiscounts + ":recommend_id"} element={<Recommended />} />
            <Route path={Constant._privacy} element={<Privacy />} />
            <Route path={Constant._aboutUs} element={<AboutUs />} />
            <Route path={Constant._topUsers} element={<TopUsers />} />
            <Route path={Constant._discounts} element={<Discounts />} />
            <Route path={Constant._contactUs} element={<ContactUs />} />
            <Route path={Constant._termsOfUse} element={<TermsOfUse />} />

            <Route path={Constant._addPost} element={<AddPost />} />
            <Route path={Constant._product} element={<Product />} />

            <Route path={Constant._discounts + ":discount_id"} element={<Discount />} />
            <Route path={Constant._userDiscounts + ":discount_id"} element={<UserDiscounts />} />
            <Route path={Constant._settings} element={<Settings />} />
            <Route path={Constant._hashtags + ":id"} element={<Hashtags />} />
            <Route path={Constant._notification + ":notification_id"} element={<Notification />} />
            <Route path={Constant._notifications} element={<Notifications />} />
            <Route path={Constant._gallery} element={<Gallery />} />
            <Route path={Constant._offacc} element={<OfficialAcc />} />
            <Route path={Constant._profile} element={<Profile />} />
            <Route path={Constant._comments} element={<Comments />} />
            <Route path={Constant._profileOfficial} element={<ProfileOfficial />} />
            <Route path={Constant._systemBallow} element={<SystemBallow />} />
            <Route path={Constant._offStatus} element={<StatusAccaunts />} />
            <Route path={Constant._OffAccAction} element={<OfficialAccauntAction />} />
            <Route path={Constant._BuyingBall} element={<BuyingBall />} />
            <Route path={Constant._SendingPoints} element={<SendingPoints />} />
            <Route path={Constant._AskPoints} element={<AskPoints />} />
            <Route path={Constant._NewsletterUser} element={<NewsletterUser />} />
            <Route path={Constant._faq} element={<FAQ />} />
            <Route path={Constant._wishlist} element={<Wishlist />} />
            <Route path='*' element={<div>Not Found Page</div>} />
          </Routes>
        </Wrapper>
      </Suspense>
      <Footer />
      <ToastContainer />
    </Router>
  </Provider>
)
