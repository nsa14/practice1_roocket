// var reply_click = function () {
//     alert("Button clicked, id " + this.id + ", text" + this.innerHTML);
// }
//  function showInsertDataItem() {
//     const x = document.getElementById("insertedItemDiv");
//     if (x.style.display === "none") {
//         x.style.display = "block";
//     } else {
//         x.style.display = "none";
//     }
// }

function insertNewDataItem() {
    const price = document.getElementById('price').value;
    const type = document.getElementById('type').value;
    const desc = document.getElementById('desc').value;
    const dateTime = document.getElementById('dateTime').value;
    // const day = document.getElementById('day').value;
    // const month = document.getElementById('month').value;
    // const year = document.getElementById('year').value;
    // const slashDate = year + '/' + month + '/' + day;

    if (price.length <= 1 || desc.length <= 1) {
        alert('همه فیلد ها را پر نمایید');
        return false;
    }

    const oldData = JSON.parse(localStorage.getItem("data_practice"));
    let lastId = oldData.slice(-1).pop()

    const arrayNewData = {
        "id": lastId.id + 1,
        "price": parseInt(price),
        "desc": desc,
        "type": parseInt(type),
        "date": dateTime
    };
    // oldData.push(JSON.stringify(arrayNewData));
    oldData.push(arrayNewData);
    localStorage.setItem("data_practice", JSON.stringify(oldData));
    alert('اطلاعات به درستی ثبت شد');
    location.reload();
    // console.log(oldData);

}

 function callFunctionStart() {
    // defined default data in load page.
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
        '<td>' + ++i + '</td>' +
        '<td>' + numberWithCommas(data.price) + ' تومان</td>' +
        '<td>' + (data.type === 1 ? '<lable class="text-success">واریز</lable>' : '<lable class="text-danger">برداشت</lable>') + '</td>' +
        '<td>' + data.date + '</td>' +
        '<td><button onclick="openModal(' + data.id + ')" class="btn btn-xs btn-primary">نمایش</button><button onclick="showDeleteConfirm(' + data.id + ');" class="btn btn-xs btn-danger">خذف</button></td>' +
        '</tr>'
    );

    const depositType = storedNames.filter(function (el) {
        return el.type === 1;
    });
    let totalSalaryDeposit = depositType.map(item => item.price).reduce((prev, curr) => prev + curr, 0);

    const withdrawType = storedNames.filter(function (el) {
        return el.type === 2;
    });
    let totalSalaryWithdraw = withdrawType.map(item => item.price).reduce((prev, curr) => prev + curr, 0);

    document.getElementById('deposit').innerHTML = numberWithCommas(totalSalaryDeposit);
    document.getElementById('withdraw').innerHTML = numberWithCommas(totalSalaryWithdraw);

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function showDeleteConfirm(id){
    document.getElementById('_id').value = id;
    $("#modalConfirm").modal('show');
}
function deleteRow() {
    const id = document.getElementById('_id').value;
    const storedNames = JSON.parse(localStorage.getItem("data_practice"));
    const newData = storedNames.filter(function (ele) {
        return ele.id !== parseInt(id);
    });
    localStorage.setItem("data_practice", JSON.stringify(newData));
    console.log(newData);
    document.getElementById('_id').value = null;
    // alert('به درستی حذف شد');
    location.reload();
}

function openModal(id) {
    const storedNames = JSON.parse(localStorage.getItem("data_practice"));
    const newData = storedNames.filter(function (ele) {
        return ele.id === id;
    });

    document.getElementById('Mprice').innerHTML=newData[0].price;
    document.getElementById('Mdesc').innerHTML= newData[0].desc;
    document.getElementById('Mtype').innerHTML= newData[0].type ===1 ? 'واریز' : 'برداشت';
    document.getElementById('Mdate').innerHTML= newData[0].date;

    $("#exampleModal").modal('show');
}


window.onload = callFunctionStart;
document.getElementById('btnInserted').onclick = insertNewDataItem;

