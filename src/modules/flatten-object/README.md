# Flattening objects
Functions turning deep objects into flat one

## stackFlatten(object: object)
Uses stack to flatten object

## recursiveFlatten(object: object)
Uses recursion to flatten object

## Examples:

   ```js
   const obj = {
     a: {
       b: [1, 2],
       '': {c: 2}
     }
   };
   
   /* {'a.b.0': 1, 'a.b.1': 2, 'a..c': 2} */
   console.log(stackFlatten(obj));
   ```
