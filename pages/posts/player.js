// import Link from 'next/link';
import AppContext from '../../appContext';
import { useContext, useEffect, useState } from "react";
import AudioPlayer from '../components/AudioPlayer';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from "lodash";

import { AnimatePresence } from 'framer-motion';
import { motion, useTransform, useScroll } from 'framer-motion';

// import ntc from '@/lib/ntc';


const transition = { duration: 1.5, ease: [0.6, 0.01, -0.05, 0.9] }; //easing animation

const firstName = {

  animate: {
    y: 0,
    transition: {

      staggerChildren: 0.04,
      staggerDirection: -1,
    }
  }
}

const lastName = {

  animate: {
    y: 0,
    transition: {

      staggerChildren: 0.04,
      staggerDirection: 1,
    }
  }
}


const letter = {
  initial: {
    y: 100,
  },
  animate: {
    y: 3,
    transition: { duration: 2, ...transition }
  }

}




export default function Player() {
  const { data: session } = useSession();
  const context = useContext(AppContext);

  // const [color, setColor] = useState(null);

  const [gradient, setGradient] = useState('linear-gradient(to bottom, #000000, #000000');
  const [imageUrl, setImageUrl] = useState("");


  useEffect(() => {
    const colors = JSON.parse(localStorage.getItem('colors') || '[]');
    if (colors.length > 0) {
      const color = shuffle(colors).pop();
      setGradient(`linear-gradient(to bottom, ${color}, #000000`);
    }
    console.log(colors);
    setImageUrl(localStorage.getItem("imageUrl") || "");
    // setColor(shuffle(colors).pop());
  }, []);

  const window = 1500

  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.50]);
  const imageDetails = {
    width: 524,
    height: 650,
  };
  const [canScroll, setCanScroll] = useState(false);

  const router = useRouter();

  return (
    <div
      className={`flex space-x-7  min-h-screen text-white padding-8 `}
      style={{ backgroundImage: gradient }}
    >
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
                    <div className="toptext container mx-auto ">
                      <motion.div enter={{ opacity: 0 }} className="flex justify-between ">
                        <motion.span
                          variants={firstName}
                          className="firstName flex z-10"
                        >
                          <motion.span variants={letter} className="mr-1">
                            S
                          </motion.span>
                          <motion.span variants={letter} className="mr-1">
                            Y
                          </motion.span>
                          <motion.span variants={letter} className="mr-1">
                            N
                          </motion.span>
                          <motion.span variants={letter} className="mr-1">
                            E
                          </motion.span>
                          <motion.span variants={letter} className="mr-1">
                            S
                          </motion.span>
                          <motion.span variants={letter} className="mr-1">
                            O
                          </motion.span>
                          <motion.span variants={letter} className="mr-1">
                            U
                          </motion.span>
                          <motion.span variants={letter} className="mr-1">
                            N
                          </motion.span>
                          <motion.span variants={letter} className="mr-1">
                            D
                          </motion.span>
                        </motion.span>
                        <motion.span
                          variants={lastName}
                          className="lastName flex z-10"
                        >
                          <motion.span variants={letter} className="mr-1">
                            S
                          </motion.span>
                          <motion.span variants={letter} className="mr-1">
                            P
                          </motion.span>
                          <motion.span variants={letter} className="mr-1">
                            O
                          </motion.span>
                          <motion.span variants={letter} className="mr-1">
                            T
                          </motion.span>
                          <motion.span variants={letter} className="mr-1">
                            I
                          </motion.span>
                          <motion.span variants={letter} className="mr-1">
                            F
                          </motion.span>
                          <motion.span variants={letter} className="mr-1">
                            Y
                          </motion.span>
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
                      height: window.innerWidth > 1440 ? 400 : 400,
                      transition: { delay: 0.2, ...transition },
                    }}
                  >
                    <div>
                      <div className="frame-single">
                        {imageUrl && (
                          <motion.img
                            style={{ scale: scale }}
                            initial={{ scale: 1 }}
                            animate={{
                              transition: { ...transition },
                              y: window.innerWidth > 1440 ? -300 : -300,
                            }}
                            src={imageUrl}
                          />
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
              <div className="m-8">
                <AudioPlayer />
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex items-center space-x-2 hover:text-white">
          <h2 >
            SyneSound takes the user on a synesthetic journey of stimulation and connection through audivisual cues.
          </h2>
        </div>

        <div className="h-[25vh]"></div>
        <div className="fixed bottom-2 lg:bottom-8 flex justify-between items-center left-0 w-full bg-black/20 h-[59px] backdrop-blur-2x1 text-[18px] z-50">
          <button
            className="w-[260px] 
          px-10 flex justify-center item-center text-[18px] hover:text-white"
            onClick={() => signOut()}
          >
            <p>Logout from Spotify</p>
          </button>
          <button
            className="w-[160px] 
          px-0 flex justify-center item-center text-[18px] hover:text-white"
            type="button"
            onClick={() => router.replace("/")}
          >
            Back home
          </button>
        </div>
      </main>
    </div>
  );
}

