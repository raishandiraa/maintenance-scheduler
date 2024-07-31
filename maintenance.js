const mesinList = JSON.parse(localStorage.getItem('mesinList')) || [];

function tambahHari(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function formatDate(date) {
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

function tampilkanJadwal() {
    mesinList.sort((a, b) => new Date(a.tanggalPerbaikanBerikutnya) - new Date(b.tanggalPerbaikanBerikutnya));
    let output = "<table><tr><th>No</th><th>Nama Mesin</th><th>Tanggal Perbaikan Terakhir</th><th>Interval (Hari)</th><th>Tanggal Perbaikan Berikutnya</th></tr>";
    mesinList.forEach((mesin, index) => {
        output += `<tr><td>${index + 1}</td><td>${mesin.nama}</td><td>${formatDate(new Date(mesin.tanggalPerbaikanTerakhir))}</td><td>${mesin.intervalHari}</td><td>${formatDate(new Date(mesin.tanggalPerbaikanBerikutnya))}</td></tr>`;
    });
    output += "</table>";
    document.getElementById("output").innerHTML = output;
}

function perbaruiJadwal() {
    const now = new Date();
    mesinList.forEach(mesin => {
        if (new Date(mesin.tanggalPerbaikanBerikutnya) < now) {
            mesin.tanggalPerbaikanTerakhir = mesin.tanggalPerbaikanBerikutnya;
            mesin.tanggalPerbaikanBerikutnya = tambahHari(mesin.tanggalPerbaikanBerikutnya, mesin.intervalHari);
        }
    });
    localStorage.setItem('mesinList', JSON.stringify(mesinList));
    alert("Jadwal telah diperbarui.");
}

function tandaiService() {
    const index = prompt("Masukkan nomor mesin yang sudah di-service:") - 1;
    if (index >= 0 && index < mesinList.length) {
        mesinList[index].tanggalPerbaikanTerakhir = mesinList[index].tanggalPerbaikanBerikutnya;
        mesinList[index].tanggalPerbaikanBerikutnya = tambahHari(mesinList[index].tanggalPerbaikanBerikutnya, mesinList[index].intervalHari);
        localStorage.setItem('mesinList', JSON.stringify(mesinList));
        alert("Mesin telah ditandai sudah di-service.");
    } else {
        alert("Indeks mesin tidak valid.");
    }
}

function tambahMesin() {
    const nama = prompt("Masukkan nama mesin:");
    const tanggal = prompt("Masukkan tanggal perbaikan terakhir (dd mm yyyy):");
    const [hari, bulan, tahun] = tanggal.split(' ').map(Number);
    const tanggalPerbaikanTerakhir = new Date(tahun, bulan - 1, hari);

    const intervalHari = parseInt(prompt("Masukkan interval perbaikan (hari):"));

    const mesinBaru = {
        nama: nama,
        tanggalPerbaikanTerakhir: tanggalPerbaikanTerakhir,
        intervalHari: intervalHari,
        tanggalPerbaikanBerikutnya: tambahHari(tanggalPerbaikanTerakhir, intervalHari)
    };

    mesinList.push(mesinBaru);
    localStorage.setItem('mesinList', JSON.stringify(mesinList));
    alert("Mesin berhasil ditambahkan.");
}
