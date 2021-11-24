import { ReactNode } from 'react';
import Reconciler, { FiberRoot, Fiber } from 'react-reconciler';
import { World } from '../world';
import { Instance } from '../types';
import { DataHandler } from './dataHandler';
import { Comparator } from './comparator';
import { InstanceProps } from '../types';

const dataHandler = new DataHandler();
const comparator = new Comparator();

const debounce = () => {
  let timer: ReturnType<typeof setTimeout>;
  return (parent: World, child: Instance) => {
    dataHandler.add(child);
    clearTimeout(timer);
    console.log('appendchild', parent, child);
    timer = setTimeout(() => {
      dataHandler.update(parent);
    }, 0);
  }
}

const appendChild = debounce();

const HostConfig: any = {
  getPublicInstance(...args: any[]) {
    console.log("getPublicInstance", args);
  },
  getRootHostContext(...args: any[]) {
    console.log("getRootHostContext", args);
    return {};
  },
  getChildHostContext(...args: any[]) {
    console.log("getChildHostContext", args);
    return {};
  },
  prepareForCommit(...args: any[]) {
    console.log("prepareForCommit", args);
    return null;
  },
  resetAfterCommit(...args: any[]) {
    console.log("resetAfterCommit", args);
  },
  createInstance(type: string, newProps: InstanceProps, rootContainerInstance: Instance) {
    console.log('createInstance')
    return {
      type,
      props: newProps,
      world: rootContainerInstance,
    };
  },
  appendInitialChild: appendChild,
  finalizeInitialChildren(...args: any[]) {
    console.log("finalizeInitialChildren", args);
    return false;
  },
  prepareUpdate(instance: Instance, type: string, oldProps: { [prop: string]: any }, newProps: { [prop: string]: any }) {
    console.log("prepareUpdate", instance, type, oldProps, newProps);
    const result = {};
    const isChanged = comparator.judgeChangedProps(oldProps, newProps, result);
    if (!isChanged) {
      return false;
    }
    return result;
  },
  commitUpdate(instance: Instance, changedProps: { [prop: string]: any }, type: string, oldProps: any, newProps: any, fiber: Fiber) {
    console.log("commitUpdate", changedProps, instance, fiber);
    const world = instance.world;
    if (world) {
      dataHandler.updateParams(world, oldProps, newProps, changedProps);
    }
  },
  shouldSetTextContent(...args: any[]) {
    console.log("shouldSetTextContent", args);
    return false;
  },
  createTextInstance(...args: any[]) {
    console.log("createTextInstance", args);
  },
  scheduleTimeout(...args: any[]) {
    console.log("scheduleTimeout", args);
  },
  cancelTimeout(...args: any[]) {
    console.log("cancelTimeout", args);
  },
  noTimeout(...args: any[]) {
    console.log("noTimeout", args);
  },
  now: Date.now,
  isPrimaryRenderer(...args: any[]) {
    console.log("isPrimaryRenderer", args);
  },
  warnsIfNotActing(...args: any[]) {
    console.log("warnsIfNotActing", args);
  },
  supportsMutation: true,
  supportsPersistence(...args: any[]) {
    console.log("supportsPersistence", args);
  },
  supportsHydration(...args: any[]) {
    console.log("supportsHydration", args);
  },
  getFundamentalComponentInstance(...args: any[]) {
    console.log("getFundamentalComponentInstance", args);
  },
  lComponentInstance(...args: any[]) {
    console.log("lComponentInstance", args);
  },
  mountFundamentalComponent(...args: any[]) {
    console.log("mountFundamentalComponent", args);
  },
  shouldUpdateFundamentalComponent(...args: any[]) {
    console.log("shouldUpdateFundamentalComponent", args);
  },
  undamentalComponent(...args: any[]) {
    console.log("undamentalComponent", args);
  },
  getInstanceFromNode(...args: any[]) {
    console.log("getInstanceFromNode", args);
  },
  isOpaqueHydratingObject(...args: any[]) {
    console.log("isOpaqueHydratingObject", args);
  },
  makeOpaqueHydratingObject(...args: any[]) {
    console.log("makeOpaqueHydratingObject", args);
  },
  makeClientId(...args: any[]) {
    console.log("makeClientId", args);
  },
  makeClientIdInDEV(...args: any[]) {
    console.log("makeClientIdInDEV", args);
  },
  beforeActiveInstanceBlur(...args: any[]) {
    console.log("beforeActiveInstanceBlur", args);
  },
  afterActiveInstanceBlur(...args: any[]) {
    console.log("afterActiveInstanceBlur", args);
  },
  preparePortalMount(...args: any[]) {
    console.log("preparePortalMount", args);
  },
  prepareScopeUpdate(...args: any[]) {
    console.log("prepareScopeUpdate", args);
  },
  getInstanceFromScope(...args: any[]) {
    console.log("getInstanceFromScope", args);
  },
  // mutation
  appendChild,
  appendChildToContainer(parent: World, child: Instance) {
    console.log("appendChildToContainer", parent, child);
    appendChild(parent, child)
  },
  commitTextUpdate(...args: any[]) {
    console.log("commitTextUpdate", args);
  },
  commitMount(...args: any[]) {
    console.log("commitMount", args);
  },
  insertBefore(...args: any[]) {
    console.log("insertBefore", args);
  },
  insertInContainerBefore(...args: any[]) {
    console.log("insertInContainerBefore", args);
  },
  removeChild(...args: any[]) {
    console.log("removeChild", args);
  },
  removeChildFromContainer(...args: any[]) {
    console.log("removeChildFromContainer", args);
  },
  resetTextContent(...args: any[]) {
    console.log("resetTextContent", args);
  },
  hideInstance(...args: any[]) {
    console.log("hideInstance", args);
  },
  hideTextInstance(...args: any[]) {
    console.log("hideTextInstance", args);
  },
  unhideInstance(...args: any[]) {
    console.log("unhideInstance", args);
  },
  unhideTextInstance(...args: any[]) {
    console.log("unhideTextInstance", args);
  },
  updateFundamentalComponent(...args: any[]) {
    console.log("updateFundamentalComponent", args);
  },
  unmountFundamentalComponent(...args: any[]) {
    console.log("unmountFundamentalComponent", args);
  },
  entalComponent(...args: any[]) {
    console.log("entalComponent", args);
  },
  clearContainer(...args: any[]) {
    console.log("clearContainer", args);
    return false;
  }
};

const reconciler = Reconciler(HostConfig);
let root: FiberRoot = null;
const Renderer = {
  render: (component: ReactNode, container: World) => {
    //init
    if (!root) {
      dataHandler.clear();
      root = reconciler.createContainer(container, 0, false, null);
    }
    //update
    reconciler.updateContainer(component, root, null);
  }
}

export default Renderer;