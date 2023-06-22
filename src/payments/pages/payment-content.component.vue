<template>
  <div class="global-container">
    <h1>Cronograma</h1>
    <div class="card p-fluid">
      <pv-data-table :value="products" editMode="cell" @cell-edit-complete="onCellEditComplete"
         tableClass="editable-cells-table" tableStyle="min-width: 50rem">
        <pv-column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"
           style="width: 25%">
          <template #body="{ data, field }">
            {{ field === 'price' ? formatCurrency(data[field]) : data[field] }}
          </template>
          <template #editor="{ data, field }">
            <template v-if="field !== 'price'">
              <pv-input-text v-model="data[field]" autofocus></pv-input-text>
            </template>
            <template v-else>
              <pv-input-number v-model="data[field]" mode="currency" currency="USD"
                               locale="en-US" autofocus></pv-input-number>
            </template>
          </template>
        </pv-column>
      </pv-data-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "payment-content",
  data() {
    return {
      products: null,
      columns: [
        { field: 'code', header: 'Code' },
        { field: 'name', header: 'Name' },
        { field: 'quantity', header: 'Quantity' },
        { field: 'price', header: 'Price' }
      ]
    };
  },
  mounted() {
    ProductService.getProductsMini().then((data) => (this.products = data));
  },
  methods: {
    onCellEditComplete(event) {
      let { data, newValue, field } = event;

      switch (field) {
        case 'quantity':
        case 'price':
          if (this.isPositiveInteger(newValue)) data[field] = newValue;
          else event.preventDefault();
          break;

        default:
          if (newValue.trim().length > 0) data[field] = newValue;
          else event.preventDefault();
          break;
      }
    },
    isPositiveInteger(val) {
      let str = String(val);

      str = str.trim();

      if (!str) {
        return false;
      }

      str = str.replace(/^0+/, '') || '0';
      var n = Math.floor(Number(str));

      return n !== Infinity && String(n) === str && n >= 0;
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    }
  }
}
</script>
<style>
::v-deep(.editable-cells-table td.p-cell-editing) {
  padding-top: 0;
  padding-bottom: 0;
}
</style>