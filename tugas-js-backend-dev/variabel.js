const kalimat = "Warna yang harus digunakan adalah ";
let color = "Biru";
var value = 10;
var limit = 20;
var highValue = 30;
console.log("a + b =", value + highValue);
if (highValue > limit){
    color = "Merah";
}

console.log(kalimat + color);

let text = "Hello, World!"; // String
let number = 100;           // Number
let isValid = true;         // Boolean
let data = null;            // Null
let notDefined;             // Undefined
let person = { name: "Jane", age: 30 }; // Object
let numbers = [1, 2, 3, 4, 5];           // Array

let a = 10;
let b = 5;
let sum = a + b;        // 15
let difference = a - b; // 5
let product = a * b;    // 50
let quotient = a / b;   // 2
let remainder = a % b;  // 0

let x = 10;
let y = "10";

console.log(x == y);  // true (loose equality)
console.log(x === y); // false (strict equality)
console.log(x != y);  // false
console.log(x !== y); // true
console.log(x > 5);   // true
console.log(x <= 10); // true