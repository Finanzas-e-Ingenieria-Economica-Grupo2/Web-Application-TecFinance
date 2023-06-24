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
          || field === 'amortization' || field === 'quota' || field === 'totalQuota'
          || field === 'lienInsurance' || field === 'propertyInsurance'?
              formatCurrency(data[field]) : data[field] }}
          </template>
          <template #editor="{ data, field }">
            <template v-if="field === 'gracePeriod' && data['currentPeriod'] !== payments.length">
              <pv-input-text v-model="data[field]" autofocus></pv-input-text>
            </template>
            <template v-if="field === 'tea'">
              <pv-input-number v-model="data[field]" inputId="percent" suffix=" %" autofocus></pv-input-number>
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

      payments: [],
      columns: [
        { field: 'currentPeriod', header: 'Periodo' },
        { field: 'tea', header: 'Tea' },
        { field: 'tep', header: 'Tep' },
        { field: 'gracePeriod', header: 'Periodo de gracia' },
        { field: 'initialBalance', header: 'Saldo inicial' },
        { field: 'interest', header: 'Intereses' },
        { field: 'amortization', header: 'Amortización' },
        { field: 'quota', header: 'Cuota' },
        { field: 'lienInsurance', header: 'Seguro Desgravamen' },
        { field: 'propertyInsurance', header: 'Seguro de Inmueble' },
        { field: 'totalQuota', header: 'Cuota Total' },
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
      capitalization: {
        code: null,
        days: null
      },
      frequency: {
        code: null,
        days: null
      },
      termInMonths: null,
      lienInsurance: null,
      propertyInsurance: null,
      appraisalExpenses: null,

      totalOfQuotas: null

    };
  },
  async created(){
    //console.log(this.$route.params.offerId);
    this.paymentsService = new PaymentApiService();
    this.offersService = new OfferApiService();
    this.banksService = new BankApiService();

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
          this.capitalization.code = offer.capitalization;
          this.frequency.code = offer.frequency;
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

    // función que cree toda la lista de payments
    this.calculateSchedule();
  },
  mounted() {

  },
  methods: {
    onCellEditComplete(event) {
      let { data, newValue, field } = event;

      switch (field) {
        case 'tea':
          if (this.isPositiveInteger(newValue)) data[field] = newValue;
          else event.preventDefault();
          break;

        case 'gracePeriod':
          if (newValue.trim().length > 0) {
            if (data[field] !== newValue.toUpperCase()){
              if (newValue.toUpperCase() !== 'T' && newValue.toUpperCase() !== 'P'){
                data[field] = 'S';
              }else {
                data[field] = newValue.toUpperCase();
              }
              this.changedPeriodGrace(data);
            }
          }
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
    },
    calculateSchedule(){
      switch (this.frequency.code){
        case 'diaria': this.frequency.days = 1; break;
        case 'quincenal': this.frequency.days = 15; break;
        case 'mensual': this.frequency.days = 30; break;
        case 'bimestral': this.frequency.days = 60; break;
        case 'trimestral': this.frequency.days = 90; break;
        case 'cuatrimestral': this.frequency.days = 120; break;
        case 'semestral': this.frequency.days = 180; break;
        case 'anual': this.frequency.days = 360;
      }

      if (this.interestRateType === 'TEA'){

        // Initial calculations
        var quotasPerYear = Math.floor(360 / this.frequency.days);
        var numberOfYears = this.termInMonths / 12;
        this.totalOfQuotas = quotasPerYear * numberOfYears;

        // Declarar datos
        var payment;
        var countQuotas = 1;
        var sumAmortizations = 0;
        var tea = this.tea;
        var tep = 0;
        var initialBalance = 0;
        var finalBalance = this.amountToFinance + this.appraisalExpenses;
        var interest = 0;
        var quota = 0;
        var totalQuota = 0;
        var amortization = 0;
        var lienInsuranceNumber = 0;
        var propertyInsuranceNumber = 0;
        var appraisalExpensesNumber = this.appraisalExpenses;

        // Generar schedule
        while(countQuotas <= this.totalOfQuotas){
          if (countQuotas === this.totalOfQuotas){
            // No puede tener periodo de gracia la ultima cuota
          }

          tep = ((1 + (tea/100))**( this.frequency.days / 360 )) - 1;

          initialBalance = finalBalance;

          interest = parseFloat((tep * initialBalance).toFixed(2));

          // que pasa si el plazo de gracia es total o parcial

          // no hay plazo de gracia

          //quota = parseFloat((initialBalance * (tep * (1 + tep)**(this.totalOfQuotas - countQuotas + 1)) /
          //    ((1 + tep)**(this.totalOfQuotas - countQuotas + 1) - 1)).toFixed(2));

          quota = initialBalance * (tep * (1 + tep)**(this.totalOfQuotas - countQuotas + 1)) /
              ((1 + tep)**(this.totalOfQuotas - countQuotas + 1) - 1);

          //console.log(quota);

          amortization = quota - interest;

          finalBalance = initialBalance - amortization;

          lienInsuranceNumber = this.lienInsurance * initialBalance;
          propertyInsuranceNumber = this.propertyInsurance * initialBalance;

          totalQuota = quota + lienInsuranceNumber + propertyInsuranceNumber;

          payment ={
            currentPeriod: countQuotas,
            tea: tea,
            tep: tep,
            gracePeriod: 'S',
            initialBalance: initialBalance,
            finalBalance: finalBalance,
            interest: interest,
            amortization: amortization,
            quota: quota,
            totalQuota: totalQuota,
            lienInsurance: lienInsuranceNumber,
            propertyInsurance: propertyInsuranceNumber,
            appraisalExpenses: appraisalExpensesNumber
          }

          countQuotas += 1;
          sumAmortizations += amortization;

          this.payments.push(payment);
        }

      }
    },
    changedPeriodGrace(_data){
      // Initial calculations
      var quotasPerYear = Math.floor(360 / this.frequency.days);
      var numberOfYears = this.termInMonths / 12;
      this.totalOfQuotas = quotasPerYear * numberOfYears;

      // Declarar datos
      var payment;
      var countQuotas = _data['currentPeriod'];
      var gracePeriod = _data['gracePeriod'];
      var sumAmortizations = 0;
      var tea = _data['tea'];
      var tep = _data['tep'];
      var initialBalance = 0;
      var finalBalance = _data['initialBalance'];
      var interest = 0;
      var quota = 0;
      var amortization = 0;
      var lienInsuranceNumber = 0;
      var propertyInsuranceNumber = 0;
      var appraisalExpensesNumber = this.appraisalExpenses;
      var totalQuota = 0;


      // Generar schedule
      while(countQuotas <= this.totalOfQuotas){

        if (countQuotas === this.totalOfQuotas){
          // No puede tener periodo de gracia la ultima cuota
        }

        tep = ((1 + (tea/100))**( this.frequency.days / 360 )) - 1;

        // arreglar esto, en cada bucle se repetirá esto
        //if (countQuotas === 1) initialBalance = this.amountToFinance + this.appraisalExpenses;
        //else initialBalance = _data['initialBalance'];

        initialBalance = finalBalance;

        interest = parseFloat((tep * initialBalance).toFixed(2));

        lienInsuranceNumber = this.lienInsurance * initialBalance;
        propertyInsuranceNumber = this.propertyInsurance * initialBalance;

        // que pasa si el plazo de gracia es total o parcial
        if (gracePeriod === 'T'){
          quota = 0;
          amortization = 0;
          totalQuota = 0;
          finalBalance = initialBalance + interest + lienInsuranceNumber + propertyInsuranceNumber;
        }else if (gracePeriod === 'P'){
          quota = interest;
          amortization = 0;
          totalQuota = interest + lienInsuranceNumber + propertyInsuranceNumber;
          finalBalance = initialBalance;
        }else {
          quota = initialBalance * (tep * (1 + tep)**(this.totalOfQuotas - countQuotas + 1)) /
              ((1 + tep)**(this.totalOfQuotas - countQuotas + 1) - 1);

          amortization = quota - interest;
          finalBalance = initialBalance - amortization;
          totalQuota = quota + lienInsuranceNumber + propertyInsuranceNumber;
        }

        payment ={
          currentPeriod: countQuotas,
          tea: tea,
          tep: tep,
          gracePeriod: gracePeriod,
          initialBalance: initialBalance,
          finalBalance: finalBalance,
          interest: interest,
          amortization: amortization,
          quota: quota,
          totalQuota: totalQuota,
          lienInsurance: lienInsuranceNumber,
          propertyInsurance: propertyInsuranceNumber,
          appraisalExpenses: appraisalExpensesNumber
        }

        this.payments[countQuotas - 1] = payment;

        gracePeriod = 'S';
        countQuotas += 1;
        //sumAmortizations += amortization;
      }
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