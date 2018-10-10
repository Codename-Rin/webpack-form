export const isEmpty = (req, input) => {
	if (req && input.value.trim() === '') {
		return ({
			flag: true,
			messageText: 'Field is required',
		});
	}
	return ({
		flag: false,
		messageText: '',
	});
};

export const checkRules = (input) => {
	let flag = true;
	let messageText = '';
	switch (input.type) {
	case 'text': {
		const reg = /^[a-zA-Z\s]*$/;
		flag = !reg.test(input.value);
		messageText = flag ? 'Incorrect characters' : '';
		if (!flag && input.value.length > 30) {
			flag = true;
			messageText = flag ? 'Text too long' : '';
		}
	}
		break;
	case 'email': {
		/* eslint-disable */
		const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
		/* eslint-enable */
		flag = !reg.test(input.value);
		messageText = flag ? 'Incorrect email' : '';
	}
		break;
	case 'tel': {
		const reg = /^[0-9]{9,9}$/;
		flag = !reg.test(input.value);
		messageText = flag ? 'Incorrect phone number' : '';
	}
		break;
	case 'textarea':
		flag = input.value.length > 300;
		messageText = flag ? 'Text too long' : '';
		break;
	default:
		flag = false;
		messageText = '';
	}
	return ({
		flag,
		messageText,
	});
};
