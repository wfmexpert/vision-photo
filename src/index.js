'use strict';

import * as wrapperTemplate from './components/galleryWrap.template';

class VisionPhotoGallery {
    /**
     * @param renderTo {string} - Элемент, куда будет сгененрирована галлерея.
     */
    constructor(renderTo) {
        const rootElement = document.getElementById(renderTo);

        rootElement.innerHTML = wrapperTemplate.default;

    }
}

new VisionPhotoGallery('app')