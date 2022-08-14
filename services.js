const todoForm = document.querySelector('.todo-form');

const todoInput = document.querySelector('.todo-input');
const todoInput2 = document.querySelector('.todo-input2');
const todoItemsList = document.querySelector('.todo-items');
const date = new Date();
let day =date.getDate();
let month= date.getMonth()+1;
let year = date.getFullYear();

let todoArray = [];

todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  addTodo(todoInput.value + " added at "+ `${day}-${month}-${year}`); 
});

function addTodo(item) {
  if (item !== '') {
    const todo = {
      id: Date.now(),
      name: item,
      completed: false
    };
    todoArray.push(todo);
    addToLocalStorage(todoArray);
    todoInput.value = '';
  }
}

function rendertodoArray(todoArray) {
  todoItemsList.innerHTML = '';
  todoArray.forEach(function(item) {
    const checked = item.completed ? 'checked': null;
    const li = document.createElement('li');
    li.setAttribute('class', 'item');
    li.setAttribute('data-key', item.id);
    if (item.completed === true) {
      li.classList.add('checked');
    }
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    todoItemsList.append(li);
  });
}

function addToLocalStorage(todoArray) {
  localStorage.setItem('todoArray', JSON.stringify(todoArray));
  rendertodoArray(todoArray);
}

function getFromLocalStorage() {
  const reference = localStorage.getItem('todoArray');
  if (reference) {
    todoArray = JSON.parse(reference);
    rendertodoArray(todoArray);
  }
}

function toggle(id) {
  todoArray.forEach(function(item) {
    if (item.id == id) {
      item.completed = !item.completed;
    }
  });
  addToLocalStorage(todoArray);
}

function deleteTodo(id) {
  todoArray = todoArray.filter(function(item) {
    return item.id != id;
  });
  addToLocalStorage(todoArray);
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function(event) {
  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'));
  }
  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'));
  }
});




dragElement(document.getElementById("mydiv"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}