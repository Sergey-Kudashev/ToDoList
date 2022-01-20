let list = []
// let subList = []

function generateRandomColor() {
  let randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  return randomColor;
}

function checkIfAllSubTasksDone(parentTaskId) {
  const allParentTaskSubTasks = list.filter((el) => el.parentTaskId === parentTaskId);

  let allDone = true;

  allParentTaskSubTasks.forEach((el) => {
    if (!el.done) {
      allDone = false;
      break;
    }
  });

  return allDone;
} 

const ourList = document.querySelector('[data-list]')
const inputList = document.getElementById('input-text')
const addTaskButton = document.querySelector('[data-add-button]')

addTaskButton.addEventListener('click', button => {
  if (inputList.value === "") {
    Swal.fire({
      title: 'Oops...',
      text: 'Write some task!',
    })
    return
  }

  const taskId = Date.now();
  const taskText = inputList.value;

  list.push({
    id: taskId,
    text: taskText,
    isSubTask: false,
    done: false
  });

  // list.push(inputList.value)
  
  const mainDiv = document.createElement('div')
  const firstDiv = document.createElement('div')
  const lishka = document.createElement('li')
  const addButton = document.createElement('button')
  const deleteButton = document.createElement('button')
  const secondDiv = document.createElement('div')
  const breakLine = document.createElement('div')

  mainDiv.setAttribute("id", "main-div")
  addButton.setAttribute('data-id', taskId);
  
  firstDiv.setAttribute("id", "first-div")
  lishka.setAttribute("id", "lishka")
  addButton.setAttribute("id", "add-sub-task")
  deleteButton.setAttribute("id", "delete-button")
  secondDiv.setAttribute("id", "second-div")
  breakLine.setAttribute("id", "break-line")

  lishka.innerText = taskText;
  ourList.appendChild(mainDiv)
  mainDiv.appendChild(firstDiv)
  firstDiv.appendChild(lishka)
  firstDiv.appendChild(addButton)
  firstDiv.appendChild(deleteButton)
  mainDiv.appendChild(secondDiv)
  mainDiv.appendChild(breakLine)
  console.log(list)

  breakLine.style.background = generateRandomColor()

  deleteButton.addEventListener('click', e => {
    mainDiv.parentNode.removeChild(mainDiv)
  })
  inputList.value = ""

  addButton.addEventListener('click', e => {
    if (inputList.value === "") {
      Swal.fire({
        title: 'Oops...',
        text: 'Write some sub task!',
      })
      return
    }

    // subList.push(inputList.value)

    const subTaskId = Date.now();
    const subTaskText = inputList.value;

    const parentTaskId = e.target.dataset.id;

    list.push({
      id: subTaskId,
      text: subTaskText,
      parentTaskId,
      isSubTask: true,
      done: false
    });

    const subLishka = document.createElement('ol')
    const btn = document.createElement('button')

    subLishka.setAttribute("id", "second-lishka")
    subLishka.setAttribute('data-id', subTaskId);

    btn.setAttribute("id", "delete-button")

    subLishka.innerText = subTaskText;
    secondDiv.appendChild(subLishka)
    secondDiv.appendChild(btn)
    console.log(subList)

    btn.addEventListener('click', e => {
      subLishka.parentNode.removeChild(subLishka)
      btn.parentNode.removeChild(btn)
    })
    inputList.value = ""


    subLishka.addEventListener('click', e => {
      subLishka.classList.toggle("completed-task");

      const subTaskId = e.target.dataset.id;

      const subTask = list.find((el) => el.id === subTaskId);
      const parentTask = list.find((el) => el.id === subTask.parentTaskId);

      subTask.done = subLishka.classList.includes('completed-task');

      if (subTask.done) {
        parentTask.done = checkIfAllSubTasksDone(parentTask.id);
        
        if (parentTask.done) {
          const parentTaskElement = document.querySelector('[data-id]', parentTask.id);

          parentTaskElement.classList.toggle('completed-task');
        }
      }
    })
  })
})