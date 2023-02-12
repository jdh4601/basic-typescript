import { v4 as uuidV4 } from 'uuid';

// Type Aliases
type Task = {
  id: string; 
  title: string; 
  completed: boolean; 
  createdAt: Date; 
}

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
// const form = document.getElementById('#new-task-form') as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>('#new-task-title');
const tasks: Task[] = loadTasks() // array item of tasks

// 처음에 렌더링할 때, local storage에 있는 items 불러오기
tasks.forEach(addItemList)


form?.addEventListener('submit', e => {
  e.preventDefault();
  if (input?.value == '' || input?.value == null ) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }
  tasks.push(newTask);
  saveTasks();  

  addItemList(newTask);
  input.value = "";
})

function addItemList(task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('lable');
  const checkBox = document.createElement('input');
  checkBox.addEventListener('change', () => {
    task.completed = checkBox.checked;
    saveTasks();    
    if (task.completed == true) {
      const del = document.createElement('del');
      del.append(task.title);
      item.textContent = ""
      item.append(del)
    }
  })
  checkBox.type = 'checkbox';
  checkBox.checked = task.completed;
  label.append(checkBox, task.title);
  item.append(label);
  list?.append(item); // null일 때 error가 아니라 undefined
}

function saveTasks() {
  localStorage.setItem('TASKS', JSON.stringify(tasks))
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem('TASKS');
  if (taskJSON == null) return []
  return JSON.parse(taskJSON);
}