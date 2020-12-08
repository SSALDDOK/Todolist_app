const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");

const TODOS_LS='loadedToDos',
      FORM_DS='todoFormDesign';

let toDos = []; //li배열

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  li.classList.remove(FORM_DS);
  const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);

    //foreach의 쓰임과 같이 item과 같이 실행되는것
  });
  //filter가 true,false로 받음 지워진 아이들을 array로 만들어주는것
toDos = cleanToDos;
saveToDos();
}

function saveToDos() {
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
      //json이object를 string으로 바꿔줌
}

function paintToDo(text){
  const li = document.createElement("li");//비어있는 li
  const delBtn = document.createElement("button");//버튼
  const span = document.createElement("span");//줄바꿈되지않음 바로 옆에 붙는 형식
  const newID = toDos.length+1;
  delBtn.innerText ="❌";
  delBtn.addEventListener("click",deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn); // li안에 버튼넣음
  li.appendChild(span);//li안에 span넣음
  li.id = newID;
  toDoList.appendChild(li);
//  li.classList.add(FORM_DS);

   const toDoObj = {
     text: text,
     id : newID
   };

   toDos.push(toDoObj);
   saveToDos();
}//element 추가하는 방법

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value ="";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null){
      const parsedToDos = JSON.parse(loadedToDos);//JSON은 string을 Object로도 변환시켜줌
      parsedToDos.forEach(function (toDo){
        paintToDo(toDo.text);//오브젝트의 텍스트를 불러옴
      });//array일때 쓰는 함수 foreach는 paintToDo의 함수를 각각실행(for문이라고 생각)
  }else{

  }
}

function init(){
  loadToDos();
  toDoForm.addEventListener("submit",handleSubmit);
}

init();
