"use strict";

import "./app.scss";
import 'whatwg-fetch';

/**
 * Класс галереи.
 */
export default class VisionPhotoGallery {
  galleryContainer = null;
  rootElement = null;
  token = null;
  controls = {
    disableAll: false,
    update: true,
    upload: true,
    remove: true
  };
  masterAlbum = true;

  /**
   * Конструктор экземпляра класса галереи.
   * @param root {string} ID корневого элемента, куда будет рендериться галерея.
   * @param employeeId {number|string} ID сотрудника.
   * @param visionPersonId {number|string} ID сотрудника аутсорсера.
   * @param personId {number|string} ID сотрудника аутсорсера.
   * @param token {string} CSRF-токен пользователя.
   * @param controls {object} Настройка отображения элементов управления.
   * @param controls.disableAll {boolean} Отключить все элементы управления.
   * @param controls.update {boolean} Отображение кнопки обновления фотографии (установка основной).
   * @param controls.upload {boolean} Отображение кнопки загрузки фотографии.
   * @param controls.remove {boolean} Отображение кнопки удаления фотографии.
   * @param masterAlbum {boolean} Загрузка фотографий из мастер-албома.
   */
  constructor({
                root,
                employeeId,
                visionPersonId,
                personId,
                token,
                controls,
                masterAlbum = true
              }) {
    if (!root) {
      throw new Error("Не указан ID корневого элемента для галереи!");
    }

    const rootElement = document.getElementById(root);

    if (!!rootElement) {
      this.rootElement = rootElement;
    } else {
      throw new Error("Проверьте указанный ID корневого элемента для галереи!");
    }

    if (!employeeId && !visionPersonId && !personId) {
      throw new Error("Не указан ID пользователя на портале Vision");
    }

    this.employee = {
      id: null,
      personId: null,
      visionPersonId: null,
    };

    this.employeeId = employeeId;
    this.visionPersonId = visionPersonId;
    this.personId = personId;
    this.token = token;
    this.controls = controls;
    this.masterAlbum = masterAlbum;

    this.draw();
  }

  /**
   * Назначаемый метод для отображения ошибок.
   * @type {null|Function} Функция обработчик отображения ошибок.
   */
  errorFunction = null;
  /**
   * Получение метода для отображения ошибок.
   * @type {null|Function} Функция обработчик отображения ошибок.
   */
  get errorFunction() {
    return this.errorFunction;
  }

  /**
   * Назначение метода для отображения ошибок.
   * @param errorFunction {null|Function} Функция обработчик отображения ошибок.
   */
  set errorFunction(errorFunction) {
    if (errorFunction) {
      this.errorFunction = errorFunction;
    }
  }

  /**
   * Обновление параметров галереи.
   * @param employeeId {number|number} ID сотрудника.
   * @param token {string} CSRF-токен сесси пользователя.
   */
  update({employeeId, token}) {
    this.employeeId = employeeId;
    this.token = token;

    this.draw();
  }

  /**
   * Получить ID сотрудника.
   * @return {number|string} ID сотрудника.
   */
  get employeeId() {
    return this.employee.id;
  }

  /**
   * Назначение экземпляру галереи ID сотрудника.
   * @param employeeId {number|string} ID сотрудника.
   */
  set employeeId(employeeId) {
    if (employeeId) {
      this.employee.id = employeeId;
    }
  }

  /**
   * Получить ID сотрудника аутсорсера.
   * @return {number|string} ID сотрудника аутсорсера.
   */
  get visionPersonId() {
    return this.employee.visionPersonId;
  }

  /**
   * Назначение экземпляру галереи ID сотрудника аутсорсера.
   * @param visionPersonId {number|string} ID сотрудника аутсорсера.
   */
  set visionPersonId(visionPersonId) {
    if (visionPersonId) {
      this.employee.visionPersonId = visionPersonId;
    }
  }

