const input = $("#add-items");
const ul = $("#items");

function addItem() {
  event.preventDefault();

  let value = input.val();
  if (value !== "") {
    const li = $(`<li class="item">
    <span class="text" onkeypress="return maxCharacters(this)">${value}</span>
    <i onclick="editItem(this.parentElement.firstElementChild)" class="icon edit fas fa-edit"></i>
    <i onclick="removeItem(this.parentElement)" class="icon trash fas fa-trash-alt"></i>
    </li>`);
    ul.append(li);
    saveLocalStorage();
  }
}

function editItem(item) {
  if (!item.isContentEditable) {
    editContent(item, true, "rgb(56, 85, 110)", "fa-edit", "fa-paper-plane");
  } else {
    editContent(item, false, "rgb(39, 59, 77)", "fa-paper-plane", "fa-edit");
  }
}

function editContent(
  item,
  isContentEditable,
  backgroundColor,
  addClass,
  removeClass
) {
  item.addEventListener("keypress", (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      editContent(item, false, "rgb(39, 59, 77)", "fa-paper-plane", "fa-edit");
    }
  });

  item.setAttribute("contentEditable", isContentEditable);
  item.style.backgroundColor = backgroundColor;
  item.parentElement.children[1].classList.remove(addClass);
  item.parentElement.children[1].classList.add(removeClass);
}

function maxCharacters(item) {
  return item.innerText.length <= 90;
}

function removeItem(item) {
  item.firstElementChild.style.textDecoration = "line-through";
  item.style.pointerEvents = "none";
  item.style.backgroundColor = "rgb(21, 32, 41)";

  removeLocalStorage(item);
}

function saveLocalStorage() {
  const li = ul.children("li");
  let i = 0;
  li.each(() => {
    localStorage.setItem(i, li[i++].textContent.trim());
  });
}

function removeLocalStorage(item) {
  for (let i = 0; i < localStorage.length; i++) {
    if (item.textContent.trim() == localStorage.getItem(i)) {
      localStorage.setItem(i, "removed");
    }
  }
}

function saveList() {
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem(i) !== "removed") {
      const li = $(`<li class="item">${localStorage.getItem(i)}
                    <i onclick="editItem(this.parentNode)" class="icon edit fas fa-edit"></i>
                    <i onclick="removeItem(this.parentNode)" class="icon trash fas fa-trash-alt"></i>
                    </li>`);
      ul.append(li);
    }
  }
}

function clearStorage() {
  let storage = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.getItem(i) !== "removed")
      storage.push(localStorage.getItem(i));
  }

  localStorage.clear();

  for (let i = 0; i < storage.length; i++) {
    localStorage.setItem(i, storage[i]);
  }
}

saveList();
clearStorage();