import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './containers';
import registerServiceWorker from './registerServiceWorker';

// 초기화 스타일 시트 불러오기
import './index.css';
import './animations.css';
// 환경 설정 객체 불러오기
import config from './config';

// 파이어 베이스 불러오기
import * as firebase from 'firebase';

// 파이어베이스 설정
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
