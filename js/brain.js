import { createCategory } from './components/createCategory.js';
import { createEditCategory } from './components/createEditCategory.js';
import { createHeader } from './components/createHeader.js';
import { createElement } from './helper/createElement.js';
import { fetchCards, fetchCategories } from './service/api.service.js';

const initApp = async () => {

	const headerParent = document.querySelector('.header');
	const app = document.querySelector('#app');

	const headerObj = createHeader(headerParent);
	const categoryObj = createCategory(app);
	const editCategoryObj = createEditCategory(app);

	const allSectionUmnount = () => {
		[categoryObj, editCategoryObj].forEach(obj => obj.unmount());

	}


	const renderIndex = async e => {
		e?.preventDefault();
		allSectionUmnount();
		const categories = await fetchCategories();

		if (categories.error) {
			const errorText = createElement('p', {
				className: 'server-error',
				textContent: 'Ошибка сервера, попробуйте зайти позже',
			});
			app.append(errorText);
			return;
		}

		categoryObj.mount(categories);
	};

	renderIndex();


	headerObj.headerLogoLink.addEventListener('click', renderIndex);
	headerObj.headerBtn.addEventListener('click', () => {
		allSectionUmnount();
		headerObj.updateHeaderTitle('Новая категория');
		editCategoryObj.mount();

	});

	categoryObj.categoryList.addEventListener('click', async ({ target }) => {

		const categoryItem = target.closest('.category__item');



		if (target.closest('.category__edit')) {
			const dataCards = await fetchCards(categoryItem.dataset.id);
			allSectionUmnount();
			headerObj.updateHeaderTitle('Редактирование');
			editCategoryObj.mount(dataCards);
			return;
		}

	});
};

initApp();
