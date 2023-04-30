# Brackets validation for strings (using stack)
Function `validateBrackets(string)` returns `true` if each bracket character (`{`, `[` and `(`) has it's closing pair in the given string and the order of these pairs is correct

## Example:
   ```js
   console.log(isValid('(hello{world} and [me])'));  // true
   console.log(isValid('(hello{world)} and [me])')); // false
   console.log(isValid(')'));                        // false
   ```
