const clockContainer = document.querySelector(".js-clock");
      clockTitle = clockContainer.querySelector("h1");

function getTime() {
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();

    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
    }:${seconds < 10 ? `0${seconds}` : seconds}`;
}

  
// 초기화 
function init() {
    //시간 설정
    getTime();
    //1초마다 시간 바뀌도록 변경
    setInterval(getTime, 1000);
}

init();