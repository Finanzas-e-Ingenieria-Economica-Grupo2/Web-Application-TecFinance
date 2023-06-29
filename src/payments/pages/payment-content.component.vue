<template>
  <div class="global-container">
    <h1>Datos</h1>
    <div class="summary-container">
      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Valor de vivienda
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="homeValue"
                           :inputId="currency === 'Soles' ? 'currency-pen' : 'currency-us'"
                           mode="currency"
                           :currency="currency === 'Soles' ? 'PEN' : 'USD'"
                           :locale="currency === 'Soles' ? 'es-PE' : 'en-US'" readonly>
          </pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Monto a financiar
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="amountToFinance"
                           :inputId="currency === 'Soles' ? 'currency-pen' : 'currency-us'"
                           mode="currency"
                           :currency="currency === 'Soles' ? 'PEN' : 'USD'"
                           :locale="currency === 'Soles' ? 'es-PE' : 'en-US'" readonly>
          </pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          VAN
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="van"
                           :inputId="currency === 'Soles' ? 'currency-pen' : 'currency-us'"
                           mode="currency"
                           :currency="currency === 'Soles' ? 'PEN' : 'USD'"
                           :locale="currency === 'Soles' ? 'es-PE' : 'en-US'" readonly>
          </pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          TIR
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="tirPercentage" inputId="percent" :maxFractionDigits="7"
                           suffix=" %" readonly></pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          TCEA
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="tceaPercentage" inputId="percent" :maxFractionDigits="7"
                           suffix=" %" readonly></pv-input-number>
        </div>
      </div>
    </div>

    <h1>Cronograma</h1>
    <div class="card p-fluid">
      <pv-data-table :value="payments" editMode="cell" @cell-edit-complete="onCellEditComplete"
                     tableClass="editable-cells-table" tableStyle="min-width: 50rem">
        <pv-column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"
                   style="width: 25%">
          <template #body="{ data, field }">
            {{
              field === 'initialBalance' || field === 'finalBalance' || field === 'interest'
              || field === 'amortization' || field === 'quota' || field === 'totalQuota'
              || field === 'lienInsurance' || field === 'propertyInsurance' ?
                  formatCurrency(data[field]) : data[field]
            }}
          </template>
          <template #editor="{ data, field }">
            <template v-if="field === 'gracePeriod' && data['currentPeriod'] !== payments.length">
              <pv-input-text v-model="data[field]" autofocus></pv-input-text>
            </template>
            <template v-if="field === 'tea'">
              <pv-input-number v-model="data[field]" inputId="percent" :maxFractionDigits="7"
                               suffix=" %" autofocus></pv-input-number>
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
        {field: 'currentPeriod', header: 'Periodo'},
        {field: 'tea', header: 'Tea'},
        {field: 'tep', header: 'Tep'},
        {field: 'gracePeriod', header: 'Periodo de gracia'},
        {field: 'initialBalance', header: 'Saldo inicial'},
        {field: 'interest', header: 'Intereses'},
        {field: 'amortization', header: 'Amortización'},
        {field: 'quota', header: 'Cuota'},
        {field: 'lienInsurance', header: 'Seguro Desgravamen'},
        {field: 'propertyInsurance', header: 'Seguro de Inmueble'},
        {field: 'totalQuota', header: 'Cuota Total'},
        {field: 'finalBalance', header: 'Saldo final'}
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

      totalOfQuotas: null,

      tir: null,
      tirPercentage: null,
      van: null,
      tcea: null,
      tceaPercentage: null
    };
  },
  async created() {
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
    this.calculateVanCurrentTea();
    this.calculateVanAndTir();
    this.calculateTcea();
  },
  mounted() {

  },
  methods: {
    onCellEditComplete(event) {
      let {data, newValue, field} = event;

      switch (field) {
        case 'tea':
          if (this.isPositive(newValue)) {
            data[field] = newValue;
            this.changedPeriodGraceOrTea(data);
            this.calculateVanCurrentTea();
            this.calculateVanAndTir();
            this.calculateTcea();
          } else event.preventDefault();
          break;

        case 'gracePeriod':
          if (newValue.trim().length > 0) {
            if (data[field] !== newValue.toUpperCase()) {
              if (newValue.toUpperCase() !== 'T' && newValue.toUpperCase() !== 'P') {
                data[field] = 'S';
              } else {
                data[field] = newValue.toUpperCase();
              }
              this.changedPeriodGraceOrTea(data);
              this.calculateVanCurrentTea();
              this.calculateVanAndTir();
              this.calculateTcea();
            }
          } else event.preventDefault();
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
    isPositive(val) {
      let n = parseFloat(val);
      return !isNaN(n) && n >= 0;
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value);
    },
    calculateSchedule() {
      switch (this.frequency.code) {
        case 'diaria':
          this.frequency.days = 1;
          break;
        case 'quincenal':
          this.frequency.days = 15;
          break;
        case 'mensual':
          this.frequency.days = 30;
          break;
        case 'bimestral':
          this.frequency.days = 60;
          break;
        case 'trimestral':
          this.frequency.days = 90;
          break;
        case 'cuatrimestral':
          this.frequency.days = 120;
          break;
        case 'semestral':
          this.frequency.days = 180;
          break;
        case 'anual':
          this.frequency.days = 360;
      }

      // Declarar datos
      var payment;
      var countQuotas = 1;
      var sumAmortizations = 0;
      var tea = 0;
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

      if (this.interestRateType === 'TEA'){
        tea = this.tea / 100;
      }
      else {
        switch (this.capitalization.code) {
          case 'diaria':
            this.capitalization.days = 1;
            break;
          case 'quincenal':
            this.capitalization.days = 15;
            break;
          case 'mensual':
            this.capitalization.days = 30;
            break;
          case 'bimestral':
            this.capitalization.days = 60;
            break;
          case 'trimestral':
            this.capitalization.days = 90;
            break;
          case 'cuatrimestral':
            this.capitalization.days = 120;
            break;
          case 'semestral':
            this.capitalization.days = 180;
            break;
          case 'anual':
            this.capitalization.days = 360;
        }
        var tna = this.tna / 100;
        var capitalizationDays = this.capitalization.days;
        tea = ((1 + (tna / (360 / capitalizationDays)))**(360 / capitalizationDays)) - 1;
      }

      // Initial calculations
      var quotasPerYear = Math.floor(360 / this.frequency.days);
      var numberOfYears = this.termInMonths / 12;
      this.totalOfQuotas = quotasPerYear * numberOfYears;

      // Generar schedule
      while (countQuotas <= this.totalOfQuotas) {

        tep = ((1 + tea) ** (this.frequency.days / 360)) - 1;

        initialBalance = finalBalance;

        interest = parseFloat((tep * initialBalance).toFixed(2));

        //quota = parseFloat((initialBalance * (tep * (1 + tep)**(this.totalOfQuotas - countQuotas + 1)) /
        //    ((1 + tep)**(this.totalOfQuotas - countQuotas + 1) - 1)).toFixed(2));

        quota = initialBalance * (tep * (1 + tep) ** (this.totalOfQuotas - countQuotas + 1)) /
            ((1 + tep) ** (this.totalOfQuotas - countQuotas + 1) - 1);

        amortization = quota - interest;

        finalBalance = initialBalance - amortization;

        lienInsuranceNumber = this.lienInsurance * initialBalance;
        propertyInsuranceNumber = this.propertyInsurance * initialBalance;

        totalQuota = quota + lienInsuranceNumber + propertyInsuranceNumber;

        payment = {
          currentPeriod: countQuotas,
          tea: tea * 100,
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

      //
      // if (this.interestRateType === 'TEA') {
      //
      //   // Initial calculations
      //   var quotasPerYear = Math.floor(360 / this.frequency.days);
      //   var numberOfYears = this.termInMonths / 12;
      //   this.totalOfQuotas = quotasPerYear * numberOfYears;
      //
      //   // Declarar datos
      //   var payment;
      //   var countQuotas = 1;
      //   var sumAmortizations = 0;
      //   var tea = this.tea;
      //   var tep = 0;
      //   var initialBalance = 0;
      //   var finalBalance = this.amountToFinance + this.appraisalExpenses;
      //   var interest = 0;
      //   var quota = 0;
      //   var totalQuota = 0;
      //   var amortization = 0;
      //   var lienInsuranceNumber = 0;
      //   var propertyInsuranceNumber = 0;
      //   var appraisalExpensesNumber = this.appraisalExpenses;
      //
      //   // Generar schedule
      //   while (countQuotas <= this.totalOfQuotas) {
      //
      //     tep = ((1 + (tea / 100)) ** (this.frequency.days / 360)) - 1;
      //
      //     initialBalance = finalBalance;
      //
      //     interest = parseFloat((tep * initialBalance).toFixed(2));
      //
      //     //quota = parseFloat((initialBalance * (tep * (1 + tep)**(this.totalOfQuotas - countQuotas + 1)) /
      //     //    ((1 + tep)**(this.totalOfQuotas - countQuotas + 1) - 1)).toFixed(2));
      //
      //     quota = initialBalance * (tep * (1 + tep) ** (this.totalOfQuotas - countQuotas + 1)) /
      //         ((1 + tep) ** (this.totalOfQuotas - countQuotas + 1) - 1);
      //
      //     amortization = quota - interest;
      //
      //     finalBalance = initialBalance - amortization;
      //
      //     lienInsuranceNumber = this.lienInsurance * initialBalance;
      //     propertyInsuranceNumber = this.propertyInsurance * initialBalance;
      //
      //     totalQuota = quota + lienInsuranceNumber + propertyInsuranceNumber;
      //
      //     payment = {
      //       currentPeriod: countQuotas,
      //       tea: tea,
      //       tep: tep,
      //       gracePeriod: 'S',
      //       initialBalance: initialBalance,
      //       finalBalance: finalBalance,
      //       interest: interest,
      //       amortization: amortization,
      //       quota: quota,
      //       totalQuota: totalQuota,
      //       lienInsurance: lienInsuranceNumber,
      //       propertyInsurance: propertyInsuranceNumber,
      //       appraisalExpenses: appraisalExpensesNumber
      //     }
      //
      //     countQuotas += 1;
      //     sumAmortizations += amortization;
      //
      //     this.payments.push(payment);
      //   }
      //
      // }
      // else{
      //
      //   switch (this.capitalization.code) {
      //     case 'diaria':
      //       this.capitalization.days = 1;
      //       break;
      //     case 'quincenal':
      //       this.capitalization.days = 15;
      //       break;
      //     case 'mensual':
      //       this.capitalization.days = 30;
      //       break;
      //     case 'bimestral':
      //       this.capitalization.days = 60;
      //       break;
      //     case 'trimestral':
      //       this.capitalization.days = 90;
      //       break;
      //     case 'cuatrimestral':
      //       this.capitalization.days = 120;
      //       break;
      //     case 'semestral':
      //       this.capitalization.days = 180;
      //       break;
      //     case 'anual':
      //       this.capitalization.days = 360;
      //   }
      //
      //   // Declarar datos
      //   var tna = this.tna / 100;//no esta dividida entre 100
      //   var capitalizationDays = this.capitalization.days;
      //   var tea = ((1 + (tna / (360 / capitalizationDays)))**(this.frequency.days / capitalizationDays)) - 1
      //
      //   var payment;
      //   var countQuotas = 1;
      //   var sumAmortizations = 0;
      //   var tep = 0;
      //   var initialBalance = 0;
      //   var finalBalance = this.amountToFinance + this.appraisalExpenses;
      //   var interest = 0;
      //   var quota = 0;
      //   var totalQuota = 0;
      //   var amortization = 0;
      //   var lienInsuranceNumber = 0;
      //   var propertyInsuranceNumber = 0;
      //   var appraisalExpensesNumber = this.appraisalExpenses;
      //
      //   // Initial calculations
      //   var quotasPerYear = Math.floor(360 / this.frequency.days);
      //   var numberOfYears = this.termInMonths / 12;
      //   this.totalOfQuotas = quotasPerYear * numberOfYears;
      //
      //   // Generar schedule
      //   while (countQuotas <= this.totalOfQuotas) {
      //
      //     tep = ((1 + (tea / 100)) ** (this.frequency.days / 360)) - 1;
      //
      //     initialBalance = finalBalance;
      //
      //     interest = parseFloat((tep * initialBalance).toFixed(2));
      //
      //     //quota = parseFloat((initialBalance * (tep * (1 + tep)**(this.totalOfQuotas - countQuotas + 1)) /
      //     //    ((1 + tep)**(this.totalOfQuotas - countQuotas + 1) - 1)).toFixed(2));
      //
      //     quota = initialBalance * (tep * (1 + tep) ** (this.totalOfQuotas - countQuotas + 1)) /
      //         ((1 + tep) ** (this.totalOfQuotas - countQuotas + 1) - 1);
      //
      //     amortization = quota - interest;
      //
      //     finalBalance = initialBalance - amortization;
      //
      //     lienInsuranceNumber = this.lienInsurance * initialBalance;
      //     propertyInsuranceNumber = this.propertyInsurance * initialBalance;
      //
      //     totalQuota = quota + lienInsuranceNumber + propertyInsuranceNumber;
      //
      //     payment = {
      //       currentPeriod: countQuotas,
      //       tea: tea,
      //       tep: tep,
      //       gracePeriod: 'S',
      //       initialBalance: initialBalance,
      //       finalBalance: finalBalance,
      //       interest: interest,
      //       amortization: amortization,
      //       quota: quota,
      //       totalQuota: totalQuota,
      //       lienInsurance: lienInsuranceNumber,
      //       propertyInsurance: propertyInsuranceNumber,
      //       appraisalExpenses: appraisalExpensesNumber
      //     }
      //
      //     countQuotas += 1;
      //     sumAmortizations += amortization;
      //
      //     this.payments.push(payment);
      //   }
      //
      // }
      //
    },
    changedPeriodGraceOrTea(_data) {

      // Declarar datos
      var currentPayment;
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
      while (countQuotas <= this.totalOfQuotas) {

        currentPayment = this.payments[countQuotas - 1];

        gracePeriod = currentPayment.gracePeriod;

        tep = ((1 + (tea / 100)) ** (this.frequency.days / 360)) - 1;

        // arreglar esto, en cada bucle se repetirá esto
        //if (countQuotas === 1) initialBalance = this.amountToFinance + this.appraisalExpenses;
        //else initialBalance = _data['initialBalance'];

        initialBalance = finalBalance;

        interest = parseFloat((tep * initialBalance).toFixed(2));

        lienInsuranceNumber = this.lienInsurance * initialBalance;
        propertyInsuranceNumber = this.propertyInsurance * initialBalance;

        // que pasa si el plazo de gracia es total o parcial
        if (gracePeriod === 'T') {
          quota = 0;
          amortization = 0;
          totalQuota = 0;
          finalBalance = initialBalance + interest + lienInsuranceNumber + propertyInsuranceNumber;
        } else if (gracePeriod === 'P') {
          quota = interest;
          amortization = 0;
          totalQuota = interest + lienInsuranceNumber + propertyInsuranceNumber;
          finalBalance = initialBalance;
        } else {
          quota = initialBalance * (tep * (1 + tep) ** (this.totalOfQuotas - countQuotas + 1)) /
              ((1 + tep) ** (this.totalOfQuotas - countQuotas + 1) - 1);

          amortization = quota - interest;
          finalBalance = initialBalance - amortization;
          totalQuota = quota + lienInsuranceNumber + propertyInsuranceNumber;
        }

        payment = {
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

        countQuotas += 1;
        //sumAmortizations += amortization;
      }
    },
    calculateVanCurrentTea(){
      var array = this.payments.map(payment => -payment.totalQuota);
      array.unshift(this.amountToFinance);
      let van = 0.0;
      van += array[0];
      for (let i = 1; i < array.length; i++) {
          van += array[i] / Math.pow(1 + (this.payments[i-1].tea / 100), i);
      }
      this.van = van;
    },
    calculateVan(array, rate){
      let van = 0.0;
      for (let i = 0; i < array.length; i++) {
        van += array[i] / Math.pow(1 + rate, i);
      }
      return van;
    },
    calculateTir(array, _high, _low){
      var df = [];
      var high = _high
      var low = _low
      var mid = 0;
      var npv = -1;

      if (high > low) {
        mid = (high + low) / 2;
        npv = this.calculateVan(array, mid);
        console.log(npv);
        while (npv !== 0 && high.toFixed(6) !== low.toFixed(6)) {
          if (npv < 0) {
            low = mid;
            mid = (high + low) / 2;
            npv = this.calculateVan(array, mid);
            df.push({ Low: low, Mid: mid, High: high, NPV: npv.toFixed(4) });
          } else {
            high = mid;
            mid = (high + low) / 2;
            npv = this.calculateVan(array, mid);
            df.push({ Low: low, Mid: mid, High: high, NPV: npv.toFixed(4) });
          }
          console.log(df[df.length-1]);
        }

        df.push({ Low: low, Mid: mid, High: high, NPV: npv.toFixed(4) });
        console.log(df[df.length-1]);
      } else {
        return "'High' must be greater than the 'low' parameter";
      }

      return df;
    },
    calculateVanAndTir(){
      var array = this.payments.map(payment => -payment.totalQuota);
      array.unshift(this.amountToFinance);
      var df = this.calculateTir(array, 1, 0);
      this.tir = df[df.length - 1].Mid;
      this.tirPercentage = this.tir * 100;
    },
    calculateTcea(){
      var tcep = this.tir;
      this.tcea = (1 + tcep)**(360 / this.frequency.days) - 1;
      this.tceaPercentage = this.tcea * 100;
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