// import Head from "next/head";
import React from 'react';
import { useContext } from "react";
import { Inter } from "next/font/google";
import { FileUpload } from "primereact/fileupload";
import Link from 'next/link';
import { useRouter } from 'next/router';
import SpotifyLogin from "./components/SpotifyLogin";
import { getSession, signOut, useSession } from 'next-auth/react';
import AppContext from "../appContext";
import ImgExtractor from "./api/regim";
import Typewriter from 'typewriter-effect';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const inter = Inter({ subsets: ["latin"] });
export default function Home() {
  const context = useContext(AppContext)
  const onUpload = (event) => {
    console.log(event);
    const file = event.files[0].name;
    context.setImgUrl(`https://synesound-image.fra1.cdn.digitaloceanspaces.com/${file}`);

    ImgExtractor(event.files[0]).then((response) => {
      console.log(response);
    })
    // }

    
  };
  return (
      <main className="bg-gradient-to-b from-black via-purple-300">
       <section className='min-h-[85vh] lg:min-h-[78vh] flex items-center' id='home'>
        <div className='container mx-auto '>   
            <div className='flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-12'></div>
            <div className='flex-1 text-center font-secondary lg:text-center'>
         <h1 className="text-white ">SyneSound</h1>
          <div className='mb-6 text-[14px] lg:text-[24px]
           font-semibold'>
           <h2>
             <Typewriter className="text-white"
               onInit={(typewriter) => {
                 typewriter.typeString('Hi! :) I am Synesound. Welcome to your new experience')
                   .callFunction(() => {
                     console.log('String typed out!');
                   })
                   .pauseFor(2500)
                   // .deleteAll()
                   .callFunction(() => {
                     // console.log('All strings were deleted');
                   })
                   .start();
               }}
             />
           </h2>
          </div>
          
          <h2>Start by login on your Spotify</h2>
        
        <div className='lg:bottom-8 w-full overflow-hidden z-50'>    
          <div className='w-full h-[76px] max-w-[460px] mx-auto px-40'>
            <SpotifyLogin />
          </div>
          <div className='w-full bg-black/20 h-[230px] backdrop-blur-2x1 
            max-w-[500px] mx-auto px-6 flex justify-between items-center' >
          <FileUpload 
            name="demo"
            url={"/api/upload"}
            multiple
            accept="image/*"
            maxFileSize={10000000}
            emptyTemplate={
              <p className="m-0 flex items-center justify-center">Drag and drop files to here to upload.</p>
            }
            onUpload={onUpload}
          />
          {/* {context.imgUrl && <div><img src={context.imgUrl} /></div>} */} 
          </div>          
        </div>       
        </div>
      </div>
     </section> 
     <h3 className="flex-1 text-center font-secondary lg:text-center">
            <Link 
             href="/posts/player">
              Click here to get Synesounded
            </Link>
          </h3>
     <div className='h-[55vh]'></div>
      </main>
      

  );
}



export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    }
  }

}
