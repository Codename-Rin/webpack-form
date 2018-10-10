import axios from 'axios';
import './style.scss';
import { isEmpty, checkRules } from './js/Form/form-validation';
import { showFormBubble, clearError } from './js/Form/form-utilities';

const form = document.getElementById('form-1');

form.addEventListener('blur', (e) => {
	const isRequired = e.target.className.includes('required');
	const parent = e.target.parentNode;
	const message = parent.querySelector('.form__msg');
	let formFlag = {};
	formFlag = isEmpty(isRequired, e.target);
	message.innerHTML = isEmpty(isRequired, e.target).messageText;
	if (!formFlag.flag) {
		formFlag = checkRules(e.target);
		message.innerHTML = formFlag.messageText;
	}
	if (formFlag.flag) {
		parent.classList.add('error');
	} else {
		parent.classList.remove('error');
	}
}, true);

form.addEventListener('keyup', (e) => {
	clearError(e.target.parentNode);
});

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const inputs = document.querySelectorAll('.form__input, .form__textarea');
	inputs.forEach((input) => {
		input.focus();
		input.blur();
	});
	const errors = document.querySelectorAll('.form__input-box.error').length;
	if (!errors) {
		const formData = new FormData(form);
		axios.get('server.json', formData)
			.then((response) => {
				if (response.data.value) {
					showFormBubble();
					form.reset();
				}
			})
			.catch((error) => {
				console.log(`Axios error ${error}`);
			});
	} else {
		const errorFirst = document.querySelector('.form__input-box.error');
		errorFirst.scrollIntoView();
	}
});
