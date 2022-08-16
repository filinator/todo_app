'use strict';

export {todosList,todoItemTemplate,todoInput,todoButton,todoButtonDeleteAll,todoButtonDeleteLast,todoButtonDeleteCompleted,
counterOfTodos,counterOfCompleted, showCompletedButton, showAllButton, searchInput,}

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