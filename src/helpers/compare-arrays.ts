export function compareArrays(array1: any[], array2: any[]) {
  return array1.length === array2.length &&
    array1.every((element, index) => element === array2[index]);
};
