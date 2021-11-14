import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { AuthContextProvider } from './store/auth-context';

ReactDOM.render(<AuthContextProvider><App /></AuthContextProvider>, document.getElementById('root'));

//<App /> component 전체를 <AuthContextProvider>로 묶어줌