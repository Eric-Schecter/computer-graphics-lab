// import { UniformHandler } from "../uniformHandler";
// import { Observer, SingleObserver } from "../observer";
// import { UniformData } from "../../../../types";

// export class UStructData {
//   private observers: Observer[]
//   constructor(...observers: Observer[]) {
//     for(const observer of observers){
//       observer.setName();
//     }
//     this.observers = observers;
//   }
//   // public update = (unifromHandler: UniformHandler, name: string) => {
//   //   this.observers.forEach(updater => updater.update(unifromHandler, name));
//   // }
//   public set = (observers: Map<string, Observer>, parent: string) => {
//     this.observers.forEach(observer => observer.set(observers, parent));
//   }
//   public setData = (data: UniformData, name: string) => {
//     this.observers.forEach(observer => {
//       if (observer instanceof SingleObserver) {
//         if (observer.name === name) {
//           observer.setData(data)
//         }
//       }
//       else {
//         observer.setData(data, name);
//       }
//     })
//   }
  
// }