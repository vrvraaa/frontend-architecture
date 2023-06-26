// BEGIN
export default () => {
    const calculatorForm = document.querySelector('form');
    let summa = 0;
    let inputNumber = calculatorForm.querySelector('[type="number"]');
    inputNumber.focus();
    calculatorForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let inputNumber = calculatorForm.querySelector('[type="number"]');
        let value = inputNumber.value
        summa += Number(value);
        let result = document.getElementById('result');
        result.textContent = summa;

        inputNumber.value = '';
        inputNumber.focus();
    })

    const calculatorReset = document.querySelector('[type="button"]');
    calculatorReset.addEventListener('click', (e) => {
        let inputNumber = calculatorForm.querySelector('[type="number"]');
        summa = 0;
        result.textContent = 0;
        inputNumber.value = '';
        inputNumber.focus();

    })
}
// END