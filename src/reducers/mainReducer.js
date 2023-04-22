import { Util } from '../common';
function language(state, action) {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      Util.setCookie("lang", action.lang, 365);
      return { ...state, lang: action.lang };

    case "LOGIN_USER": {
      let user = action.user || {};
      let date = action.date || {};
      Util.setCookie("day", String(date), date)
      Util.setCookie("user_id", String(user.user_id), date);
      Util.setCookie("username", String(user.username), date);
      Util.setCookie("phone", String(user.phone), date);
      Util.setCookie("token", String(user.token), date);
      Util.setCookie("score", String(user.score), date);
      Util.setCookie("follower_count", String(user.follower_count), date);
      Util.setCookie("avatar", String(user.avatar), date)
      return { ...state, token: user.token, user_id: user.user_id, username: user.username, phone: user.phone, score: user.score, follower_count: user.follower_count, avatar: user.avatar };
    }
    case "LOGOUT_USER": {
      let date = action.date || {};
      Util.eraseCookie("user_id", date);
      Util.eraseCookie("username", date);
      Util.eraseCookie("phone", date);
      Util.eraseCookie("token", date);
      Util.eraseCookie("score", date);
      Util.eraseCookie("follower_count", date);
      Util.eraseCookie('avatar', date)
      return { ...state, username: undefined, token: undefined, user_id: undefined, phone: undefined, score: undefined, follower_count: undefined, avatar: undefined };
    }

    case "SET_REGIONS": {
      Util.setSession("a-regions-1", JSON.stringify(action.regions))
      return { ...state, regions: action.regions }
    }

    case "SET_CURRENT_REGION": {
      Util.setItem("region", action.region_id)
      return { ...state, currentRegion: action.region_id }
    }



    default:
      return state;
  }
}

export default language;