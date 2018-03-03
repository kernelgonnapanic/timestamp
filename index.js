const express = require('express');
const app = express();

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December',
];

// the task is not taking into account data about the user timezone, the calculations are done using server's timezone

const calculateFromUnix = timestamp => {
  const date = new Date(timestamp * 1000);
  return {
    unix: timestamp,
    natural: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
  };
}

const calculateFromNatural = (natural, timestampFromNatural) => {
  return {
    natural,
    unix: timestampFromNatural / 1000,
  }
}

const parseParams = param => {
  const timestamp = Number(param);
  const decodedNatural = decodeURI(param);
  const timestampFromNatural = Date.parse(decodedNatural);
  if (!Number.isNaN(timestamp) && timestamp >= 0) {
    return calculateFromUnix(timestamp);
  } else if(!Number.isNaN(timestampFromNatural)) {
    return calculateFromNatural(decodedNatural, timestampFromNatural);
  }
  return {
    unix: null,
    natural: null,
  }
}

app.get('/:param', (req, res) => res.send(parseParams(req.params.param)));

app.listen(3001, () => console.log('Example app listening on port 3001!'));
