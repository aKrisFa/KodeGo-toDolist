const addBtn = document.getElementById("addListbtn");
const input = document.getElementById("inputToDo");
const toDoItems = document.getElementById("to-do-List");


addBtn.addEventListener("click", function(event){

  if(event) addItem();

  function addItem(){            
      const divInput = document.createElement("div");
      const inputText = document.createElement("p");
      const checkIcon = document.createElement("input");
      const editIcon = document.createElement("button");
      const trashIcon = document.createElement("button");
  
      divInput.className = ("container");      
      inputText.id = "inputValue";
      inputText.innerHTML = input.value;
      divInput.append(inputText);


      checkIcon.id = "done";
      checkIcon.type = "checkbox";
      checkIcon.addEventListener("click", function() {
        inputText.style.textDecorationStyle = "line-through";
      });
      divInput.append(checkIcon);

      editIcon.id = "edit";
      editIcon.innerHTML = "Edit";
      editIcon.addEventListener("click", function() {
        paragraph.contentEditable = true;
      });
      divInput.append(editIcon);

      trashIcon.id = "delete";
      trashIcon.innerHTML = "Delete";
      trashIcon.addEventListener("click", function(){
          divInput.remove();
      })       
      divInput.append(trashIcon);
      toDoItems.appendChild(divInput);
  
 }
 })

    
