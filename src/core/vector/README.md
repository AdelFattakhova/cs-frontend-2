# Vector
Vector data structure based on typed array.

## `Vector(typedArray: any, options: Record<string, unknown> = {})`

* `typedArray`: constructor of the typed array `(Uint8ArrayConstructor | Uint16ArrayConstructor | Uint32ArrayConstructor | Int8ArrayConstructor | Int16ArrayConstructor | Int32ArrayConstructor | Uint8ClampedArrayConstructor)`
* `options`: settings for the vector (currently only `capacity` is available)

## `push(...values: number[])`
Adds values to the end of vector

## `pop()`
Removes last value from the vector

## `unshift(...values: number[])`
Adds values to the beginning of the vector

## `shift()`
Removes the first value from the vector
