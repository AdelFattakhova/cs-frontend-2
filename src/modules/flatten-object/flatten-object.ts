import Stack from "../../core/stack/Stack";

export function stackFlatten(object: object) {
  const stack = new Stack(15);
  stack.push([object, '']);

  const result: Record<string, unknown> = {};

  while (!stack.isEmpty()) {
    const [headValue, path] = stack.pop() as [any, any];

    if (typeof headValue === 'object') {
      const keys = Object.keys(headValue);

      for (let i = keys.length - 1; i >= 0; i--) {
        const prop = keys[i];
        stack.push([headValue[prop], `${path}${prop}.`]);
      }

    } else {
      const newProp = path.slice(0, -1);
      result[newProp] = headValue;
    }
  }

  return result;
}

export function recursiveFlatten(object: object, currentFlattenProp = '', result: Record<string, unknown> = {})
  : Record<string, unknown> {

  if (typeof object === 'object') {
    for (const prop in object) {
      const propValue = object[prop as keyof object];
      result = recursiveFlatten(propValue, `${currentFlattenProp}${prop}.`, result);
    }

  } else {
    result[currentFlattenProp.slice(0, -1)] = object;
    return result;
  }

  return result;
}
