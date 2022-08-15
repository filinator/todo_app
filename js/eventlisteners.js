"use strict";

//Событие на загрузку страницы
import {render, changeAllCounter, checkedCounter, addTodoitem,} from "./main.js"
import {getName, setName} from "./localstorage.js";
import {
    searchInput, showAllButton,
    showCompletedButton,
    todoButton,
    todoButtonDeleteAll,
    todoButtonDeleteCompleted, todoButtonDeleteLast,
    todoInput
} from "./constants.js";
export {todos}

let todos = [];

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
    // changeColor()
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

// Удаляем последнюю тудушку

todoButtonDeleteLast.addEventListener('click', () => {
    todos.pop();
    setName(todos);
    render();
    changeAllCounter ()
    checkedCounter ()
});