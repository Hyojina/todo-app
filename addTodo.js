import { renderTodo } from "./renderTodo.js";

export async function addTodo(list, todo, doneCheck) {
  if (list.querySelector(".list--todo") === null) {
    document.querySelector(".nothing").classList.add("hidden");
  }

  const loadingImg = document.querySelector(".loading");
  loadingImg.classList.remove("hidden");

  const res = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: "FcKdtJs202209",
        username: "KDT3_KimHyojin",
      },
      body: JSON.stringify({
        title: todo,
      }),
    }
  );
  const json = await res.json();

  loadingImg.classList.add("hidden");

  if (doneCheck === "all") {
    renderTodo(list, json, doneCheck);
  } else if (doneCheck === json.done.toString()) {
    renderTodo(list, json, doneCheck);
  }

  return json;
}
