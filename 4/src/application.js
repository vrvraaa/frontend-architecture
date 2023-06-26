// BEGIN
export default (elements) => {
    const container = document.querySelector('.container');
    for (let i = 0; i <= elements.length; i++) {
        if (!elements[i]) continue;
        const elementBtn = document.createElement('button');
        elementBtn.className = 'btn btn-primary';
        elementBtn.textContent = elements[i].name;
        document.querySelector('.container').append(elementBtn);
        elementBtn.addEventListener('click', () => {
            const containerForDescription = document.createElement('div');
            containerForDescription.textContent = elements[i].description;
            const check = container.querySelector('div');
            if (check) {
                if (check.innerHTML != containerForDescription.textContent) {
                    check.textContent = containerForDescription.textContent;
                } else {
                    check.remove();
                }
            } else {
                container.append(containerForDescription);
            }
        })
    }


}
// END