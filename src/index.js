import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './containers';
import registerServiceWorker from './registerServiceWorker';

// 초기화 스타일 시트 불러오기
import './index.css';
import './animations.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
