export class Comparator {
  private isObject = (obj: any) => {
    return typeof obj === 'object' && obj !== null;
  }
  public judgeChangedProps = (oldProps: { [prop: string]: any }, newProps: { [prop: string]: any }, result: { [prop: string]: any }, layer = 0) => {
    const oldKeys = Object.keys(oldProps);
    const newKeys = Object.keys(newProps);
    const { length, keys } = oldKeys.length > newKeys.length
      ? { length: oldKeys.length, keys: oldKeys }
      : { length: newKeys.length, keys: newKeys }
    let mark = false;
    for (let i = 0; i < length; i++) {
      const key = keys[i];
      const oldVal = oldProps[key];
      const newVal = newProps[key];
      const isObjectOld = this.isObject(oldVal);
      const isObjectNew = this.isObject(newVal);
      const isChangedObject = isObjectOld && isObjectNew && this.judgeChangedProps(oldVal, newVal, result[key],layer+1);
      const isChangedValue = !isObjectOld && !isObjectNew && oldVal !== newVal;
      const compareObjAndVal = (isObjectOld && !isObjectNew) || (!isObjectOld && isObjectNew);
      if (isChangedObject || isChangedValue || compareObjAndVal) {
        mark = true;
        if (layer === 0) {
          result[key] = newVal;
        }
      }
    }
    return mark;
  }
}