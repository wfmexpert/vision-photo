'use strict';

import {readFileAsDataUrl as fileReader} from 'Utils';

function galleryEventHandler(e) {
    const galleryColumnElement = e.target.closest('.gallery-column');
    const galleryPhotosCount = e.target.children;

    galleryColumnElement.classList.toggle('hidden', !galleryPhotosCount.length);
}

const router = {
    'added-photo-to-gallery': galleryEventHandler,
    'removed-photo-from-gallery': galleryEventHandler,
    /**
     * Загрузка фото на клиент.
     *
     * @param e {object} Объект события.
     */
    'upload-main-photo': (e) => {
        const fileInput = e.target.parentElement.querySelector('input[type="file"]');

        fileInput.click();
        fileInput.addEventListener('change', fileReader.bind(e.detail));
    },
    /**
     * Добавление основного фото.
     *
     * @param e {object} Объект события.
     */
    'add-main-photo': (e) => {
        const {photoUrl, templates, parentElement} = e.detail;

        parentElement.innerHTML = templates.mainPhoto({path: photoUrl});
        parentElement.addEventListener('main-photo-added', router['main-photo-added']);

        parentElement.fireEvent('main-photo-added', {
            parentElement,
            photoElement: parentElement.querySelector('.photo'),
            templates,
        });
    },
    /**
     * Основное фото добавлено.
     *
     * @param e {object} Объект события.
     */
    'main-photo-added': (e) => {
        const {parentElement, photoElement, templates} = e.detail;
        const removeButton = photoElement.querySelector('button[data-action="remove"]')

        removeButton.addEventListener('click', (e) => {
            parentElement.addEventListener('remove-main-photo', router['remove-main-photo'].bind(e.detail));
            parentElement.fireEvent('remove-main-photo', {parentElement, templates});
        });
    },
    /**
     * Удаление основного фото.
     *
     * @param e {object} Объект события.
     */
    'remove-main-photo': (e) => {
        const {parentElement, templates} = e.detail;

        if (window.confirm('Вы действительно хотите удалить фото?')) {
            parentElement.innerHTML = templates.emptyMainPhoto();
            parentElement.fireEvent('removed-main-photo');
        }
    },
};

export default router;