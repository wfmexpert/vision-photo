'use strict';
// Стили
import './style.scss';

// Компоненты
import Gallery from "Gallery";
import PhotoElement from "Photo";
import requestToApi from "./utils/api";

class VisionPhotoGallery {
    /**
     * @param renderTo {string} - Элемент, куда будет сгененрирована галлерея.
     * @params personId {number} - person id пользователя на портале Vision.
     */
    constructor(renderTo, personId) {
        const vGallery = this.constructor;
        const rootElement = vGallery.rootElement = document.getElementById(renderTo);
        const galleryTemplate = new Gallery(rootElement);

        this.constructor.imagesList = galleryTemplate.imagesList;
        this.constructor.mainPhoto = galleryTemplate.mainPhoto;
        vGallery.personId = personId;
        vGallery.showPhotos(personId);
    }

    static rootElement = null;
    static imagesList = null;
    static mainPhoto = null;
    static personId = null;

    /**
     * Метод для отрисовки галереи
     * @param personId
     */
    static showPhotos(personId) {
        const {imagesList, mainPhoto} = this;
        const requestOptions = {
            body: JSON.stringify({
                person_id: personId,
                master_album: true,
            })
        };

        imagesList.innerHTML = new PhotoElement({
            id: 123,
            main: true,
            path: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=200',
        })
        // requestToApi('get_photos', requestOptions).then(response => {
        //     response.json().then(photos => {
        //         photos.forEach(photoItem => {
        //             if (photoItem.main) {
        //                 mainPhoto.innerHTML = null;
        //             } else {
        //                 imagesList.innerHTML += generatePhotoElement(photoItem);
        //             }
        //         });
        //
        //         this.initEvents();
        //     })
        // });
    }

    /**
     * Инициализация событий
     */
    static initEvents() {
        const {imagesList, mainPhoto} = this;

        const photoItemClick = (e) => {
            const photoElement = e.target.closest('.gallery__item');
            const {action} = e.target.dataset;

            if (action === 'choose') {
                console.log('chosen');
            }

            if (action === 'remove') {

                e.target.removeEventListener('click', photoItemClick);
                this.removePhoto(photoElement.dataset.photoId);
            }
        }

        imagesList.querySelectorAll('.gallery__item').forEach(galleryItem => {
            galleryItem.addEventListener('click', photoItemClick, false);
        });
    }

    static removePhoto(photoId) {
        const {imagesList} = this;
        const photoElement = imagesList.querySelector(`.gallery__item[data-photo-id="${photoId}"]`);

        if (window.confirm('Удалить фото?')) {
            photoElement.remove();
        }
    }
}

const vGallery = new VisionPhotoGallery('app', 67596);