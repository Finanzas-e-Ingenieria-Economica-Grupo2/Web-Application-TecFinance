<!--<template>-->
<!--  <div>-->
<!--    <div class="card">-->

<!--      <pv-data-table ref="dt" :value="products" v-model:selection="selectedProducts" dataKey="id"-->
<!--                 :paginator="true" :rows="10" :filters="filters"-->
<!--                 paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]"-->
<!--                 currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products">-->
<!--        <template #header>-->
<!--          <div class="flex flex-wrap gap-2 align-items-center justify-content-between">-->
<!--            <h4 class="m-0">Record Schedules</h4>-->
<!--          </div>-->
<!--        </template>-->

<!--        <pv-column field="code" header="Code" sortable style="min-width:12rem"></pv-column>-->
<!--        <pv-column field="name" header="Name" sortable style="min-width:16rem"></pv-column>-->
<!--        <pv-column field="price" header="Price" sortable style="min-width:8rem">-->
<!--          <template #body="slotProps">-->
<!--            {{formatCurrency(slotProps.data.price)}}-->
<!--          </template>-->
<!--        </pv-column>-->
<!--        <pv-column field="category" header="Category" sortable style="min-width:10rem"></pv-column>-->
<!--        <pv-column :exportable="false" style="min-width:8rem">-->
<!--          <template #body="slotProps">-->
<!--            <pv-button icon="pi pi-pencil" outlined rounded class="mr-2"-->
<!--               @click="editProduct(slotProps.data)" />-->
<!--          </template>-->
<!--        </pv-column>-->
<!--      </pv-data-table>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: "record-content",-->
<!--  data() {-->
<!--    return {-->
<!--      products: null,-->
<!--      productDialog: false,-->
<!--      deleteProductDialog: false,-->
<!--      deleteProductsDialog: false,-->
<!--      product: {},-->
<!--      selectedProducts: null,-->
<!--      filters: {},-->
<!--      submitted: false,-->
<!--      statuses: [-->
<!--        {label: 'INSTOCK', value: 'instock'},-->
<!--        {label: 'LOWSTOCK', value: 'lowstock'},-->
<!--        {label: 'OUTOFSTOCK', value: 'outofstock'}-->
<!--      ]-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--    this.initFilters();-->
<!--  },-->
<!--  mounted() {-->
<!--    ProductService.getProducts().then((data) => (this.products = data));-->
<!--  },-->
<!--  methods: {-->
<!--    formatCurrency(value) {-->
<!--      if(value)-->
<!--        return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});-->
<!--      return;-->
<!--    },-->
<!--    editProduct(product) {-->
<!--      this.product = {...product};-->
<!--      this.productDialog = true;-->
<!--    },-->
<!--    initFilters() {-->
<!--      this.filters = {-->
<!--        'global': {value: null, matchMode: FilterMatchMode.CONTAINS},-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->