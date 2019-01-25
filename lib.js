// Главный файл проекта. Глобальные переменные ставить здесь.


//TODO
// обычные цифры (римские)
// градусы с символом градусов
//Отображение заданной извне даты в трёх форматах (доп настройка)
//?выключатель стрелок
//шрифт по весу
//Подобрать форму стрелок
// (document.getElementById("ManContrID").checked);

var glShowCurrent = true;  // если true - то показывать текущее время, иначе отладка

var DebugTimeSec = 0
var DebugTimeMin = 0
var DebugTimeHr = 0
var DebugTimeDay = 1
var DebugTimeMon = 1
var DebugTimeYear = 0

const LimbTable =
[["0", 0, 8, 0.008, 1],
["0.1pi", 0.314, 2, 0.002, 1],
["1/pi", 0.318, 1, 0.001, 0],
["0.5", 0.5, 5, 0.005, 0],
["pi/6", 0.524, 6, 0.006, 1],
["pi/4", 0.785, 7, 0.007, 1],
["1", 1, 6, 0.006, 0],
["pi/3", 1.047, 7, 0.007, 1],
["1.5", 1.5, 5, 0.005, 1],
["pi/2", 1.571, 8, 0.008, 1],
["2", 2, 6, 0.006, 1],
["2/3pi", 2.094, 7, 0.007, 1],
["3/4pi", 2.356, 7, 0.007, 1],
["2.5", 2.5, 5, 0.005, 1],
["3", 3, 6, 0.006, 1],
["pi", 3.142, 8, 0.008, 1],
["3.5", 3.5, 5, 0.005, 1],
["5/4pi", 3.927, 7, 0.007, 1],
["pi/5", 0.628, 6, 0.006, 0],
["2/5pi", 1.257, 6, 0.006, 1],
["3/5pi", 1.885, 6, 0.006, 1],
["6/5pi", 3.77, 6, 0.006, 1],
["7/5pi", 4.398, 6, 0.006, 1],
["8/5pi", 5.027, 6, 0.006, 0],
["9/5pi", 5.655, 6, 0.006, 1],
["4", 4, 6, 0.006, 1],
["4.5", 4.5, 5, 0.005, 1],
["1,5pi", 4.712, 8, 0.008, 1],
["Sqrt(pi)", 1.772, 3, 0.003, 1],
["5", 5, 6, 0.006, 1],
["5.5", 5.5, 5, 0.005, 1],
["4/3pi", 4.189, 7, 0.007, 1],
["5/3pi", 5.236, 7, 0.007, 1],
["0.1", 0.1, 1, 0.001, 1],
["6", 6, 6, 0.006, 1],
["e", 2.718, 5, 0.005, 1]];

const monthlist =
[[1,31,0],
[2,28,31],
[3,31,59],
[4,30,90],
[5,31,120],
[6,30,151],
[7,31,181],
[8,31,212],
[9,30,243],
[10,31,273],
[11,30,304],
[12,31,334]];
//2 - число прошедших дней в обыкновенном году

function GetFDays(){
    if (DebugTimeMon > 2){
        if ((DebugTimeYear % 400 == 0) || ((DebugTimeYear % 4 == 0) && !(DebugTimeYear % 100 == 0)))
            return (DebugTimeDay+monthlist[DebugTimeMon-1][2]+1);
        else
            return (DebugTimeDay+monthlist[DebugTimeMon-1][2]);
    }
    else{
        return (DebugTimeDay+monthlist[DebugTimeMon-1][2]);
    }
}


// Получить земные и солнечные радианы
// возврат массив 0-земные потом солнечные
function GetDayRadians(myDateTime){
    var Result = [1,2];

    // земные радианы
    if (glShowCurrent == 1){
     var now = new Date();
     var sec = now.getSeconds();
     var min = now.getMinutes();
     var hr = now.getHours();
     var fullecs = (hr*3600 +min*60 + sec);
    }
    else{
      var fullecs = (DebugTimeHr*3600+DebugTimeMin*60+DebugTimeSec);
    }
    //console.log(fullecs)
    var rads = (fullecs * Math.PI / 43200);
    Result[0] = rads;

    // солнечные радианы
    var date = new Date();
   // var start = new Date(date.getFullYear(), 0, 1);
    if (glShowCurrent == 1){
     var diff = now/1000; // в секундах
    }
    else{
      var diff = ((GetFDays()-1)*86400 + DebugTimeHr*3600 + DebugTimeMin*60 + DebugTimeSec);//Без учёта прошлых лет!
    }
    const TY = 31556925.2; // тропический год в секундах
    rads = (diff / TY * 2 * Math.PI)%(2*Math.PI);
    Result[1] = rads;
    //console.log(diff)
    return Result;
}

// Описание угла в математической форме
function RadCompareDescript(myRads){
const SMBPI = "&#960";
var found1 = -1;
var found2 = -1;


    if (myRads <=LimbTable[0][3]) return "(0)";
    if (myRads >= (2*Math.PI-LimbTable[0][3])) return "(2"+SMBPI+")";

    for(var n=0; n<LimbTable.length; n++){
        if ((LimbTable[n][1]-LimbTable[n][3]<=myRads) && (myRads <=LimbTable[n][1]+LimbTable[n][3])) {
            if (found1 == -1) {
                found1 = n;
            }
            else {
                if (found2 == -1) {

                }
                else
                    break;
            }
        }
    }

    if (found1 == -1) return "";
    if (found2 != -1) {
        if (LimbTable[found1][2] < LimbTable[found2][2])  found1 = found2;
    }
    return "("+LimbTable[found1][0].replace( "pi", SMBPI)+")";
}
