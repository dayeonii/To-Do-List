const toDoForm = document.querySelector('#todo-form');
const toDoInput = document.querySelector('#todo-form input');
const toDoList = document.querySelector('#todo-list');

function deleteToDo() {
    //button을 누른 li 태그를 가져옴
    const li = event.target.parentElement;
    //해당 li 태그 삭제
    li.remove();
}

function paintToDo(newTodo) {   //입력값 표시하기
    const li = document.createElement('li');
    const span = document.createElement('span');
    const button = document.createElement('button');
    span.innerText = newTodo;
    button.innerText = '🗑'
    button.addEventListener('click', deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault(); //새로고침 되는거 막아줌
    const newTodo = toDoInput.value;    //입력값 가져오기
    toDoInput.value = "";   //입력값 초기화 해주기
    paintToDo(newTodo);
}

toDoForm.addEventListener('submit', handleToDoSubmit);