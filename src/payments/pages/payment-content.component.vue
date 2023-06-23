<template>
  <div class="global-container">
    <h1>Cronograma</h1>
    <div class="card p-fluid">
      <pv-data-table :value="payments" editMode="cell" @cell-edit-complete="onCellEditComplete"
         tableClass="editable-cells-table" tableStyle="min-width: 50rem">
        <pv-column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"
           style="width: 25%">
          <template #body="{ data, field }">
            {{ field === 'initialBalance' || field === 'finalBalance' || field === 'interest'
          || field === 'amortization' || field === 'fee' || field === 'totalFee'
          || field === 'lienInsurance' || field === 'propertyInsurance' || field === 'valuationExpenses'?
              formatCurrency(data[field]) : data[field] }}
          </template>
          <template #editor="{ data, field }">
            <template v-if="field === 'gracePeriod'">
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
import {PaymentApiService} from "../services/payment-api.service.js";
import {OfferApiService} from "../../loan/services/offer-api.service.js";
import {BankApiService} from "../../loan/services/bank-api.service.js";

export default {
  name: "payment-content",
  data() {
    return {
      paymentsService: null,
      offersService: null,
      banksService: null,

      payments: null,
      columns: [
        { field: 'currentPeriod', header: 'Periodo' },
        { field: 'tep', header: 'Tep' },
        { field: 'gracePeriod', header: 'Periodo de gracia' },
        { field: 'initialBalance', header: 'Saldo inicial' },
        { field: 'interest', header: 'Intereses' },
        { field: 'amortization', header: 'Amortización' },
        { field: 'fee', header: 'Cuota' },
        { field: 'lienInsurance', header: 'Seguro Desgravamen' },
        { field: 'propertyInsurance', header: 'Seguro de Inmueble' },
        { field: 'valuationExpenses', header: 'Costos de valuación' },
        { field: 'totalFee', header: 'Cuota Total' },
        { field: 'finalBalance', header: 'Saldo final' }
      ],

      offerId: null,
      bankId: null,
      currency: null,
      interestRateType: null,
      homeValue: null,
      initialFee: null,
      amountToFinance: null,
      tea: null,
      tna: null,
      capitalization: null,
      termInMonths: null,
      lienInsurance: null,
      propertyInsurance: null,
      appraisalExpenses: null
    };
  },
  async created(){
    //console.log(this.$route.params.offerId);
    this.paymentsService = new PaymentApiService();
    this.offersService = new OfferApiService();
    this.banksService = new BankApiService(),

    //this.paymentsService.getByOfferId(this.offerId).then((data) => (this.payments = data));
    await this.offersService.getById(this.$route.params.offerId)
        .then(response => {
          const offer = response.data;
          this.offerId = offer.id;
          this.bankId = offer.bankId;
          this.currency = offer.currency;
          this.interestRateType = offer.interestRateType;
          this.homeValue = offer.homeValue;
          this.initialFee = offer.initialFee;
          this.amountToFinance = offer.amountToFinance;
          this.tea = offer.tea;
          this.tna = offer.tna;
          this.capitalization = offer.capitalization;
          this.termInMonths = offer.termInMonths;
        })
        .catch(error => {
          console.error("Error al obtener datos de la oferta por su id:", error);
        });

    await this.banksService.getById(this.bankId)
        .then(response => {
          const bank = response.data;
          this.lienInsurance = bank.lienInsurance;
          this.propertyInsurance = bank.propertyInsurance;
          this.appraisalExpenses = bank.appraisalExpenses;
        })
        .catch(error => {
          console.error("Error al obtener datos del banco:", error);
        });
  },
  mounted() {

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