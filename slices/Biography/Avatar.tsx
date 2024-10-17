"use client";

import { ImageField } from "@prismicio/client";

import { PrismicNextImage } from "@prismicio/next";
import { context } from "@react-three/fiber";
import clsx from "clsx";
import { Component, use, useEffect, useRef } from "react";
import gsap from "gsap";
import { match } from "assert";




type Avatarprops ={
    image: ImageField;
    className?: string;

    
}
export default function Avatar({
    image, className
}: Avatarprops){
    const component = useRef(null);

    useEffect(()=>{
        let ctx = gsap. context(() => {
            gsap.fromTo(
                ".avatar",
                {opacity: 0, scale: 1.4},
                { scale:1, opacity:1, duration:1.3, ease: "power3.inOut"}
            );

            window. onmousemove = (e) => {
                if (!component.current)return;
                const componentReact = (component.current as HTMLElement).getBoundingClientRect()
                const componentCenterx = componentReact.left + componentReact.width / 2

                let componentPercent = {
                    x: (e.clientX - componentCenterx) / componentReact.width /2
                }
                let distFromCenter = 1 - Math.abs(componentPercent.x)

                gsap. timeline({
                    default:{duration: .10, overwrite: "auto", ease: "power3.Out"}

                }).to(".avatar",
                    {
                        rotation: gsap.utils.clamp(-2, 2,5 * componentPercent.x),
                        duration:.5,

                    }, 0
                ).to( ".highlight",
                    {
                        opacity: distFromCenter - 0.1,
                        x: -10 * 20 & componentPercent.x,
                        duration: .5
                        }, 0
                    


                );

            };
        }, component);
    } ,[]);


    return(
        <div ref={component} className={clsx("relative h-full w-full", className)}>

            <div className="avatar aspect-square overflow-hidden rounded-lg border-3 border-slate-500 opacity-of">

            <PrismicNextImage
        field={ image}
        className="avatar-image h-full w-full object-fill"
        imgixParams={{q: 90}}

        />
        <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block">

        </div>

            </div>
        </div>
       
    )
}
