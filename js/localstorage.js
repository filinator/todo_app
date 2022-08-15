"use strict";

export {setName, getName}

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