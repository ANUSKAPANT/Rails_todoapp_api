const list = document.querySelector('.todos');
const formAdd = document.querySelector('.add');
const formEdit = document.querySelector('.editform');
const search = document.querySelector('.search input');
const edit = document.querySelector('.update');
const main = document.querySelector('.main');
var todos;
 

// list todo
listTodo();


//delete todo

list.addEventListener('click', e => {
  if(e.target.classList.contains('delete')){
    const title = e.target.parentElement.parentElement.textContent.trim();
    
    const key = todos.find(todo => {
      if(todo.task === title) {      
        return todo;
      }
    });
    taskDelete(key.id);
  }
});

// edit todo
list.addEventListener('click', e => {
  if(e.target.classList.contains('edit')){
    const title = e.target.parentElement.parentElement.textContent.trim();
    edit.classList.toggle('d-none');
    formEdit.update.value = title;
    main.classList.toggle('d-none');


    // update todo form
    formEdit.addEventListener('submit', e => {
      e.preventDefault();
      const newtitle = formEdit.update.value.trim();
      if(newtitle.length) {
        const key = todos.find(todo => {
          if(todo.task === title) {     
            return todo;
          }
        });
        taskEdit(newtitle, key.id);
        formEdit.reset();
        edit.classList.toggle('d-none');
        main.classList.toggle('d-none');
      }
    });
  }  
});


// add new todo
formAdd.addEventListener('submit', e => {
    e.preventDefault();
    const todo = formAdd.add.value.trim();
    if(todo.length) {
        taskCreate(todo);
        formAdd.reset();
    }
});

// filter todos
const filterTodos = (term => {
    Array.from(list.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(term))
        .forEach(todo => {
            todo.classList.add('filtered');
        });

        Array.from(list.children)
        .filter(todo => todo.textContent.toLowerCase().includes(term))
        .forEach(todo => {
            todo.classList.remove('filtered');
        });
});
 
//search
search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);

});