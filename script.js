'use strict';

const bpm = document.getElementById('bpm');
const notes = document.getElementById('notes');
let newNotes = [...notes.value.split('-')];

const buttonBpm = document.querySelector('#btnBpm');
const buttonNotes = document.querySelector('#btnNotes');

const dataToSend = JSON.stringify(bpm.value, newNotes);
let dataReceived = '';

fetch('', {
  credentials: 'same-origin',
  mode: 'same-origin',
  method: 'get',
  headers: { 'Content-Tyoe': 'application/json' },
  body: dataToSend,
})
  .then(resp => {
    if (resp.status === 200) {
      return resp.json();
    } else {
      console.log(`Status:${resp.status}`);
      return Promise.reject('server');
    }
  })

  .then(dataJson => {
    dataReceived = JSON.parse(dataJson);
  })

  .catch(err => {
    if (err === 'server') {
      return console.log(err);
    }
  });

console.log(`Received:${dataReceived}`);
