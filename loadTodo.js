import { renderTodo } from "./renderTodo.js";
import { deleteTodo } from "./deleteTodo.js";

export async function loadTodo(list, doneCheck, del = null) {
  // 로딩 이미지 보이기
  const loadingImg = document.querySelector(".loading");
  loadingImg.classList.remove("hidden");

  const nothingImg = document.querySelector(".nothing");
  nothingImg.classList.add("hidden");

  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        apikey: "FcKdtJs202209",
        username: "KDT3_KimHyojin",
      },
    }
  );
  const json = await res.json();
  json.reverse();

  // 한일, 안한일 옵션
  let jsonRes = []; // 옵션에서 걸러지고 남는 진짜 결과값

  json.forEach((element) => {
    if (doneCheck === "all") {
      jsonRes.push(element);
    } else if (doneCheck === element.done.toString()) {
      jsonRes.push(element);
    }
  });

  // 모두 삭제버튼 눌렀을 때
  if (del === "del") {
    jsonRes.forEach((element) => {
      deleteTodo(element.id);
    });
    jsonRes = [];
  }

  // 로딩 이미지 숨기기
  loadingImg.classList.add("hidden");

  // 렌더링
  if (jsonRes.length) {
    jsonRes.forEach((element) => {
      renderTodo(list, element, doneCheck);
    });
  } else {
    console.log("목록에 암것도 없슈");
    nothingImg.classList.remove("hidden");
  }

  return json;
}
