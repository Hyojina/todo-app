// 1. GET 조회
// 2. POST 생성
// 3. PUT 수정
// 4. DELETE 삭제

import { addTodo } from "./addTodo.js";
import { loadTodo } from "./loadTodo.js";

const todoTextInput = document.querySelector(".input-box");
const createBtn = document.querySelector(".add-button");
const list = document.querySelector(".list");
const done = document.getElementsByName("done");
const allDeleteBtn = document.querySelector(".all-delete-button");
let doneCheck = "all";

// 1. 목록 초기화
loadTodo(list, doneCheck);

// 2. 옵션값 바뀌면 목록 초기화
done.forEach((node) => {
  node.addEventListener("click", () => {
    doneCheck = node.value;
    removeTodo();
    loadTodo(list, doneCheck);
    allDeleteBtn.innerText = "모두 지우기";
  });
});

// 3. 리스트
allDeleteBtn.addEventListener("click", () => {
  if (allDeleteBtn.innerText === "다 지워요?") {
    // 진짜로 삭제
    loadTodo(list, doneCheck, "del");
    removeTodo();
    allDeleteBtn.innerText = "모두 지우기";
  } else {
    // 기회를 한번 더 주기
    allDeleteBtn.innerText = "다 지워요?";
  }
});

// 4. 추가하기
createBtn.addEventListener("click", () => {
  if (todoTextInput.value !== "") {
    addTodo(list, todoTextInput.value, doneCheck);
    todoTextInput.value = "";
  }
});
todoTextInput.addEventListener("keyup", (key) => {
  if (key.keyCode === 13) {
    if (todoTextInput.value !== "") {
      addTodo(list, todoTextInput.value, doneCheck);
      todoTextInput.value = "";
    }
  }
});

function removeTodo() {
  list.querySelectorAll(".list--todo").forEach((element) => {
    element.remove();
  });
}
