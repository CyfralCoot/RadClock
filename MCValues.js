

function PrintValues(){
    glShowCurrent = !document.getElementById("ManContrID").checked;
    var date = new Date();
    if (!glShowCurrent) {
        DebugTimeYear = document.getElementById("YearFld").value;
        DebugTimeMon = document.getElementById("MonFld").value;
        DebugTimeDay = document.getElementById("DayFld").value;
        DebugTimeHr = document.getElementById("HrFld").value;
        DebugTimeMin = document.getElementById("MinFld").value;
        DebugTimeSec = document.getElementById("SecFld").value;
        date = new Date(DebugTimeYear, DebugTimeMon, DebugTimeDay,DebugTimeHr, DebugTimeMin, DebugTimeSec);
    }

    if (glShowCurrent)
        document.getElementById("SocDateLabel").innerHTML = "<strong>Сегодня:</strong>";
    else
        document.getElementById("SocDateLabel").innerHTML = "Дата:";

    document.getElementById("SocDateID").innerHTML = GetDateStamp(date)
    document.getElementById("SocTimeID").innerHTML = GetTimeStamp(date)

    var radians = GetDayRadians(date);
    document.getElementById("RadiansSunID").innerHTML  = radians[1].toFixed(4);
    document.getElementById("RadiansTeroID").innerHTML = radians[0].toFixed(3);

    document.getElementById("RadiansTeroOboznID").innerHTML = RadCompareDescript(radians[0]);
    document.getElementById("RadiansSunOboznID").innerHTML =  RadCompareDescript(radians[1]);

    if (glShowCurrent) setTimeout("PrintValues()", 1000); // Auto run
}

function GetTimeStamp(myDate){
    return PWithZero(myDate.getHours()) + ":"
         + PWithZero(myDate.getMinutes()) + ":"
         + PWithZero(myDate.getSeconds());
}

function GetDateStamp(myDate){
    return myDate.getDate() + "." +
          (myDate.getMonth()+1) + "." +
           myDate.getFullYear();
}

function PWithZero (myNum){
    if (myNum == 0) return "00";
    if (myNum <  10) return "0" + myNum;
    return myNum;
}

PrintValues();


