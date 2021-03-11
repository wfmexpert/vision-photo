"use strict";

import "./app.scss";

/**
 * Класс галереи.
 */
export default class VisionPhotoGallery {
  static employeeId = null;
  static visionPersonId = null;
  static rootElement = null;
  static token = null;
  static disableControls = false;

  /**
   * Конструктор экземпляра класса галереи.
   * @param root {string} ID корневого элемента, куда будет рендериться галерея.
   * @param employeeId {number|string} ID сотрудника.
   * @param visionPersonId {number|string} ID сотрудника аутсорсера.
   * @param token {string} CSRF-токен пользователя.
   * @param disableControls {boolean} Отключить возможность загрузки, обновления и удаления фотографий.
   */
  constructor({
    root,
    employeeId,
    visionPersonId,
    token,
    disableControls = false
  }) {
    if (!root) {
      throw new Error("Не указан ID корневого элемента для галереи!");
    }

    const rootElement = document.getElementById(root);

    if (!!rootElement) {
      VisionPhotoGallery.rootElement = rootElement;
    } else {
      throw new Error("Проверьте указанный ID корневого элемента для галереи!");
    }

    if (!employeeId && !visionPersonId) {
      throw new Error("Не указан ID пользователя на портале Vision");
    }

    this.employeeId = employeeId;
    this.visionPersonId = visionPersonId;
    this.token = token;
    this.disableControls = disableControls;

    VisionPhotoGallery.draw();
  }

  /**
   * Назначаемый метод для отображения ошибок.
   * @type {null|Function} Функция обработчик отображения ошибок.
   */
  static errorFunction = null;
  /**
   * Получение метода для отображения ошибок.
   * @type {null|Function} Функция обработчик отображения ошибок.
   */
  get errorFunction() {
    return VisionPhotoGallery.errorFunction;
  }

  /**
   * Назначение метода для отображения ошибок.
   * @param errorFunction {null|Function} Функция обработчик отображения ошибок.
   */
  set errorFunction(errorFunction) {
    if (errorFunction) {
      VisionPhotoGallery.errorFunction = errorFunction;
    }
  }

  /**
   * Обновление параметров галереи.
   * @param employeeId {number|number} ID сотрудника.
   * @param token {string} CSRF-токен сесси пользователя.
   */
  static update({ employeeId, token }) {
    this.employeeId = employeeId;
    this.token = token;

    this.draw();
  }

  /**
   * Получить ID сотрудника.
   * @return {number|string} ID сотрудника.
   */
  get employeeId() {
    return VisionPhotoGallery.employeeId;
  }

  /**
   * Назначение экземпляру галереи ID сотрудника.
   * @param employeeId {number|string} ID сотрудника.
   */
  set employeeId(employeeId) {
    if (employeeId) {
      VisionPhotoGallery.employeeId = employeeId;
    }
  }

  /**
   * Получить ID сотрудника аутсорсера.
   * @return {number|string} ID сотрудника аутсорсера.
   */
  get visionPersonId() {
    return VisionPhotoGallery.employeeId;
  }

  /**
   * Назначение экземпляру галереи ID сотрудника аутсорсера.
   * @param visionPersonId {number|string} ID сотрудника аутсорсера.
   */
  set visionPersonId(visionPersonId) {
    if (visionPersonId) {
      VisionPhotoGallery.visionPersonId = visionPersonId;
    }
  }

  /**
   * Корневой элемент, в который будет рендериться галерея.
   * @return {null|Element} Корневой элемент для рендера.
   */
  get rootElement() {
    return VisionPhotoGallery.rootElement;
  }

  /**
   * Получить CSRF-токен сессии пользователя.
   * @return {null|string} CSRF-токен сессии пользователя.
   */
  get token() {
    return VisionPhotoGallery.token;
  }

  /**
   * Назначить CSRF-токен сессии пользователя.
   * @param token {string} CSRF-токен сессии пользователя.
   */
  set token(token) {
    if (token) {
      VisionPhotoGallery.token = token;
    }
  }

  /**
   * Получить значение состояния контролов.
   * @return {boolean} Состояние контролов.
   */
  get disableControls() {
    return VisionPhotoGallery.token;
  }

  /**
   * Назначить CSRF-токен сессии пользователя.
   * @param value {boolean} Включить/отключить контролы.
   */
  set disableControls(value) {
    if (value) {
      VisionPhotoGallery.disableControls = value;
    }
  }

