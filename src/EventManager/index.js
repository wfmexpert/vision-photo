'use strict';

import router from '../router';

/**
 * Обработчик событий.
 *
 * @type {{init: EventManager.init}}
 */
const EventManager = {
    /**
     * Инициализация событий.
     *
     * @param rootElement
     * @param templates
     */
    init: ({rootElement, templates}) => {
        const mainPhoto = rootElement.querySelector('.main-photo');

        if (mainPhoto.querySelector('.photo--empty')) {
            const uploadButton = mainPhoto.querySelector('button[data-action="upload"]');

            uploadButton.addEventListener('upload-main-photo', router['upload-main-photo']);
            uploadButton.addEventListener('click', (e) => {
                uploadButton.fireEvent('upload-main-photo', {
                    container: mainPhoto,
                    templates,
                });
                mainPhoto.addEventListener('add-main-photo', router['add-main-photo']);
            });
        }
    },
}

export default EventManager;