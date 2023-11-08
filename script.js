'use strict';

document.querySelector('#btnIndex').addEventListener('click', function () {
  location.href = 'index.html';
});

const bpm = document.getElementById('bpm');
const notes = document.getElementById('notes');

const newNotes = [...notes.value.split('-')];

const A = document.querySelector('#btn1').value;
const Ap = document.querySelector('#btn2').value;
const B = document.querySelector('#btn3').value;
const C = document.querySelector('#btn4').value;
const Cp = document.querySelector('#btn5').value;
const D = document.querySelector('#btn6').value;
const Dp = document.querySelector('#btn7').value;
const E = document.querySelector('#btn8').value;
const F = document.querySelector('#btn9').value;
const Fp = document.querySelector('#btn10').value;
const G = document.querySelector('#btn11').value;
const Gp = document.querySelector('#btn12').value;

const Notes = [A, Ap, B, C, Cp, D, Dp, E, F, Fp, G, Gp];

const dataToSend = JSON.stringify(bpm.value, newNotes, Notes);
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
