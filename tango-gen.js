//创建单词对象，参数：单词，读音，意义，例句
function Tango(omote, uchi, imi, rei) {
  this.omote = omote;
  this.uchi = uchi;
  this.imi = imi;
  this.rei = rei;
}
function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);

    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        pom.dispatchEvent(event);
    }
    else {
        pom.click();
    }
}
var filereaded = "";
function selecteFileChangeed() {
  var reader = new FileReader();
  reader.onload = function fileReadCompleted() {
    filereaded = reader.result;
    // 按行分割
    var strlen = filereaded.split("\r\n");
    strlen.forEach(element => {
      // 按分隔符分割
      var Tangos = element.split("、");
      if(Tangos[0].length==0){
        continue;
      }
      // 补充数量
      if (Tangos.length < 4) {
        Tangos.push(null);
        Tangos.push(null);
      }
      tangocyou.push(new Tango(Tangos[0], Tangos[1], Tangos[3], Tangos[2]));
    });
    // 输出读取结果
    tangocyou.forEach(element => {
      console.log(element);
    });
    // 转换为json
    //console.log(JSON.stringify(tangocyou));
    download("tango.json",JSON.stringify(tangocyou,null,2));
  }
  reader.readAsText(this.files[0]);
}
var tangocyou = new Array();
// 从文件中读取数据
document.getElementById("fileinput").addEventListener("change", selecteFileChangeed);