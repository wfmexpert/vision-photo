'use strict';

import galleryTemplate from "Gallery/index";
import photoTemplates from "Photo/index";
import EventManager from "EventManager/index";
import {fireEvent as fireEvent} from 'Utils'; // TODO: Разобраться почему так работают import-ы

/**
 * Класс обёртка.
 */
export default class Bootstrap {
    static rootElement = null;
    static eventManager = EventManager;
    static router = null;
    static templates = {
        photoGallery: galleryTemplate.init,
        emptyMainPhoto: photoTemplates.emptyMainPhoto,
        galleryPhoto: photoTemplates.galleryPhoto,
        mainPhoto: photoTemplates.mainPhoto,
    };

    /**
     * Конструктор объектов.
     *
     * @param renderTo {string} ID родительского элемента галереи.
     * @param personId {number} ID пользователя на портале Vision.
     */
    constructor({renderTo, personId}) {
        this.constructor.rootElement = document.getElementById(renderTo);
        this.constructor.templates.photoGallery({
            rootElement: this.constructor.rootElement,
            emptyMainPhoto: this.constructor.templates.emptyMainPhoto()
        });

        if (personId) {
            this.personId = personId;
        }

        // Пользовательские события
        Element.prototype.fireEvent = fireEvent;
        Window.constructor.fireEvent = fireEvent;

        this.constructor.eventManager.init({
            rootElement: this.constructor.rootElement,
            templates: this.constructor.templates
        });
    }

    static personId = null;

    /**
     * Установка виджету галереи ID пользователя на портале Vision.
     * @param personId {number} ID пользователя на портале Vision.
     */
    set personId(personId) {
        if (personId) {
            this.constructor.personId = personId;
        }
    }

    /**
     * Получение из виджета галереи ID пользователя на портале Vision.
     * @returns {number|null} ID пользователя на портале Vision.
     */
    get personId() {
        return this.constructor.personId;
    }
}