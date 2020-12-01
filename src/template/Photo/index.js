'use strict';

import './style.scss';

export default class PhotoElement {
    constructor(photoData) {
        const {id, main, path} = photoData;
        this.constructor.id = id;
        this.constructor.path = path;


        if (main) {
            this.getTemplate('mainPhotoTemplate');
        } else {
            this.getTemplate('galleryPhotoTemplate');
        }
    }

    static id = null;
    static path = null;

    static galleryPhotoTemplate = `
        <div class="gallery__item gallery-photo"
            style="background-image: url(${(this.path)});" data-photo-id="${this.id}">
            <button class="btn" data-action="choose">Выбрать главной</button>
            <button class="btn" data-action="remove">Удалить</button>
        </div>
    `;

    static mainPhotoTemplate() {
        return `
            <div class="main-photo" style="background-image: url(${this.path});" data-photo-id="${this.id}">
                <button class="btn" data-action="remove">Удалить</button>
            </div>
        `;
    }

    getTemplate(templateName) {
        return this.constructor[templateName]();
    }
};