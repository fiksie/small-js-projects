const play = document.getElementById('swplay');
const pause = document.getElementById('swpause');
const checkPoint = document.getElementById('swcheckpoint');
const reset = document.getElementById('swreset');
const counterMain = document.getElementsByClassName('swcounter');
const counterTable = document.getElementsByClassName('tableBodyCounter');
const eraseCell = document.getElementsByClassName('cellf_erase');
let totalCentiSeconds = 0;
let timeValue = null;
let displayTotal = 0;

//Play button - starts timer

play.addEventListener("click", () => {
    if (timeValue !== null) {
        clearInterval(timeValue);
    }
    timeValue = setInterval(startTimer, 10);
    play.style.display = 'none';
    pause.style.display = 'inline-block';
});

//Pause button - pauses timer

pause.addEventListener("click", () => {

    clearInterval(timeValue);
    play.style.display = 'inline-block';
    pause.style.display = 'none';
});

//Checkpoint - take a snapshot of timer value, write it as total time value, calculate checkpoint time interval and note it if you determine if it's fastest or slowest

let countLaps = 0;
let fastnSlowArray = [];
let fastest = 0;
let slowest = 0;

checkPoint.addEventListener("click", () => {
    countLaps++;
    let a = tableInterval(totalCentiSeconds);
    let jebajiGa = formatTime(a);
    fastnSlowArray.push(a);
    let n = fastnSlowArray.length;
    let lastIntervalComparison = "";
    if (n >= 2) {
        let min = Math.min(...fastnSlowArray);
        let max = Math.max(...fastnSlowArray);
        fastest = fastnSlowArray.indexOf(min);
        slowest = fastnSlowArray.indexOf(max);
    }
    counterTable[0].innerHTML+= `<tr><td>${countLaps}</td><td class="cellf_erase" id="swcell${countLaps}">${lastIntervalComparison}</td><td><span class="swcounter">${jebajiGa[0]}:${jebajiGa[1]}:${jebajiGa[2]}:${jebajiGa[3]}</span></td><td><span class="swcounter">${displayTotal[0]}:${displayTotal[1]}:${displayTotal[2]}.${displayTotal[3]}</span></td></tr>`;
    for (let i = 0; i < eraseCell.length; i++) {
        eraseCell[i].innerHTML = "";
    }
    document.getElementById(`swcell${fastest+1}`).innerHTML = "Fastest";
    document.getElementById(`swcell${slowest+1}`).innerHTML = "Slowest";
});

//Reset timer (and all the values)

reset.addEventListener("click", () => {
    clearInterval(timeValue);
    swCentiSeconds = 0;
    swSeconds = 0;
    swMinutes = 0;
    swHours = 0;
    play.style.display = 'inline-block';
    pause.style.display = 'none';
    counterMain[0].innerHTML = `00:00:00.<span id="swcentiseconds">00</span>`;
    counterTable[0].innerHTML = '';
    countLaps = 0;
    totalCentiSeconds = 0;
    totalCentiSecondsArray = [];
    fastnSlowArray = [];
    fastest = 0;
    slowest = 0;
})

// Counter

function startTimer(){
    totalCentiSeconds++;
    displayTotal = formatTime(totalCentiSeconds);
    counterMain[0].innerHTML = `${displayTotal[0]}:${displayTotal[1]}:${displayTotal[2]}.<span id="swcentiseconds">${displayTotal[3]}</span>`;
};

//reusable time formatter function

function formatTime(registeredTime){
    let swCentiSeconds = Math.floor(registeredTime%100);
    let swSeconds = Math.floor((registeredTime/100)%60);
    let swMinutes = Math.floor((registeredTime/(100*60))%60);
    let swHours = Math.floor((registeredTime/(100*60*60))%60);

    let swH = swHours < 10 ? "0" + swHours : swHours;
    let swM = swMinutes < 10 ? "0" + swMinutes : swMinutes;
    let swS = swSeconds < 10 ? "0" + swSeconds : swSeconds;
    let swCs = swCentiSeconds < 10 ? "0" + swCentiSeconds : swCentiSeconds;

    return formattedTime = [swH,swM,swS,swCs];
};

//Let's calculate the interval lenghts between each click

let totalCentiSecondsArray = [];
let lastIntervalValue = 0;

function tableInterval(totalCentiSeconds) {
    let n = totalCentiSecondsArray.length;
    totalCentiSecondsArray.push(totalCentiSeconds);
    if (totalCentiSecondsArray.length >= 2) {
        lastIntervalValue = totalCentiSecondsArray[n] - totalCentiSecondsArray[n-1];
    }
    else{
        lastIntervalValue = totalCentiSecondsArray[n];
    }
    return lastIntervalValue;
};




