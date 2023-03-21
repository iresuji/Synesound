import { useState } from "react";
import '@/styles/globals.css';
import AppContext from "./appContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



export default function App({ Component, pageProps }) {
  const [imgUrl, setImgUrl] = useState("");
const imageDetails = {
    width: 524,
    height: 650,
  };
  return (
  <AppContext.Provider
   
  imageDetails={imageDetails} 
  value={{ imgUrl, setImgUrl }}>
    <Component {...pageProps} />
  </AppContext.Provider>)


  
}