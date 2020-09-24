<template>
  <div>
    <div v-if="pages > 1">
      <select v-model="rowsPerPage" @change="changeRowPerPage()">
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="50">100</option>
      </select>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-end">
          <li :class="currentPage <= 1 ? 'page-item disabled' : 'page-item'">
            <a class="page-link" href="#" aria-label="Previous" @click="previousPage()">
              <span aria-hidden="true">&laquo;</span>
              <span class="sr-only">Previous</span>
            </a>
          </li>
          <div v-for="(page, idxPage) of visiblePages" :key="idxPage">
            <template v-if="currentPage === page">
              <li class="page-item active">
                <a class="page-link">{{ page }}</a>
              </li>
            </template>
            <template v-else>
              <li class="page-item">
                <a class="page-link" @click="clickPage(page)">{{ page }}</a>
              </li>
            </template>
          </div>
          <li :class="currentPage === pages ? 'page-item disabled' : 'page-item'">
            <a class="page-link" href="#" aria-label="Next" @click="nextPage()">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
    rows found {{ numOfResults }}
  </div>
</template>
<script>
export default {
  name: 'UIPagination',
  props: {
    pages: {
      type: Number,
    },
    maxPages: {
      type: Number,
    },
    numOfResults: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      visiblePages: [],
      currentPage: 1,
      rowsPerPage: 10,
    };
  },
  methods: {
    changeRowPerPage() {
      this.$emit('clickPage', 1, this.rowsPerPage);
    },
    clickPage(page) {
      this.currentPage = page;
      this.calculateVisiblePage();
      this.$emit('clickPage', page, this.rowsPerPage);
    },
    previousPage(page) {
      this.calculateVisiblePage();
      this.currentPage -= 1;
      this.$emit('clickPage', page, this.rowsPerPage);
    },
    nextPage(page) {
      this.calculateVisiblePage();
      this.currentPage += 1;
      this.$emit('clickPage', page, this.rowsPerPage);
    },
    calculateVisiblePage() {
      if (this.currentPage < this.pages) {
        let diff = 0;
        if (
          this.currentPage % this.visiblePages[this.visiblePages.length - 1] ===
          0
        ) {
          diff = this.visiblePages.length - 1;
        } else if (
          this.currentPage % this.visiblePages[0] === 0 &&
          this.visiblePages[0] !== 1
        ) {
          diff = -(this.visiblePages.length - 1);
        }
        if (diff !== 0) {
          this.visiblePages = this.visiblePages.map(
            changePage => changePage + diff,
          );
        }
      }
    },
  },
  watch: {
    pages() {
      this.visiblePages = [];
      this.currentPage = 1;
      const pagesToGenerate =
        this.pages <= this.maxPages ? this.pages : this.maxPages;
      for (let i = 1; i <= pagesToGenerate; i += 1) {
        this.visiblePages.push(i);
      }
    },
  },
};
</script>
