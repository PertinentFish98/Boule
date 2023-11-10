'use strict';

document.querySelector('#btnIndex').addEventListener('click', function () {
  location.href = 'index.html';
});

let dataToSend1;
let dataToSend2;
let dataReceived = '';

let bpm;
let notes;
let newNotes;
let bpmValues = [];
let musicalSequence = [];

const check = localStorage.getItem('check');
console.log(check);

const sendData = function (dataToSend) {
  fetch('127.0.0.1:8080', {
    credentials: 'include',
    mode: 'cors',
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
};

document.querySelector('#btnBpm').addEventListener('click', function () {
  bpm = document.getElementById('bpm');
  dataToSend1 = JSON.stringify(bpm.value);
  sendData(dataToSend1);
  bpmValues.push(dataToSend1);
  localStorage.setItem('bpmValues', bpmValues);
  document.querySelector('#bpm').value = null;
});

document.querySelector('#btnNotes').addEventListener('click', function () {
  notes = document.getElementById('notes');
  newNotes = [...notes.value.split('-')];
  dataToSend2 = JSON.stringify(newNotes);
  sendData(dataToSend2);
  musicalSequence.push(dataToSend2);
  localStorage.setItem('musicalSequence', JSON.stringify(musicalSequence));
  document.querySelector('#notes').value = null;
});

console.log(`Received:${dataReceived}`);
