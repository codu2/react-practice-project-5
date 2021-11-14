import React, { useRef, useImperativeHandle } from 'react';

import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    }

    useImperativeHandle(
        ref,
        () => {
            return {
                focus: activate
                //이 객체에는 모든 데이터를 가지고 있고 이것을 밖에서도 사용할 수 있음
                //내부함수나 내부변수를 포인터해줌으로써 사용(다른 이름으로 지정)
            }
        }
    )

    return (
        <div
          className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor={props.id}>{props.label}</label>
          <input
            ref={inputRef}
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
          />
        </div>
    )
});

export default Input;

//재사용이 가능한 Input component를 만들기 위함
//useEffect(() => {
//    inputRef.current.focus();
//    focus() 메소드는 input DOM 객체 안에서 사용가능한 메소드. ref를 사용해서 접속할 수 있음
//}, []);
//빈 종속성 배열을 넘겨서 컴포넌트가 처음으로 랜더되는 맨 처음에만 실행되도록 함
//useEffect()를 사용해서 컴포넌트가 렌더된 다음 input에만 집중할 수 있도록 함