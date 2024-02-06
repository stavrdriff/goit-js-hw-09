'use strict';

const FORM_KEY = 'feedback-form-state';

const removeStrogeFormData = (key) => {
  localStorage.removeItem(key);
}

const getFormData = (form) => {
  const email = form.email.value;
  const message = form.message.value;

  return { email, message };
}

const setFormData = (form, key) => {
  const dataInStorage = getStrogeFormData(key);

  if (dataInStorage !== null) {
    form.email.value = dataInStorage.email;
    form.message.value = dataInStorage.message;
  }
}

const setStrogeFormData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}

const getStrogeFormData = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

const formHandler = (form) => {
  form.addEventListener('input', (e) => {
    const formData = getFormData(e.currentTarget);

    setStrogeFormData(FORM_KEY, formData);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.email.value) {
      form.email.closest('label').firstElementChild.style.color = 'red';
    }

    if (!form.message.value) {
      form.email.closest('label').firstElementChild.style.color = 'red';
    }

    if (form.email.value && form.message.value) {
      removeStrogeFormData(FORM_KEY);
      form.reset();
    }
  });
}

const initForm = () => {
  const form = document.querySelector('.feedback-form');

  setFormData(form, FORM_KEY);
  formHandler(form);
}

initForm();