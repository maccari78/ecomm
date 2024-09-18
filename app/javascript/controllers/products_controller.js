import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static values = { size: String, product: Object };

  connect() {
    console.log("Products controller connected");
  }

  addToCart() {
    if (this.sizeValue) {
      console.log("product: ", this.productValue);
      console.log("selected size: ", this.sizeValue);
    } else {
      console.error("No size selected");
    }
  }

  selectSize(event) {
    this.sizeValue = event.currentTarget.value;
    const selectSizeEl = this.element.querySelector("#selected-size");
    selectSizeEl.innerText = `Selected Size: ${this.sizeValue}`;
  }
}
