
var reply_click = function()
{
    alert("Button clicked, id "+this.id+", text"+this.innerHTML);
}

var callFunctionStart = function (){

    const data = [
        {
            "id": 1,
            "price": 5000,
            "desc": "موجودی اولیه صندوق",
            "type": "واریز",
            "date": new Date(),
        },
        {
            "id": 2,
            "price": 3000,
            "desc": "واریز به صندوق توسط آقای ایمانی",
            "type": "واریز",
            "date": new Date(),
        }
    ];

    var storedNames = JSON.parse(localStorage.getItem("data_practise"));
    // console.log(storedNames.length);

    if(storedNames===null){
        localStorage.setItem("data_practise", JSON.stringify(data));
        console.log('create data');
    }
    console.log('load data');

    document.getElementById('dataTable').innerHTML = storedNames.map((data, i) =>
        // '<li>' + d.id + ' '+d.price+' '+ d.desc+' '+d.type+' '+d.date+ '</li>'
        '<tr><td>'+data.id+'</td><td>'+data.price+'</td><td>'+data.type+'</td><td>'+data.desc+'</td><td>'+data.date+'</td></tr>'
    );

}


window.onload = callFunctionStart;

document.getElementById('testClick').onclick = reply_click;