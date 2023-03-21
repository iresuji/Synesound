import Head from 'next/head'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import AppContext from '../appContext';
import { useState, useContext, useEffect } from "react";
import AudioPlayer from '../components/AudioPlayer';
import {AnimatePresence} from 'framer-motion';
import {motion, useTransform, useScroll} from 'framer-motion';


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

export default function player() {
    const context = useContext(AppContext)
    const window = 1500
   
    const {scrollYProgress}= useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.50]);
  const imageDetails = {
    width: 524,
    height: 650,
  };
  const [canScroll, setCanScroll] = useState(false);
    return (
        <>
                <main className="bg-gradient-to-b from-black via-purple-300">         
                   <AnimatePresence>
                    <motion.div className='single min-h-[85vh] lg:min-h-[78vh] flex items-center' id='home'
                      onAnimationComplete={() => setCanScroll(true)} 
                      initial='initial'
                      animate='animate'
                      exit='exit'
                      >
                        <div className='container fluid mx-auto '>
                         <div className='row center top-row flex flex-col gap-y-8 lg:flex-row lg:items-center lg:gap-x-12'>
                           <div className='top flex-1 text-center font-secondary lg:text-center'>
                       <motion.div 
                      initial={{
                        // opacity: 0, 
                        y: 0,
                        transition: {delay: 1.2, ...transition},
                      }}
                      className='details'>
                        <div className='toptext'></div>
                      </motion.div>
                      <motion.div className='model'>
                        <motion.span variants={firstName} className='first'>
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
                        <motion.span variants={lastName} className='last'>
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
                  </div>
                  <div className='row bottom-row'>
                   <div className='bottom'>
                     <div className='image-container-single'></div>
                    <motion.div initial={{
                y: "-50%",
                width: imageDetails.width, 
                height: imageDetails.height
                }}
                animate={{
                  y: 0,
                  width: "100%",
                  height: window.innerWidth > 1440 ? 600 : 400,
                  transition: {delay: .2, ...transition},
                }}
                className='thumbnail-single'>
                 <div className='frame-single lg:max-h-[400px]'>
                  {context.imgUrl && <motion.img style={{scale: scale}} 
                  initial={{scale: 1}}
                  animate={{
                    transition: {delay: .2, ...transition},
                    y: window.innerWidth > 1440 ? -300 : -300,
                  }} src={context.imgUrl} />}
                 </div>
                    </motion.div>
                    </div>
                    </div>
                    <div>
                        <AudioPlayer />
                    </div>
                    <div className='detailed-information'>
                     <div className='container'>
                       <div className='row'>
                         <h2 className='title'>
                           The insiration behind SyneSound and <br /> what it means.
                         </h2>
                         
                       </div>
                     </div>
                   </div>
                    <div>
                        <h3>
                            <Link className='text-white' href="/">Back to home</Link>
                        </h3>
                    </div>
                    </div>
                    </motion.div>
                  </AnimatePresence>
                   <div className='h-[55vh]'></div>
                </main>
        </>

    );
}



