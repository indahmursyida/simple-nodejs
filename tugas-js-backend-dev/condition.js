const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let nomorHari = 5;

switch (nomorHari) {
    case 1:
        console.log("Senin");
        break;
    case 2:
        console.log("Selasa");
        break;
    case 3:
        console.log("Rabu");
        break;
    case 4:
        console.log("Kamis");
        break;
    case 5:
        console.log("Jumat");
        break;
    case 6:
        console.log("Sabtu");
        break;
    case 7:
        console.log("Minggu");
        break;
    default:
        console.log("Nomor hari tidak valid. Masukkan angka antara 1-7");
}

rl.question("Masukkan angka: ", function (angka) {
    angka = parseInt(angka);

    if (isNaN(angka)) {
        console.log("Input bukan angka, silakan masukkan angka yang valid");
    } else {
        if (angka % 2 === 0) {
            console.log(`${angka} adalah angka genap`);
        } else {
            console.log(`${angka} adalah angka ganjil`);
        }
    }
    rl.close();
});