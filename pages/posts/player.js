// import Link from 'next/link';
import AppContext from '../../appContext';
import { useContext } from "react";
import AudioPlayer from '../components/AudioPlayer';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';



export default function Player() {
    const { data: session } = useSession();

    const context = useContext(AppContext)
    const router = useRouter()

    return (

        <div className="bg-black" >
            <header className='absolute top-5 right-8'>
                <div className='flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'>
                    <img className='"rounded-full w-10 h-10' src={session?.user.image} alt="" />
                    <h2>{session?.user.name} </h2>
                    <ChevronDownIcon className='h-5 w-5' />
                </div>
            </header>

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
                    <button className=" flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>
                        <p>Logout from Spotify</p>
                    </button>

                </div>
                <div>
                    <h3>
                        <button type="button" onClick={() => router.replace('/')}>
                            Back home
                        </button>

                        {/* <Link className='text-white' href="/">Back to home</Link> */}

                    </h3>

                </div>

            </main>


        </div>

    );
}