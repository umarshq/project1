"use client";

import Heading from "@/app/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { Component, useEffect, useRef } from 'react';
import './style.css';
import { MdCircle } from "react-icons/md";
import Bounded from "@/app/components/Bounded";
import {gsap} from "gsap";
import { get } from "https";
import { ScrollTrigger } from "gsap/ScrollTrigger";



gsap.registerPlugin(ScrollTrigger) ;








/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
  Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {

const Component = useRef(null);

useEffect(()=>{
  let ctx = gsap.context(() => {

    const tl = gsap.timeline({
        ScrollTrigger: {
          trigger: Component.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 4,

      },

    });

      tl .fromTo(
      "tech-row",
      {
        x: (index) => {
          return index % 2 === 0
          ? gsap.utils.random(600, 400)
          : gsap.utils.random(-600, -400);

        }
      }, {
        x: (index)=>{
          return index % 2 === 0
          ? gsap.utils.random(-600, -400)
          : gsap.utils.random(600, 400);

        },

        ease: "power1.inOut"
      }

    );



  },Component);
  return ()=> ctx.revert();
})


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=""
    >
      <br />
      <br />

      <Bounded as="div">

      <Heading size="lg" as="h4" className="custom-color"   >
      
      {slice.primary.heading}
     </Heading>

      </Bounded>
      


     
     <br />
     {slice.primary.repeatable.map(({tech_color, tech_name }, index) =>(
      <div 
      key={index} 
      className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-600 "
      aria-label = {tech_name || undefined}
      >
        {Array.from({length: 15 }, (_, index) =>(
          <React.Fragment key={index}>
            <span className="tech-item text-8xl font-extrabold uppercase tracking-tighter tech-row" 
              style={{
                color: index === 7 && tech_color ? tech_color : "inherit"
              }}
              >
 


              {tech_name}
            </span>
            <span className="text-3xl">
              <MdCircle />
            </span>

          </React.Fragment>
        ))}
      </div>
     ) )}

  

    </section>
  );
};

export default TechList;
