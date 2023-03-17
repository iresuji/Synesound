// import Link from 'next/link';
import AppContext from '../../appContext';
import { useContext } from "react";
import AudioPlayer from '../components/AudioPlayer';
import { useRouter } from 'next/router';


export default function Player() {
    const context = useContext(AppContext)
    const router = useRouter()

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
                            <button type="button" onClick={() => router.replace('/')}>
                                Back home
                            </button>

                            {/* <Link className='text-white' href="/">Back to home</Link> */}

                        </h3>

                    </div>

                </main>


            </div>
        </>

    );
}