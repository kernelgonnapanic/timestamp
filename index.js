const express = require('express');
const app = express();

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October',
  'November', 'December',
]

const parseParams = param => {
  const numericParam = Number(param);
  const decodedParam = decodeURI(param);
  const natural = Date.parse(decodedParam);
  if (!Number.isNaN(numericParam)) {
    const date = new Date(numericParam * 1000);
    return {
      unix: numericParam,
      natural: `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
    };
  } else if(!Number.isNaN(natural)) {
    return {
      natural: decodedParam,
      unix: natural / 1000 + 3600, // FIXME: get the timezones working
    }
  }
  return {
    unix: null,
    natural: null,
  }
}

app.get('/:param', (req, res) => res.send(parseParams(req.params.param)));

app.listen(3000, () => console.log('Example app listening on port 3000!'));
