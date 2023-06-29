<template>
  <div class="global-container">
    <h1>Datos</h1>
    <div class="summary-container">

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-2 border-round">
          Moneda
          <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 border-round">
            <pv-input-text v-model="currency" readonly></pv-input-text>
          </div>
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-2 border-round">
          Tipo de tasa
          <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 border-round">
            <pv-input-text v-model="interestRateType" readonly></pv-input-text>
          </div>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-2 border-round">
          Valor de vivienda
          <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 border-round">
            <pv-input-number v-model="homeValue"
                             :inputId="currency === 'Soles' ? 'currency-pen' : 'currency-us'"
                             mode="currency"
                             :currency="currency === 'Soles' ? 'PEN' : 'USD'"
                             :locale="currency === 'Soles' ? 'es-PE' : 'en-US'" readonly>
            </pv-input-number>
          </div>
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-2 border-round">
          Cuota inicial

          <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 border-round">
            <pv-input-number v-model="initialFee"
                             :inputId="currency === 'Soles' ? 'currency-pen' : 'currency-us'"
                             mode="currency"
                             :currency="currency === 'Soles' ? 'PEN' : 'USD'"
                             :locale="currency === 'Soles' ? 'es-PE' : 'en-US'" readonly>
            </pv-input-number>
          </div>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-2 border-round">
          Bono el Buen Pagador
          <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 border-round">
            <pv-input-number v-model="bbpTotal"
                             :inputId="currency === 'Soles' ? 'currency-pen' : 'currency-us'"
                             mode="currency"
                             :currency="currency === 'Soles' ? 'PEN' : 'USD'"
                             :locale="currency === 'Soles' ? 'es-PE' : 'en-US'" readonly>
            </pv-input-number>
          </div>
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-2 border-round">
          Monto a financiar
          <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 border-round">
            <pv-input-number v-model="amountToFinance"
                             :inputId="currency === 'Soles' ? 'currency-pen' : 'currency-us'"
                             mode="currency"
                             :currency="currency === 'Soles' ? 'PEN' : 'USD'"
                             :locale="currency === 'Soles' ? 'es-PE' : 'en-US'" readonly>
            </pv-input-number>
          </div>
        </div>
      </div>

      <div v-if="interestRateType === 'TEA'" class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-2 border-round">
          Tasa Efectiva Anual
          <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 border-round">
            <pv-input-number v-model="tea" inputId="percent" :maxFractionDigits="7"
                             suffix=" %" readonly></pv-input-number>
          </div>
        </div>
      </div>

      <div v-if="interestRateType !== 'TEA'" class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-2 border-round">
          Tasa Nominal Anual
          <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 border-round">
            <pv-input-number v-model="tna" inputId="percent" :maxFractionDigits="7"
                             suffix=" %" readonly></pv-input-number>
          </div>
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-2 border-round">
          Periodo de capitalización
          <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 border-round">
            <pv-input-text v-model="capitalization.code" readonly></pv-input-text>
          </div>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-2 border-round">
          Frecuencia de pagos
          <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 border-round">
            <pv-input-text v-model="frequency.code" readonly></pv-input-text>
          </div>
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-2 border-round">
          Seguro Degravamen Mensual
          <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 border-round">
            <pv-input-number v-model="lienInsurancePercentage" inputId="percent" suffix=" %"
                             readonly :maxFractionDigits="7"></pv-input-number>
          </div>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-2 border-round">
          Seguro de Inmueble Anual
          <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 border-round">
            <pv-input-number v-model="propertyInsurancePercentage" inputId="percent"
                             suffix=" %" readonly :maxFractionDigits="7"></pv-input-number>
          </div>
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-2 border-round">
          Gastos de tasación
          <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 border-round">
            <pv-input-number v-model="appraisalExpenses"
                             :inputId="currency === 'Soles' ? 'currency-pen' : 'currency-us'"
                             mode="currency"
                             :currency="currency === 'Soles' ? 'PEN' : 'USD'"
                             :locale="currency === 'Soles' ? 'es-PE' : 'en-US'" readonly>
            </pv-input-number>
          </div>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-2 border-round">
          Plazo (en meses)
          <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 border-round">
            <pv-input-number v-model="termInMonths" inputId="minmax-buttons" mode="decimal"
                             readonly></pv-input-number>
          </div>
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-2 border-round">
          VAN
          <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 border-round">
            <pv-input-number v-model="van"
                             :inputId="currency === 'Soles' ? 'currency-pen' : 'currency-us'"
                             mode="currency"
                             :currency="currency === 'Soles' ? 'PEN' : 'USD'"
                             :locale="currency === 'Soles' ? 'es-PE' : 'en-US'" readonly>
            </pv-input-number>
          </div>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-2 border-round">
          TIR
          <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 border-round">
            <pv-input-number v-model="tirPercentage" inputId="percent" :maxFractionDigits="7"
                             suffix=" %" readonly></pv-input-number>
          </div>
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-2 border-round">
          TCEA
          <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 border-round">
            <pv-input-number v-model="tceaPercentage" inputId="percent" :maxFractionDigits="7"
                             suffix=" %" readonly></pv-input-number>
          </div>
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
      <pv-toast></pv-toast>
      <pv-confirm-dialog></pv-confirm-dialog>
      <div class="flex justify-content-center flex-wrap card-container bg-yellow-100">
        <pv-button label="Guardar cronograma" class="m-2 px-5 py-3"
                   @click="confirmSchedule()"></pv-button>
      </div>
    </div>
  </div>
