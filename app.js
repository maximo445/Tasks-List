const container = document.querySelector('.container');
const newTaskInput = document.querySelector('#new-task');
const addTaskBtn = document.querySelector('#add-task-btn');
const filter = document.querySelector('#filter');
console.log(filter);
const listUl = document.querySelector('#task-ul');

//Reload functionality
const entries = performance.getEntriesByType("navigation");

console.log(entries.map(nav => {
    newTaskInput.value = "";
    if(nav.type === 'reload' && localStorage.getItem('tasks') != null) {
        let tasksOnReload = JSON.parse(localStorage.getItem('tasks'));
       getAndDisplay(tasksOnReload);
       console.log(nav.type);
    }
}));

if (window.performance) {
    console.log("works");
}


container.addEventListener('click', respond);

filter.addEventListener('input', filterList);

(function () {
    let myUl = document.querySelector('#tasks-ul');
    let myUlChildren = Array.from(myUl.children);
    myUlChildren.forEach(element => {
        myUl.removeChild(element);
    });
    const tasksList = JSON.parse(localStorage.getItem('tasks'));
    if (tasksList) {
        getAndDisplay(tasksList);
    }
})();

function filterList (event) { 

    const tasks = Array.from(document.querySelector('#tasks-ul').children);

    tasks.forEach(element => {   

        const userInput = event.target.value;

        const currentTask = String(element.firstChild.textContent);

        if (currentTask.toLocaleLowerCase().includes(userInput.toLocaleLowerCase())) {
            element.style.display = 'flex';                
        } else {
            element.style.display = 'none';
        }

    });
    
    // console.log(event.target.value);
}

function getAndDisplay(tasksArr) {
    tasksArr.forEach(task => {

        const newTask = document.createElement('li');
        const wraper = document.createElement('span');
        wraper.appendChild(document.createTextNode(task));
        newTask.appendChild(wraper);

        const clearBtn = document.createElement('span');
        clearBtn.appendChild(document.createTextNode('clr'));
        clearBtn.className = "clr";
        newTask.appendChild(clearBtn);

        console.log(wraper.className);

        document.querySelector('#tasks-ul').appendChild(newTask);
    });

}

function respond (event) {
    if (event.target.id === "add-task-btn" && newTaskInput.value != "") {

        let task = newTaskInput.value;

        let tasks;

        if(localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));

        newTaskInput.value = "";

        if(localStorage.getItem('tasks') != null) {
            let tasksOnReload = JSON.parse(localStorage.getItem('tasks'));            
            let myUl = document.querySelector('#tasks-ul');
            let myUlChildren = Array.from(myUl.children);
            myUlChildren.forEach(element => {
                myUl.removeChild(element);
            });

            getAndDisplay(tasksOnReload);
        }
    }

    if (event.target.className === "clr") {
        const parentUl = event.target.parentElement.parentElement;
        const parentLi = event.target.parentElement;
        const tasksList = JSON.parse(localStorage.getItem('tasks'));

        const index = Array.from(parentLi.parentElement.children).indexOf(parentLi);

        if (index > -1) {
            tasksList.splice(index, 1);
        }

        localStorage.setItem('tasks', JSON.stringify(tasksList));

        parentUl.removeChild(parentLi);
    }


    if (event.target.id === "clear-tasks") {
        localStorage.clear();
        document.querySelector('#tasks-ul').innerHTML = "";
    }
}
