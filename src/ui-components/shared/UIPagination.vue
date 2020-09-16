<template>
  <nav aria-label="Page navigation example" v-if="pages>1">
    <ul class="pagination justify-content-end">
      <li :class="currentPage <=1 ? 'page-item disabled' : 'page-item'">
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
</template>
<script>
export default {
  props: {
    pages: {
      type: Number,
    },
    maxPages: {
      type: Number,
    },
  },
  data() {
    return {
      visiblePages: [],
      currentPage: 1,
    };
  },
  methods: {
    clickPage(page) {
      this.currentPage = page;
      this.calculateVisiblePage();
      this.$emit('clickPage', page);
    },
    previousPage(page) {
      this.calculateVisiblePage();
      this.currentPage -= 1;
      this.$emit('clickPage', page);
    },
    nextPage(page) {
      this.calculateVisiblePage();
      this.currentPage += 1;
      this.$emit('clickPage', page);
    },
    calculateVisiblePage() {
      let diff = 0;
      if (this.currentPage % this.visiblePages[this.visiblePages.length - 1] === 0) {
        diff = this.visiblePages.length - 1;
      } else if (this.currentPage % this.visiblePages[0] === 0 && this.visiblePages[0] !== 1) {
        diff = -(this.visiblePages.length - 1);
      }
      if (diff !== 0) {
        this.visiblePages = this.visiblePages.map(changePage => changePage + diff);
      }
    },
  },
  watch: {
    pages() {
      // eslint-disable-next-line no-console
      console.log('sono cambiato');
      const pagesToGenerate = this.pages <= this.maxPages ? this.pages : this.maxPages;
      for (let i = 1; i <= pagesToGenerate; i += 1) {
        this.visiblePages.push(i);
      }
    },
  },
};
</script>
