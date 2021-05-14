import React from 'react';
import ReactDOM from 'react-dom';
import { getUser } from './service/user';
import AutoSizer from 'react-virtualized-auto-sizer'


ReactDOM.render(
  <React.StrictMode>
    <AutoSizer disableHeight>
      {({width}) => <div
      style={{overflow: 'visible', width: width + 'px'}}>{getUser(1).firstName}</div>}
    </AutoSizer>
  </React.StrictMode>,
  document.getElementById('root')
);