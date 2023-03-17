import Head from 'next/head'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import AppContext from '../appContext';
import { useState, useContext } from "react";
import AudioPlayer from '../components/AudioPlayer';



export default function player() {
    const context = useContext(AppContext)

    const colors = context.colors

    return (
        <>
            <div className="bg-black" >
                <main>
                    <div>

                        {context.imgUrl && <img src={context.imgUrl} />}
                    </div>

                    <div>
                        <h1>
                            Here's your synesound
                        </h1>
                    </div>

                    <div>
                        <AudioPlayer />
                    </div>
                    <div>
                        <h3>
                            <Link className='text-white' href="/">Back to home</Link>

                        </h3>

                    </div>

                </main>


            </div>
        </>

    );
}