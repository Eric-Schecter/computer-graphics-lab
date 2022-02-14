<p align="center">
  <img src="./screenshot/profile.jpg" alt=''>
</p>

# Computer-Graphics-Lab
A React renderer for pathtracing.  

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
    { position: [0, 180, 0], size: [100, 0.01, 25], color: [1.0, 0.7, 0.38], emissive: [10, 10, 10], roughness: 1, metallic: 0, specTrans: 0, IoR: 1.5, specColor: [1, 1, 1], clearCoat: 0 },
    { position: [0, 201, 0], size: [200, 1, 100], color: [0.7, 0.7, 0.7], emissive: [0, 0, 0], roughness: 1, metallic: 0, specTrans: 0, IoR: 1.5, specColor: [1, 1, 1], clearCoat: 0 },
    { position: [-200, 50, 0], size: [1, 150, 100], color: [1, 0, 0], emissive: [0, 0, 0], roughness: 1, metallic: 0, specTrans: 0, IoR: 1.5, specColor: [1, 1, 1], clearCoat: 0 },
    { position: [200, 50, 0], size: [1, 150, 100], color: [0, 1, 0], emissive: [0, 0, 0], roughness: 0.1, metallic: 1, specTrans: 0, IoR: 1.5, specColor: [1, 1, 1], clearCoat: 0 },
    { position: [0, 0, -100], size: [200, 200, 1], color: [0, 1, 1], emissive: [0, 0, 0], roughness: 1, metallic: 0, specTrans: 0, IoR: 1.5, specColor: [1, 1, 1], clearCoat: 0 },
    { position: [0, -100, 0], size: [200, 1, 100], color: [0.7, 0.7, 0.7], emissive: [0, 0, 0], roughness: 1, metallic: 0, specTrans: 0, IoR: 1.5, specColor: [1, 1, 1], clearCoat: 0 },
    { position: [-50, -40, 0], size: [30, 60, 30], color: [0.5, 0.3, 0.6], emissive: [0, 0, 0], roughness: 1, metallic: 0, specTrans: 0, IoR: 1.5, specColor: [1, 1, 1], clearCoat: 0 },
  ]

  return <Page
    style={{ width: '100%', height: '100vh' }}
  >
    <Camera
      position={[0, 50, 250]}
      lookat={[0, 50, 0]}
      rotation={0}
      fov={50 / 180 * Math.PI}
    />
    {rawData.map(({ position, size, color, emissive, roughness, metallic, specTrans, IoR, specColor, clearCoat }, i) =>
      <box
        key={i}
        position={position}
        size={size}
        color={color}
        emissive={emissive}
        roughness={roughness}
        metallic={metallic}
        specTrans={specTrans}
        specColor={specColor}
        clearCoat={clearCoat}
        IoR={IoR}
      />
    )}
    <sphere
      position={[50, -45, 0]}
      radius={50}
      color={[1, 1, 1]}
      emissive={[0, 0, 0]}
      roughness={0}
      metallic={1}
      specTrans={0}
      specColor={[1, 1, 1]}
      clearCoat={0}
      IoR={1.2}
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