// import Link from 'next/link';
import AppContext from '../../appContext';
import { useContext, useEffect, useState } from "react";
import AudioPlayer from '../components/AudioPlayer';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from "lodash";

import {AnimatePresence} from 'framer-motion';
import {motion, useTransform, useScroll} from 'framer-motion';

import ntc from '@/lib/ntc';


const transition ={duration: 1.5, ease: [0.6, 0.01, -0.05, 0.9]}; //easing animation

const firstName = {
  
  animate: {
    y:0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: -1,
    }
  }
}

const lastName = {
 
  animate: {
    y: -50,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: 1,
    }
  }
}


const letter = {
  initial: {
    y: 600,
  },
  animate: {
    y: 100,
    transition: {duration: 1, ...transition}
  }

}




export default function Player() {
    const { data: session } = useSession();
    const context = useContext(AppContext);

    const [color, setColor] = useState(null);

    const [gradient, setGradient] = useState('linear-gradient(to bottom, #000000, #000000');

    useEffect(() => {
        const colors = JSON.parse(localStorage.getItem('colors') || '[]');
        if (colors.length > 0) {
            const color = shuffle(colors).pop();
            setGradient(`linear-gradient(to bottom, ${color}, #000000`);
        }
        console.log(colors);
        // setColor(shuffle(colors).pop());
    }, []);

    const window = 1500
   
    const {scrollYProgress}= useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.50]);
  const imageDetails = {
    width: 524,
    height: 650,
  };
  const [canScroll, setCanScroll] = useState(false);




    const router = useRouter();

    return (

      <div className={`flex space-x-7  min-h-screen text-white padding-8 `} style={{ backgroundImage: gradient }} >
        <header className="absolute top-5 right-8 z-10">
          <div
            className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 text-white"
            onClick={() => signOut()}
          >
            <img
              className="rounded-full w-10 h-10"
              src={session?.user.image}
              alt=""
            />
            <h2>{session?.user.name} </h2>
            <p className="opacity-30">Click to sign out</p>
            <ChevronDownIcon className="h-5 w-5" />
          </div>
        </header>

        <main className="flex flex-col items-center min-h-screen w-full justify-center">
          <AnimatePresence>
            <motion.div
              className="single min-h-[85vh] lg:min-h-[78vh] flex items-center"
              id="home"
              onAnimationComplete={() => setCanScroll(true)}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="container fluid mx-auto ">
                <div className="row center top-row flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-12">
                  <div className="top flex-1 text-center font-secondary lg:text-center">
                    <motion.div
                      initial={{
                        // opacity: 0,
                        y: 0,
                        transition: { delay: 1.2, ...transition },
                      }}
                      className="details"
                    >
                      <div className="toptext">
                        <motion.div className="model">
                          <motion.span variants={firstName} className="first">
                            <motion.span variants={letter}>S</motion.span>
                            <motion.span variants={letter}>Y</motion.span>
                            <motion.span variants={letter}>N</motion.span>
                            <motion.span variants={letter}>E</motion.span>
                            <motion.span variants={letter}>S</motion.span>
                            <motion.span variants={letter}>O</motion.span>
                            <motion.span variants={letter}>U</motion.span>
                            <motion.span variants={letter}>N</motion.span>
                            <motion.span variants={letter}>D</motion.span>
                          </motion.span>
                          <motion.span variants={lastName} className="last">
                            <motion.span variants={letter}>S</motion.span>
                            <motion.span variants={letter}>P</motion.span>
                            <motion.span variants={letter}>O</motion.span>
                            <motion.span variants={letter}>T</motion.span>
                            <motion.span variants={letter}>I</motion.span>
                            <motion.span variants={letter}>F</motion.span>
                            <motion.span variants={letter}>Y</motion.span>
                          </motion.span>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </div>
                <div className="row bottom-row">
                  <div className="bottom bottom-2 lg:bottom-8 w-full overflow-hidden z-0">
                    <div className="image-container-single"></div>
                    <motion.div
                      className=""
                      initial={{
                        y: "-50%",
                        width: imageDetails.width,
                        height: imageDetails.height,
                      }}
                      animate={{
                        y: 0,
                        width: "100%",
                        height: window.innerWidth > 1440 ? 400 : 800,
                        transition: { delay: 0.2, ...transition },
                      }}
                    >
                      <div>
                        <div className="frame-single">
                          {context.imgUrl && (
                            <motion.img
                              style={{ scale: scale }}
                              initial={{ scale: 1 }}
                              animate={{
                                transition: { delay: 0.2, ...transition },
                                y: window.innerWidth > 1440 ? -300 : -300,
                              }}
                              src={context.imgUrl}
                            />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div>
                  <AudioPlayer />
                </div>

                <div className="detailed-information">
                  <div className="container">
                    <div className="row">
                      <h2 className="title">
                        The insiration behind SyneSound and <br /> what it
                        means.
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="h-[55vh]"></div>
          <div>
            <button
              className=" flex items-center space-x-2 hover:text-white"
              onClick={() => signOut()}
            >
              <p>Logout from Spotify</p>
            </button>
          </div>
          <div>
            <h3>
              <button type="button" onClick={() => router.replace("/")}>
                Back home
              </button>

              {/* <Link className='text-white' href="/">Back to home</Link> */}
            </h3>
          </div>
        </main>
      </div>
    );
}


            </div>
        </>


