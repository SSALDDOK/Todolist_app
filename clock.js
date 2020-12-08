const clockContainer = document.querySelector(".js-clock"),
//클래스 부를땐 .클래스이름 , querySelector는 자식들찾아주는함,
//뜻은 html문서 안에있는 js-clock을 찾는 clockContainer에 기능을 넣어주기위해서
      clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date =new Date(); //날짜오브젝트 끌어옴
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds <10 ? `0${seconds}` : seconds}`;


}
function init() {
  getTime();
  setInterval(getTime,1000);
}

init();
