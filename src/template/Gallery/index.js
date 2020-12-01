'use strict';

import './style.scss';

/**
 * Шаблон галереи
 */
export default class Gallery {
    constructor(parentElement) {
        if (parentElement) {
            parentElement.innerHTML = this.template();
        }

        return {
            mainPhoto: parentElement.querySelector('.main-photo'),
            imagesList: parentElement.querySelector('.gallery'),
        };
    }

    template = () =>  {
        return `
            <div class="vision-photo-gallery">
                <div class="vision-photo-gallery__item vision-photo-gallery__item--main-photo">
                    <h4 class="vision-photo-gallery__title">Основная фотография</h4>
                    <div class="main-photo"></div>
                </div>    
                <div class="vision-photo-gallery__item">
                    <h4 class="vision-photo-gallery__title">Галерея</h4>
                    <div class="gallery"></div>
                </div>    
            </div>
        `;
    }
}