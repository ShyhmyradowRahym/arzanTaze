import { useReducer, createContext, useContext } from "react";
import MainReducer from "./reducers/mainReducer";
import { Util } from "./common";


// initial state
const initialState = {
  lang: Util.getCookie("lang") || "tm",  
  surname: Util.getCookie("a-surname"),
  token: Util.getCookie("a-token"),
  name: Util.getCookie("a-name"),
  user_id: Number(Util.getCookie("a-user_id")),
  date_birth: Util.getCookie("a-date_birth"),
  email: Util.getCookie("a-email"),
  phone: Util.getCookie("a-phone"),
  regions: Util.getRegions(),
  currentRegion: Util.getItem("region")||1
};

// create context
const Context = createContext(initialState);

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(MainReducer, initialState);
  return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
};

const useAppContext = () => useContext(Context);

export { Context, Provider,  useAppContext};