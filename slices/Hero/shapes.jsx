"use client"

import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense,useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { get } from "https";



export  default function Shapes(){
    return(
        <div className=" row-span-1 row-start-1 -mt-9 aspect-square md:col-span-1 md:col-start-2 md:mt-0">
            <Canvas className="2-0" shadows gl={{antialias:false}} dpr={[1,  1.5]} camera={{position: [0, 0, 25], 
                fov: 30, near:1, far: 40}}>
                    <Suspense fallback={null}>
                        <Geometries />
                        <ContactShadows
                        position={[0, -3.5, 0]}
                        opacity={0.65}
                        scale={40}
                        blur={1}
                        far={9}/>
                        <Environment preset="sunset"/>
                    </Suspense>
                </Canvas>
            
        </div>
    );
}



function Geometries(){
    const geometries = [
        {
            position: [0, 0, 0],
            r:0.3,
            geometry:new THREE.IcosahedronGeometry(3)//DodecahedronGeometry


        },

        {
            position: [1, -0.75, 4],
            r:0.4,
            geometry:new THREE.CapsuleGeometry(1, 1, 4, 8 )


        },
        {
            position: [-1.4, 2, -4],
            r:0.6,
            geometry:new THREE.DodecahedronGeometry(2)


        },

        {
            position: [-0.8, -0.75, 5],
            r:0.5,
            geometry:new THREE.TorusGeometry(0.6, 0.25, 16, 32),


        },

        {
            position: [1.6, 1.6, -4],
            r:0.7,
            geometry:new THREE.TorusKnotGeometry(1.5)


        },

        {
            position: [1.6, 1.6, -4],
            r:0.7,
            geometry:new THREE.SphereGeometry(1.5)


        },


    ];

    const materials = [new THREE.MeshNormalMaterial(),
        new THREE.MeshStandardMaterial({  color: 0x2ecc74, metalness:1, roughness: 0}),
        new THREE.MeshStandardMaterial({  color: 0x3498db, metalness:1, roughness: 4}),
        new THREE.MeshStandardMaterial({  color: 0x1abc9c, metalness:1, roughness: 3}),
        new THREE.MeshStandardMaterial({  color: 0x9b59b6, metalness:1,roughness: 2}),
        new THREE.MeshStandardMaterial({  color: 0x16a085, metalness:1, roughness: 6}),
        new THREE.MeshStandardMaterial({  color: 0x2980b9, metalness:1, roughness: 1}),
        new THREE.MeshStandardMaterial({  color: 0x8e44ad, metalness:1, roughness: 6}),
        new THREE.MeshStandardMaterial({  color: 0x8e87ad, metalness:1, roughness: 6}),
        new THREE.MeshStandardMaterial({  color: 0xad340e, metalness:1, roughness: 4}),

        





        new THREE.MeshStandardMaterial({ 
            roughness : 0,
            metalness: 1,
            color: 0x3498db,
        }),
        new THREE.MeshStandardMaterial({
            roughness : 0.5,
            metalness: 1,
            color: 0x2c3e50,
        }),



        
            



        

    ];


    const soundEffects = [
        new Audio(""),
        new Audio(""),
        new Audio("")
    ]

    return geometries.map(({position, r, geometry}) => (
        <Geometry
        key={JSON.stringify(position)}
        position={position.map((p)=>p*2)}
        soundEffects={soundEffects}
        geometry={geometry}
        materials={materials}
        r={r} 
        />
    ));

}


function Geometry({r, position, geometry, materials, soundEffects}){
    const meshRef = useRef()
    const [visible,  setVisible] = useState(false)
    const startingMaterial = getRandomMaterial()
     
    function getRandomMaterial(){
        return gsap.utils.random(materials)
    }

    function handleClick(e){
        const mesh = e.object;

        gsap.utils.random(soundEffects).play()
        gsap.to(mesh.rotation,{
            x: `+=${gsap.utils.random(0,2)}`,
            y: `+=${gsap.utils.random(0,2)}`,
            z: `+=${gsap.utils.random(0,2)}`,

            duration : 1.3,
            ease: "elastic.out(1,0.3)",

            yoyo: true,

        });

        mesh.material = getRandomMaterial();

    }

    
        const handlePointerOver = () => {
          document.body.style.cursor = "pointer"
        };

        const handlePointerOut = () => {
            document.body.style.cursor = "default"
        };
      

    useEffect(()=>{
        let ctx = gsap.context(()=>{
            setVisible(true)
            gsap.from(meshRef.current.scale,
               {
                x: 0.1,
                y: 0.1,
                z: 0.1,
                duration: 1.5,
                ease: "elastic.out(1.0.3)",
                delay: 0.3,
               });
            

        });
        return () => ctx.revert();
    }  ,[]);



    return(
        <group position={position} ref={meshRef}>

            <Float speed={5 * r} rotationIntensity={8* r} floatIntensity={5*r}>
              <mesh
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
              onClick={handleClick}
              ref={meshRef}
              geometry={geometry}
              material={startingMaterial}
              visible={visible}

            
              
             
              />
            </Float>
        </group>
    )


        }
    