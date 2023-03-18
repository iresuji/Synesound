import { useMemo, useState } from "react";
import '@/styles/globals.css';
import AppContext from "../appContext";
import { SessionProvider } from "next-auth/react";


export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [imgUrl, setImgUrl] = useState("");
  const value = useMemo(() => ({ imgUrl, setImgUrl }), [imgUrl]);

  return (

    <SessionProvider>
      <AppContext.Provider value={value} initialData={pageProps?.initialData} ><Component {...pageProps} /></AppContext.Provider>)

    </SessionProvider>
  )
}
