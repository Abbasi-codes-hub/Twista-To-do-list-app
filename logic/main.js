let toogleFlow = document.querySelector(".toogle");
let toogleContainer = document.querySelector(".imgae-container");

let isToggled = false;

const finalToggle = () => {
  if (!isToggled) {
    toogleContainer.classList.add("toggle-effect");
    toogleFlow.style.filter = "invert(100%)";
    toogleContainer.style.background = "rgba(158, 156, 156, 0.73)";
    isToggled = true;
    document.body.style.background = "rgba(0, 0, 0, 1)";
    document.body.style.color = "white";
  } else {
    toogleContainer.classList.remove("toggle-effect");
    toogleContainer.style.background = "rgba(190, 188, 188, 0.73)";
    toogleFlow.style.filter = "";
    isToggled = false;
    document.body.style.background = "rgba(255, 255, 255, 0.88)";
    document.body.style.color = "black";
  }
};

toogleFlow.addEventListener("click", finalToggle);

// Main logic starts
let inPutData = document.querySelector(".inputvalue");
let addTodoBTn = document.querySelector(".addBTn");
let mainListsContainer = document.querySelector(".Todo-lists-container");

let messageContainer = document.querySelector(".message-container");
let updatedPara = document.querySelector(".msg-para");

//  Show Message Logic
const showMessage = (text = "Success", type = "add") => {
  updatedPara.textContent = text;
  messageContainer.classList.remove("positionright");

  // Optional styling based on type
  if (type === "error") {
    updatedPara.style.color = "rgba(219, 19, 39, 0.68)";
  } else {
    updatedPara.style.color = "rgba(19, 219, 29, 0.68)";
  }

  setTimeout(() => {
    messageContainer.classList.add("positionright");
  }, 2000);
};

const geTodoListsFromLocal = () => {
  let GettingData = localStorage.getItem("localtodolists");
  let FinalizeData = JSON.parse(GettingData);
  return FinalizeData;
};

const adDynamicallyDataFromLocal = (item) => {
  let divElement = document.createElement("div");
  divElement.classList.add("lists");
  divElement.innerHTML = `
    <li>${item}</li>
    <button class="deleteBtn" type="button">Remove</button>`;
  mainListsContainer.append(divElement);
};

let toDoArray = geTodoListsFromLocal() || [];

const addTodoLists = (e) => {
  e.preventDefault();
  let loCalTodoLists = inPutData.value.trim().toLowerCase();
  inPutData.value = "";

  if (loCalTodoLists !== "" && !toDoArray.includes(loCalTodoLists)) {
    toDoArray.push(loCalTodoLists);
    toDoArray = [...new Set(toDoArray)];
    localStorage.setItem("localtodolists", JSON.stringify(toDoArray));
    adDynamicallyDataFromLocal(loCalTodoLists);
    showMessage("Successfully added", "add");
  } else {
    showMessage("Item already exists");
  }
};

const showTodoLists = () => {
  toDoArray.forEach((item) => {
    adDynamicallyDataFromLocal(item);
  });
};

showTodoLists();

const RemoveTodoListsFromLocalOrCon = (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    let PreviousElem = e.target.previousElementSibling.innerText
      .trim()
      .toLowerCase();

    toDoArray = toDoArray.filter(
      (item) => item.trim().toLowerCase() !== PreviousElem
    );

    localStorage.setItem("localtodolists", JSON.stringify(toDoArray));
    e.target.parentElement.remove();

    showMessage("Successfully removed", "remove");
  }
};

addTodoBTn.addEventListener("click", (e) => {
  addTodoLists(e);
});

mainListsContainer.addEventListener("click", (e) => {
  RemoveTodoListsFromLocalOrCon(e);
});
