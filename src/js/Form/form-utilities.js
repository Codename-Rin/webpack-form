export const showFormBubble = () => {
	const bubble = document.getElementById('form-1__bubble');
	bubble.style.display = 'block';
};

export const clearError = (target) => {
	target.classList.remove('error');
};