  /**
   * Обработчик ошибок.
   * @param params.message {string} Сообщение об ошибке.
   * @param params.blockingErrorMessage {string} Блокирующее поток сообщение об ошибке.
   */
  static handleError(params) {
    const { message, blockingErrorMessage } = params;

    if (this.errorFunction) {
      let messageString = "";

      if (typeof message === "object") {
        Object.keys(message)
          .reverse()
          .forEach(key => {
            messageString += `${message[key]}<br/>`;
          });
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
  static request({ requestPath, requestBody }) {
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
  static getPhotos() {
    const employee = {};

    if (this.employeeId && !this.visionPersonId) {
      employee.employeeId = this.employeeId;
    } else if (this.visionPersonId) {
      employee.vision_person_id = this.visionPersonId;
    }

    return this.request({
      requestPath: "get_photos",
      requestBody: {
        ...employee,
        masterAlbum: true
      }
    });
  }

  /**
   * Запрос на добавление (загрузку) фотографии.
   * @param image {BufferEncoding} Фотографии в формате Base64.
   * @returns {Promise<Response>} Промис с результатом выполнения запроса.
   */
  static addPhoto(image) {
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
  static deletePhoto(photoId) {
    return this.request({
      requestPath: "delete_photo",
      requestBody: {
        employeeId: this.employeeId,
        photoIds: [photoId],
        masterAlbum: true
      }
    });
  }

  /**
   * Запрос на обновление фотографии.
   * @param photoId {Number} ID фотографии на портале Vision.
   * @returns {Promise<Response>} Промис с результатом выполнения запроса.
   */
  static updatePhoto(photoId) {
    return this.request({
      requestPath: "update_photo",
      requestBody: {
        employeeId: this.employeeId,
        photo_id: photoId
      }
    });
  }

  /**
   * Отрисовка DOM галереии.
   */
  static draw() {
    const rootElement = this.rootElement;

    rootElement.innerHTML = `
      <div class="vision-photo-gallery vision-photo-gallery--message" data-message="Загрузка...">
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

    const galleryContainer = document.querySelector(".vision-photo-gallery");
    const mainPhotoContainer = rootElement.querySelector(".vg-main-photo");
    const gallery = rootElement.querySelector(".vg-gallery");
    const { disableControls: isControlsDisabled } = this;

    this.getPhotos()
      .then(response => {
        mainPhotoContainer.innerHTML = this.createPhotoElement({
          main: true,
          empty: true,
          photoId: null
        });

        gallery.innerHTML = this.createPhotoElement({
          main: false,
          empty: true,
          photoId: null
        });

        if (response.ok) {
          return response.json();
        } else {
          mainPhotoContainer.innerHTML = this.createPhotoElement({
            main: true,
            empty: true,
            photoId: null
          });
        }

        this.initEvents();
      })
      .then(responseJson => {
        if (!responseJson) {
          return;
        }

        if (!responseJson.length) {
          mainPhotoContainer.parentElement.classList.add("hidden");
          gallery.parentElement.classList.add("hidden");
          galleryContainer.dataset.message = "Нет фотографий";

          return;
        }

        const mainPhotoData = responseJson.find(({ main }) => main);
        const galleryPhotosData = responseJson.filter(({ main }) => !main);

        if (!!mainPhotoData) {
          mainPhotoContainer.innerHTML = this.createPhotoElement(mainPhotoData);
        } else {
          mainPhotoContainer.parentElement.classList.add("hidden");
        }

        if (galleryPhotosData.length) {
          let galleryPhotosHtml = "";

          galleryPhotosData.forEach(
            photoData =>
              (galleryPhotosHtml += this.createPhotoElement(photoData))
          );

          if (!isControlsDisabled) {
            galleryPhotosHtml += this.createPhotoElement({
              main: false,
              empty: true,
              photoId: null
            });
          }

          gallery.innerHTML = galleryPhotosHtml;
        } else {
          gallery.parentElement.classList.add("hidden");
        }

        this.initEvents();
        galleryContainer.classList.remove("vision-photo-gallery--message");
      })
      .catch(error => {
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
  static createPhotoElement(params) {
    const { photoId, main, empty, path, avatarUrl } = params;
    const { disableControls: isControlsDisabled } = this;
    let buttons = "";
    let elementClasses = "";
    let backgroundImage = "";
    let mainAttribute = "";

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
      elementClasses = "vg-photo vg-photo--main";
      buttons = `
        <button class="vg-photo__button vg-button vg-button--red" data-action="remove-photo">Удалить</button>
      `;
    } else if (main && empty) {
      elementClasses = "vg-photo vg-photo--main";
      buttons = `
        <button class="vg-photo__button vg-button" data-action="upload-photo">Загрузить</button>
      `;
    } else if (!main && empty) {
      elementClasses = "vg-gallery__item vg-photo vg-photo--upload";
      buttons = `
        <button class="vg-photo__button vg-button vg-button--upload" data-action="upload-photo">&#43;</button>
      `;
    } else {
      elementClasses = "vg-gallery__item vg-photo";
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
        ${isControlsDisabled ? "" : buttons}
        </div>
      `;
  }

  /**
   * Инициализация событий для кнопок галереи.
   */
  static initEvents() {
    const { rootElement } = this;
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
  static router = {
    /**
     * Загрузка фотографии сотрудника.
     * @param e {Event} Событие.
     */
    "upload-photo": e => {
      const fileInput = this.rootElement.querySelector('input[type="file"]');

      fileInput.addEventListener("change", this.router["file-input-changed"]);
      fileInput.click();
    },
    /**
     * Слушатель события изменения файлового поля ввода.
     * @param e {event} Событие.
     */
    "file-input-changed": e => {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.addPhoto(reader.result)
          .then(response => {
            if (response.ok) {
              this.draw();
            } else if (response.status !== 200) {
              return response.json();
            }
          })
          .then(response => {
            if (response.status !== 200) {
              this.handleError({
                message: response
              });
            }
          });
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
     * @param e {Event} Событие.
     */
    "remove-photo": e => {
      const photoElement = e.target.closest(".vg-photo");
      const { photoId } = photoElement.dataset;

      if (!!photoId) {
        this.deletePhoto(+photoId)
          .then(response => {
            if (response.ok) {
              this.draw();
            } else if (response.status !== 200) {
              return response.json();
            }
          })
          .then(response => {
            if (response.status !== 200) {
              this.handleError({
                message: response
              });
            }
          });
      }
    },
    /**
     * Запрос на обновление фотографии сотрудника.
     * @param e {Event} Событие.
     */
    "update-photo": e => {
      const photoElement = e.target.closest(".vg-photo");
      const { photoId } = photoElement.dataset;

      if (!!photoId) {
        this.updatePhoto(+photoId)
          .then(response => {
            if (response.ok) {
              this.draw();
            } else if (response.status !== 200) {
              return response.json();
            }
          })
          .then(response => {
            if (response.status !== 200) {
              this.handleError({
                message: response
              });
            }
          });
      }
    }
  };
}
