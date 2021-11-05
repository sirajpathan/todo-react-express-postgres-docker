import React, { useEffect, useRef, useState } from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import './todo.scss';
import Subtask from './subtask';

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 50px;
  color: #444;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  .task-input {
    width: 150px;
    margin-right: 15px;
    padding: 3px 5px;
  }
  .addTask-button {
    width: 100px;
    padding: 3px 5px;
  }
`;

const Title = styled.div`
  border: 1px solid #bbb;
  width: 410px;
  padding: 15px;
`;

const TaskTracker = styled.div`
  float: right;
  cursor: pointer;
  padding: 0 0 3px 0;
  font-size: 13px;
  color: #333;
  margin: 12px 0 0 0;
  .arrow {
    border: solid #8d8b8b;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    margin: 3px 0 0 10px;
    float: right;
  }
  .down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
  .up {
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }
`;

const Todos = props => {
  const el = useRef(null);
  const { todos } = props;
  const commentForm = useRef(null);
  useEffect(() => {
    props.getTasks();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addTasks(el.current.value);
    commentForm.current.reset();
  }

  const Task = ({post, updateTask, addSubTask, updateStatus, i}) => {
    const [visible, setVisibility] = useState(false);
    const expanHandler = (e) => {console.log("visible: " + visible)
      setVisibility(!visible);
    }
    return <div key={i}>
      <Title>
      <label className="container">
        <input type="checkbox" checked={!post.substatus.some(flag => !flag)} onChange={(e) => updateTask(post.id, e.target.checked)}/>
          <span className="checkmark"></span>
          <span>{post.main_title}</span>
      </label>
      <TaskTracker onClick={expanHandler}>
        <span>{post.substatus.filter(status => status).length} of {post.substatus.length} completed</span>
        <span><i className={visible ? "arrow up" : "arrow down"}></i></span>
      </TaskTracker>
      </Title>
      <Subtask visible={visible} post={post} updateStatus={updateStatus} addSubTask={addSubTask}/>
    </div>
  };



  return (
    <section>
      <FormContainer>
        <form ref={commentForm} onSubmit={handleSubmit} className="form-inline">
            <input type="text" ref={el} placeholder="What to do?" className="task-input"/>
            <button type="submit" color="success" className="addTask-button">New List</button>
        </form>
      </FormContainer>
      <List>
        <div>
          {todos.length === 0 && "Loading..."}
          {
            todos && todos.map((post, i) =>
              <Task key={i} post={post} updateStatus={props.updateStatus} updateTask={props.updateTask}  addSubTask={props.addSubTask} i={i}/>
            )
          }
        </div>
      </List>
    </section>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTasks: (title) => dispatch({type: 'TASK_ADD_REQUESTED', payload: title}),
    addSubTask: (id, title) => dispatch({type: 'SUBTASK_ADD_REQUESTED', payload: {id, title}}),
    getTasks: (cb) => dispatch({type: 'TASK_FETCH_REQUESTED', payload: cb}),
    updateStatus: (taskId, subTaskId, status) => dispatch({type: 'SUBTASK_UPDATE_REQUESTED', payload: {taskId, subTaskId, status}}),
    updateTask: (taskId, status) => dispatch({type: 'TASK_UPDATE_REQUESTED', payload: {taskId, status}}),
  }
}

const mapStateToProps = (state) => ({
  todos: state.todo
})
// export default Todos;
export default connect(mapStateToProps, mapDispatchToProps)(Todos)
