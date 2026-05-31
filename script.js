function lacakNomor() {
    const inputRaw = document.getElementById('phoneNumber').value.trim();
    const resultBox = document.getElementById('result');
    const input = inputRaw.replace(/\s+/g, '');

    if (input.length < 8) {
        alert('Mohon masukkan nomor yang valid dengan minimal 8 digit.');
        return;
    }

    let normal = input;
    if (normal.startsWith('+62')) {
        normal = '0' + normal.substring(3);
    } else if (normal.startsWith('62')) {
        normal = '0' + normal.substring(2);
    }

    let prefix = normal.substring(0, 4);
    if (prefix.length < 4) prefix = normal.substring(0, 3);

    let operator = 'Tidak Dikenal / Format Salah';
    let area = 'Indonesia';

    const prefixList = {
        '0811': 'Telkomsel (Kartu Halo)',
        '0812': 'Telkomsel (simPATI/Loop)',
        '0813': 'Telkomsel (simPATI)',
        '0821': 'Telkomsel (Simpati Nusantara)',
        '0822': 'Telkomsel (Loop)',
        '0852': 'Telkomsel (Kartu As)',
        '0809': 'Telkomsel (As)',
        '0814': 'Indosat (M2 Broadband)',
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

    if (prefixList[prefix]) {
        operator = prefixList[prefix];
        area = 'Estimasi berdasarkan kode prefix operator';
    }

    document.getElementById('resPhone').innerText = normal;
    document.getElementById('resOperator').innerText = operator;
    document.getElementById('resArea').innerText = area;
    resultBox.classList.remove('hidden');
}
function dapatkanLokasi() {
    const locationResult = document.getElementById('locationResult');
    if (!navigator.geolocation) {
        alert('Geolocation tidak didukung di browser ini.');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {
            const latitude = position.coords.latitude.toFixed(6);
            const longitude = position.coords.longitude.toFixed(6);
            document.getElementById('resLat').innerText = latitude;
            document.getElementById('resLon').innerText = longitude;
            const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            const link = document.getElementById('mapLink');
            link.href = url;
            link.innerText = 'Tampilkan di Google Maps';
            locationResult.classList.remove('hidden');
        },
        function(error) {
            if (error.code === error.PERMISSION_DENIED) {
                alert('Izin lokasi ditolak. Untuk melihat GPS, izinkan akses lokasi.');
            } else {
                alert('Gagal mendapatkan lokasi: ' + error.message);
            }
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}
