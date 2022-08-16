'use strict'

export {render, changeAllCounter, checkedCounter, addTodoitem,};
import {todosList, todoItemTemplate, todoInput, counterOfTodos, counterOfCompleted, todoButtonDeleteCompleted, todoButtonDeleteAll} from "./constants.js";
import {setName, getName} from "./localstorage.js";

export {todos};

let todos = [];


// Вешаем событие на перезагрузку страницы.

window.addEventListener("load", () => {
    todos = getName();
    render();
    changeAllCounter();
    checkedCounter();
})

// Добавляем тудушку.

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
    changeAllCounter ();
};

// Удаляем все выполненные тудушки.

todoButtonDeleteCompleted.addEventListener('click', () => {
    todos = todos.filter((el) => {
        if (el.checked === false) {return todos;}
    });

    setName(todos);
    render();
    changeAllCounter ();
    checkedCounter ();
});

// Удаляем все элементы(тудушки) из массива.

todoButtonDeleteAll.addEventListener('click', () => {
    todos = [];
    setName(todos);
    render();
    changeAllCounter ();
    checkedCounter ();
});

//Считаем все дивы на странице.

function allCounter () {
    return document.querySelectorAll('.todo__item').length;
};

//Меняем текст счетчика

function changeAllCounter () {
    counterOfTodos.innerHTML = `All: ${allCounter()}`
};

//Считаем количество чекнутых чекбоксов.

function checkedCounter () {
    let arr = Array.from(document.querySelectorAll('.todo__checkbox'))
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].checked === true) {
            counter += 1;
        }
    }
    counterOfCompleted.innerHTML = `Completed: ${counter}`
};

//Добавляем туду нужный бэкграунд в зависимости от состояния checked.

function checkColorOfTodo (todoCheckbox) {
    if (todoCheckbox.checked === false) {
        todoCheckbox.parentElement.style.opacity = '1'
    } else  if (todoCheckbox.checked === true) {
        todoCheckbox.parentElement.style.opacity = '0.5'
    }
};

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

// Чистим наш контейнер при добавлении новой тудушки.

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

// Вызываем функции для того, чтобы очистить элементы, пройтись по ним 
// и прикрепить их.

function render() {
    clearTodoList();
    appendTodos();
};
