
var reply_click = function()
{
    alert("Button clicked, id "+this.id+", text"+this.innerHTML);
}

var callFunctionStart = function (){

    const data = [
        {
            "id": "موجودی اولیه صندوق",
            "price": 5000,
            "type": "deposit",
            "date": new Date(),
          },    
    ];

    var storedNames = JSON.parse(localStorage.getItem("data_practise"));
    // console.log(storedNames.length);

    if(storedNames===null){
        localStorage.setItem("data_practise", JSON.stringify(data));
        console.log('create data');
    }
    console.log('load data');

    // const showData = storedNames.map( (d,i) => '<li>' + d + '</li>');

}


window.onload = callFunctionStart;

document.getElementById('testClick').onclick = reply_click;