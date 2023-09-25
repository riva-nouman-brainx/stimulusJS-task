import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["cartEntry", "total", "checkout"];
    static values = { url: String };


    itemCount = 0;
    total = 0;

    initialize() {
        this.updateTotal();
    }

    addItem(event) {
        const item = event.currentTarget;

        const price = item.previousElementSibling.innerHTML;
        const name = item.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
        const priceInt = parseInt(price.replace(/\$/g, ''));

        const cartLoc = this.cartEntryTarget;
        const elem = document.createElement('div');
        elem.innerHTML = `
        <div class="line-break">
            <button class="delete-icon" data-action="click->card#removeItem">
            <br>
                <i class="fa-solid fa-xmark float-end"></i>
            </button>
            <br>
            <div class="entry-info">
                <p class="entry-label">Name:</p>
                <p class="entry-value">${name}</p>
            </div>
            <div class="entry-info">
                <p class="entry-label">Price:</p>
                <p class="entry-value">${price}</p>
            </div>
        </div>
    `;
        cartLoc.append(elem);
        this.itemCount++;
        this.total = this.total + priceInt;
        this.updateTotal(this.total);

    }

    removeItem(event) {
        const deleteIcon = event.currentTarget;
        const priceStr = deleteIcon.nextElementSibling.nextElementSibling.nextElementSibling.children[1].innerHTML;
        const priceInt = parseInt(priceStr.replace(/\$/g, ''));
        const elemDel = deleteIcon.parentElement.parentElement;
        const loc = elemDel.parentElement;
        elemDel.remove();
        this.itemCount--;
        this.total = this.total - priceInt;
        this.updateTotal(this.total);

    }
    updateTotal() {
        const totalLabel = this.totalTarget.previousElementSibling;
        const checkoutBtn = this.checkoutTarget;
        if (this.itemCount >= 1) {
            totalLabel.style.display = 'block';
            this.totalTarget.style.display = 'block';

            this.totalTarget.textContent = this.total;
        } else {
            totalLabel.style.display = 'none';
            this.totalTarget.style.display = 'none';
        }
        if (this.itemCount === 5) {
            checkoutBtn.disabled = false;

        } else {
            checkoutBtn.disabled = true;

        }
    }
    checkoutClick() {
        this.urlValue = "https://www.google.com";
        window.location.href = this.urlValue; // Redirect the user to the new URL
    }
}










