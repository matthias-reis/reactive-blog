import React from 'react';

import { renderToString } from 'react-dom/server';

import App from '../client';

import { version } from '../package.json';

export default (req, res) => {
  const context = {
    title: 'Woodward ',
    app: renderToString(<App />)
  };

  res.render('main', context);
};
