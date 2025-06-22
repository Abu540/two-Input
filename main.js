let input_1 = document.querySelector(".input_1");
let input_2 = document.querySelector(".input_2");
let btn_1 = document.querySelector(".btn_1");
let list = document.querySelector(".main");
let doneList = document.querySelector(".done");

readTask();
btn_1.addEventListener("click", () => {
  newTask = {
    category: input_1.value,
    task: input_2.value,
    id: Date.now(),
  };
  let data = JSON.parse(localStorage.getItem("main")) || {
    todo: [],
    done: [],
    point: 0,
  };
  data.todo.push(newTask);
  localStorage.setItem("main", JSON.stringify(data));
  readTask();
});

function readTask() {
  let data = JSON.parse(localStorage.getItem("main")) || {
    todo: [],
    done: [],
    point: 0,
  };
  list.innerHTML = "";
  data.todo.forEach((item) => {
    let content = document.createElement("div");
    content.classList.add("content");
    let textConent = document.createElement("div");
    textConent.classList.add("textConent");
    let h1 = document.createElement("h1");
    h1.innerText = "Category: " + item.category;
    let p = document.createElement("p");
    p.innerText = "Task: " + item.task;
    let mainBtn = document.createElement("div");
    mainBtn.classList.add("main-btn");
    let btnDone = document.createElement("button");
    btnDone.innerText = "Done";
    let btnCancel = document.createElement("button");
    btnCancel.innerText = "Cancel";
    // Done
    // append
    content.append(textConent, mainBtn);
    textConent.append(h1, p);
    mainBtn.append(btnDone, btnCancel);
    list.append(content);

    // actions
    btnCancel.addEventListener("click", () => {
      deleteCancel(item.id);
    });
    btnDone.addEventListener("click", () => {
      saveDone(item.id);
    });
  });
  doneList.innerHTML = "";

  data.done.forEach((item) => {
    let content = document.createElement("div");
    content.classList.add("content", "done-task");

    let h1 = document.createElement("h1");
    h1.innerText = "Category: " + item.category;

    let p = document.createElement("p");
    p.innerText = "Task: " + item.task;
    let btnDelete = document.createElement("button");
    btnDelete.innerText = "Delete";
    content.append(h1, p, btnDelete);
    doneList.append(content);
    btnDelete.addEventListener("click", () => {
      deleteDone(item.id);
    });
  });
}

function deleteCancel(id) {
  let data = JSON.parse(localStorage.getItem("main")) || {
    todo: [],
    done: [],
    point: 0,
  };
  data.todo = data.todo.filter((el) => el.id !== id);
  localStorage.setItem("main", JSON.stringify(data));
  readTask();
}
function saveDone(id) {
  let data = JSON.parse(localStorage.getItem("main")) || {
    todo: [],
    done: [],
    point: 0,
  };
  let taskDone = data.todo.find((el) => el.id === id);
  if (!taskDone) return;
  data.done.push(taskDone);
  data.todo = data.todo.filter((el) => el.id !== id);
  localStorage.setItem("main", JSON.stringify(data));
  readTask();
}
function deleteDone(id) {
  let data = JSON.parse(localStorage.getItem("main")) || {
    todo: [],
    done: [],
    point: 0,
  };
  data.done = data.done.filter((el) => el.id !== id);
  localStorage.setItem("main", JSON.stringify(data));
  readTask();
}
