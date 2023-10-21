let data = JSON.parse(localStorage.getItem('todoList')) || [];

function newElement() {
    let inputValue = document.getElementById("myInput").value;

    if (inputValue === '') {
        alert("You must write something!");
    } else {
        let now = new Date();
        let taskObj = {
            id: Date.now(),
            text: inputValue,
            date: 'Set at: ' + now.toDateString() + ', ' + now.getHours() + ':' + now.getMinutes(),
            checked: false,
        };
        data.push(taskObj);
        renderTask(taskObj);
        updateLocalStorage();
    }
    document.getElementById("myInput").value = "";
}

function updateLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(data));
}

function renderTask(taskObj) {
    let { id, text, date, checked } = taskObj;

    let li = document.createElement("li");
    
    let checkbox = document.createElement("INPUT");
    checkbox.type = "checkbox";
    checkbox.className = "myUL-checkbox";
    checkbox.checked = checked;
    checkbox.onchange = function(){
        taskObj.checked = checkbox.checked;
        updateLocalStorage();
    };
    li.prepend(checkbox);

    let t = document.createElement("SPAN");
    t.innerText = text;
    t.className = "taskText";
    li.appendChild(t);

    let dateNode = document.createElement("SPAN");
    dateNode.textContent = date;
    li.appendChild(dateNode);

    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    span.onclick = function() {
        li.remove();
        data = data.filter(task=>task.id !== id);
        updateLocalStorage();
    }
    li.appendChild(span);

    document.getElementById("myUL").appendChild(li);
}

function loadTasks() {
    var ul = document.getElementById("myUL");
    ul.innerHTML = '';
    data.forEach(renderTask);
}

window.addEventListener('DOMContentLoaded', (event) => {
    loadTasks();
});