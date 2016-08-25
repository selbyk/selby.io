'use strict';
const express = require('express');
const api = require('./server/index')(express());

const port = 4200;

api.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
