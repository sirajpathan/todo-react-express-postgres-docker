import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import './todo.scss';


const Exapnd = styled.div`
  border: 1px solid #bbb;
  border-width: 0 1px 0 1px;
  width: 380px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  height: 0;
  -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    transition: all .5s ease;
  ul {
    padding: 0;
    margin: 0;
  }
  li {
    padding: 13px 15px;
    display: block;
    list-style: none;
    margin: 0;
    border: 1px solid #bbb;
    border-width: 0 0 1px 0;
    font-size: 17px;
  }
  input {
    height: 35px;
    width: 250px;
    border: none;
    font-size: 16px;
    padding: 3px;
    margin: 2px 10px 2px 5px;
  }
`;

const Subtask = ({post, updateStatus, addSubTask, visible}) => {console.log("rendered subtask")
  const [height, setHeight] = useState(0);
  const [checked, setChecked] = useState(post.substatus);
  const [titles, setTitles] = useState(post.titles);
    const subTaskInput = useRef(null);
    const expandRef = useRef(null);
    const addSubtask = () => {
        const val = subTaskInput.current.value;
        addSubTask(post.id, val);
        subTaskInput.current.value = "";
        setTitles(oldVal => {
          return [...oldVal, val];
        });
        setChecked(val => {
          return [...val, false];
        });
    }

    const onChangeHandler = (e, j) => {
      updateStatus(post.id, post.subid[j], e.target.checked);
      setChecked(oldVal => {
        oldVal[j] = e.target.checked;
        return [...oldVal];
      });
    }

    useEffect(()=> {
      visible ? setHeight('auto') : setHeight(0);
    }, [visible]);

    return (
        <Exapnd style={{height}} ref={expandRef} key={post.id}>
            {
                titles[0] &&  
                <ul className="sub-task-list">
                {
                    titles.map((title, j) => {
                    return <li key={j}>
                        <label className="container sm">
                        <input type="checkbox" checked={checked[j]} onChange={(e) => onChangeHandler(e, j)}/>
                        <span className="checkmark"></span>
                        <span>{title}</span>
                        </label>
                    </li>
                    })
                }
                </ul>
            }
            <div>
            <input type="text" placeholder="What are the steps?" ref={subTaskInput}/>
            <button type="submit" onClick={addSubtask} className="addSubTask-button">New Step</button>
            </div>
        </Exapnd>
    )
};

export default React.memo(Subtask);