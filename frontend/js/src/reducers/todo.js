function todo(state = [], action) {console.log(action)
  switch (action.type) {
    case 'ADD_TASK' :
      return [...state, {
        id: action.payload.id,
        main_title: action.payload.title,
        subid: [],
        substatus: [],
        titles: []
      }];
  case 'ADD_SUBTASK' :
    {
      const taskIndex = state.findIndex(task => task.id === action.payload.id);
      state[taskIndex].substatus.push(false);
      state[taskIndex].subid.push(action.payload.subtaskId);
      state[taskIndex].titles.push(action.payload.title);
      return state;
  }
  case 'SHOW_POSTS' :
    return action.payload;
  case 'UPDATE_SUBTASK' :
    const {taskId, subTaskId, status} = action.payload;
    const taskIndex = state.findIndex(task => taskId === task.id);
    const subTaskIndex = state[taskIndex].subid.findIndex(id => id === subTaskId);
    state[taskIndex].substatus[subTaskIndex] = status;console.log(state)
    return state;
  default:
    return state;
  }
}

export default todo;
