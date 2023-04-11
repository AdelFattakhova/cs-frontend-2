import BitAccessor from "../../core/BitAccessor";

export function createBitAccessor(array: Uint8Array) {
  return new BitAccessor(array);
}
