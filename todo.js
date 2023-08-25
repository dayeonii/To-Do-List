//요소를 갖고오는 querySelector
const toDoForm = document.querySelector('#todo-form');
const toDoInput = document.querySelector('#todo-form input');
const toDoList = document.querySelector('#todo-list');

const TODOS_KEY = 'todos';

let toDos = [];   //할 일 넣어줄 배열

function saveToDos() {
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo() {
    //button을 누른 li 태그를 가져옴
    const li = event.target.parentElement;
    //해당 li 태그 삭제
    li.remove();

    toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));    //parseInt 형변환
    //id가 같으면 false가 나오니까 filter에서 제외하고
    saveToDos();
}

function paintToDo(newTodoObj) {   //입력값 표시하기
    const li = document.createElement('li');    //<li> 태그 형성
    li.id = newTodoObj.id;  //li에 id 부여
    const span = document.createElement('span');    //<span> 태그 형성 (li하위에 들어갈것)
    const button = document.createElement('button');    //<button> 태그 형성
    span.innerText = newTodoObj.text;   //span에 할 일 텍스트를 넣어주기
    button.innerText = '🗑' //삭제버튼에 들어갈 텍스트
    button.addEventListener('click', deleteToDo);
    li.appendChild(span);   //li 하위에 span 넣어주기
    li.appendChild(button); //li 하위에 button 넣어주기
    toDoList.appendChild(li);   //ul태그인 todo-list 하위에 li 넣어주기
}

//입력 후 submit 했을때 실행될 함수
function handleToDoSubmit(event) {
    event.preventDefault(); //새로고침 되는거 막아줌
    const newTodo = toDoInput.value;  //입력값 가져오기
    toDoInput.value = "";   //입력칸의 값 초기화 해주기
    const newTodoObj = {    //입력값 (할 일 텍스트(newTodo)와, 랜덤수(id))
        text: newTodo,
        id: Date.now(), //랜덤 수 생성 (밀리초 반환 이용)
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);  //입력된값을 paint 하는 함수 실행
    saveToDos();    //로컬에 저장하기
}

toDoForm.addEventListener('submit', handleToDoSubmit);

//저장했던 내용들 불러오기
const savedToDos = localStorage.getItem(TODOS_KEY);
if(savedToDos) {    //저장된게 있다면
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;    //데이터가 계속 추가되도록, 배열이 새로 시작하지 않게
    parsedToDos.forEach(paintToDo);
}