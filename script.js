{
  /* <label class="item">
              <input type="checkbox" name="checked" id="checked" />
              <div>Item 1</div>
              <?xml version="1.0" ?><!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
              <svg
                class="icon-svg trash"
                id="Layer_1"
                style="enable-background: new 0 0 512 512"
                version="1.1"
                viewBox="0 0 512 512"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
              >
                <g>
                  <path
                    d="M413.7,133.4c-2.4-9-4-14-4-14c-2.6-9.3-9.2-9.3-19-10.9l-53.1-6.7c-6.6-1.1-6.6-1.1-9.2-6.8c-8.7-19.6-11.4-31-20.9-31   h-103c-9.5,0-12.1,11.4-20.8,31.1c-2.6,5.6-2.6,5.6-9.2,6.8l-53.2,6.7c-9.7,1.6-16.7,2.5-19.3,11.8c0,0-1.2,4.1-3.7,13   c-3.2,11.9-4.5,10.6,6.5,10.6h302.4C418.2,144.1,417,145.3,413.7,133.4z"
                  />
                  <path
                    d="M379.4,176H132.6c-16.6,0-17.4,2.2-16.4,14.7l18.7,242.6c1.6,12.3,2.8,14.8,17.5,14.8h207.2c14.7,0,15.9-2.5,17.5-14.8   l18.7-242.6C396.8,178.1,396,176,379.4,176z"
                  />
                </g>
              </svg>
            </label> */
}

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

const insertTask = (event) => {
  const button = document.getElementById("send-button");
  const task = event.target.value;
  button.onclick = () => {
    const database = getData();
    database.push({ task: task, status: "" });
    setData(database);
    reload();
    event.target.value = "";
    event.target.focus();
  };
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

document.getElementById("input-text").addEventListener("keypress", insertTask);
document.getElementById("box").addEventListener("click", select);

reload();