  /**
   * Получить ID сотрудника аутсорсера.
   * @return {number|string} ID сотрудника аутсорсера.
   */
  get personId() {
    return this.employee.personId;
  }

  /**
   * Назначение экземпляру галереи ID сотрудника аутсорсера.
   * @param personId {number|string} ID сотрудника аутсорсера.
   */
  set personId(personId) {
    if (personId) {
      this.employee.personId = personId;
    }
  }

  /**
   * Корневой элемент, в который будет рендериться галерея.
   * @return {null|Element} Корневой элемент для рендера.
   */
  get rootElement() {
    return this.rootElement;
  }

  /**
   * Получить CSRF-токен сессии пользователя.
   * @return {null|string} CSRF-токен сессии пользователя.
   */
  get token() {
    return this.token;
  }

  /**
   * Назначить CSRF-токен сессии пользователя.
   * @param token {string} CSRF-токен сессии пользователя.
   */
  set token(token) {
    if (token) {
      this.token = token;
    }
  }

  /**
   * Получить значение состояния контролов.
   * @return {boolean} Состояние контролов.
   */
  get controls() {
    return this.controls;
  }

  /**
   * Назначить значение состояния контролов.
   * @param value {boolean} Включить/отключить контролы.
   */
  set controls(value) {
    this.controls = {
      ...this.controls,
      ...value
    };
  }

  /**
   * Получить флаг загрузки фотографий из мастер-альбома.
   * @return {boolean} Состояние флага загрузки фотографий из мастер-альбома.
   */
  get masterAlbum() {
    return this.masterAlbum;
  }

  /**
   * Назначить флаг загрузки фотографий из мастер-альбома.
   * @param value {boolean} Включить/выключить загрузку из мастер-альбома.
   */
  set masterAlbum(value) {
    this.masterAlbum = value;
  }

  /**
   * Обработчик ошибок.
   * @param params.message {string} Сообщение об ошибке.
   * @param params.blockingErrorMessage {string} Блокирующее поток сообщение об ошибке.
   */
  handleError(params) {
    const {message, blockingErrorMessage} = params;

    if (this.errorFunction) {
      let messageString = "";

      if (typeof message === "object") {
        if (message.faultstring) {
          messageString = message.faultstring;
        } else {
          Object.keys(message)
            .reverse()
            .forEach(key => {
              messageString += `${message[key]}<br/>`;
            });
        }
      }

      const errorMessage = messageString.length
        ? messageString
        : JSON.stringify(message);

      this.errorFunction(errorMessage, "Ошибка");
    } else if (blockingErrorMessage) {
      throw new Error(blockingErrorMessage);
    } else {
      console.log(message);
    }
  }

  /**
   * Обёртка для запросов к API.
   * @param requestPath {string} Название метода API.
   * @param requestBody {object} Параметры запроса.
   * @returns {Promise<Response>} Промис запроса.
   */
  request({requestPath, requestBody}) {
    const requestDefaults = {
      method: "POST",
      mode: "same-origin",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": this.token
      },
      body: JSON.stringify(requestBody)
    };

