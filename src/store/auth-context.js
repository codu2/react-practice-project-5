import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {},
    onLogin: (email, password) => {}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
    
        if (storedUserLoggedInInformation === '1') {
          setIsLoggedIn(true);
        }
      }, []);
    
    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    }

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }

    return <AuthContext.Provider value={{isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler}}>
        {props.children}
    </AuthContext.Provider>
}
//전체적인 authentication 상태를 authcontextProvider에서 관리할 수 있도록 함

export default AuthContext;

//우리가 파일에서 사용 가능하도록 AuthContext를 export 해줌
//디폴트 값 말고도 더미 함수를 지정해 줄 수 있음

//그러나 state가 1초에 한번씩처럼 빠르게 바뀌게 되면 useContext는 이를 감당할 수 없음
//high frequency change 즉 잦은 변경에는 좋지 않음
//이때 사용하는 좋은 도구가 바로 redux 리덕스
//모든 상황에서 Context나 Redux를 사용하는 것은 아님. props는 component를 configuration 할 때 여전히 중요함 예)UI는 지정된 역할이 아닌 재사용이 가능해야 함

//react hook은 오직 react 함수 안에서만 호출해야 한다. component 함수, custom react hook 함수에서도 마찬가지.
//react hook은 component 함수나 react hook 함수 안의 내장된 다른 함수에서 부를 수 없음. component 함수나 custom react hook 함수 안에서 바로 불러야 함