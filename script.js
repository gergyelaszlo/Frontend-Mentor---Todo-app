const itemInputField = document.querySelector(".todo-input-field");
const allItemsList = document.querySelector(".all-items-list");
let filter = document. querySelectorAll(".filter span");
let storedItemList = JSON.parse(localStorage.getItem("all-stored-items"));
let totalItem = document.querySelector(".total");
let switchBtn = document.querySelector(".theme-icon");
let clearAll = document.querySelector(".deleteComp");

switchBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    let itemColor = document.querySelector(".item-todo");
    itemColor.classList.toggle("light");
    let itemTodo = document.querySelector(".all-items-list");
    itemTodo.classList.toggle("light");
    let todoInput = document.querySelector(".todo-circle");
    todoInput.classList.toggle("light");
    let activitiesMiddle = document.querySelector(".activities");
    activitiesMiddle.classList.toggle("light");
    let outSide = document.querySelector(".outside-todo-container");
    outSide.classList.toggle("back");
    let inputField = document.querySelector(".todo-input-field");
    inputField.classList.toggle("light");
    if(document.body.classList.contains('light')){
        switchBtn.src = 'images/icon-moon.svg';
    }else{
        switchBtn.src = 'images/icon-sun.svg';
    }
});

filter.forEach(activeBtn => {
    activeBtn.addEventListener("click", () => {
        document.querySelector("span.active").classList.remove("active");
        activeBtn.classList.add("active");
        showItem(activeBtn.id);
    });
});

const addAllItems = () => {
    if (storedItemList === null) {
        totalItem.innerText = "0";
    } else {
        totalItem.innerText = storedItemList.length;
    }
}
addAllItems();

const showItem = (filters) => {
    let divElem = "";
    if (storedItemList === null) {
        console.log("No item is added to localStorage.");
    } else {
        storedItemList.forEach((item, id) => {
            let isCompleted = item.status === "completed" ? "checked" : "";
            if (filters === item.status || filters === "all") {
                divElem +=
                    `
                <div class="list-item">
                    <div class="item-container">
                        <label for="${id}"> 
                            <input type="checkbox" id="${id}" class="item-checkbox" onclick="updateItem(this)" ${isCompleted}>
                            <p class="${isCompleted}">${item.name}</p>  
                        </label>                                        
                    </div>
                    <div class="delete-item">
                        <input type="image" src="images/icon-cross.svg" alt="" class="cross" onclick="deleteItem(${id})">
                    </div>
                </div>
                `;
            }
        });
    }
    allItemsList.innerHTML = divElem;
    addAllItems();
}
showItem("all");

const updateItem = (selectItem) => {
    let item = selectItem.parentElement.lastElementChild;
    if (selectItem.checked) {
        item.classList.add("checked");
        storedItemList[selectItem.id].status = "completed";
        storedItemList[selectItem.id].isCounting = true;
        console.log(item);
    } else {
        item.classList.remove("checked");
        storedItemList[selectItem.id].status = "active";
        storedItemList[selectItem.id].isCounting = false;
    }
    localStorage.setItem("all-stored-items", JSON.stringify(storedItemList));
}

const deleteItem = (deleteId) => {
    storedItemList.splice(deleteId, 1);
    localStorage.setItem("all-stored-items", JSON.stringify(storedItemList));
    showItem("all");
    addAllItems();
}

clearAll.addEventListener("click", () => {
    storedItemList.splice(0, storedItemList.length);
    localStorage.setItem("all-stored-items", JSON.stringify(storedItemList));
    showItem("all");
});

itemInputField.addEventListener("keyup", evt => {
    let newItem = itemInputField.value.trim();
    if (evt.key === "Enter" && newItem) {
        if (!storedItemList) {
            storedItemList = [];
        }
        itemInputField.value = "";
        let itemInfo = { name: newItem, status: "active", isCounting : false};
        storedItemList.push(itemInfo);
        localStorage.setItem("all-stored-items", JSON.stringify(storedItemList));
        showItem("all");
    }
});

new Sortable(allItemsList, {
    animation: 350
});