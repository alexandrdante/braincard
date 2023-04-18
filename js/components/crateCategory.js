import { createElement } from '../helper/createElement.js'

export const createCategory = (app) => {

	const category = createElement('section', {
		className: 'category section-offset',
	})

	const container = createElement('div', {
		className: 'container',
	});

	category.append(container);

	const categoryList = createElement('ul', {
		className: 'category__list',
	});

	container.append(categoryList);

	const createCategoryCard = (data) => {
		const item = createElement('li', {
			className: 'category__item',
			//textContent: data.title,
		});
		item.dataset.id = data.id;

		const buttonCategoryCard = createElement('button', {
			className: 'category__card',
		});



		const categortyTitle = createElement('span', {
			className: 'category__title',
			textContent: data.title,
		});


		const categortyPairs = createElement('span', {
			className: 'category__pairs',
			textContent: data.length + ' пар',
		});

		buttonCategoryCard.append(categortyTitle, categortyPairs);



		const buttonEdit = createElement('button', {
			className: 'category__btn category__edit',

		});
		buttonEdit.setAttribute('aria-label', 'Редактировать');



		const buttonDelete = createElement('button', {
			className: 'category__btn category__del',

		});

		buttonDelete.setAttribute('aria-label', 'Удалить');

		item.append(buttonCategoryCard, buttonEdit, buttonDelete);




		return item;
	};



	const mount = (data) => {
		categoryList.textContent = '';
		app.append(category);
		const cards = data.map(createCategoryCard);
		categoryList.append(...cards);
	};

	const unmount = () => {
		category.remove();
	};

	return { mount, unmount, categoryList };

}