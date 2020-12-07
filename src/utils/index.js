'use strict';

/**
 * Обёртка для создания пользовательских событий.
 *
 * @param eventName {string} Название события.
 * @param data {object} Пользовательские данные для события.
 * @param bubbles {boolean} Всплытие события.
 */
function fireEvent(eventName, data, bubbles) {
    const self = this || window;

    if (!data) {
        data = {};
    }

    const customEvent = new CustomEvent(eventName, {
        detail: data,
        bubbles: !!bubbles,
    });

    self.dispatchEvent(customEvent);
}

/**
 * Функция обёртка для запросов к API.
 * @param method {string} Название метода API.
 * @param token {string} CSRF токен
 * @param requestParams {object} Параметры запроса.
 * @returns {Promise<Response>} Промис запроса.
 */
function makeRequest(method, token, requestParams) {
    const requestDefaults = {
        method: 'POST',
        mode: 'same-origin',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': token,
        },
    };

    Object.assign(requestDefaults, requestParams);

    return fetch(`/api/v2/vision/${method}/`, requestDefaults);
}

/**
 * Обработчик изменения поля ввода.
 *
 * @param e {object} Объект события.
 */
function readFileAsDataUrl(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
        this.container.fireEvent('add-main-photo', {
            photoUrl: reader.result,
            parentElement: this.container,
            templates: this.templates,
        })
    }

    reader.onerror = () => {
        throw new Error(`Ошибка загрузки фотографии (-ий): ${reader.error}`);
    }
}

export {fireEvent, readFileAsDataUrl, makeRequest};
