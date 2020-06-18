import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';

// массив с информацией о постах
let posts = [
    {id: 1, post: 'hello', likesCount: 10},
    {id: 2, post: 'how are you?', likesCount: 15},
    {id: 3, post: 'it\'s very nice', likesCount: 5}
]

// массив с диалогами
let dialogs = [
    {id: 1, name: 'Igor'},
    {id: 2, name: 'Nikita'},
    {id: 3, name: 'Anton'},
    {id: 4, name: 'Andrey'},
    {id: 5, name: 'Yuli'},
    {id: 6, name: 'Vlad'}
]

// массив с сообщениями
let messages = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: 'I\'m OK'},
    {id: 4, message: 'How about you?'}
]

let data = {
    posts: [
        {id: 1, post: 'hello', likesCount: 10},
        {id: 2, post: 'how are you?', likesCount: 15},
        {id: 3, post: 'it\'s very nice', likesCount: 5}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'I\'m OK'},
        {id: 4, message: 'How about you?'}
    ],
    dialogs: [
        {id: 1, name: 'Igor'},
        {id: 2, name: 'Nikita'},
        {id: 3, name: 'Anton'},
        {id: 4, name: 'Andrey'},
        {id: 5, name: 'Yuli'},
        {id: 6, name: 'Vlad'}
    ]
}

ReactDOM.render(
    <App posts={posts} messages={messages} dialogs={dialogs}/>,
    document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
