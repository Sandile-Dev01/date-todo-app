//Model section

let todos;

//Retrieve data from LocalStorage

const savedTodos = JSON.parse(localStorage.getItem('todos'));

//Check if it's an array

if(Array.isArray(savedTodos)){

    todos = savedTodos;
    }else{
        todos = [{
            title: 'Write notes',
            dueDate: '2022-07-24',
            id: 'id1'
        },
        
        {
            title: 'Submit assignment',
            dueDate: '2022-07-22',
            id: 'id2'
        },
        
        {
            title: 'Cook dinner',
            dueDate: '2022-07-23',
            id: 'id3'
        }]
    }

//Creates a todo

function createTodo(title, dueDate){

    const id = '' + new Date().getTime();

    todos.push({
        title: title,
        dueDate: dueDate,
        id: id
    });

    saveTodos();
} 

//Deletes a todo

function removeTodo(idToDelete){
    todos = todos.filter(function(todo){
        if(todo.id === idToDelete){
            return false
        }else{
            return true;
        }
    });
}

function saveTodos(){
    localStorage.setItem('todos', JSON.stringify(todos));
}

render();

//Controller section
function addTodo(){
    const textbox = document.getElementById('todo-title');
    const title = textbox.value;

    const datePicker = document.getElementById('date-picker');
    const dueDate = datePicker.value;

    createTodo(title, dueDate);
    render();
}   

    function deleteTodo(event){
        const deleteButton = event.target;
        const idToDelete = deleteButton.id;

        removeTodo(idToDelete);
        render();
    }

//View section
    function render(){

        //reset our list so that one value can be added per click

        document.getElementById('todo-list').innerHTML = '';

        todos.forEach(function(todo){
            const element = document.createElement('div');
            element.innerText = todo.title + ' ' + todo.dueDate;
            
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Delete';
            deleteButton.onclick = deleteTodo;
            deleteButton.id = todo.id;
            element.appendChild(deleteButton);
            
            const todoList = document.getElementById('todo-list')
            todoList.appendChild(element);
        });
    }
