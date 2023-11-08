'use strict';

document.querySelector('#btnIndex').addEventListener('click', function () {
  location.href = 'index.html';
});

const bpm = document.getElementById('bpm');
const notes = document.getElementById('notes');

const newNotes = [...notes.value.split('-')];

const dataToSend = JSON.stringify(bpm.value, newNotes);
let dataReceived = '';

fetch('', {
  credentials: 'http://172.24.1.1',
  mode: '172.24.1.1',
  method: 'get',
  headers: { 'Content-Type': 'application/json' },
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
