const form = document.getElementById('todo-form');
const input = document.getElementById('task-content');
const baseUrl = 'http://localhost:3000';
const todoListContainer = document.getElementById('to-do-list');

function markTaskAsDone(event) {
  const taskId = event.target.value;
  const input = document.getElementById(`input-${taskId}`);
  if (event.target.checked) {
    // checked, mark as done
    fetch(
      `${baseUrl}/task/mark-as-done/${taskId}`,
      {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => {
      if (response.status == 200) {
        input.classList.add('done');
      }
    });
  } else {
    // unchecked, revert
    input.classList.remove('done');
  }
}

function updateTask(event) {
  const taskId = event.target.value;
  const textInput = document.getElementById(`input-${taskId}`);
  const updatedTask = textInput.value;

  fetch(
    `${baseUrl}/task/update/${taskId}`,
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: updatedTask,
      }),
      method: 'PATCH',
    }
  ).then((response) => {
    if (response.status == 200) {
      return response.json();
    }
  }).then((data) => {
    if (data.type == 'success') {
      textInput.value = data.task.content;
      textInput.readOnly = true;
      event.target.innerHTML = 'Edit';
      event.target.removeEventListener('click', updateTask);
      event.target.addEventListener('click', allowEdit);
    } else {
      alert(data.message);
    }
  });
}

function allowEdit(event) {
  const taskId = event.target.value;
  const input = document.getElementById(`input-${taskId}`);
  input.readOnly = false;
  event.target.innerHTML = 'Save';
  input.focus();

  event.target.removeEventListener('click', allowEdit);
  event.target.addEventListener('click', updateTask);
}

