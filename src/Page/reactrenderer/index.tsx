import React, { ReactNode } from 'react';
import Reconciler, { Fiber } from 'react-reconciler';
import { World } from '../webglrenderer';
import { Store } from './store';
import { Instance, Factory } from '../instance';
import { context } from '../../context';
import { TaskHandler } from '../webglrenderer/taskHandler';
import { InputSystem } from '../inputSystem';

const appendChild = (parent: Store, child: Instance) => {
  parent.add(child);
};

const HostConfig: any = {
  getPublicInstance(instance: Instance) {
    // console.log("getPublicInstance", instance);
    return instance.props;
  },
  getRootHostContext(store: Store) {
    // console.log("getRootHostContext", args);
    return {};
  },
  getChildHostContext(parentHostContext: Store) {
    // console.log("getChildHostContext", parentHostContext);
    return parentHostContext;
  },
  prepareForCommit(store: Store) {
    // console.log("prepareForCommit", store);
    return null;
  },
  resetAfterCommit(store: Store) {
    // console.log("resetAfterCommit", store);
  },
  createInstance(type: string, props: { [prop: string]: any }, store: Store, hostContext: Store, internalInstanceHandle: Fiber) {
    // console.log('createInstance')
    return Factory.build(type, props, store.canvas, store.world);
  },
  appendInitialChild(parent: Store, child: Instance) {
    // console.log('appendInitialChild', child);
    appendChild(parent, child);
  },
  finalizeInitialChildren(instance: Instance, type: string, store: Store, rootContainer: HTMLCanvasElement, hostContext: Store) {
    // console.log("finalizeInitialChildren", instance, type, store, rootContainer, hostContext);
    return false;
  },
  prepareUpdate(instance: Instance, type: string, oldProps: object, newProps: object) {
    // console.log("prepareUpdate", instance, type, oldProps, newProps);
    const result = {};
    const isChanged = instance.compare(oldProps, newProps, result);
    if (!isChanged) {
      return null;
    }
    return result;
  },
  shouldSetTextContent(...args: any[]) {
    // console.log("shouldSetTextContent", args);
    return false;
  },
  createTextInstance(...args: any[]) {
    // console.log("createTextInstance", args);
  },
  setTimeout,
  clearTimeout,
  scheduleTimeout: setTimeout,
  cancelTimeout: clearTimeout,
  noTimeout: -1,
  now: Date.now,
  isPrimaryRenderer: false,
  warnsIfNotActing: true,
  supportsMutation: true,
  supportsPersistence: false,
  supportsHydration: false,
  getInstanceFromNode(...args: any[]) {
    // console.log("getInstanceFromNode", args);
  },
  beforeActiveInstanceBlur(...args: any[]) {
    // console.log("beforeActiveInstanceBlur", args);
  },
  afterActiveInstanceBlur(...args: any[]) {
    // console.log("afterActiveInstanceBlur", args);
  },
  preparePortalMount(...args: any[]) {
    // console.log("preparePortalMount", args);
  },
  prepareScopeUpdate(...args: any[]) {
    // console.log("prepareScopeUpdate", args);
  },
  getInstanceFromScope(...args: any[]) {
    // console.log("getInstanceFromScope", args);
  },
  getCurrentEventPriority(...args: any[]) {
    // console.log("getCurrentEventPriority", args);
  },
  detachDeletedInstance(...args: any[]) {
    // console.log("detachDeletedInstance", args);
  },
  // -------------------
  //      Mutation
  // -------------------
  appendChild(parent: Store, child: Instance) {
    // console.log("appendChild", parent, child);
    appendChild(parent, child);
  },
  appendChildToContainer(parent: Store, child: Instance) {
    // console.log("appendChildToContainer", parent, child);
    appendChild(parent, child)
  },
  commitTextUpdate(...args: any[]) {
    // console.log("commitTextUpdate", args);
  },
  commitMount(...args: any[]) {
    // console.log("commitMount", args);
  },
  commitUpdate(instance: Instance, changedProps: object, type: string, oldProps: object, newProps: object, fiber: Fiber) {
    // console.log("commitUpdate", changedProps, instance, fiber);
    instance.update(changedProps);
  },
  insertBefore(...args: any[]) {
    // console.log("insertBefore", args);
  },
  insertInContainerBefore(...args: any[]) {
    // console.log("insertInContainerBefore", args);
  },
  removeChild(...args: any[]) {
    // console.log("removeChild", args);
  },
  removeChildFromContainer(...args: any[]) {
    // console.log("removeChildFromContainer", args);
  },
  resetTextContent(...args: any[]) {
    // console.log("resetTextContent", args);
  },
  hideInstance(...args: any[]) {
    // console.log("hideInstance", args);
  },
  hideTextInstance(...args: any[]) {
    // console.log("hideTextInstance", args);
  },
  unhideInstance(...args: any[]) {
    // console.log("unhideInstance", args);
  },
  unhideTextInstance(...args: any[]) {
    // console.log("unhideTextInstance", args);
  },
  updateFundamentalComponent(...args: any[]) {
    // console.log("updateFundamentalComponent", args);
  },
  clearContainer(...args: any[]) {
    // console.log("clearContainer", args);
    return false;
  },

  // -------------------
  //      Persistence
  // -------------------
  // cloneInstance(...args: any) {
  //   console.log('cloneInstance', args);
  // },
  // createContainerChildSet(container: HTMLCanvasElement) {
  //   console.log('createContainerChildSet', container);
  // },
  // appendChildToContainerChildSet(containerChildSet: any, instance: Instance) {
  //   console.log('appendChildToContainerChildSet', containerChildSet, instance);
  // },
  // finalizeContainerChildren(container: HTMLCanvasElement, newChildSet: any,) {
  //   console.log('finalizeContainerChildren', container, newChildSet);
  // },
  // replaceContainerChildren(containerInfo: any, childSet: any) {
  //   console.log('replaceContainerChildren', containerInfo, childSet);
  // },
  // getOffscreenContainerType() {
  //   console.log('getOffscreenContainerType');
  // },
  // getOffscreenContainerProps() {
  //   console.log('getOffscreenContainerProps');
  // },
  // cloneHiddenInstance(instance: Instance, type: string, props: any, node: any) {
  //   console.log('cloneHiddenInstance', instance, type, props, node);
  // },
  // cloneHiddenTextInstance(instance: Instance, text: string, node: any) {
  //   console.log('cloneHiddenInstance', instance, text, node);
  // }
};

const reconciler = Reconciler(HostConfig);

const Renderer = {
  render: (component: ReactNode, container: HTMLCanvasElement) => {
    const taskHandler = new TaskHandler();
    const inputSystem = InputSystem.getInstance();
    const world = new World(container, taskHandler,inputSystem);
    const store = new Store(container, world, taskHandler);
    const fiber = reconciler.createContainer(store, 0, false, null);
    const root = <context.Provider value={store}>{component}</context.Provider>;
    reconciler.updateContainer(root, fiber, null);
  }
}

export default Renderer;