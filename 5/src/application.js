import uniqueId from 'lodash/uniqueId.js';

// BEGIN
export default () => {
    const individualNumber = uniqueId();
    const informationAboutTodo = {
        current: individualNumber,
        lists: [{ individualNumber: individualNumber, name: 'General' }],
        tasks: [],
    };
    
    const tasksRender = (informationAboutTodo, elements) => {
        elements.tasksContainer.innerHTML = '';
        const filteredTasks = informationAboutTodo.tasks.filter(({ listId }) => listId === informationAboutTodo.current);

        if (filteredTasks.length === 0) {
            return;
        }

        const ul = document.createElement('ul');

        filteredTasks.forEach(({ name }) => {
            const li = document.createElement('li');
            li.textContent = name;
            ul.append(li);
        });

        elements.tasksContainer.append(ul);
    };

    const listsRender = (informationAboutTodo, elements) => {
        elements.listsContainer.innerHTML = '';
        const ul = document.createElement('ul');

        informationAboutTodo.lists.forEach(({ individualNumber, name }) => {
        const li = document.createElement('li');
        let newElement;
      
        if (individualNumber === informationAboutTodo.current) {
            newElement = document.createElement('b');
            newElement.textContent = name;
        } else {
            newElement = document.createElement('a');
            newElement.setAttribute('href', `#${name.toLowerCase()}`);
            newElement.textContent = name;
            newElement.addEventListener('click', (e) => {
                e.preventDefault();
                informationAboutTodo.current = individualNumber;
                listsRender(informationAboutTodo, elements);
                tasksRender(informationAboutTodo, elements);
            });
        }
      
            li.append(newElement);
            ul.append(li);
        });
        
        elements.listsContainer.append(ul);

    };

    const elements = {
    listsContainer: document.querySelector('[data-container="lists"]'),
    tasksContainer: document.querySelector('[data-container="tasks"]'),
    };
    
    const newListForm = document.querySelector('[data-container="new-list-form"]');
    const newTaskForm = document.querySelector('[data-container="new-task-form"]');
    
    newListForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const listName = formData.get('name');
        const list = { individualNumber: uniqueId(), name: listName.trim() };
        form.reset();
        form.focus();

        let flag = true;
        for (let item of informationAboutTodo.lists) {
            if (item.name === listName) {
                flag = false;
            }
        }
        if (flag) {
            informationAboutTodo.lists.push(list);
        }


        listsRender(informationAboutTodo, elements);
    });

    newTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(e.target);
        const task = { individualNumber: uniqueId(), name: e.target.querySelector('input').value, listId: informationAboutTodo.current };
        e.target.reset();
        e.target.focus();
        informationAboutTodo.tasks.push(task);
        tasksRender(informationAboutTodo, elements);
    });

    listsRender(informationAboutTodo, elements);
    tasksRender(informationAboutTodo, elements);
};
// END