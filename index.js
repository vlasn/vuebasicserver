const express = require('express');
const app = express();

app.use(require('body-parser').json());
app.use(require('cors')());

