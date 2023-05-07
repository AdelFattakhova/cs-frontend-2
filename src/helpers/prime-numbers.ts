export function isPrime(number: number) {
  for (let i = 2; i * i <= number; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

export function getNextPrime(number: number) {
  for (let i = number; true; i++) {
    if (isPrime(i)) return i;
  }
}
