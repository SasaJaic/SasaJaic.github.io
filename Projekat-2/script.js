window.onload = showTasks;

if (!localStorage.getItem("task")) {
    nizTask = [];
} else {
    nizTask = localStorage.getItem("task").split(",");
}

function addTask() {
    let obj = document.formaTaskL.newTask;

    if (obj.value !== "") {
        nizTask.push(obj.value);
        localStorage.setItem("task", nizTask);
        showTasks();
        obj.value = "";
    } else {
        alert("Task field cannot be blank");
    }
}

function showTasks() {
    document.getElementById("tasksMagacin").innerHTML = "";

    if (typeof(Storage) !== "undefined") {
        for (let i = 0; i < nizTask.length; i++) {
            let taskMag = document.createElement("DIV");
            taskMag.className = "singleTask";
            let taskSpan = document.createElement("SPAN");
            let taskContent = document.createTextNode(nizTask[i]);
            taskSpan.appendChild(taskContent);
            taskMag.appendChild(taskSpan);
            let deleteIcon = document.createElement("X");
            deleteIcon.className = "fas fa-times";
            deleteIcon.title = "Delete task";
            deleteIcon.setAttribute("onclick", "deleteTask(event)");
            taskMag.appendChild(deleteIcon);
            document.getElementById("tasksMagacin").appendChild(taskMag);
            document.formaTaskL.newTask.value = "";
        }
    } else {
        alert("Sorry! Your browser doesn't support Web Storage.");
    }
}

function filterTasks() {
    let userInput = document.formFilter.filterTask.value.toUpperCase();
    let someTasks = document.getElementById("tasksMagacin").getElementsByTagName("DIV");

    for (let i = 0; i < someTasks.length; i++) {
        let data = someTasks[i].getElementsByTagName("SPAN")[0];
        if (data.innerHTML.toUpperCase().indexOf(userInput) > -1) {
            someTasks[i].style.display = "flex";
        } else {
            someTasks[i].style.display = "none";
        }        
    }
}

function Brisi() {
    let taskMag = document.getElementById("tasksMagacin");

    if (taskMag.innerHTML !== "" && confirm("Are you sure that you want to delete all tasks ?")) {
        localStorage.removeItem("task");
        nizTask = [];
        taskMag.innerHTML = "";
        document.formFilter.filterTask.value = "";
    }
}

function deleteTask(event) {
    if (confirm("Are you sure that you want to delete this task?")) {
        let objParent = event.target.parentElement;

        for (let i = 0; i < nizTask.length; i++) {
            if (objParent.getElementsByTagName("SPAN")[0].innerHTML === nizTask[i]) {
                nizTask.splice(i, 1);
                localStorage.setItem("task", nizTask);
            }
        }
        objParent.remove();
        showTasks();
    }
}


