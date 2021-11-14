import React, { useContext } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
        <MainHeader />
        <main>
          {!ctx.isLoggedIn && <Login />}
          {ctx.isLoggedIn && <Home />}
        </main>
    </React.Fragment>
  );
}

export default App;

//app.js에서 mainheader 컴포넌트로 isAuthenticated와 onlogout prop을 보내고
//mainheader.js에서 두 props를 사용하지 않고 navigation 컴포넌트로 다시 넘기고 있음
//이처럼 짧게 forward하는 것은 별다른 문제가 되지 않음. 그러나 큰 앱에서는 이처럼 forward하는 것이 점점 길어질 수 있음
//위처럼 <AuthContext.provider></AuthContext.provider>로 묶인 요소들만 이 context API를 사용할 수 있음
//위는 isLoggedIn 값이 바뀔 때마다 업데이트 됨