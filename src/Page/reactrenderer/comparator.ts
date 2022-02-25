export class Comparator {
  private static isObject = (obj: any) => {
    return typeof obj === 'object' && obj !== null;
  }
  public static compare = (oldProps: { [prop: string]: any }, newProps: { [prop: string]: any }, result: { [prop: string]: any }, layer = 0) => {
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
      const isObjectOld = Comparator.isObject(oldVal);
      const isObjectNew = Comparator.isObject(newVal);
      const isChangedObject = isObjectOld && isObjectNew && Comparator.compare(oldVal, newVal, result[key],layer+1);
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