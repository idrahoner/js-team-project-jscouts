export class LocalStorageAPI {
  #key;
  constructor(key) {
    this.#key = key;
  }

  getItems() {
    try {
      return JSON.parse(localStorage.getItem(this.#key));
    } catch (error) {
      console.log(error);
    }
  }
  setItems(array) {
    localStorage.setItem(this.#key, JSON.stringify(array));
  }

  saveObject(object) {
    // console.log('this.getItems(): ', this.getItems());
    if (!this.getItems()) {
      localStorage.setItem(this.#key, JSON.stringify([object]));
      return;
    }
    const newValue = this.getItems();
    // console.log('newValue: ', newValue);
    newValue.push(object);
    // console.log('the newValue: ', newValue);
    this.setItems(newValue);
  }

  resetStorage() {
    localStorage.setItem(this.#key, JSON.stringify([]));
  }

  removeItem(id) {
    const items = this.getItems().filter(element => element.id !== id);
    this.setItems(items);
  }

  findItem(id) {
    return this.getItems().some(element => element.id === id);
  }
}
