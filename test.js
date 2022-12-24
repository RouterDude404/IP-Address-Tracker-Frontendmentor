const object = {
  ip: 11111,
  'name': 'john'
}

let stringObject = JSON.stringify(object);

localStorage.setItem('object', stringObject);

const tasksString = localStorage.getItem('object');
// Convert the tasks string back into an array
const tasks = JSON.parse(tasksString);
console.log(tasks.ip);




const tasksString = localStorage.getItem(task);
// Convert the tasks string back into an array
const tasks = JSON.parse(tasksString);
return tasks;