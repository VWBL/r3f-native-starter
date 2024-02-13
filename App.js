import React, { Suspense ,useEffect, useRef} from 'react'
import { Canvas ,useFrame } from '@react-three/fiber/native'
import { useGLTF, useAnimations } from '@react-three/drei/native'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

import modelPath from './assets/Ochiai_F2_20240117_v1.glb'


function Model({ url, ...rest }) {
  const group = useRef();
  const { scene, animations } = useGLTF(url, true, GLTFLoader);
  const { actions ,names } = useAnimations(animations, group)



  console.log("###################" );
  console.log(scene);
  console.log("###################" );

  console.log("###################" );
  console.log(animations);
  console.log("###################" );

  console.log("###################" );
  console.log(actions);
  console.log("###################" );


  names.forEach(element => {
    console.log("###################" );
    console.log("name : " + element);
    console.log("###################" );
  });

  const mixer = useRef();

  useEffect(() => {
    mixer.current = new THREE.AnimationMixer(scene);
    const action = mixer.current.clipAction(animations[0]); // Assuming the first animation is used
    action.play();

    return () => {
      mixer.current.stopAllAction();
    };
  }, [animations, scene]);

  useFrame((_, delta) => {
    mixer.current.update(delta);
  });

  // actions.forEach(element => {
  //   console.log("name : " + element);
  // });

  // useEffect(() => {
  //   // モデルがロードされた後にアニメーションを再生する
  //   if ( actions ) {
  //       actions[names[0]].play();
  //   }
  // }, [actions, names,mixer]);

  // useFrame(() => (scene.rotation.y += 0.01))
  return <primitive {...rest} ref={group} object={scene} />
}

export default function App() {
  return (
    <Canvas gl={{ physicallyCorrectLights: true }} camera={{ position: [-6, 0, 16], fov: 36 }}>
      <color attach="background" args={[0xe2f4df]} />
      <ambientLight />
      <directionalLight intensity={1.1} position={[0.5, 0, 0.866]} />
      <directionalLight intensity={0.8} position={[-6, 2, 2]} />
      <Suspense>
        <Model url={modelPath} />
      </Suspense>
    </Canvas>
  )
}