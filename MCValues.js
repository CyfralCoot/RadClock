

function PrintValues(){
    var date = new Date();
    document.getElementById("SocDateID").innerHTML = GetDateStamp(date)
    document.getElementById("SocTimeID").innerHTML = GetTimeStamp(date)

    var radians = GetDayRadians(date);
    document.getElementById("RadiansSunID").innerHTML  = radians[1].toFixed(4);
    document.getElementById("RadiansTeroID").innerHTML = radians[0].toFixed(3);

    document.getElementById("RadiansTeroOboznID").innerHTML = RadCompareDescript(radians[0]);
    document.getElementById("RadiansSunOboznID").innerHTML =  RadCompareDescript(radians[1]);


    setTimeout("PrintValues()", 1000);
}

function GetTimeStamp(myDate){
    if (ShowTime == 1){
     var date = new Date();
     var hours = date.getHours();
     var minutes = date.getMinutes();
     var seconds = date.getSeconds();
     return PWithZero(hours) + ":" + PWithZero(minutes) + ":" + PWithZero(seconds);
    }
    else{
      return DebugTimeHr + ":" + DebugTimeMin + ":" +  DebugTimeSec;
    }
}

function GetDateStamp(myDate){
    if (ShowTime == 1){
     return myDate.getDate() + "." + (myDate.getMonth()+1) + "." +  myDate.getFullYear();
    }
    else{
      return DebugTimeDay + "." + DebugTimeMon + "." +  DebugTimeYear;
    }
}


function PWithZero (myNum){
    if (myNum == 0) return "00";
    if (myNum <  10) return "0" + myNum;
    return myNum;
}

PrintValues();


