import View from './View';
import icons from 'url:../../img/icons.svg'; // Parcel 2

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);
    // No results
    if (numPages === 0) return ``;

    // Page 1, and there are other pages
    if (this._data.page === 1 && numPages > 1)
      return this._generateMarkupButton('next');

    // Page 1, and there are NO other pages
    if (this._data.page === 1 && numPages === 1) return ``;

    // Last page
    if (this._data.page === numPages) return this._generateMarkupButton('prev');

    // Othger page
    return (
      this._generateMarkupButton('prev') + this._generateMarkupButton('next')
    );
  }

  _generateMarkupButton(type) {
    if (type === 'next')
      return `
        <button data-goto="${
          this._data.page + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${this._data.page + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;
    if (type === 'prev')
      return `
        <button data-goto="${
          this._data.page - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.page - 1}</span>
        </button>
    `;
  }
}

export default new PaginationView();
