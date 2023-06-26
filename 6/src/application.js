import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

// Используйте эту функцию для выполнения валидации.
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках.
const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

// BEGIN

const handlerForSignUpForm = () => {
  const formContainer = document.querySelector('form');
  const elements = {
    name: document.getElementById('sign-up-name'),
    email: document.getElementById('sign-up-email'),
    password: document.getElementById('sign-up-password'),
    passwordConfirmation: document.getElementById('sign-up-password-confirmation'),
  };


  formContainer.querySelectorAll('.form-control').forEach(field => {
    field.addEventListener('input', (e) => {  
      e.preventDefault();
      const valuesOfElements = {
        name: elements.name.value,
        email: elements.email.value,
        password: elements.password.value,
        passwordConfirmation: elements.passwordConfirmation.value,
      };
  
      const errors = validate(valuesOfElements);
  
      formContainer.querySelectorAll('.is-invalid').forEach(item => {
        item.classList.remove('is-invalid');
      });
      formContainer.querySelectorAll('.invalid-feedback').forEach(item => {
        item.remove();
      });
  
      Object.entries(errors).forEach(([key, error]) => {
        const element = elements[key];
        if (element) {
          const div = document.createElement('div');
          div.className = 'invalid-feedback';
          div.textContent = error.message;
          element.className = 'is-invalid';
          element.after(div);
        }
      });
  
      const allComplete = Object.values(elements).every(input => input.value !== '');
  
      const sentFormButton = formContainer.querySelector('[type="submit"]');
  
      if (isEmpty(errors) && allComplete) {
        sentFormButton.removeAttribute('disabled');
      } else {
        sentFormButton.setAttribute('disabled', true);
      }
    });
  });

  const sendDataToServer = async (elements) => {
    const {name, email, password} = elements;
    const signUpData = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    await axios.post(routes.usersPath(), signUpData);
    formContainer.innerHTML = 'User Created!';
  }

  formContainer.addEventListener('submit', (e) => {
    e.preventDefault();
    sendDataToServer(elements);
  });
};

export default handlerForSignUpForm;

// END
