import Head from "next/head";
import React from 'react';
import { useState, useContext } from "react";
import { Inter } from "next/font/google";
import { FileUpload } from "primereact/fileupload";
import Link from 'next/link';

import AppContext from "./appContext";

import SpotifyLogin from "./components/SpotifyLogin";


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

    // }
  };
  return (
    <div className="bg-black">
      <main>

        <h1 className="text-white">SyneSound</h1>
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

        <div>
          <h1>Start by login on your Spotify</h1>
          <div>
            <SpotifyLogin />
          </div>

          <FileUpload
            name="demo"
            url={"/api/upload"}
            multiple
            accept="image/*"
            maxFileSize={1000000}
            emptyTemplate={
              <p className="m-0">Drag and drop files to here to upload.</p>
            }
            onUpload={onUpload}
          />
          {/* {context.imgUrl && <div><img src={context.imgUrl} /></div>} */}
        </div>

        <div>

          <h2>
            <Link href="/posts/player">get</Link>
          </h2>
        </div>
      </main>


    </div>
  );
}

