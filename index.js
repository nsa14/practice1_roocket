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
        "date": dateTime,
        "dateEn": jalaliToGregorian(dateTime, '/')
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
    const d = new Date();
    let dateString = d.getFullYear() + "/" + d.getMonth() + "/" + d.getDate();
    const data = [
        {
            "id": 1,
            "price": 5000,
            "desc": "واریزی توسط اقای ایمانی",
            "type": 1,
            "date": '1401/01/16',
            "dateEn": jalaliToGregorian('1401/01/16', '/')
        },
        {
            "id": 2,
            "price": 3000,
            "desc": "برداشت از صندوق توسط آقای ایمانی - خرید لامپ",
            "type": 2,
            "date": '1400/10/2',
            "dateEn": jalaliToGregorian('1400/10/2', '/')
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

    // for chart
    const depositData = storedNames.filter(function (ele) {
        return ele.type === parseInt('1');
    });
    const withdrawData = storedNames.filter(function (ele) {
        return ele.type === parseInt('2');
    });

    // let depositNumber =depositData.map((data,i)=>
    //     [{ "x": data.date,  "y": data.price }]
    // );
    let depositNumber = depositData.map(data => ({'x': new Date(data.dateEn), 'y': data.price}));
    let withdrawNumber = withdrawData.map(data => ({'x': new Date(data.dateEn), 'y': data.price}));
    console.log(JSON.stringify(depositNumber))
    // console.log(depositNumber)
    createChartJs(depositNumber, withdrawNumber);

}

function jalaliToGregorian(myDate, seperator){
    var myDate = myDate,
        dateSplitted = myDate.split(seperator),
        jD = JalaliDate.jalaliToGregorian(dateSplitted[0], dateSplitted[1], dateSplitted[2]);
    return  (jD[0] + seperator + jD[1] + seperator + jD[2]);
    // console.log(jResult);
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showDeleteConfirm(id) {
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

    document.getElementById('Mprice').innerHTML = newData[0].price;
    document.getElementById('Mdesc').innerHTML = newData[0].desc;
    document.getElementById('Mtype').innerHTML = newData[0].type === 1 ? 'واریز' : 'برداشت';
    document.getElementById('Mdate').innerHTML = newData[0].date;

    $("#exampleModal").modal('show');
}

function createChartJs(depositNumber, withdrawNumber) {
    let options = {
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "نمودار هزینه درامد"
        },
        subtitles: [{
            text: "روی هر داده کلیک نماید تا مخفی/نمایان شود"
        }],
        axisX: {
            title: "بر اساس ماه"
        },
        axisY: {
            title: "واریز",
            titleFontColor: "#4F81BC",
            lineColor: "#4F81BC",
            labelFontColor: "#4F81BC",
            tickColor: "#4F81BC"
        },
        axisY2: {
            title: "برداشت",
            titleFontColor: "#C0504E",
            lineColor: "#C0504E",
            labelFontColor: "#C0504E",
            tickColor: "#C0504E"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "line",
            name: "واریز",
            showInLegend: true,
            xValueFormatString: "MMM YYYY",
            yValueFormatString: "#,##0 Units",
            dataPoints: depositNumber

            //
            // dataPoints: [
            //     { x: new Date(2016, 0, 1),  y: 120 },
            //     { x: new Date(2016, 1, 1), y: 135 },
            //     { x: new Date(2016, 11, 1), y: 200 }
            // ]
        },
            {
                type: "line",
                name: "برداشت",
                axisYType: "secondary",
                showInLegend: true,
                xValueFormatString: "MMM YYYY",
                yValueFormatString: "$#,##0.#",
                lineDashType: "dash",
                dataPoints: withdrawNumber
                // dataPoints: [
                //     {x: new Date(2016, 0, 1), y: 19034.5},
                //     {x: new Date(2016, 1, 1), y: 20015},
                //     {x: new Date(2016, 11, 1), y: 32534}
                // ]
            }]
    };
    $("#chartContainer").CanvasJSChart(options);

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }

}

JalaliDate = {
    g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
};
JalaliDate.jalaliToGregorian = function(j_y, j_m, j_d) {
    j_y = parseInt(j_y);
    j_m = parseInt(j_m);
    j_d = parseInt(j_d);
    var jy = j_y - 979;
    var jm = j_m - 1;
    var jd = j_d - 1;

    var j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4);
    for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

    j_day_no += jd;

    var g_day_no = j_day_no + 79;

    var gy = 1600 + 400 * parseInt(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
    g_day_no = g_day_no % 146097;

    var leap = true;
    if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */
    {
        g_day_no--;
        gy += 100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
        g_day_no = g_day_no % 36524;

        if (g_day_no >= 365) g_day_no++;
        else leap = false;
    }

    gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
    g_day_no %= 1461;

    if (g_day_no >= 366) {
        leap = false;

        g_day_no--;
        gy += parseInt(g_day_no / 365);
        g_day_no = g_day_no % 365;
    }

    for (var i = 0; g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap); i++)
        g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
    var gm = i + 1;
    var gd = g_day_no + 1;

    gm = gm < 10 ? "0" + gm : gm;
    gd = gd < 10 ? "0" + gd : gd;

    return [gy, gm, gd];
}

window.onload = callFunctionStart;
document.getElementById('btnInserted').onclick = insertNewDataItem;

