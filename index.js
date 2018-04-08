const express = require('express');
const phaseControl = require('phase-control');

const app = phaseControl(express(), {
  waitingTime: 12000,
});

app.phase('initialize app', './initializers');
app.phase('init model schemas', './models');
app.phase('initialize routes', './routes');
