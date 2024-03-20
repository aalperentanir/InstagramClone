import React from "react"
import "./Auth.css"
import SignIn, { Signin } from "../../../Components/Register/Signin"
import { Route, Routes, useLocation} from "react-router-dom"
import {useRef, useEffect} from "react";
import SignUp from "../../../Components/Register/SignUp"

const Auth = () => {
    const ref = useRef()
    const location = useLocation();
    useEffect(() => {
		let images = ref.current.querySelectorAll('img'),
			total = images.length,
			current = 0
		const imageSlider = () => {
			if (current > 0) {
				images[current - 1].classList.add('opacity-0')
			} else {
				images[total - 1].classList.add('opacity-0')
			}
			images[current].classList.remove('opacity-0')
			if (current === total - 1) {
				current = 0
			} else {
				current += 1
			}
		}
		imageSlider()
		let interval = setInterval(imageSlider, 3000)
		return () => {
			clearInterval(interval)
		}
	}, [ref])
    return (
        
            <div className="h-full w-full flex flex-wrap overflow-auto items-center gap-x-8 justify-center">

                <div className="hidden md:block w-[380px] h-[581px] bg-logo-pattern relative bg-[length:468.32px_634.15px] bg-[top_left_-46px]">
                    <div className="w-[250px] h-[538px] absolute top-[27px] right-[18px]" ref={ref}>
                        <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear"
                            src="https://www.instagram.com/static/images/homepage/screenshots/screenshot1-2x.png/cfd999368de3.png"
                            alt="" />
                        <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear"
                            src="https://www.instagram.com/static/images/homepage/screenshots/screenshot2-2x.png/80b8aebdea57.png"
                            alt="" />
                        <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear"
                            src="https://www.instagram.com/static/images/homepage/screenshots/screenshot3-2x.png/fe2540684ab2.png"
                            alt="" />
                        <img className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-1000 ease-linear"
                            src="https://www.instagram.com/static/images/homepage/screenshots/screenshot4-2x.png/8e9224a71939.png"
                            alt="" />
                    </div>
                </div>
                <div className="w-[40vw] lg:w-[23vw]">
                    
                    {location.pathname === "/login" ? <SignIn /> : <SignUp />}
                    

                </div>
            </div>
        
    )
}

export default Auth