    return fetch(`/api/v2/vision/${requestPath}/`, requestDefaults);
  }

  /**
   * Выгрузка всех фотографий с портала Vision.
   * @returns {Promise<Response>} Промис с результатом выполнения запроса.
   */
  getPhotos() {
    const employee = {};

    if (this.employeeId && !this.visionPersonId) {
      employee.employeeId = this.employeeId;
    } else if (this.visionPersonId) {
      employee.vision_person_id = this.visionPersonId;
    } else if (this.personId) {
      employee.personId = this.personId;
    }

    return this.request({
      requestPath: "get_photos",
      requestBody: {
        ...employee,
        masterAlbum: this.masterAlbum
      }
    });
  }

  /**
   * Запрос на добавление (загрузку) фотографии.
   * @param image {BufferEncoding} Фотографии в формате Base64.
   * @returns {Promise<Response>} Промис с результатом выполнения запроса.
   */
  addPhoto(image) {
    this.toggleOverlayMessage('Загрузка...');

    return this.request({
      requestPath: "add_photo",
      requestBody: {
        employeeId: this.employeeId,
        image
      }
    });
  }

  /**
   * Запрос на удаление фотографии.
   * @param photoId {Number} ID фотографии на портале Vision.
   * @returns {Promise<Response>} Промис с результатом выполнения запроса.
   */
  deletePhoto(photoId) {
    this.toggleOverlayMessage('Удаление фотографии...');

    return this.request({
      requestPath: "delete_photo",
      requestBody: {
        photo_id: photoId
      }
    });
  }

  /**
   * Запрос на обновление фотографии.
   * @param photoId {Number} ID фотографии на портале Vision.
   * @returns {Promise<Response>} Промис с результатом выполнения запроса.
   */
  updatePhoto(photoId) {
    this.toggleOverlayMessage('Обновление фотографии...');

    return this.request({
      requestPath: "update_photo",
      requestBody: {
        employeeId: this.employeeId,
        photo_id: photoId
      }
    });
  }

  /**
   * Запрос на установку фотографии как основной для сотрудника.
   * @param photoId {Number} ID фотографии на портале Vision.
   * @returns {Promise<Response>} Промис с результатом выполнения запроса.
   */
  setAsMainPhoto(photoId) {
    this.toggleOverlayMessage('Обновление основной фотографии...');

    return this.request({
      requestPath: "set_main_photo",
      requestBody: {
        employeeId: this.employeeId,
        photoId: photoId
      }
    });
  }

  /**
   * Переключатель блокирующего сообщения.
   * @param message {string|undefined|null} Сообщение.
   */
  toggleOverlayMessage(message = null) {
    const {galleryContainer} = this;

    if (!galleryContainer) {
      throw new Error('Не найдена корневой элемент галереи');
    }

    if (message) {
      galleryContainer.dataset.message = message;
      galleryContainer.classList.add('vision-photo-gallery--message');
    } else {
      galleryContainer.classList.remove('vision-photo-gallery--message');
      galleryContainer.dataset.message = '';
    }
  }

  /**
   * Отрисовка DOM галереии.
   */
  draw() {
    const rootElement = this.rootElement;

    rootElement.innerHTML = `
      <div class="vision-photo-gallery">
        <input type="file" class="vision-photo-gallery__file-field" tabindex="-1">
        <div class="vision-photo-gallery__item vision-photo-gallery__item--main">
          <div class="vg-main-photo"></div>
        </div>
        <div class="vision-photo-gallery__item">
          <div class="vg-gallery"></div>
        </div>
      </div>
    `;

    const galleryContainer = document.querySelector(".vision-photo-gallery");

    this.galleryContainer = galleryContainer;
    this.toggleOverlayMessage('Загрузка...');

    const mainPhotoContainer = rootElement.querySelector(".vg-main-photo");
    const gallery = rootElement.querySelector(".vg-gallery");
    const {upload} = this.controls;

    this.getPhotos()
      .then(
        response => {
          mainPhotoContainer.innerHTML = this.createPhotoElement({
            main: true,
            empty: true,
            photoId: null
          });

          if (upload) {
            gallery.innerHTML = this.createPhotoElement({
              main: false,
              empty: true,
              photoId: null
            });
          }

          if (response.ok) {
            return response.json();
          } else {
            mainPhotoContainer.innerHTML = this.createNoPhotoElement();
          }

          this.initEvents();
          this.toggleOverlayMessage();
        },
        error => {
          this.toggleOverlayMessage();
          this.handleError({
            message: error
          });
          this.initEvents();
        }
      )
      .then(
        responseJson => {
          if (!responseJson || !responseJson.length) {
            mainPhotoContainer.innerHTML = this.createNoPhotoElement();
            gallery.parentElement.classList.add("hidden");
            this.toggleOverlayMessage();

            return;
          }

          const mainPhotoData = responseJson.find(({main}) => main);
          const galleryPhotosData = responseJson.filter(({main}) => !main);

          if (!!mainPhotoData) {
            mainPhotoContainer.innerHTML = this.createPhotoElement(
              mainPhotoData
            );
          } else {
            mainPhotoContainer.parentElement.classList.add("hidden");
          }

          if (galleryPhotosData.length) {
            let galleryPhotosHtml = "";

            galleryPhotosData.forEach(
              photoData =>
                (galleryPhotosHtml += this.createPhotoElement(photoData))
            );

            if (upload) {
              galleryPhotosHtml += this.createPhotoElement({
                main: false,
                empty: true,
                photoId: null
              });
            }

            gallery.innerHTML = galleryPhotosHtml;
          } else if (!upload) {
            gallery.parentElement.classList.add("hidden");
          }

          this.initEvents();
          this.toggleOverlayMessage();
        },
        error => {
          this.handleError({
            message: error
          });
          this.toggleOverlayMessage();
          this.initEvents();
        }
      )
      .catch(error => {
        this.toggleOverlayMessage();
        this.handleError({
          message: error
        });
        this.initEvents();
      });

    this.initEvents();
  }

  /**
   * Универсальный метод для создания элемента фотографии.
   * @param params.photoId {number} ID фотографии на портале Vision.
   * @param params.main {boolean}  Флаг основного фото.
   * @param params.empty {boolean} Флаг "пустого" фото, используется для отображения кнопки загрузки.
   * @param params.path {string} Путь к фотографии.
   * @param params.avatarUrl {string} Путь к фотографии.
   * @returns {string} Элемент фотографии в виде строки.
   */
  createPhotoElement(params) {
    const {photoId, main, empty, path, avatarUrl} = params;
    const {disableAll, upload, update, remove} = this.controls;
    let buttons = "";
    let elementClasses = "";
    let backgroundImage = "";
    let mainAttribute = "";

    if (!avatarUrl && path) {
      backgroundImage = `style="background-image: url(${path})"`;
    }

    if (avatarUrl) {
      backgroundImage = `style="background-image: url(${avatarUrl})"`;
    }

    if (main) {
      mainAttribute = `data-main="${main}"`;

      if (empty) {
        elementClasses = "vg-photo vg-photo--main";
        buttons = this.getPhotoButtons({
          upload
        });
      } else {
        elementClasses = "vg-photo vg-photo--main";
        buttons = this.getPhotoButtons({
          remove
        });
      }
    } else {
      if (empty) {
        elementClasses = "vg-gallery__item vg-photo vg-photo--upload";
        buttons = this.getPhotoButtons({
          uploadIcon: upload
        });
      } else {
        elementClasses = "vg-gallery__item vg-photo";
        buttons = this.getPhotoButtons({
          update,
          remove
        });
      }
    }

    return `
      <div class="${elementClasses}"
        ${backgroundImage}
        data-photo-id="${photoId}"
        ${mainAttribute}>
        ${disableAll ? "" : buttons}
        </div>
      `;
  }

  createNoPhotoElement() {
    return `
      <div class="vg-photo vg-photo--main">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-256 -256 1024 1024">
          <path fill="#4a5266"
            d="M437 310.8c-28.4-28.4-62.2-49.2-99.1-61.7 34.1-25.2 56.2-65.6 56.2-111.1C394.1 61.9 332.1 0 256 0S117.9 61.9 117.9 138.1c0 45.5 22.1 85.9 56.2 111.1 -36.9 12.4-70.8 33.3-99.1 61.7C26.6 359.2 0 423.5 0 491.8 0 503 9 512 20.2 512h471.7c11.1 0 20.2-9 20.2-20.2C512 423.5 485.4 359.2 437 310.8zM158.2 138.1c0-53.9 43.9-97.8 97.8-97.8 53.9 0 97.8 43.9 97.8 97.8 0 53.9-43.9 97.8-97.8 97.8C202.1 235.8 158.2 192 158.2 138.1zM41.2 471.7C51.4 362.2 143.9 276.2 256 276.2s204.6 86 214.8 195.5H41.2z"/>
        </svg>
      </div>
    `;
  }

  /**
   * Получить кнопку по передаваемым параметрам.
   * @param params.disableAll {boolean} Отключить все кнопки.
   * @param params.remove {boolean} Кнопка удаления.
   * @param params.upload {boolean} Кнопка загрузки.
   * @param params.uploadIcon {boolean} Кнопка загрузки в виде иконки.
   * @param params.select {boolean} Кнопка выбора фотографии.
   */
  getPhotoButtons(params) {
    if (params.disableAll) {
      return "";
    }

    const buttons = {
      remove: `<button class="vg-photo__button vg-button vg-button--red" data-action="remove-photo">Удалить</button>`,
      upload: `<button class="vg-photo__button vg-button" data-action="upload-photo">Загрузить</button>`,
      uploadIcon: `<button class="vg-photo__button vg-button vg-button--upload" data-action="upload-photo">&#43;</button>`,
      update: `<button class="vg-photo__button vg-button vg-button--green" data-action="update-photo">Выбрать</button>`
    };

    return Object.keys(params).reduce((buttonsString, key) => {
      if (params[key]) {
        buttonsString += buttons[key];
      }

      return buttonsString;
    }, "");
  }

  /**
   * Инициализация событий для кнопок галереи.
   */
  initEvents() {
    const {rootElement} = this;
    const buttons = rootElement.querySelectorAll("button");

    buttons.forEach(button => {
      button.addEventListener(
        "click",
        this.router[button.dataset.action],
        false
      );
    });
  }

  /**
   * Роутер.
   * @type {{"remove-photo": function(*): void, "file-input-changed": function(*): void, "upload-photo": function(*): void, "update-photo": function(*): void}}
   */
  router = {
    /**
     * Загрузка фотографии сотрудника.
     * @param event {Event} Событие.
     */
    "upload-photo": event => {
      const fileInput = this.rootElement.querySelector('input[type="file"]');

      fileInput.addEventListener("change", this.router["file-input-changed"]);
      fileInput.click();
    },
    /**
     * Слушатель события изменения файлового поля ввода.
     * @param event {event} Событие.
     */
    "file-input-changed": event => {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.addPhoto(reader.result).then(
          response => {
            if (response.ok) {
              this.draw();
            } else if (response.status !== 200) {
              return response.json();
            }
          },
          error => {
            this.handleError({
              message: error
            });
          }
        );
      };

      reader.onerror = () => {
        this.handleError({
          message: reader.error,
          blockingErrorMessage: `Ошибка загрузки фотографии (-ий): ${reader.error}`
        });
      };
    },
    /**
     * Запрос на удаление фотографии сотрудника.
     * @param event {Event} Событие.
     */
    "remove-photo": event => {
      const photoElement = event.target.closest(".vg-photo");
      const {photoId} = photoElement.dataset;

      if (!!photoId) {
        this.deletePhoto(+photoId).then(
          response => {
            if (response.ok) {
              this.draw();
            } else if (response.status !== 200) {
              return response.json();
            }
          },
          error => {
            this.handleError({
              message: error
            });
          }
        );
      }
    },
    /**
     * Запрос на обновление фотографии сотрудника.
     * @param event {Event} Событие.
     */
    "update-photo": event => {
      const photoElement = event.target.closest(".vg-photo");
      const {photoId} = photoElement.dataset;
      const buttons = photoElement.querySelectorAll('button');

      if (!!photoId) {
        buttons.forEach(button => button.setAttribute('disabled', 'disabled'));

        this.setAsMainPhoto(+photoId).then(
          response => {
            if (response.ok) {
              this.draw();
            } else if (response.status !== 200) {
              return response.json();
            }
          },
          error => {
            this.handleError({
              message: error
            });
          }
        );
      }
    }
  };
}
