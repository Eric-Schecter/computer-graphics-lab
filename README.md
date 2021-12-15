<p align="center">
  <img src="./screenshot/profile.jpg" alt=''>
</p>

# React-SDF
A React renderer for pathtracing.  
I am weak at naming things, so the project name means nothing.  

## Usage

install npm package

```bash
npm install @youyouzone/react-sdf
```

use as a React component

```jsx
import Page from '@youyouzone/react-sdf';

export const App = () => {
  const rawData = [
    { position: { x: 0, y: 200, z: 0 }, size: { width: 100, height: 1, depth: 50 }, color: { x: 0.7, y: 0.7, z: 0.7 }, emissive: { x: 1, y: 1, z: 1 }, roughness: 0, specular: 0 },
    { position: { x: 0, y: 201, z: 0 }, size: { width: 200, height: 1, depth: 100 }, color: { x: 0.7, y: 0.7, z: 0.7 }, emissive: { x: 0, y: 0, z: 0 }, roughness: 0, specular: 0 },
    { position: { x: -200, y: 0, z: 0 }, size: { width: 1, height: 200, depth: 100 }, color: { x: 1, y: 0., z: 0. }, emissive: { x: 0, y: 0, z: 0 }, roughness: 1, specular: 1 },
    { position: { x: 200, y: 0, z: 0 }, size: { width: 1, height: 200, depth: 100 }, color: { x: 0., y: 1, z: 0. }, emissive: { x: 0, y: 0, z: 0 }, roughness: 0.1, specular: 1 },
    { position: { x: 0, y: 0, z: -100 }, size: { width: 200, height: 200, depth: 1 }, color: { x: 0.7, y: 0.7, z: 0.7 }, emissive: { x: 0, y: 0, z: 0 }, roughness: 0, specular: 1 },
    { position: { x: 0, y: -100, z: 0 }, size: { width: 200, height: 1, depth: 100 }, color: { x: 0.7, y: 0.7, z: 0.7 }, emissive: { x: 0, y: 0, z: 0 }, roughness: 0, specular: 0 },
    { position: { x: -50, y: -20, z: 50 }, size: { width: 30, height: 60, depth: 30 }, color: { x: 0.5, y: 0.3, z: 0.6 }, emissive: { x: 0, y: 0, z: 0 }, roughness: 0, specular: 0 },
  ]

  return <Page
    style={{ width: '100%', height: '100vh' }}
  >
    <Camera
      position={{ x: 0, y: 50, z: 250 }}
      lookat={{ x: 0, y: 50, z: 0 }}
      rotation={0}
      fov={50 / 180 * Math.PI}
    />
    {rawData.map(({ position, size, color, emissive, roughness, specular }, i) =>
      <box
        key={i}
        position={position}
        size={size}
        color={color}
        emissive={emissive}
        roughness={roughness}
        specular={specular}
      />
    )}
    <sphere
      ref={ref}
      position={{ x: 50, y: -50, z: 0 }}
      radius={50}
      color={{ x: 0.5, y: 0.3, z: 0.6 }}
      emissive={{ x: 0., y: 0., z: 0. }}
      roughness={0}
      specular={1}
    />
  </Page>
}
```

## Examples
[https://react-sdf.netlify.app](https://react-sdf.netlify.app) 

## License
This project is licensed under [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contact
* Email:[eric199002@icloud.com](eric199002@icloud.com)
* Twitter:[https://twitter.com/nikoniko600](https://twitter.com/nikoniko600)
* Repo:[https://github.com/Eric-Schecter/react-sdf](https://github.com/Eric-Schecter/react-sdf)
* App:[https://react-sdf.netlify.app](https://react-sdf.netlify.app) 