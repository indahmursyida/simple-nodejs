function hitungLuasLingkaran(jariJari) {
    if (jariJari <= 0) {
        return "Jari-jari harus lebih besar dari 0";
    }
    const luas = Math.PI * Math.pow(jariJari, 2);
    return `Luas lingkaran dengan jari-jari ${jariJari} adalah ${luas.toFixed(2)}`;
}
console.log(hitungLuasLingkaran(5));

function kuadratAngka(array) {
    return array.map((angka) => Math.pow(angka, 2));
}

const angkaArray = [1, 2, 3, 4, 5];
console.log(kuadratAngka(angkaArray));