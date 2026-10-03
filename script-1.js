// Задача 1.1. Проверка: взаимно просты ли два натуральных числа
function gcd(a, b) {
  while (b) [a, b] = [b, a % b];
  return a;
}

function isCoprime(a, b) {
  return gcd(a, b) === 1;
}

console.log("1.1");
console.log(isCoprime(12, 25)); // true
console.log(isCoprime(12, 18)); // false

// Задача 1.2. Проверка: простое ли данное натуральное число
function isPrime(n) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++)
    if (n % i === 0) return false;
  return true;
}

console.log("1.2");
console.log(isPrime(29)); // true
console.log(isPrime(30)); // false

// Задача 1.3. Все простые числа из интервала 1..N
function sieve(n) {
  const prime = new Array(n + 1).fill(true);
  prime[0] = prime[1] = false;
  for (let i = 2; i * i <= n; i++)
    if (prime[i])
      for (let j = i * i; j <= n; j += i) prime[j] = false;
  return prime.map((p, i) => (p ? i : null)).filter((x) => x !== null);
}

console.log("1.3");
console.log(sieve(30)); // [2,3,5,7,11,13,17,19,23,29]

// Задача 1.4. Первые N простых чисел
function firstPrimes(n) {
  const result = [];
  let num = 2;
  while (result.length < n) {
    if (isPrime(num)) result.push(num);
    num++;
  }
  return result;
}

console.log("1.4");
console.log(firstPrimes(5)); // [2,3,5,7,11]

// Задача 1.5. Все делители натурального числа N
function divisors(n) {
  const result = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      result.push(i);
      if (i !== n / i) result.push(n / i);
    }
  }
  return result.sort((a, b) => a - b);
}

console.log("1.5");
console.log(divisors(12)); // [1,2,3,4,6,12]

// Задача 1.6. Разложение на простые множители (с порядками)
function factorize(n) {
  const factors = [];
  let d = 2;
  while (d * d <= n) {
    let k = 0;
    while (n % d === 0) {
      n /= d;
      k++;
    }
    if (k > 0) factors.push({ factor: d, degree: k });
    d++;
  }
  if (n > 1) factors.push({ factor: n, degree: 1 });
  return factors;
}

console.log("1.6");
console.log(factorize(360));
// [{factor:2,degree:3},{factor:3,degree:2},{factor:5,degree:1}]

// Задача 1.7. Первые N (N<5) совершенных чисел
function perfectNumbers(n) {
  const result = [];
  for (let m = 2; result.length < n; m++) {
    let sum = 1;
    for (let i = 2; i * i <= m; i++)
      if (m % i === 0) sum += i + (i !== m / i ? m / i : 0);
    if (sum === m && m > 1) result.push(m);
  }
  return result;
}

console.log("1.7");
console.log(perfectNumbers(4)); // [6,28,496,8128]

// Задача 1.8. Нечетные числа из N..M, представимые суммой трех простых
function threePrimes(n, m) {
  const result = [];
  for (let num = n; num <= m; num++) {
    if (num % 2 === 0) continue;
    outer: for (let a = 2; a <= num; a++) {
      if (!isPrime(a)) continue;
      for (let b = a; a + b <= num; b++) {
        if (!isPrime(b)) continue;
        const c = num - a - b;
        if (c >= b && isPrime(c)) {
          result.push({ num, triple: [a, b, c] });
          break outer;
        }
      }
    }
  }
  return result;
}

console.log("1.8");
console.log(threePrimes(7, 15));
/* 
   [{num:7,triple:[2,2,3]},
    {num:9,triple:[2,2,5]},
    {num:11,triple:[2,2,7]},
    {num:13,triple:[3,3,7]},
    {num:15,triple:[3,5,7]}]
*/

// Задача 1.9. Проверка: является ли число числом Фибоначчи
function isFibonacci(n) {
  const isSquare = (x) => Number.isInteger(Math.sqrt(x));
  return isSquare(5 * n * n + 4) || isSquare(5 * n * n - 4);
}

console.log("1.9");
console.log(isFibonacci(13)); // true
console.log(isFibonacci(14)); // false

// Задача 1.10. Двойной факториал (N)!!
//   (2N)!!   = 2*4*...*(2N)
//   (2N+1)!! = 1*3*...*(2N+1)
function doubleFactorial(n) {
  let result = 1n;
  for (let i = n > 1 ? n : 1; i >= 1; i -= 2) result *= BigInt(i);
  return result;
}

console.log("1.10");
console.log(doubleFactorial(8).toString()); // 8!! = 384
console.log(doubleFactorial(9).toString()); // 9!! = 945

// Задача 1.11. Все различные пифагоровы тройки из интервала N..M
function pythagoreanTriples(n, m) {
  const result = [];
  for (let a = n; a <= m; a++)
    for (let b = a + 1; b <= m; b++)
      for (let c = b + 1; c <= m; c++)
        if (a * a + b * b === c * c) result.push([a, b, c]);
  return result;
}

console.log("1.11");
console.log(pythagoreanTriples(1, 20));
// [[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[12,16,20]]

// Задача 1.12. Умножение (деление) двух рациональных чисел
function gcd2(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) [a, b] = [b, a % b];
  return a;
}

function reduce(f) {
  const g = gcd2(f.num, f.den);
  return { num: f.num / g, den: f.den / g };
}

function mulFractions(f1, f2) {
  return reduce({ num: f1.num * f2.num, den: f1.den * f2.den });
}

function divFractions(f1, f2) {
  return reduce({ num: f1.num * f2.den, den: f1.den * f2.num });
}

console.log("1.12");
console.log(mulFractions({ num: 2, den: 3 }, { num: 9, den: 4 })); // {num:3, den:2}
console.log(divFractions({ num: 2, den: 3 }, { num: 9, den: 4 })); // {num:8, den:27}

// Задача 1.13. Сложение (вычитание) двух рациональных чисел
function addFractions(f1, f2) {
  return reduce({
    num: f1.num * f2.den + f2.num * f1.den,
    den: f1.den * f2.den,
  });
}

function subFractions(f1, f2) {
  return reduce({
    num: f1.num * f2.den - f2.num * f1.den,
    den: f1.den * f2.den,
  });
}

console.log("1.13");
console.log(addFractions({ num: 1, den: 2 }, { num: 1, den: 3 })); // {num:5, den:6}
console.log(subFractions({ num: 1, den: 2 }, { num: 1, den: 3 })); // {num:1, den:6}

// Задача 1.14. Числа из N..M, делящиеся на каждую из своих цифр
function divisibleByDigits(n, m) {
  const result = [];
  for (let num = Math.max(n, 1); num <= m; num++) {
    let x = num,
      ok = true;
    if (x % 10 === 0) ok = false; // цифра 0 — делить нельзя
    while (x > 0 && ok) {
      const d = x % 10;
      if (d === 0 || num % d !== 0) ok = false;
      x = Math.floor(x / 10);
    }
    if (ok) result.push(num);
  }
  return result;
}

console.log("1.14");
console.log(divisibleByDigits(10, 50)); // [11,12,15,22,24,33,36,44,48]

// Задача 1.15. Числа из N..M, делящиеся на сумму своих цифр
function divisibleByDigitSum(n, m) {
  const result = [];
  for (let num = Math.max(n, 1); num <= m; num++) {
    let x = num,
      sum = 0;
    while (x > 0) {
      sum += x % 10;
      x = Math.floor(x / 10);
    }
    if (num % sum === 0) result.push(num);
  }
  return result;
}

console.log("1.15");
console.log(divisibleByDigitSum(10, 30)); // [10,12,18,20,21,24,27,30]