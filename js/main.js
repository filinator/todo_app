'use strict'

const todosList = document.querySelector ('[data-todo-container]');
const todoItemTemplate = document.querySelector ('[data-todo-template]');
const todoInput = document.querySelector ('[data-input]');
const todoButton = document.querySelector ('[data-button]');
const todoButtonDeleteAll = document.querySelector ('[data-button-delete-all]');
const todoButtonDeleteLast = document.querySelector ('[data-button-delete-last]');
const todoButtonDeleteCompleted = document.querySelector ('[data-button-delete-completed]')
const counterOfTodos = document.querySelector ('.todo__amount');
const counterOfCompleted = document.querySelector ('.todo__amount-completed');
const showCompletedButton = document.querySelector ('.todo__button-show-completed');
const showAllButton = document.querySelector ('.todo__button-show-all');
const searchInput = document.querySelector ('.todo__input-search');

let todos = [];

//Событие на загрузку страницы
window.addEventListener("load", () => {
    todos = getName();
    render();
    changeAllCounter()
    checkedCounter()
})

// Добавляем тудушку при нажатии на кнопку и 
// возвращаемся обратно в инпут после добавления.
todoButton.addEventListener('click', () => {
    addTodoitem()
});

todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTodoitem()
    }
});

// Добавляем тудушку

function addTodoitem () {
    const text = todoInput.value.trim();

    if (text) {
        const newTodo = {
            id: Math.random(),
            text,
            checked: false,
            date: new Date().toLocaleDateString()
        }
        todos.push(newTodo);
        todoInput.value = '';
    }
    setName(todos);
    todoInput.focus();
    render();
    changeAllCounter ()
}

// Делаем строку поиска

searchInput.addEventListener('input',() => {
    let searchValue = searchInput.value.toLowerCase();
    let valueOfTodo = Array.from(document.querySelectorAll('.todo__title'));
    for (let value of valueOfTodo) {
        let textValueFromTodo = value.innerHTML.toLowerCase();
        if (textValueFromTodo.includes(searchValue)) {
            value.parentElement.style.display = 'flex';
        } else {value.parentElement.style.display = 'none';}
    }

});

// Удаляем все элементы(тудушки) из массива.

todoButtonDeleteAll.addEventListener('click', () => {
    todos = [];
    setName(todos);
    render();
    changeAllCounter ()
    checkedCounter ()
    changeColor()
});


// Удаляем все выполненные тудушки

todoButtonDeleteCompleted.addEventListener('click', () => {
    todos = todos.filter((el) => {
        if (el.checked === false) {return todos;}  
      });

    setName(todos);
    render()
    changeAllCounter ()
    checkedCounter ()
});

// Показываем все выполненные тудушки

showCompletedButton.addEventListener('click', () => {
    const completedInput = Array.from(document.querySelectorAll('.todo__checkbox'));
    for (let i = 0; i < completedInput.length; i++) {
        if (completedInput[i].checked === false) {
            completedInput[i].parentElement.style.display = 'none';
        }
    }
});

// Показываем все тудушки

showAllButton.addEventListener('click', () => {
    const allInput = Array.from(document.querySelectorAll('.todo__checkbox'));
    for (let i = 0; i < allInput.length; i++) {
        allInput[i].parentElement.style.display = 'flex';
    }
})


//Считаем все дивы на странице
function allCounter () {
    return document.querySelectorAll('.todo__item').length;
}

//Меняем текст счетчика
function changeAllCounter () {
    counterOfTodos.innerHTML = `All: ${allCounter()}`
}

//Считаем количество чекнутых чекбоксов
function checkedCounter () {
    let arr = Array.from(document.querySelectorAll('.todo__checkbox'))
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked === true) {
            counter += 1;
        }
    }
    counterOfCompleted.innerHTML = `Completed: ${counter}`
}

//Добавляем туду нужный бэкграунд в зависимости от состояния checked
function checkColorOfTodo (todoCheckbox) {
    if (todoCheckbox.checked === false) {
        todoCheckbox.parentElement.style.opacity = '1'
    } else  if (todoCheckbox.checked === true) {
        todoCheckbox.parentElement.style.opacity = '0.5'
    }
}

// Показываем тудушку после добавления.

function createTodoItem(id, text, checked, date) {
    const todoItem = document.importNode(todoItemTemplate.content, true);
    const todoText = todoItem.querySelector('[data-todo-title]');
    const todoCheckbox = todoItem.querySelector('[data-todo-checkbox]');
    const todoDate = todoItem.querySelector('.todo__date');
    todoText.textContent = text;
    todoCheckbox.checked = checked;
    todoDate.textContent = date;
    checkColorOfTodo (todoCheckbox,checked)

    const buttonRemove = todoItem.querySelector('[data-button-remove]');

    buttonRemove.addEventListener('click', () => {
        todos = todos.filter(todo => todo.id !== id);
        setName(todos);
        render();
        changeAllCounter ()
        checkedCounter ()
    });

    todoCheckbox.addEventListener('click', () => {
        let targetObject = todos.find(todo => todo.id === id);
        if (targetObject.checked === false) {
            targetObject.checked = true;
            todoCheckbox.parentElement.style.opacity = '0.5'
        } else {
            targetObject.checked = false;
            todoCheckbox.parentElement.style.opacity = '1'
            }
        setName(todos);
        checkedCounter ();
    })

    return todoItem;
};

// Чистим наш контейнер при добавлении новой тудушки

function clearTodoList() {
    todosList.innerHTML = '';
};

// Прикрепляем созданный элемент к контейнеру.

function appendTodos () {
    if (todos.length) {
        todos.forEach (el => {
            const todo = createTodoItem (el.id, el.text, el.checked, el.date);
            todosList.append(todo);
        })
    }
};

// Вызываем функции для того, чтобы очистить элементы, прохойтись по ним 
// и прикрепить их.

function render() {
    clearTodoList();
    appendTodos();
};

// Удаляем последнюю тудушку

todoButtonDeleteLast.addEventListener('click', () => {
    todos.pop();
    setName(todos);
    render();
    changeAllCounter ()
    checkedCounter ()
});

//Отправляем в локалсторэдж
function setName (data) {
    localStorage.setItem('todos', JSON.stringify(data));
}

// Забираем из локалсторэдж
function getName()  {
    if (localStorage.getItem('todos')) {
        return JSON.parse(localStorage.getItem('todos'))
    }
    else {
        return []
    }
}