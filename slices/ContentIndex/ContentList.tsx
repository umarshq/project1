"use client";


import { asImageSrc, Client, Content, isFilled } from '@prismicio/client'
import Link from 'next/link';
import React, { useEffect, useRef, useState, createRef } from 'react'
import { MdRMobiledata } from 'react-icons/md';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { url } from 'inspector';

gsap.registerPlugin(ScrollTrigger)




type ContentListProps ={
  items: Content.BlogPostDocument[] | Content.ProjectDocument[];
  contentType: Content.ContentIndexSlice["primary"]["content_type"];
  fallbackItemImage: Content.ContentIndexSlice["primary"]["fallback_item_image"];
  viewMoreText: Content.ContentIndexSlice["primary"]["view_more_text"]
}

export default function ContentList({
  items, 
  contentType,
  fallbackItemImage,
  viewMoreText ="Read More",
}: ContentListProps) {

  const Component = useRef(null);
  const revealRef = useRef(null);
  const itemsRef = useRef <Array<HTMLLIElement | null>> ([]);
  const [currentItem, setCurrentItem] = useState<null | number>(null);

  const lastMousePos = useRef({ x: 0, y: 0 }); 

  const urlPrefix = contentType === "Blog" ? "/blog" : "/Project";
  


  useEffect(()=>{
    let ctx = gsap.context(() =>{
      itemsRef.current.forEach((item) =>{
        gsap.fromTo(item,
          {opacity: 0, y:20},
          {
            opacity:1,
            y:0,
            duration:1.3,
            ease:"elastic.out(1, 0.3)",
           scrollTrigger:{
            trigger:item,
            start: "top bottom-=100px",
            end: "bottom center",
            toggleActions: "play none none none"
           }
          }

        )
      });
      return ()=> ctx.revert();

    },Component);
  })

  useEffect(()=>{
    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = {x: e.clientX, y: e.clientY + window. scrollY };


      //speed

      const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2))

      let ctx = gsap.context(()=>{
        if(currentItem!== null){
          const maxY = window.scrollY + window.innerHeight - 350
          const maxX = window.innerWidth - 250;

          gsap.to(revealRef.current, {
            x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
            y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
            rotate: speed * ( mousePos.x > lastMousePos.current.x ? 1 : -1),
            ease: "back.out(2)",
            duration: 1.3,
            opacity: 1,
           

          });

         
        }
        lastMousePos.current = mousePos;
        return ()=> ctx.revert();

      }, Component);
    };

    window.addEventListener("mousemove", handleMouseMove)

    return()=>{
      window.removeEventListener("mousemove", handleMouseMove);

    };

  }, [currentItem]);

  






const contentImages = [  ...items,].map((item) =>{
  const image = isFilled. image(item.data.hover_image) ? item.data.hover_image : fallbackItemImage;

  return asImageSrc(image,{
    width: 220,
    fit: "crop",
    exp: -10,
    h: 320

  });
});

useEffect(()=>{
  contentImages.forEach((url)=>{
    if (!url) return;
    const img = new Image();
    img.src = url;
  })
}, [contentImages])


const onMouseEnter = (index: number)=>{
  setCurrentItem(index);

};

const onMouseLeave = ()=>{
  setCurrentItem(null);


}


  return (
    <div ref={Component}>
      <ul className='grid border-b border-b-slate-500'
      onMouseLeave={onMouseLeave}
      >
       <br />
        {[  ...items,].map((item , index)=>(
          <>

          {isFilled.keyText(item.data.title) && (

        


          <li key={index} className='list-item opacity-0f'
          onMouseEnter={()=> onMouseEnter (index)}
        ref={(el)=>{
          (itemsRef.current[index] = el)
        }}
          
          >
            
             
          
  
          <Link href={urlPrefix + "/" + item.uid}
           className='flex flex-col justify-between border-t border-t-orange-400 text-orange-300 md:flex-row'
           aria-label={item.data.title}
           
           >
            


            <div className='flex flex-col'>
              <span className='text-3xl font-extrabold'>{item.data.title}</span>
              <div className='flex gap-4 text-orange-200 text-lg font-bold'>
                {item.tags.map((tag, index )=>(
                  <span key={index}>{tag}</span>
                ))}
              </div>
            </div>
            <span className='ml-auto flex items-center gap-3 text-xl font-medium md:ml-0'>{viewMoreText}</span>
          </Link>
        </li>
          )}
        </>
      ))}
      </ul>
      <div className='hover-reveal pointer-events-none absolute left-0
      top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center 
      transition-[background] duration-300 opacity-0'
      style={{
        backgroundImage: currentItem !== null ? `url(${contentImages
          [currentItem]})` :"", 
      }}
      ref={revealRef}
      >

      </div>
    </div>
  )
}
