const target = document.querySelector("#target");
const calendar = document.querySelector('#calendar');
const btnGroup = document.querySelectorAll('.btn-group');
const today = document.querySelector('#today');


let cur = 'EUR';
let date = (new Date()).toISOString().split('T')[0];

let currency = {
    "currency": null,
    "code": null,
    "table": null,
    "effectiveDate": null,
    "mid": null
}



const getRate = function (curency, date){
    let url = 'http://api.nbp.pl/api/exchangerates/rates/a/' + curency + '/' + date + '?format=json';
    
    // fetch(url,{mode: 'cors'})
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        currency.currency = data.currency;
        currency.code = data.code;
        currency.table = data.rates[0].no;
        currency.effectiveDate = data.rates[0].effectiveDate;
        currency.mid = data.rates[0].mid.toString().replace('.',',');
        target.value = currency.effectiveDate + "\n" + currency.mid + "\n"  + currency.code + "\n" + currency.currency ;
        // console.log(currency);
        }
    ).catch(() => {
        target.value = "Brak kursu dla tej daty, zamień datę."
    })
}
btnGroup.forEach((btn) => {
    btn.addEventListener('click', function(e){
        cur = e.target.innerText;
    })
})

btnGroup.forEach((btn) => {
    btn.addEventListener('click', function(e){
        btnGroup.forEach((e) => {
            e.classList.add('btn-secondary')
            e.classList.remove('btn-success')
        });
        e.target.classList.remove('btn-secondary')
        e.target.classList.add('btn-success')
    })
})

btnGroup.forEach((btn) => {
        btn.addEventListener('click', function(){
        getRate(getCurrency(), getDate())
    })
})

calendar.addEventListener('input', function(){
    getRate(getCurrency(), getDate())
})

today.addEventListener('click', function(){
    date = (new Date()).toISOString().split('T')[0];
    calendar.value = (new Date()).toISOString().split('T')[0];
    getRate(getCurrency(), getDate())
})

function getCurrency(){
    return cur;
}
function getDate(){
    return calendar.value;
}

