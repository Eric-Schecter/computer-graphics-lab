import { SingleData, StructureData, Updater } from "../../webglrenderer/uniform";
import { World } from "../../webglrenderer";
import { ModelProp, Vec3 } from "../../..";
import triIntersection from '../../webglrenderer/shader/intersection/triangle.glsl';
import boundingBoxIntersection from '../../webglrenderer/shader/intersection/boundingbox.glsl';
import modelIntersect from '../../webglrenderer/shader/others/model.glsl';
import { Mesh } from "./mesh";
import { DefaultValueHandler } from "../defaultvaluehandler";
import * as Three from 'three';
import { Mesh as ThreeMesh } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { BVH } from "../../math";
import { DataTexture } from "../../webglrenderer/datatexture";

export class Model extends Mesh {
  private bvh: BVH;
  constructor(props: ModelProp, canvas: HTMLCanvasElement, world: World) {
    super(props, canvas, world);
    // this._name = 'model';
    this.defaultValueHandler = new DefaultValueHandler();
    const { position, src } = this.defaultValueHandler.process(props);
    this._intersection = [triIntersection, boundingBoxIntersection, modelIntersect].join('\n');
    if (world.context) {
      this.createTexture(world.context, src,position);
    }
    this._geometry = `DefaultGeometry`;
    this._material = `DefaultMaterial`;
  }
  private loadModel = (gl: WebGL2RenderingContext, src: string,position:Vec3, size: number,
    triangleUpdater: Updater<WebGLTexture>, aabbUpdater: Updater<WebGLTexture>) => {
    const loader = new GLTFLoader();
    try {
      loader.load(
        src,
        gltf => {
          // console.log((gltf.scene.children[0].children[0] as ThreeMesh));
          const position1 = (gltf.scene.children[0].children[0] as ThreeMesh).geometry.attributes.position;// todo
          const normal = (gltf.scene.children[0].children[0] as ThreeMesh).geometry.attributes.normal;// todo
          // const position = (gltf.scene.children[0] as ThreeMesh).geometry.attributes.position;// todo
          const capacity = size * size * 4;
          const p = new Float32Array(position1.array);
          const n = new Float32Array(normal.array);
          this.bvh = new BVH(capacity);
          const traingleCount = position1.array.length / 9;
          const scale = 10;
          const { triangles, aabb } = this.bvh.build(traingleCount, p, n,scale,position);
          const triangleTexture = DataTexture.generate(gl, triangles, size);
          const aabbTexture = DataTexture.generate(gl, aabb, size);
          if (!triangleTexture || !aabbTexture) {
            throw Error('generate texture failed');
          }
          triangleUpdater.data = triangleTexture;
          aabbUpdater.data = aabbTexture;
        })
    } catch (error) {
      console.log('load model failed, please check src attribute');
      console.log(error)
    }
  }
  private createTexture = (gl: WebGL2RenderingContext, src: string,position:Vec3) => {
    const triangleTexture = DataTexture.generate(gl);
    const aabbTexture = DataTexture.generate(gl);
    if (!triangleTexture || !aabbTexture) { return }
    const size = 2048;
    const sizeUpdater = new Updater(size);
    const triangleUpdater = new Updater(triangleTexture);
    const aabbUpdater = new Updater(aabbTexture);
    this._parameters = new StructureData('model', 'Model',[
      new SingleData('size', 'float', sizeUpdater),
      new SingleData('triangleTexture', 'sampler2D', triangleUpdater),
      new SingleData('aabbTexture', 'sampler2D', aabbUpdater)
    ]);
    this.loadModel(gl, src, position, size, triangleUpdater, aabbUpdater);
  }
  // protected generateGeometryShader = (id: number, type: string) => {
  //   const name = `boxes[${id}].${type}.`;
  //   return `boxIntersection(ray,${name}position,${name}size)`;
  // }
  public get hitInfo() {
    return 'res = modelIntersect(ray,isShadowRay,preID,res,id);'
  }
}