export async function deleteTodo(todoId) {
  const res = await fetch(
    `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todoId}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        apikey: "FcKdtJs202209",
        username: "KDT3_KimHyojin",
      },
    }
  );
}
