import {useEffect,useRef,useState} from 'react';
import Page from '@youyouzone/react-sdf';

export const App = () => {
  const [color,setColor] = useState({ x: .5, y: .3, z: .3 });
  const [size,setSize] = useState(1);
  // const ref = useRef(null);
  useEffect(()=>{
    // setTimeout(() => {
    //   setColor({ x: 1., y: 1., z: 1. });
    // }, 1000);
    setTimeout(() => {
      setColor({  x: .5, y: .3, z: .6 });
      setSize(0.5);
    }, 2000);
    // setTimeout(() => {
    //   setColor({ x: 1., y: 1., z: 1. });
    // }, 3000);
  },[])


  return <Page style={{width:'100%',height:'100vh'}}>
    <sphere
      position={{ x: 0, y: 1, z: 0 }}
      radius={size}
      color={color}
      diffuse={1}
      specular={0.01}
    />
    <sphere
      position={{ x: -1.5, y: 1, z: 0 }}
      radius={0.1}
      color={{ x: .5, y: .3, z: .6 }}
    />
    {/* <box
      position={{ x: 1.5, y: 1, z: 0 }}
      size={{width:0.1,height:0.1,depth:0.1}}
      color={{ x: .5, y: .3, z: .6 }}
    /> */}
  </Page>
}