function deleteTask(event) {
  const taskId = event.target.value;
  if (confirm(`Are you sure to delete Task #${taskId}`)) {
    fetch(`${baseUrl}/task/delete/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      if (response.status == 200) {
        document.getElementById(`task-group-${taskId}`).remove();
      }
    });
  }
}

function buildTasksList(tasks) {
  tasks.forEach((row) => {
    const container = document.createElement('div');
    const textInput = document.createElement('input');
    const editBtn = document.createElement('button');
    const trashBtn = document.createElement('button');

    const checkboxContainer = document.createElement('div');
    const markAsDoneCb = document.createElement('input');

    container.className = 'input-group mb-1';
    container.id = `task-group-${row.id}`;

    // set mark as done checkbox html attributes
    checkboxContainer.className = 'input-group-text';
    markAsDoneCb.className = 'form-check-input';
    markAsDoneCb.type = 'checkbox';
    markAsDoneCb.value = row.id;
    if (row.done == 1) {
      markAsDoneCb.checked = true;
    }
    checkboxContainer.append(markAsDoneCb);

    // add event listener to checkbox
    markAsDoneCb.addEventListener('change', markTaskAsDone);

    // append checkbox
    container.append(checkboxContainer);

    // set text input html attributes
    textInput.id = 'input-' + row.id;
    textInput.className = 'form-control';
    if (row.done == 1) {
      textInput.classList.add('done');
    }
    textInput.value = row.content;
    textInput.readOnly = true;

    // append text input
    container.append(textInput);

    // set edit button html attributes
    editBtn.className = 'btn btn-outline-secondary';
    editBtn.innerHTML = 'Edit';
    editBtn.value = row.id;

    editBtn.addEventListener('click', allowEdit);

    // append edit button
    container.append(editBtn);

    // set trash button html attributes
    trashBtn.className = 'btn btn-outline-secondary';
    trashBtn.innerHTML = 'Delete';
    trashBtn.value = row.id;

    trashBtn.addEventListener('click', deleteTask);

    // append trash button
    container.append(trashBtn);

    todoListContainer.appendChild(container);
  });
}

function createTask(event) {
  event.preventDefault();

  const content = input.value;

  if (content.length === 0) {
    alert('Please enter the task details');
    return;
  }

  // request to API / backend
  fetch(
    `${baseUrl}/task/create`, // url
    {
      // payload
      body: JSON.stringify({
        task: content
      }),
      // headers
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      // method
      method: 'post'
    }
  ).then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  }).then((data) => {
    if (data.type == 'success') {
      input.value = '';
      todoListContainer.innerHTML = '';

      buildTasksList(data.tasks);
    } else {
      alert(data.message);
    }
  });


  // // place here the element for new task

  //     const divInput = document.createElement("div");//add div input group
  //     const checkIcon = document.createElement("input");
  //     const inputText = document.createElement("input");
  //     const editIcon = document.createElement("button");
  //     const trashIcon = document.createElement("button");
  
  //     divInput.className = ("input-group");  
      
  //     inputText.id = "inputValue";
  //     inputText.className = ("form-control");
  //     inputText.value = input.value;
  //     inputText.readOnly = true;

  //     divInput.append(inputText);

  //     editIcon.className = ("btn btn-outline-secondary")
  //     editIcon.id = "edit";
  //     editIcon.type = "button";
  //     editIcon.innerHTML = "Edit";
  //     editIcon.addEventListener("click", function() {
  //       if(editIcon.innerText.toLowerCase() == "edit"){
  //         inputText.removeAttribute("readonly");
  //         inputText.focus();
  //         editIcon.innerText = "Save";
  //       } else {
  //         inputText.setAttribute("readonly", "readonly");
  //         editIcon.innerText = "Edit";
  //       }
  //     });
    
  //     divInput.append(editIcon);

  //     trashIcon.className = ("btn btn-outline-secondary")
  //     trashIcon.id = "delete";
  //     trashIcon.innerHTML = "Delete";
  //     trashIcon.addEventListener("click", function(){
  //         divInput.remove();
  //     })       

  //     divInput.append(trashIcon);
      
  //     toDoItems.appendChild(divInput);
  

}

function fetchTasksList() {
  // fetch list of tasks from API
  fetch(`${baseUrl}/task/list`).then((response) => {
    if (response.status == 200) {
      return response.json();
    }
  }).then((data) => {
    buildTasksList(data.tasks);
  });
}

form.addEventListener('submit', createTask);

document.addEventListener('DOMContentLoaded', fetchTasksList);

// ======= OLD FORM ====================//
// const addBtn = document.getElementById("addListbtn");
// const input = document.getElementById("inputToDo");
// const toDoItems = document.getElementById("to-do-List");


// addBtn.addEventListener("click", function(event){

//   if(event) addItem();

//   function addItem(){            
//       const divInput = document.createElement("div");//add div input group
//       const checkIcon = document.createElement("input");
//       const inputText = document.createElement("input");
//       const editIcon = document.createElement("button");
//       const trashIcon = document.createElement("button");
  
//       divInput.className = ("input-group");  
      
//       inputText.id = "inputValue";
//       inputText.className = ("form-control");
//       inputText.value = input.value;
//       inputText.readOnly = true;

//       divInput.append(inputText);

//       editIcon.className = ("btn btn-outline-secondary")
//       editIcon.id = "edit";
//       editIcon.type = "button";
//       editIcon.innerHTML = "Edit";
//       editIcon.addEventListener("click", function() {
//         if(editIcon.innerText.toLowerCase() == "edit"){
//           inputText.removeAttribute("readonly");
//           inputText.focus();
//           editIcon.innerText = "Save";
//         } else {
//           inputText.setAttribute("readonly", "readonly");
//           editIcon.innerText = "Edit";
//         }
//       });
    
//       divInput.append(editIcon);

//       trashIcon.className = ("btn btn-outline-secondary")
//       trashIcon.id = "delete";
//       trashIcon.innerHTML = "Delete";
//       trashIcon.addEventListener("click", function(){
//           divInput.remove();
//       })       

//       divInput.append(trashIcon);
      
//       toDoItems.appendChild(divInput);
  
//  }
//  })

    
// // icon not showing, change them to inner text
