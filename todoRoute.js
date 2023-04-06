const router = require("express").Router();
const _ = require('lodash');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
  // reset localStorage
  // localStorage.setItem('tasks', '');
}

router.get('/list', (request, response) => {
  const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

  return response.json({
    tasks: tasks,
  });
});

router.patch('/mark-as-done/:id', function (request, response) {
  const id = parseInt(request.params.id); // use parseInt to exactly match id from currentTasks using _.find()

  // first extraction, extract collection of tasks from localStorage
  const currentTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

  // second extraction, use _.find() with {'id': id} as second parameter
  const taskToUpdate = _.find(currentTasks, {'id': id});

  // new key: done, set to 1
  taskToUpdate.done = 1;

  // remove found task from collection
  _.remove(currentTasks, function (task) {
    return task.id === id;
  });

  // push updated task to collection
  currentTasks.push(taskToUpdate);

  // sort whole collection by id
  const sorted = _.sortBy(currentTasks, ['id']);

  localStorage.setItem('tasks', JSON.stringify(sorted));

  return response.json({
    type: 'success',
    task: taskToUpdate
  });
});

router.patch('/update/:id', function (request, response) {
  const id = parseInt(request.params.id); // use parseInt to exactly match id from currentTasks using _.find()
  const updatedContent = request.body.content;

  // first extraction, extract collection of tasks from localStorage
  const currentTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

  // second extraction, use _.find() with {'id': id} as second parameter
  const taskToUpdate = _.find(currentTasks, {'id': id});

  if (taskToUpdate == undefined) {
    return response.json({
      type: 'error',
      message: `Task #${id} does not exist!`
    });
  }

  // update content, set to updatedContent (request.body.content from frontend)
  taskToUpdate.content = updatedContent;

  // remove found task from collection
  _.remove(currentTasks, function (task) {
    return task.id === id;
  });

  // push updated task to collection
  currentTasks.push(taskToUpdate);

  // sort whole collection by id
  const sorted = _.sortBy(currentTasks, ['id']);

  localStorage.setItem('tasks', JSON.stringify(sorted));

  return response.json({
    type: 'success',
    task: taskToUpdate
  });
});

router.delete('/delete/:id', function (request, response) {
  const id = parseInt(request.params.id); // use parseInt to exactly match id from currentTasks using _.find()

  // first extraction, extract collection of tasks from localStorage
  const currentTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

  // remove found task from collection
  _.remove(currentTasks, function (task) {
    return task.id === id;
  });

  localStorage.setItem('tasks', JSON.stringify(currentTasks));

  return response.json({
    type: 'success',
    message: `Task #${id} deleted`
  });
});

router.post('/create', (request, response) => {
  // get task content from payload (html form)
  const task = request.body.task;

  // get current tasks from localStorage
  const currentTasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  let newTask;

  if (currentTasks.length === 0) {
    newTask = {
      'id': 1,
      'content': task,
    };
  }
  // else if (currentTasks.length === 5) {
  //   return response.json({
  //     type: 'error',
  //     message: "Tasks list is full!"
  //   });
  // } 
  else {
    const lastRecord = currentTasks[currentTasks.length - 1];
    const newId = parseInt(lastRecord.id) + 1;

    newTask = {
      'id': newId,
      'content': task,
    };
  }

  currentTasks.push(newTask);

  localStorage.setItem('tasks', JSON.stringify(currentTasks));

  return response.json({
      type: 'success',
      tasks: currentTasks,
  });
});

module.exports = router;