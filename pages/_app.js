import { useMemo, useState } from "react";
import '@/styles/globals.css';
import AppContext from "../appContext";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";



export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [imgUrl, setImgUrl] = useState("");
  const [color, setColor, search, setSearch] = useState([]);

  const value = useMemo(() => ({ imgUrl, setImgUrl, color, setColor, search, setSearch }), [imgUrl]);

  // return (<AppContext.Provider value={{ imgUrl, setImgUrl, color, setColor }}><Component {...pageProps} /></AppContext.Provider>)

  console.log(process.env);


  return (

    <SessionProvider>
      <RecoilRoot>
        <AppContext.Provider value={value} initialData={pageProps?.initialData} ><Component {...pageProps} /></AppContext.Provider>
      </RecoilRoot>

    </SessionProvider>
  )
}
