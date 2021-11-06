<p align="center">
  <img src="./screenshot/profile.gif" alt=''>
</p>

# React-Obj-Loader
React component for loading 3D objs by drag-and-drop files based on loaders in Threejs.  
Support: glTF/obj/stl  

## Installation
```bash
  npm install @youyouzone/react-obj-loader
```

## Usage
```js
import ObjLoader from '@youyouzone/react-obj-loader';

// use as an area
<ObjLoader cb={(itmes)=>handleObjs(itmes)}/>

// uas as a container
<ObjLoader cb={(itmes)=>handleObjs(itmes)}>
  <canvas/>
</ObjLoader>

```

Then Drop the folder which contains objs files on ObjLoader.  

Props:  

* cb?: (items: Object3D[]) => any - custom callback which accept threejs Object3D array.  
* className?: string - custom class name.  
* normalized?: boolean - resize obj to unit size or not.  

## License
This project is licensed under [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Contact
* Email:[eric199002@icloud.com](eric199002@icloud.com)
* Twitter:[https://twitter.com/nikoniko600](https://twitter.com/nikoniko600)
* Repo:[https://github.com/Eric-Schecter/react-obj-loader](https://github.com/Eric-Schecter/react-obj-loader)