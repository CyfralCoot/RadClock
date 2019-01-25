var canvas, ctx;
const CLKRAD = 350;
var clockImage;

ClockPainting();  // Main Drawing

function MCManCalculate(){
    document.getElementById("ManContrID").checked = 1; //  switch to manual
    PrintValues();   // Fill text values
    ClockPainting(); // Show analog
}

function MCBoxClick(){
    PrintValues();
    ClockPainting(); // Show analog
}


//Main prog =====================
function ClockPainting() {

    var now = new Date();
    var sec = now.getSeconds();
    var min = now.getMinutes();
    var hr = now.getHours();
    // Assign
    canvas = document.getElementById("DivMCClock");
    ctx = canvas.getContext("2d");

    Clear();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    DrawDegreesLimb();   // 0-360
    DrawRadiansLimb();   // 0-2pi
    DrawRadianLL(); // засечки
    DrawGrid();
    // стрелки
    var radians = GetDayRadians(now);
    DrawArm(radians[0], 'blue', 350);
    DrawArm(radians[1], 'yellow', 320);

    if (glShowCurrent) setTimeout("ClockPainting()", 3000); // Autorun
}

// Рисуем стрелку
// Параметры угол, цвет, размер
function DrawArm(myRads, myColor, mySize) {
const FAR_IZG = mySize/10;
var FAR_HGT = mySize*4 / 175;
const ARN_WDT = mySize/7;

    ctx.save();
    ctx.rotate(myRads+Math.PI/2);

    ctx.beginPath();
    ctx.arc(0, 0, FAR_IZG*0.8, 0, 2*Math.PI)
  //  ctx.fill();
    ctx.stroke();// нарисовали то, что ранее описали

    ctx.save();
    ctx.translate(mySize*-0.05,0);
    ctx.lineWidth = 0;
    ctx.fillStyle = myColor;

    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.bezierCurveTo(0, ARN_WDT, FAR_IZG, -FAR_HGT, mySize, 0)
    ctx.lineTo(0,0);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.bezierCurveTo(0, -ARN_WDT, FAR_IZG, FAR_HGT, mySize, 0)
    ctx.lineTo(0,0);
    ctx.fill();
    ctx.stroke();

    //ctx.save();
    //ctx.strokeStyle = "#2030f0";// цвет контура

   // ctx.restore();
//    ctx.arc(0, 0, FAR_IZG*0.8, 0, 2*Math.PI)
  //  ctx.fill();
//    ctx.stroke();// нарисовали то, что ранее описали

    ctx.restore();
    ctx.rotate(-(myRads+Math.PI/2));

}


function DrawDegreesLimb(){
    // 0-360
    ctx.save();
    ctx.font = '16px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (var n = 0; n < 36; n++) {
        var theta = (n * Math.PI / 18)+Math.PI/2;
        var x = CLKRAD *1.02* Math.cos(theta);
        var y = CLKRAD *1.02* Math.sin(theta);
        ctx.fillText(n*10, x, y);
    }

    // заcечки
    for (var n = 0; n < 36; n++) {
        ctx.rotate(Math.PI/18);
        ctx.beginPath();
        ctx.moveTo(CLKRAD*0.93,0);
        ctx.lineTo(CLKRAD*0.97,0);
        ctx.stroke();
    }

    // точки
    for (var n = 0; n < 24; n++) {
        ctx.rotate(Math.PI/12);
        ctx.beginPath();
        ctx.arc(CLKRAD*0.95, 0, CLKRAD*0.01, 0, 2*Math.PI)
        ctx.fill();
    }

    // круги
    ctx.beginPath();
    ctx.strokeStyle = "#2030f0";// цвет контура
    ctx.arc(0, 0, CLKRAD*0.95, 0, 2*Math.PI)
    ctx.stroke();// нарисовали то, что ранее описали
    ctx.restore();
}

// Рисуем радианную шкалу
function DrawRadiansLimb(){
const INNER_CRKL = CLKRAD*0.6;
// console.log(LimbTable[1][2]);
    // сам круг
    ctx.beginPath();
    ctx.strokeStyle = "#0030f0";// цвет контура
    ctx.arc(0, 0, INNER_CRKL, 0, 2*Math.PI);
    ctx.stroke();
    ctx.restore();

    ctx.font = '14px Arial';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (var n=0; n<LimbTable.length; n++){
        if (LimbTable[n][4]) {
            var theta =LimbTable[n][1]+Math.PI/2;
            var x = INNER_CRKL*1.1 * Math.cos(theta);
            var y = INNER_CRKL*1.1 * Math.sin(theta);
            ctx.fillText(LimbTable[n][0], x, y);
        }
    }
}


function DrawRadianLL(){
    ctx.save();
    // заcечки
    for(var n=0; n<LimbTable.length; n++){
        if (LimbTable[n][4]) {
            var angel = LimbTable[n][1]+Math.PI/2;
            ctx.rotate(angel);
            ctx.beginPath();
            ctx.moveTo(CLKRAD*0.58,0);
            ctx.lineTo(CLKRAD*0.62,0);
            ctx.stroke();
            ctx.rotate(-angel);
        }
    }
    ctx.restore();

}




// сетка
function DrawGrid(){
    ctx.save();
    ctx.strokeStyle = "#60A060"; // цвет контура
    ctx.moveTo(CLKRAD*-1, 0);
    ctx.lineTo(CLKRAD* 1, 0)
    ctx.moveTo(0, CLKRAD*-1);
    ctx.lineTo(0, CLKRAD)
    ctx.stroke();// нарисовали то, что ранее описали
    ctx.restore();
}



// Очистка перед рисованием
function Clear() { // clear canvas function
    canvas.width = canvas.width;
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

//==================== SUBS ====================================



