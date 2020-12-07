'use strict';
// Стили
import './style.scss';
import Bootstrap from "./_bootstrap";

// Подключить SCSS модули
// TODO: Переписать под уникальные классы gallery/main-photo

class VisionPhotoGallery extends Bootstrap {
    constructor({renderTo, personId}) {
        if (!renderTo) {
            throw new Error('Не укзаан ID!');
        }

        if (!personId && (!personId && personId !== 0)) {
            console.warn('Не указан person_id пользователя на портале Vision');
        }

        const base = super({renderTo, personId});
    }
}

const vGallery = new VisionPhotoGallery({
    renderTo: 'app',
});