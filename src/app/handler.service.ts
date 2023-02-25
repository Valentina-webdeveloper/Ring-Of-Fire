import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {
  loading: boolean = false;
  initialLoadCompleted: boolean = false;

  constructor() { }

  /**
   * Help function to collect all preloaders
   */
  preloadImages() {
    this.preloadImage('./../assets/img/');
    this.preloadImage('./../assets/img/');
    this.preloadImage('./../assets/img/');
    this.preloadImage('./../assets/img/');
    this.preloadImage('./../assets/img/');
    this.preloadImage('./../assets/img/');
    this.preloadImage('./../assets/img/');
    this.preloadImage('./../assets/img/');
    this.preloadImage('./../assets/img/');
    this.preloadImage('./../assets/img/');

  }

  /**
   * Creates a new object for the passed image
   * @param url url The path of the single image
   */
  preloadImage(url: string) {
    const img = new Image();
    img.src = url;
  }

  /**
   * Loads data from the local storage
   */
  loadFromLocalStorage() {
    let itemAsString = localStorage.getItem('initialLoadCompleted');

    if (itemAsString === 'true') {
      this.initialLoadCompleted = true;
    } else {
      this.initialLoadCompleted = false;
    }
  }
}
