const weather = document.querySelector(".js-weather");

//api key 값 무분별한 api사용을 막기 위해
const API_KEY = '3ffdccdf0f4aaa2a460883b6747a236e';
const COORDS = 'coords';

//좌표 및 날씨 가져오기
function getWeather(lat, lon) {
    //fetch 약간 ajax랑 비슷한 거 
    //api를 요청해서 가져온다.
    fetch (
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    //then은 fetch가 요청을 다 처리한 후에 처리
    //api에서 받아온 response에서 json형식을 뺴옴
    ).then (function(response) {
        return response.json();
    })
    //해당 json 뺴옴
    .then (function(json) {
        //json값에서 온도
        const tempersture = json.main.temp;
        //json값에서 현재 위치
        const place = json.name;
        //날씨 넣는 html 태그안에다가 삽입
        weather.innerText = `${tempersture} @ ${place}`;
    })
}

//좌표저장
function saveCoords(coordsObj) {
    //로컬스토리지에 해당 좌표 값 저장
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

//좌표 반환 실패
function handleGeoError() {
    console.log("Cant access geo location");
}

//좌표 반환 성공
function handleGeoSuccess(position) {
    //해당 좌표 객체의 위도
    const latitude = position.coords.latitude;
    //해당 좌표 객체의 경도
    const longitude = position.coords.longitude;
    //위의 좌표를 객체로 넣음
    const coordsObj = {
        //이렇게 넣는 이유는 이미 const에서
        // latitude = 위도 값 이런 형태이기 떄문
        latitude,
        longitude
    }
    //좌표 저장
    saveCoords(coordsObj);
    //위치와 날씨 가져오기
    getWeather(latitude, longitude);
}

//좌표 값을 가지고 오는 함수
function askForCoords() {
    //navigator (사용자 신원정보를 가져옴)
    //geolocation (장치의 위치를 가져오는 방법)
    //getCurrentPosition(장치의 현재 위치를 조사한 후 장치가 위치한 지점을 반환)
                                            // 반환 성공 시      // 반환 실패 시                            
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

//좌표 값이 있는 지에 따라 실행하는 함수
function loadCoords() {
    //로컬 스토리지에 좌표값이 있는지 체크
    const loadedCoords = localStorage.getItem(COORDS);
    //로컬 스토리지에 좌표값이 없으면
    if(loadedCoords === null) {
        //좌표 값을 가져오는 함수
        askForCoords();
    }else {
        //get Wearher
        //이미 좌표값이 있으면 json값으로 매핑
        const parseCoords = JSON.parse(loadedCoords);
        //위치랑 날씨 가져오는 곳에 json값에서 위도, 경도를 뺴옴
        getWeather(parseCoords.latitude, parseCoords.longitude);

    }
}

//초기화
function init() {
    //좌표 가져오는 함수 start
    loadCoords();
}

init();