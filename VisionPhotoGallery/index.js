'use strict';

import './app.scss';

export default class VisionPhotoGallery {
  static employeeId = null;
  static rootElement = null;
  static token = null;

  constructor({root, employeeId, token}) {
    if (!root) {
      throw new Error('Не указан ID корневого элемента для галереи!');
    }

    const rootElement = document.getElementById(root);

    if (!!rootElement) {
      this.constructor.rootElement = rootElement;
    } else {
      throw new Error('Проверьте указанный ID корневого элемента для галереи!');
    }

    if (!employeeId) {
      throw new Error('Не указан ID пользователя на портале Vision');
    }

    this.employeeId = employeeId;
    this.token = token;

    this.constructor.draw();
  }

  update({employeeId, token}) {
    this.employeeId = employeeId;
    this.token = token;

    this.constructor.draw();
  }

  get employeeId() {
    return this.constructor.employeeId;
  }

  set employeeId(employeeId) {
    if (employeeId) {
      this.constructor.employeeId = employeeId;
    }
  }

  get rootElement() {
    return this.constructor.rootElement;
  }

  get token() {
    return this.constructor.token;
  }

  set token(token) {
    if (token) {
      this.constructor.token = token;
    }
  }

  /**
   * Обёртка для запросов к API.
   *
   * @param requestPath {string} Название метода API.
   * @param requestBody {object} Параметры запроса.
   * @returns {Promise<Response>} Промис запроса.
   */
  static request({requestPath, requestBody}) {
    const requestDefaults = {
      method: 'POST',
      mode: 'same-origin',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': this.token,
      },
      body: JSON.stringify(requestBody),
    };

