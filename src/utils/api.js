'use strict';
/**
 * Функция обёртка для запросов к API.
 * @param method {string} - Название метода API.
 * @param requestParams {object} - Параметры запроса
 * @returns {Promise<Response>} - Промис запроса.
 */
export default function requestToApi(method, requestParams) {
    const requestDefaults = {
        method: 'POST',
        mode: 'same-origin',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            // 'X-CSRFToken': Model.getCsrfToken(),
        },
    };

    Object.assign(requestDefaults, requestParams);

    return fetch(`/api/v2/vision/${method}/`, requestDefaults);
}