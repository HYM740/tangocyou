//绑定网页元素
var tango = document.querySelector("#tango");
var yumigata = document.querySelector("#yumigata");
var imi = document.querySelector("#imi");
var rei = document.querySelector("#rei");
var jsonfile = document.querySelector("#json");
var nextBotton = document.querySelector("#next");
var ts = document.querySelector("#ts");
var fileinput = document.querySelector("#fileinput");

//定义数据
var jsonstr;
var tangocyou;
var tangoindex = new Array();
var index = 0;
//绑定事件
document.querySelector("#tojson").addEventListener("click", () => { fileinput.click() });
document.querySelector("#jsonBtn").addEventListener("click", () => { jsonfile.click() });
jsonfile.addEventListener("change", reader);
nextBotton.addEventListener("click", randomData);
document.getElementById("fileinput").addEventListener("change", selecteFileChangeed);
ts.addEventListener("change", selectJson);

function selectJson() {
    var request = new XMLHttpRequest();
    switch (ts.options[ts.selectedIndex].value) {
        case "N1":
        case "N3":
        case "N4":
        case "N5":
        case "D1":
        case "D2":
        case "D3":
        case "D4":
        case "GZ":
        case "CZ":
            alert("尚不可用！");
            break;
        case "N2":
            var url = "./js/tango.json";
            request.open("get", url);
            request.send(null);
            request.onload = function () {
                if (request.status == 200){
                    tangocyou = JSON.parse(request.responseText);
                    randomindex();
                    randomData();
                }
            }
            break;

        default:
            break;
    }
}

function reader() {
    var reader = new FileReader();
    reader.readAsText(this.files[0]);
    reader.onload = function fileReadCompleted() {
        jsonstr = reader.result;
        tangocyou = JSON.parse(jsonstr)
        ts.style="display:none";
        randomindex();
        randomData();
    }
}
function randomindex() {
    var i;
    for (i = 0; i < tangocyou.length; i++) {
        tangoindex.push(i);
    }
    for (i = 0; i < tangocyou.length; i++) {
        var t = tangoindex[i];
        var target = Math.round(Math.random() * tangocyou.length);
        tangoindex[i] = tangoindex[target];
        tangoindex[target] = t;
    }
    console.log(tangoindex);
}
function randomData() {
    tango.innerHTML = tangocyou[tangoindex[index]].omote;
    yumigata.innerHTML = tangocyou[tangoindex[index]].uchi;
    imi.innerHTML = tangocyou[tangoindex[index]].imi;
    rei.innerHTML = tangocyou[tangoindex[index]].rei;
    index++;
    if(index>=tangocyou.length){
        randomindex();
        index=0;
    }
}
//以下为Text文件转换为json文件相关
//构造单词对象
function Tango(omote, uchi, imi, rei) {
    this.omote = omote;
    this.uchi = uchi;
    this.imi = imi;
    this.rei = rei;
}
//通过下载的方式保存json文件
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    //似乎是兼容性
    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}
//读取到的文件内容
var filereaded = "";
var tojsontango;
function selecteFileChangeed() {
    var reader = new FileReader();
    reader.readAsText(this.files[0]);
    reader.onload = function fileReadCompleted() {
        filereaded = reader.result;
        // 按行分割
        var strlen = filereaded.split("\r\n");
        strlen.forEach(element => {
            // 按分隔符分割
            var Tangos = element.split("、");
            // 补充数量
            if (Tangos.length < 4) {
                Tangos.push(null);
                Tangos.push(null);
            }
            tojsontango.push(new Tango(Tangos[0], Tangos[1], Tangos[3], Tangos[2]));
        });
        // 输出读取结果
        // tojsontango.forEach(element => {
        //     console.log(element);
        // });
        // 转换为json
        //console.log(JSON.stringify(tangocyou));
        download("tango.json", JSON.stringify(tojsontango, null, 2));
    }
}