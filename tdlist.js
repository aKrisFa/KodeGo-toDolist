const addBtn = document.getElementById("addListbtn");
const input = document.getElementById("inputToDo");
const toDoItems = document.getElementById("to-do-List");



addBtn.addEventListener("click", function(event){

  if(event) addItem();

  function addItem(){            
      var divChild = document.createElement("div");
      var inputText = document.createElement("p");
      var checkIcon = document.createElement("input");
      var editIcon = document.createElement("button");
      var trashIcon = document.createElement("button");
  
      divChild.className = "input-group";
    
      inputText.id = "inputValue";
      inputText.innerHTML = input.value;
      divChild.appendChild(inputText);


      checkIcon.id = "done";
      checkIcon.type = "checkbox";
      checkIcon.addEventListener("click", function() {
        paragraph.contentEditable = true;
        paragraph.style.backgroundColor = "#dddbdb";
      });
      divChild.appendChild(checkIcon);

      editIcon.id = "edit";
      editIcon.innerHTML = "Edit";
      editIcon.addEventListener("click", function() {
        paragraph.contentEditable = true;
        paragraph.style.backgroundColor = "#fff";
      });
      divChild.appendChild(editIcon);

      trashIcon.id = "delete";
      trashIcon.innerHTML = "Delete";
      trashIcon.addEventListener("click", function(){
          divParent.remove();
      })       
      input.appendChild(trashIcon);

      toDoItems.appendChild(divChild);
  
 }
 })

    
