const body = document.querySelector("body");

//이미지 개수
const IMG_NUMBER = 5;

//이미지 뿌려주는 함수
function paintImage(imgNumber) {
    //img 객체 생성 동적으로 이미지 생성
    //img 객체는 HTML 문서 내에 있는 이미지에 관한 정보를 담고 있다.
    const image = new Image();
    //이미지 경로 지정  //숫자에 +1를 하는 이유는 랜덤 숫자에서 0이 나올 수 있기 떄문!
    image.src = `images/${imgNumber + 1}.jpg`;
    //body에 image 객체를 집어넣고
    body.appendChild(image);
    //가져온 이미지에 css를 입힌다.
    image.classList.add("bgImage");
    //prepend: 선택한 요소의 내용의 앞에 추가
    body.prepend(image);
}

//랜덤 숫자 가져오는 함수
function genRandom() {
    //math.random()는 *, + 로 최대값과 최소값을 지정 할 수 있음
    //math.floor 은 소수점 버리기
    const number = Math.floor(Math.random()  * IMG_NUMBER);
    //랜덤한 숫자 return
    return number;
}

//초기화
function init(){ 
    //랜덤한 숫자가져오기
    const randomNumber = genRandom();
    //랜덤한 숫자에 따라 이미지 뿌려주는 함수
    paintImage(randomNumber);
}

init();