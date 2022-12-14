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
    if (!this.getItems()) {
      localStorage.setItem(this.#key, JSON.stringify([object]));
      return;
    }
    const newValue = this.getItems();
    newValue.push(object);
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
