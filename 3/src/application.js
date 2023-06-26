// BEGIN
export default (notebooks) => {
  const form = document.querySelector('form');
  const resultContainer = document.querySelector('.result');

  function renderNotebooks(notebooks) {
    resultContainer.innerHTML = '';

    if (notebooks.length > 0) {
      const list = document.createElement('ul');
      list.className = 'list-group';
      notebooks.forEach(notebook => {
        const listItem = document.createElement('li');
        listItem.textContent = notebook.model;
        listItem.className = 'list-group-item';
        list.appendChild(listItem);
      });
      resultContainer.appendChild(list);
    }
  }

  function filterNotebooks() {
    const filters = {
      processor: document.querySelector('select[name="processor_eq"]').value,
      memory: document.querySelector('select[name="memory_eq"]').value,
      minFrequency: document.querySelector('input[name="frequency_gte"]').value,
      maxFrequency: document.querySelector('input[name="frequency_lte"]').value,
    };

    const filteredNotebooks = notebooks.filter(notebook => {
      let match = true;
      for (let key in filters) {
        if (key === 'minFrequency') {
          if (filters.minFrequency && notebook.frequency < filters.minFrequency) {
            match = false;
            break;
          }
        } else if (key === 'maxFrequency') {
          if (filters.maxFrequency && notebook.frequency > filters.maxFrequency) {
            match = false;
            break;
          }
        } else {
          if (filters[key] !== '' && !(notebook[key] == filters[key])) {
            match = false;
            break;
          }
        }
      }
      return match;
    });

    renderNotebooks(filteredNotebooks);
  }

  filterNotebooks();

  form.addEventListener('input', filterNotebooks);
  form.addEventListener('change', filterNotebooks);
}
// END