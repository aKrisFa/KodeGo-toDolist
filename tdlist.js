const addBtn = document.getElementById("addListbtn");
const input = document.getElementById("inputToDo");
const toDoItems = document.getElementById("to-do-List");


addBtn.addEventListener("click", function(event){

  if(event) addItem();

  function addItem(){            
      const divInput = document.createElement("div");//add div input group
      const checkIcon = document.createElement("input");
      const inputText = document.createElement("input");
      const editIcon = document.createElement("button");
      const trashIcon = document.createElement("button");
  
      divInput.className = ("input-group");  
      
      inputText.id = "inputValue";
      inputText.className = ("form-control");
      inputText.value = input.value;
      inputText.readOnly = true;

      divInput.append(inputText);

      editIcon.className = ("btn btn-outline-secondary")
      editIcon.id = "edit";
      editIcon.type = "button";
      editIcon.innerHTML = "Edit";
      editIcon.addEventListener("click", function() {
        if(editIcon.innerText.toLowerCase() == "edit"){
          inputText.removeAttribute("readonly");
          inputText.focus();
          editIcon.innerText = "Save";
        } else {
          inputText.setAttribute("readonly", "readonly");
          editIcon.innerText = "Edit";
        }
      });
    
      divInput.append(editIcon);

      trashIcon.className = ("btn btn-outline-secondary")
      trashIcon.id = "delete";
      trashIcon.innerHTML = "Delete";
      trashIcon.addEventListener("click", function(){
          divInput.remove();
      })       

      divInput.append(trashIcon);
      
      toDoItems.appendChild(divInput);
  
 }
 })

    
// icon not showing, change them to inner text
