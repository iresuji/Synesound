import { useState } from "react";
import '@/styles/globals.css'
import AppContext from "./appContext";


export default function App({ Component, pageProps }) {
  const [imgUrl, setImgUrl] = useState("");

  return (<AppContext.Provider value={{ imgUrl, setImgUrl }}><Component {...pageProps} /></AppContext.Provider>)
}