    return fetch(`/api/v2/vision/${requestPath}/`, requestDefaults);
  }

  /**
   * Выгрузка всех фотографий с портала Vision.
   *
   * @returns {Promise<Response>} Промис с результатом выполнения запроса.
   */
  static getPhotos() {
    return this.request({
      requestPath: 'get_photos',
      requestBody: {
        employeeId: this.employeeId,
        masterAlbum: true,
      }
    });
  }

  /**
   * Запрос на добавление (загрузку) фотографии.
   *
   * @param image {BufferEncoding} Фотографии в формате Base64.
   * @returns {Promise<Response>} Промис с результатом выполнения запроса.
   */
  static addPhoto(image) {
    return this.request({
      requestPath: 'add_photo',
      requestBody: {
        employeeId: this.employeeId,
        image,
      },
    });
  }

  /**
   * Запрос на удаление фотографии.
   *
   * @param photoId {Number} ID фотографии на портале Vision.
   * @returns {Promise<Response>} Промис с результатом выполнения запроса.
   */
  static deletePhoto(photoId) {
    return this.request({
      requestPath: 'delete_photo',
      requestBody: {
        employeeId: this.employeeId,
        photoIds: [photoId],
        masterAlbum: true,
      },
    });
  }

  /**
   * Запрос на обновление фотографии.
   *
   * @param photoId {Number} ID фотографии на портале Vision.
   * @returns {Promise<Response>} Промис с результатом выполнения запроса.
   */
  static updatePhoto(photoId) {
    return this.request({
      requestPath: 'update_photo',
      requestBody: {
        employeeId: this.employeeId,
        photo_id: photoId,
      },
    });
  }

  /**
   * Отрисовка DOM галереии.
   */
  static draw() {
    const rootElement = this.rootElement;

    rootElement.innerHTML = `
            <div class="vision-photo-gallery">
                <input type="file" class="vision-photo-gallery__file-field" tabindex="-1">
                <div class="vision-photo-gallery__item vision-photo-gallery__item--main">
                    <h4 class="vision-photo-gallery__title">Основная фотография</h4>
                    <div class="vg-main-photo"></div>
                </div>
                <div class="vision-photo-gallery__item">
                    <h4 class="vision-photo-gallery__title">Галерея</h4>
                    <div class="vg-gallery"></div>
                </div>
            </div>
        `;

    const mainPhotoContainer = rootElement.querySelector('.vg-main-photo');
    const gallery = rootElement.querySelector('.vg-gallery');

    this.getPhotos().then(response => {
      mainPhotoContainer.innerHTML = this.createPhotoElement({
        main: true,
        empty: true,
        photoId: null
      });

      gallery.innerHTML = this.createPhotoElement({
        main: false,
        empty: true,
        photoId: null,
      });

      if (response.ok) {
        return response.json();
      } else {
        mainPhotoContainer.innerHTML = this.createPhotoElement({main: true, empty: true, photoId: null});
      }

      this.initEvents();
    }).then(responseJson => {
      if (!responseJson) {
        return;
      }

      const mainPhotoData = responseJson.find(({main}) => main === true);
      const galleryPhotosData = responseJson.filter(({main}) => main !== true);

      if (!!mainPhotoData) {
        mainPhotoContainer.innerHTML = this.createPhotoElement(mainPhotoData);
      } else {
        mainPhotoContainer.parentElement.classList.add('hidden');
      }

      if (galleryPhotosData.length) {
        let galleryPhotosHtml = '';

        galleryPhotosData.forEach((photoData) => galleryPhotosHtml += this.createPhotoElement(photoData));
        galleryPhotosHtml += this.createPhotoElement({main: false, empty: true, photoId: null});
        gallery.innerHTML = galleryPhotosHtml
      }

      this.initEvents();
    }).catch(error => {
      console.log(error);

      this.initEvents();
    });

    this.initEvents();
  }

  /**
   * Универсальный метод для создания элемента фотографии.
   *
   * @param params.photoId {Number} ID фотографии на портале Vision.
   * @param params.main {Boolean}  Флаг основного фото.
   * @param params.empty {Boolean} Флаг "пустого" фото, используется для отображения кнопки загрузки.
   * @param params.path {String} Путь к фотографии.
   * @param params.avatarUrl {String} Путь к фотографии.
   * @returns {string} Элемент фотографии в виде строки.
   */
  static createPhotoElement(params) {
    const {photoId, main, empty, path, avatarUrl} = params;
    let buttons = '';
    let elementClasses = '';
    let backgroundImage = '';
    let mainAttribute = '';

    if (path) {
      backgroundImage = `style="background-image: url(${path})"`;
    }

    if (avatarUrl) {
      backgroundImage = `style="background-image: url(${avatarUrl})"`;
    }

    if (main) {
      mainAttribute = `data-main="${main}"`;
    }

    if (main && !empty) {
      elementClasses = 'vg-photo vg-photo--main';
      buttons = `
        <button class="vg-photo__button vg-button vg-button--red" data-action="remove-photo">Удалить</button>
      `;
    } else if (main && empty) {
      elementClasses = 'vg-photo vg-photo--main';
      buttons = `
        <button class="vg-photo__button vg-button" data-action="upload-photo">Загрузить</button>
      `;
    } else if (!main && empty) {
      elementClasses = 'vg-gallery__item vg-photo vg-photo--upload';
      buttons = `
        <button class="vg-photo__button vg-button vg-button--upload" data-action="upload-photo">&#43;</button>
      `;
    } else {
      elementClasses = 'vg-gallery__item vg-photo';
      buttons = `
        <button class="vg-photo__button vg-button vg-button--green" data-action="update-photo">Выбрать</button>
        <button class="vg-photo__button vg-button vg-button--red" data-action="remove-photo">Удалить</button>
      `;
    }

    return `
      <div class="${elementClasses}"
        ${backgroundImage}
        data-photo-id="${photoId}"
        ${mainAttribute}>
        ${buttons}
        </div>
      `;
  }

  /**
   * Инициализация событий для кнопок галереи.
   */
  static initEvents() {
    const {rootElement} = this;
    const buttons = rootElement.querySelectorAll('button');

    buttons.forEach(button => {
      button.addEventListener('click', this.router[button.dataset.action], false);
    });
  }

  /**
   * Роутер.
   * @type {{"remove-photo": function(*): void, "file-input-changed": function(*): void, "upload-photo": function(*): void, "update-photo": function(*): void}}
   */
  static router = {
    'upload-photo': (e) => {
      const fileInput = this.rootElement.querySelector('input[type="file"]');

      fileInput.addEventListener('change', this.router['file-input-changed']);
      fileInput.click();
    },
    'file-input-changed': (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.addPhoto(reader.result)
          .then(response => {
            if (response.ok) {
              this.draw();
            }
          })
          .catch(error => {
            console.log(error);
          });
      }

      reader.onerror = () => {
        throw new Error(`Ошибка загрузки фотографии (-ий): ${reader.error}`);
      }
    },
    'remove-photo': (e) => {
      const photoElement = e.target.closest('.vg-photo');
      const {photoId} = photoElement.dataset;

      if (!!photoId) {
        this.deletePhoto(+photoId)
          .then(response => {
            if (response.ok) {
              this.draw();
            }
          });
      }
    },
    'update-photo': (e) => {
      const photoElement = e.target.closest('.vg-photo');
      const {photoId} = photoElement.dataset;

      if (!!photoId) {
        this.updatePhoto(+photoId)
          .then(response => {
            if (response.ok) {
              this.draw();
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
  }
}