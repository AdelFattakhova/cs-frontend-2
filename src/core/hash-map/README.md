# Hash Map
Hash map data structure. Collisions are resolved using double hashing.

## `HashMap(hasher: any, capacity?: number)`
* `hasher`: class which provides hash functions
* `capacity?`: capacity of the buffer of hash map, default is 31

## `set(key: number | string | object, value: any)`
Adds new key-value pair to hash map. Example:

  ```js
    const map = new HashMap(Hasher);

    map.set('abc', 1);
    map.set(42, 2);
    map.set(['f1', 21, 'jdskjsjf', 2, 4829], 10);
    map.set(process, 'abc');
  ```

## `get(key: number | string | object)`
Returns the value by key. Example:

  ```js
    console.log(map.get('abc')); // 1
    console.log(map.get(['f1', 21, 'jdskjsjf', 2, 4829])); // 10
  ```

## `has(key: number | string | object)`
Returns true if the key exists in hash map. Example:

  ```js
    console.log(map.has('abc')); // true
    console.log(map.has(['f1', 21])); // false
  ```

## `delete(key: number | string | object)`
Deletes a value by key and returns it. Example:

  ```js
    console.log(map.delete('abc')); // 1
    console.log(map.delete(['f1', 21, 'jdskjsjf', 2, 4829])); // 10
    console.log(map.has('abc')); // false
    console.log(map.has(['f1', 21, 'jdskjsjf', 2, 4829])); // false
  ```
