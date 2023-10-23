'use strict';

document.querySelector('#btnIndex').addEventListener('click', function () {
  location.href = 'index.html';
});

const bpm = document.getElementById('bpm');
const notes = document.getElementById('notes');
var newNotes = [...notes.value.split('-')];

const buttonBpm = document.querySelector('#btnBpm');
const buttonNotes = document.querySelector('#btnNotes');

const dataToSend = JSON.stringify(bpm.value, newNotes);
let dataReceived = '';

fetch('', {
  credentials: 'http://172.24.1.1/metalo/',
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

let i;

for (i = 0; i < newNotes.length; i++) {
  $.get(`http://172.24.1.1/metalo/note${newNotes[i]}.cgi`);
}
