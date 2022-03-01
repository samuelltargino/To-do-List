const getData = () => JSON.parse(localStorage.getItem("task")) ?? [];
const setData = (database) => {
  localStorage.setItem("task", JSON.stringify(database));
};

const createItem = (task, status, index) => {
  const newItem = document.createElement("label");
  newItem.classList.add("item");
  newItem.innerHTML = `
              <input type="checkbox" ${status} data-index=${index} />
              <div>${task}</div>
              <i id="delete" class="fa-solid fa-trash" data-index=${index}></i>  
    `;
  document.getElementById("box").appendChild(newItem);
};

const clearTasks = () => {
  const box = document.getElementById("box");
  while (box.firstChild) {
    box.removeChild(box.lastChild);
  }
};

const reload = () => {
  clearTasks();
  const database = getData();
  database.forEach((newItem, index) =>
    createItem(newItem.task, newItem.status, index)
  );
};

function addTaskButton() {
  const task = document.getElementById("input-text");
  const database = getData();
  database.push({ task: task.value, status: "" });
  setData(database);
  reload();
  task.value = "";
  task.focus();
}

const insertTask = (event) => {
  const task = event.target.value;

  const key = event.key;
  if (key === "Enter") {
    const database = getData();
    database.push({ task: task, status: "" });
    setData(database);
    reload();
    event.target.value = "";
    event.target.focus();
  }
};

const reloadItem = (index) => {
  const database = getData();
  database[index].status = database[index].status === "" ? "checked" : "";
  setData(database);
  reload();
};

const deleteItem = (index) => {
  const database = getData();
  database.splice(index, 1);
  setData(database);
  reload();
};

const select = (event) => {
  const click = event.target;
  if (click.type === "checkbox") {
    const index = click.dataset.index;
    reloadItem(index);
  }
  if (click.id === "delete") {
    const index = click.dataset.index;
    deleteItem(index);
  }
};

document.getElementById("send-button").addEventListener("click", addTaskButton);
document.getElementById("input-text").addEventListener("keypress", insertTask);
document.getElementById("box").addEventListener("click", select);

reload();
