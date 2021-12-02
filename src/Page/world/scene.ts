//organize world components,includes mesh, light, camera

import { World } from ".";
import { Instance } from "../types";
import { Box, Mesh, Sphere, Camera, Object3D } from "./component";
import { MeshGenerator } from "./shaderCreator/mesh";
import { UniformObserverable } from "./uniform";


// contain objects, interactive with program
// global handler for below
// generate shader
// register observer
// update uniform

export class Scene {
  // private factory = new ParametersFactory();
  private meshGenerator = new MeshGenerator();
  private meshes: Mesh[] = [];
  // private lights: Light[] = [];
  private camera: Camera | null = null;
  // public build = (type: Instance['type'], id: number, key: string) => {
  //   return this.factory.build(type).handleData(key,id);
  // }
  constructor(private world:World){}
  public clear = () => {
    this.meshes = [];
    // this.lights = [];
    this.camera = null;
  }
  public add = (object: Object3D) => {
    object.world = this.world;
    switch (object.type) {
      case 'box': this.meshes.push(object as any); break;
      case 'sphere': this.meshes.push(object as any); break;
      // case 'light': this.lights.push(object); break;
      case 'camera': {
        if (this.camera) {
          console.log('cannot support multiple cameras')
        } else {
          this.camera = object as any;
        }
        break;
      }
    }
  }
  public remove = (object: Object3D) => {

  }
  public update = () =>{
    this.world.updateShader(this);
  }
  public register = (uniformObserverable: UniformObserverable) => {
    // this.meshes.forEach(mesh => {
    //   uniformObserverable.add();
    // })
    // this.lights.forEach(mesh => {
    //   uniformObserverable.add();
    // })
    if (this.camera) {
      uniformObserverable.add(this.camera.getParameters());
    }
  }
  public generate = () => {
    return this.meshGenerator.generate(this.meshes);
  }
  // public getUniformName = (type: Instance['type'], id: number, key: string) => {
  //   return this.factory.build(type, id).getUniformName(key, id);
  // }
  public getCamera = () => {
    return this.camera;
  }
}