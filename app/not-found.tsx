'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function NotFound() {
    const [isGlitching, setIsGlitching] = useState(false)

    useEffect(() => {
        const glitchInterval = setInterval(() => {
            setIsGlitching(true)
            setTimeout(() => setIsGlitching(false), 200)
        }, 3000)

        return () => clearInterval(glitchInterval)
    }, [])

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center text-white p-4'>
            <h1
                className={`text-6xl md:text-8xl font-bold mb-8 ${
                    isGlitching ? 'glitch' : ''
                }`}
                data-text='404'
            >
                404
            </h1>
            <p className='text-xl md:text-2xl mb-8 text-center'>
                Oops! Looks like you&apos;ve ventured into the digital void.
            </p>
            <Link
                href='/'
                className='relative inline-flex items-center px-8 py-3 overflow-hidden text-lg font-medium text-white border-2 border-white rounded-full hover:text-gray-900 group hover:bg-white'
            >
                <span className='absolute left-0 block w-full h-0 transition-all bg-white opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease'></span>
                <span className='absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease'>
                    <svg
                        className='w-5 h-5'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                            d='M14 5l7 7m0 0l-7 7m7-7H3'
                        ></path>
                    </svg>
                </span>
                <span className='relative'>Back to Home</span>
            </Link>
            <style jsx>{`
                .glitch {
                    position: relative;
                    animation: glitch 500ms infinite;
                }
                .glitch::before,
                .glitch::after {
                    content: attr(data-text);
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
                .glitch::before {
                    left: 2px;
                    text-shadow: -2px 0 #ff00c1;
                    clip: rect(44px, 450px, 56px, 0);
                    animation: glitch-anim 5s infinite linear alternate-reverse;
                }
                .glitch::after {
                    left: -2px;
                    text-shadow: -2px 0 #00fff9, 2px 2px #ff00c1;
                    animation: glitch-anim2 1s infinite linear alternate-reverse;
                }
                @keyframes glitch {
                    0% {
                        text-shadow: 1px 0 0 #ff00c1, -1px 0 0 #00fff9;
                    }
                    100% {
                        text-shadow: -1px 0 0 #ff00c1, 1px 0 0 #00fff9;
                    }
                }
                @keyframes glitch-anim {
                    0% {
                        clip: rect(54px, 9999px, 56px, 0);
                    }
                    100% {
                        clip: rect(25px, 9999px, 99px, 0);
                    }
                }
                @keyframes glitch-anim2 {
                    0% {
                        clip: rect(32px, 9999px, 5px, 0);
                    }
                    100% {
                        clip: rect(12px, 9999px, 76px, 0);
                    }
                }
            `}</style>
        </div>
    )
}