</template>
<script>
import {PaymentApiService} from "../services/payment-api.service.js";
import {OfferApiService} from "../../loan/services/offer-api.service.js";
import {BankApiService} from "../../loan/services/bank-api.service.js";
import router from "../../router/index.js";

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

      userId: null,
      offerId: null,
      bankId: null,
      currency: null,
      interestRateType: null,
      homeValue: null,
      initialFee: null,
      bbpTotal: null,
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
      lienInsurancePercentage: null,
      propertyInsurance: null,
      propertyInsurancePercentage: null,
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
    this.paymentsService = new PaymentApiService();
    this.offersService = new OfferApiService();
    this.banksService = new BankApiService();

    //this.paymentsService.getByOfferId(this.offerId).then((data) => (this.payments = data));
    let offerIdGotten = parseInt(this.$route.params.offerId);
    await this.offersService.getById(offerIdGotten)
        .then(response => {
          const offer = response.data;
          this.offerId = offer.id;
          this.userId = offer.userId;
          this.bankId = offer.bankId;
          this.currency = offer.currency;
          this.interestRateType = offer.interestRateType;
          this.homeValue = offer.homeValue;
          this.initialFee = offer.initialFee;
          this.amountToFinance = offer.amountToFinance;
          this.bbpTotal = offer.bbpTotal;
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
          this.lienInsurancePercentage = this.lienInsurance * 100;
          this.propertyInsurance = bank.propertyInsurance;
          this.propertyInsurancePercentage = this.propertyInsurance * 100;
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
      console.log(this.frequency.days);
      var quotasPerYear = Math.floor(360 / this.frequency.days);
      console.log(quotasPerYear);
      var numberOfYears = this.termInMonths / 12;
      console.log(numberOfYears);
      this.totalOfQuotas = quotasPerYear * numberOfYears;
      console.log(this.totalOfQuotas);

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

        if (finalBalance < 0){
          finalBalance = 0;
        }

        payment = {
          offerId: this.offerId,
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

        if (finalBalance < 0){
          finalBalance = 0;
        }
        payment = {
          offerId: this.offerId,
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
        //console.log(npv);
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
          //console.log(df[df.length-1]);
        }

        df.push({ Low: low, Mid: mid, High: high, NPV: npv.toFixed(4) });
        //console.log(df[df.length-1]);
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
    },
    async confirmSchedule(){
      this.$confirm.require({
        message: '¿Estas seguro de querer proceder?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: async () => {

          for (let i = 0; i < this.payments.length; i++){
            await this.paymentsService.add(this.payments[i])
                .then(response => {
                  console.log("Pago agregado con éxito");
                })
                .catch(error => {
                  console.error("Error al agregar el pago:", error);
                });
          }

          await router.push({name: 'loan', params: {userId: this.userId}});
        },
        reject: () => {

        }
      });
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