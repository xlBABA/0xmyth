// taking the password from the input form 

// let usersPassword ;
// document.getElementById("submit").onclick = function() {
//     usersPassword = document.getElementById("pass").value;
//     console.log(usersPassword);
//     document.getElementById("h1").textContent = `we got the password you idiot and your password is ${usersPassword} Lol`;
// }
// let age = window.prompt("how old");
// age = Boolean(age);
// console.log(age, typeof age);
let randomNum = Math.floor(Math.random()*40) + 10;
const inc = document.getElementById("increase");
const dec = document.getElementById("decrease");
const reset = document.getElementById("reset");
let label = document.getElementById("countlabel");
let count = 0;
let lab2 = document.getElementById("lab2");
let winnermas = `Congrats !! ${randomNum} `;

lab2.textContent = randomNum;



inc.onclick = function() {
    count ++;
    label.textContent = count ;
    if (count == randomNum) {
    label.textContent = winnermas;
    inc.disabled = true;
    dec.disabled = true;
}

}

dec.onclick = function() {
    count --;
    label.textContent = count ;

}

reset.onclick = function() {

    count = 0;

    label.textContent = count ;

}

console.log(randomNum);
console.log(Math.PI);
//عندي فكره بطبقها بكره لخق الارقام بحيث يكون في رقم عشوائي في الارقام بين 1 الى 50
// والمستخدم يسوي زياده لين يشبك معه الرقم العشوائي ويطلع له يو لوز 
// يعني يكون زي تحدي بينه وبين خويه كل واحد يضغط مره ولا مرتين بكيفه واللي يشبك معه الرقم العشوائي يكون خسران
// وانزل ذا الموضوع على القيتهب على فزلدر قيم




// تم بحمدالله سويت اللعبه وضبط بس بعدين يمكن اضيف له مميزات جديده مثل 
// the reset button will reset the whole game and genreat a new random number 

// each player has hes own turn, player 1 trun then player 2 ...
