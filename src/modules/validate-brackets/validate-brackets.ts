import TypedStack from "../../core/stack/TypedStack";

const BRACKET_PAIRS = {
  ')': '(',
  '}': '{',
  ']': '['
}

export default function validateBrackets(string: string) {
  const stack = new TypedStack(Uint8Array, string.length);

  for (let i = 0; i < string.length; i++) {
    if (['(', '{', '['].includes(string[i])) {
      stack.push(string[i]);
    } else if ([')', '}', ']'].includes(string[i])) {
      try {
        if (BRACKET_PAIRS[string[i] as keyof typeof BRACKET_PAIRS] === stack.pop()) {
          return true;
        }
      } catch {
        return false;
      }
    }
  }

  return false;
}
