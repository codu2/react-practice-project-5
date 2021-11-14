import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';
import Input from '../INPUT/Input';

const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.includes('@')}
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value: '', isValid: false}
};

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
    return {value: action.val, isValid: action.val.trim().length > 6}
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 6}
  }
  return {value: '', isValid: false}
};
//구성 함수 밖에서 함수가 만들어져 사용된 이유는 이 함수 안에서 데이터가 필요없기 때문, 필요한 데이터는 모두 이 함수로 패스될 것이고 react가 실행될 때 자동으로 들어올 것

const Login = () => {
  //값과 유효성을 하나로 묶어 관리하는 것이 useReducer의 목표
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  //const [state, dispatch] = useReducer(reducer, initialState);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {value: '', isValid: null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value: '', isValid: null});

  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    console.log('EFFECT RUNNING');

    return () => {
      console.log('EFFECT CLEANUP');
    };
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);
  //그러나 emailState나 passwordState 값이 바뀔 때마다 useEffect가 실행되므로 이미 유효성을 검증했는데도 값을 추가하면 함수가 다시 실행되는 불필요한 일이 발생

  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value});

    //setFormIsValid(
    //  event.target.value.includes('@') && passwordState.isValid
    //);
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value});

    //setFormIsValid(
    //  emailState.isValid && event.target.value.trim().length > 6
    //);
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: 'INPUT_BLUR'});
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: 'INPUT_BLUR'});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
      //email과 password가 둘다 유효하면
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
      //먼저 email을 확인했을 때 email의 형식이 유효하지 않다면
    } else {
      passwordInputRef.current.activate();
      //email을 먼저 확인했을 때 email이 유효하고 password가 유효하지 않다면
    }
    //물론 email과 password 둘다 유효하지 않을 수도 있지만 일단 첫번째 input인 email의 유효성에 집중해보자면
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input ref={emailInputRef} id="email" label="E-mail" type="email" isValid={emailIsValid} value={emailState.value} onChange={emailChangeHandler} onBlur={validateEmailHandler} />
        <Input ref={passwordInputRef} id="password" label="Password" type="password" isValid={passwordIsValid} value={passwordState.value} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
