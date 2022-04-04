var reply_click = function () {
    alert("Button clicked, id " + this.id + ", text" + this.innerHTML);
}
var showInsertDataItem = function () {
    var x = document.getElementById("insertedItemDiv");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function insertNewDataItem() {

    const price = document.getElementById('price').value;
    const type = document.getElementById('type').value;
    const desc = document.getElementById('desc').value;

    if (price.length <= 1 || desc.length <= 1) {
        alert('همه فیلد ها را پر نمایید');
        return false;
    }

    const oldData = JSON.parse(localStorage.getItem("data_practice"));
    let lastId = oldData.slice(-1).pop()

    const arrayNewData = {"id": lastId.id+1, "price": price, "desc": desc, "type": type, "date": new Date()};
    // oldData.push(JSON.stringify(arrayNewData));
    oldData.push(arrayNewData);
    localStorage.setItem("data_practice", JSON.stringify(oldData));
    alert('اطلاعات به درستی ثبت شد');
    location.reload();
    // console.log(oldData);

}

var callFunctionStart = function () {

    const data = [
        {
            "id": 1,
            "price": 5000,
            "desc": "واریزی توسط اقای ایمانی",
            "type": 1,
            "date": new Date(),
        },
        {
            "id": 2,
            "price": 3000,
            "desc": "برداشت از صندوق توسط آقای ایمانی - خرید لامپ",
            "type": 2,
            "date": new Date(),
        }
    ];

    const storedNames = JSON.parse(localStorage.getItem("data_practice"));
    // console.log(storedNames.length);

    if (storedNames === null) {
        localStorage.setItem("data_practice", JSON.stringify(data));
        console.log('create data');
    }
    console.log('load data');

    document.getElementById('dataTable').innerHTML = storedNames.map((data, i) =>
        // '<li>' + d.id + ' '+d.price+' '+ d.desc+' '+d.type+' '+d.date+ '</li>'
        '<tr>' +
        '<td>' + data.id + '</td>' +
        '<td>' + numberWithCommas(data.price) + '</td>' +
        '<td>' + data.desc + '</td>' +
        '<td>' + (data.type === 1 ? '<lable class="text-success">واریز</lable>' : '<lable class="text-danger">برداشت</lable>') + '</td>' +
        '<td>' + data.date + '</td>' +
        '</tr>'
    );

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


window.onload = callFunctionStart;

// document.getElementById('testClick').onclick = reply_click;
document.getElementById('insertData').onclick = showInsertDataItem;
document.getElementById('btnInserted').onclick = insertNewDataItem;