'use strict';

import './style.scss';

/**
 * Шаблоны фотографий.
 *
 * @type {{emptyMainPhoto(): string, mainPhoto(string): string, galleryPhoto(Object): string}}
 */
const photoTemplates = {
    /**
     * Стандартный шаблон элемента галереи.
     *
     * @param photoData {object} Данные для шаблона фотографии.
     * @returns {string} Шаблон элемента галереи.
     */
    galleryPhoto(photoData) {
        return `
            <div class="gallery__item gallery-photo"
                style="background-image: url(${(photoData.path)});" data-photo-id="${photoData.id}">
                <button class="btn" data-action="choose">Выбрать главной</button>
                <button class="btn" data-action="remove">Удалить</button>
            </div>
        `;
    },

    /**
     * Шаблон основной фотографии.
     *
     * @param photoData {string} Ссылка на фотогрфаию или base64.
     * @returns {string} Шаблон основного фото вместе с фотографией.
     */
    mainPhoto(photoData) {
        const {path = '', id = '', main = true} = photoData;

        return `
            <div class="photo"
                style="background-image: url(${path});"
                data-photo-id="${id}"
                data-is-main="${main}">
                <button class="btn" data-action="remove">Удалить</button>
            </div>
        `;
    },

    /**
     * Шаблон пустой основной фотографии.
     *
     * @returns {string} Шаблон пустой основной фотографии.
     */
    emptyMainPhoto() {
        return `
            <div class="photo photo--empty">
                <button class="btn" data-action="upload">Загрузить фото</button>
                <input type="file" class="btn-file-upload" accept="image/*" multiple>
            </div>    
        `;
    },
}

export default photoTemplates;