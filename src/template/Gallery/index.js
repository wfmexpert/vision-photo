'use strict';

import './style.scss';

/**
 * Шаблон галереи.
 */
const galleryTemplate = {
    /**
     * Инициализация и создание шаблона галереи.
     *
     * @param rootElement {Element} Целевой родительский DOM элемент.
     * @param emptyMainPhoto {string} HTML в виде строки.
     */
    init: ({rootElement, emptyMainPhoto}) =>  {
        emptyMainPhoto = !!emptyMainPhoto ? emptyMainPhoto : '';

        rootElement.innerHTML = `
            <div class="vision-photo-gallery">
                <div class="vision-photo-gallery__item main-photo-column">
                    <h4 class="vision-photo-gallery__title">Основная фотография</h4>
                    <div class="main-photo">${emptyMainPhoto}</div>
                </div>    
                <div class="vision-photo-gallery__item hidden gallery-column">
                    <h4 class="vision-photo-gallery__title">Галерея</h4>
                    <div class="gallery"></div>
                </div>    
            </div>
        `;
    }
}

export default galleryTemplate;