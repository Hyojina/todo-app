import { deleteTodo } from "./deleteTodo.js";
import { updateTodo } from "./updateTodo.js";

export async function renderTodo(list, element, doneCheck) {
  const loadingImg = document.querySelector(".loading");
  loadingImg.classList.remove("hidden");

  const boxEl = document.createElement("div");
  boxEl.classList.add("list--todo");

  // 체크박스
  const checkEl = document.createElement("input");
  checkEl.setAttribute("type", "checkbox");
  checkEl.checked = element.done;

  // 할일
  const textEl = document.createElement("input");
  textEl.classList.add("todo-text");
  textEl.value = element.title;

  // 생성날짜
  const createEl = document.createElement("div");
  const createDay = element.createdAt.slice(0, 10).split("-", 3);
  const createTime = element.createdAt.slice(11, 16);
  createEl.innerText = `생성날짜: ${createDay[0]}년 ${createDay[1]}월 ${createDay[2]}일 ${createTime}`;

  // 수정날짜
  const updateEl = document.createElement("div");
  const updateDay = element.updatedAt.slice(0, 10).split("-", 3);
  const updateTime = element.updatedAt.slice(11, 16);
  updateEl.innerText = `수정날짜: ${updateDay[0]}년 ${updateDay[1]}월 ${updateDay[2]}일 ${updateTime}`;

  // 날짜 묶기
  const dateEl = document.createElement("div");
  dateEl.classList.add("date");
  dateEl.append(createEl, updateEl);

  // 삭제 버튼
  const deleteEl = document.createElement("div");
  deleteEl.classList.add("delete-button", "button");
  deleteEl.innerText = "삭제";

  // 이벤트리스너: 삭제
  deleteEvent();

  // 이벤트리스너: 업데이트
  updateEvent();

  loadingImg.classList.add("hidden");

  // 렌더링
  boxEl.append(checkEl, textEl, dateEl, deleteEl);
  list.append(boxEl);

  // 이벤트리스너: 삭제
  function deleteEvent() {
    deleteEl.removeEventListener(
      "click",
      deleteEl.addEventListener("click", () => {
        deleteTodo(element.id);
        boxEl.classList.add("img--delete");
        setTimeout(() => {
          boxEl.remove();
        }, 1000);
      })
    );
  }

  // 이벤트리스너: 업데이트
  function updateEvent() {
    let beforeText = textEl.value;
    let afterText = textEl.value;

    textEl.addEventListener("focus", () => {
      beforeText = textEl.value;
    });
    textEl.addEventListener("blur", () => {
      afterText = textEl.value;
      if (beforeText !== afterText) {
        updateTodo(element, afterText, checkEl.checked, updateEl, boxEl);
      }
    });
    textEl.addEventListener("keyup", (key) => {
      if (key.keyCode === 13) {
        afterText = textEl.value;
        if (beforeText !== afterText) {
          updateTodo(element, afterText, checkEl.checked, updateEl, boxEl);

          beforeText = textEl.value;
        }
      }
    });
    checkEl.addEventListener("click", () => {
      checkEl.checked ? false : true;
      updateTodo(element, afterText, checkEl.checked, updateEl, boxEl);

      console.log(doneCheck);
      if (doneCheck !== "all") {
        boxEl.remove();
      }
    });
  }

  // list.innerText = element.title; // 아침먹기 나옴

  return;
}
