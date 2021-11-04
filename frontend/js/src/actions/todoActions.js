const SERVER_URL = 'http://localhost:3001';


export function addTask(title) {
  return fetch(`${SERVER_URL}/api/task/`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
      .then(response => response.json())
      .then(data => {
        return data[0].id;
      })
      .catch(console.log);
}

export function addSubTask({id, title}) {
  return fetch(`${SERVER_URL}/api/task/${id}/subtask`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
      .then(response => response.json())
      .then(data => {
        return data[0].id;
      })
      .catch(console.log);
}

export function updateSubtask({taskId, subTaskId, status}) {
  return fetch(`${SERVER_URL}/api/task/${taskId}/subtask/${subTaskId}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    })
      .then(response => response.status)
      .then(data => {
        return data;
      })
      .catch(console.log);
}

export function showTasks() {
  return fetch(`${SERVER_URL}/api/task`, {
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => data)
    .catch(console.log);
}
