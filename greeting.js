const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");
    //querySelector는 해당 가르키는 쪽에 자식들 중 제일 첫번쨰를 가지고 옴
    //querySelectorAll 도 있지만 배열로 가지고 오기 때문에 값을 빼오는게 어려움

const USER_LS = "currentUser",
      SHOWING_CN = "showing";

//로컬 스토리지에 form에 입력된 값 저장하기
function saveName(text) {
    localStorage.setItem(USER_LS, text);
}

//form의 값을 handleing 
function handleSubmit(event) {
    //form의 enter 기능을 없앰
    event.preventDefault();
    //form에 입력된 값을 상수에 담아놓기
    const currentValue = input.value;
    //이름 출력 함수(form에 입력된 값)
    paintGreeting(currentValue);
    //로컬 스토리지에 저장하기(form에 입력된 값)
    saveName(currentValue);
}

//이름을 물어보는 함수
function askForName() {
    //form이 다시 보이게 한다.
    form.classList.add(SHOWING_CN);
    //form에 입력된 값을 handleSubmit 함수에 보낸다.
    form.addEventListener("submit", handleSubmit);
}

//이름 출력 함수
function paintGreeting(text) {
    //기존에 있던 form 을 제거 보여주는 css 제거
    form.classList.remove(SHOWING_CN);
    //h4에 있던 내용에 보여주는 css 추가(css display : 표시, 나타냄)
    greeting.classList.add(SHOWING_CN);
    //h4에 로컬 스토리지에 저장된 currentUser를 가지고 옴
    greeting.innerText = `Hello! ${text}`;
}

//이름 가져오기
function loadName() {   
    //로컬스토리지에 이름을 가져온다.
    const currentUser = localStorage.getItem(USER_LS);
    //null 
    if(currentUser === null) {
        //she is not
        askForName();
    //not null
    }else {
        //she is
        //로컬 스토리지에 이름이 있으면 이 함수로 이동
        paintGreeting(currentUser);
    }
}

//초기화
function init() {
    //이름 load
    loadName();
}

init();