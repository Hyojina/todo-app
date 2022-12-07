export async function updateTodo(element, blurText, check, updateEl, boxEl) {
  // 로딩 이미지 시작
  boxEl.classList.add("loading");

  const res = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${element.id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        apikey: "FcKdtJs202209",
        username: "KDT3_KimHyojin",
      },
      body: JSON.stringify({
        title: blurText,
        done: check,
      }),
    }
  );
  const json = await res.json();

  console.log(json.updatedAt);

  const updateDay = json.updatedAt.slice(0, 10).split("-", 3);
  const updateTime = json.updatedAt.slice(11, 16);

  // 로딩 이미지 끝
  boxEl.classList.remove("loading");

  updateEl.innerText = `수정날짜: ${updateDay[0]}년 ${updateDay[1]}월 ${updateDay[2]}일 ${updateTime}`;

  return json;
}
