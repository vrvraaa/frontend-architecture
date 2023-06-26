import axios from 'axios';

const routes = {
  tasksPath: () => '/api/tasks',
};

// BEGIN
export default async () => {

  const startElements = await axios.get(routes.tasksPath()).then(result => result.data.items.reverse());
  startElements.forEach(element => {
    const newElement = `<li class="list-group-item">${element.name}</li>`;
    document.querySelector('ul').innerHTML = newElement + document.querySelector('ul').innerHTML;
  })

  document.querySelector('button').addEventListener('click', async (event) => {
    event.preventDefault();
    await axios.post(routes.tasksPath(), {name: document.querySelector('input').value});
    const newElement = `<li class="list-group-item">${document.querySelector('input').value}</li>`;
    document.querySelector('ul').innerHTML = newElement + document.querySelector('ul').innerHTML;
  })
}
// END