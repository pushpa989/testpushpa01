import { LightningElement , track} from 'lwc';

export default class Pagination2 extends LightningElement {
    @track currentPage = 1;
    @track rowsPerPage = 6;
    @track totalPages = 0;
    @track pageList = [];
    connectedCallback() {
        this.updatePageList();
    }

    // Update Pagination List
    updatePageList() {
        this.pageList = [];

        // Always add the first two pages
        if(this.totalPages >= 1) {
            this.pageList.push(1);
        }

        if(this.totalPages >= 2){
            this.pageList.push(2);
        }

        // Add ellipsis if total pages greater than 2
        if (this.totalPages > 2) {
            this.pageList.push('...');
        }

        // Always add the last page
        if (this.totalPages >= 3) {
            this.pageList.push(this.totalPages);
        }
    }
    // Pagination Helpers
    get isFirstPage() {
        return this.currentPage === 1;
    }

    get isLastPage() {
        return this.currentPage === this.totalPages;
    }
    handleNextPage() {
        if (!this.isLastPage) {
            this.currentPage++;
            this.updatePageList();
        }
    }

    handlePreviousPage() {
        if (!this.isFirstPage) {
            this.currentPage--;
            this.updatePageList();
        }
    }

    handlePageClick(event) {
        const selectedPage = event.target.dataset.page;
        if (selectedPage !== '...') {
            this.currentPage = Number(selectedPage);
            this.updatePageList();
        }
    }

    getPageClass(page) {
        if (page === '...') {
            return 'pagination-ellipsis';
        }
        return page === this.currentPage ? 'pagination-item active' : 'pagination-item';
 
    }
 
}