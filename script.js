var tango = document.querySelector("#tango");
var yumigata = document.querySelector("#yumigata")
var imi = document.querySelector("#imi")
var rei = document.querySelector("#rei")
var jsonfile = document.querySelector("#json")
var nextBotton = document.querySelector("#next")
var tangoselectdiv = document.querySelector("#tangoselect")
var ts = document.querySelector("#ts")
var jsonstr;
var tangocyou;
jsonfile.addEventListener("change", reader);
nextBotton.addEventListener("click",randomData);
ts.addEventListener("change",()=>console.log(ts.selectedIndex))
function reader() {
    var reader = new FileReader();
    reader.readAsText(this.files[0]);
    reader.onload = function fileReadCompleted() {
        jsonstr = reader.result;
        tangocyou = JSON.parse(jsonstr)
        randomData();
        tangoselectdiv.style.display="none"
    }
}
function randomData(){
    var index=Math.round(Math.random()*tangocyou.length);
    tango.innerHTML=tangocyou[index].omote;
    yumigata.innerHTML=tangocyou[index].uchi;
    imi.innerHTML=tangocyou[index].imi;
    rei.innerHTML=tangocyou[index].rei;
}