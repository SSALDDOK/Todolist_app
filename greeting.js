const form = document.querySelector(".js-form"),
      input = form.querySelector("input"),
      greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
      SHOWING_CN ="showing",
      GREET_DS = 'greetDesign';

function saveName(text) {
  localStorage.setItem(USER_LS,text); //값을
}

function handleSubmit(event) {
  event.preventDefault();//이벤트가 걸리지 않게 막는 메소드
  const currentValue = input.value;//값을 저장
  paintGreeting(currentValue);
  saveName(currentValue);
}//폼의 enter눌렀을

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit",handleSubmit)
}//form의 display를 block으로 만들어서 보여줌, 엔터시 함수로넘어감

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);//form을 none으로 만듬
  greeting.classList.add(SHOWING_CN);//greeting클래스를 block으로 만듬
  greeting.innerText = `Hello ${text}`;//Text가 바뀜
  greeting.classList.add(GREET_DS);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if(currentUser === null){
    askForName();
  }else{
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
