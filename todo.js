const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = "toDos";

let toDos = [];

//삭제 버튼 함수
function deleteToDo(event) {
    //삭제하는 버튼
    const btn = event.target;
    //삭제하는 버튼의 li의 값
    const li = btn.parentNode;
    //해당 li를 제거
    toDoList.removeChild(li);
    //filter :  주어진 함수의 테스트를 통과하는 모든 요소를 모아
    //새로운 배열로 반환
    const cleanToDos = toDos.filter(function(toDo) {
        //toDo : toDos 삭제되기 전 to do List
        //li :  현재 화면 상에서 존재하는 to do List
        // 두 id를 비교 했을 때 삭제한 li를 제거하고
        //새롭게 list 배열을 생성
        return toDo.id !== parseInt(li.id);
    });
    //toDos to do List array에 새롭게 생성한 list 넣기
    toDos = cleanToDos;
    //로컬스토리지 안에 To do List JSON 형식으로 저장    
    saveToDos();
}

//로컬스토리지 안에 To do List JSON 형식으로 저장
function saveToDos() {
    //그냥 저장하게 되면 자바스크립트는 로컬스토리지의 값을
    //모두 String으로 저장하기 때문에 값을 쉽게 컨트롤하기 위해
    //JSON형식으로 변환
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));    
}

//화면에 To do List 뿌려주는 함수
function paintToDo(text) {
    //List ui > li 의 요소 (리스트 하나하나)
    const li = document.createElement("li");
    //리스트 삭제 버튼
    const delBtn = document.createElement("button");
    //
    const span = document.createElement("span");
    //로직 상태로 보면 toDos는 무조건 0부터 시작 
    //li를 좀 더 쉽게 다루기 위해 id를 넣음
    const newId = toDos.length + 1; 
    //삭제 버튼 값
    delBtn.innerHTML = "X";
    //삭제 버튼 클릭했을 때 리스트 삭제 함수로 이동
    delBtn.addEventListener("click", deleteToDo);
    //입력한 값을 list에 붙여주기
    span.innerText = text;
    //li 요소 맨 마지막에 삭제버튼 추가
    li.appendChild(delBtn);
    //li 요소 맨 마지막에 입력한 리스트의 값 추가
    li.appendChild(span);
    //li태그에 id 추가해주기
    li.id = newId;
    //toDoList라는 ui 태그 안에 li 추가하기
    toDoList.appendChild(li);
    //toDoObj, 입력한 값과 id 객체 생성
    const toDoObj = {
        text : text,
        id: newId
    }
    //To do List Array에 해당 값 추가
    toDos.push(toDoObj);
    //To do List Array 저장
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";

}

//To do List 있는지 없는지 읽어오기
function loadToDos() {
    //toDos(To do List Array) 안에 값 가져오기
    const loadedToDos = localStorage.getItem(TODOS_LS);
    //값이 있으면
    if(loadedToDos !== null) {
        //To List Array에 있는 값들을 String -> JSON값으로 변환한다.
        const parsedToDos = JSON.parse(loadedToDos);
        //To List Array의 값들을 하나하나 뺴와서 뿌려주기 위해
        //forEach문으로 배열의 요소를 빼온다.
         parsedToDos.forEach(function(toDo) {
            //요소 중 텍스트만 뺴와서 화면에 뿌려주는 함수에 아규먼트로 넣는다.
            paintToDo(toDo.text);
         }); 
    }
}

//초기화(?), 및 실행 함수
function init() {
    //Do to List 읽어오기
    loadToDos();    
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
