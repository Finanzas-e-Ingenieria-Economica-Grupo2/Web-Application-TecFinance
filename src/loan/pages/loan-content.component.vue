<template>
  <div class="global-container">
    <h1>Configuración</h1>
    <div class="configuration-container">
      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Moneda
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-select-button v-model="currencyType" :options="currencyOptions"
                            aria-labelledby="basic"></pv-select-button>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          # Periodos de gracia totales
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="amountTotalGracePeriod" inputId="minmax-buttons" mode="decimal" showButtons
                           :min="0" :max="100"></pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          # Periodos de gracia Parciales
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="amountPartialGracePeriod" inputId="minmax-buttons" mode="decimal" showButtons
                           :min="0" :max="100"></pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Tipo de tasa
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-dropdown v-model="interestRateType" :options="ratesOptions" optionLabel="name"
                       placeholder="Select a Rate" class="w-full md:w-14rem"></pv-dropdown>
        </div>
      </div>
    </div>

    <h1>Datos</h1>
    <div class="data-container">
      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Valor de vivienda
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="homeValue"
                           :inputId="currencyType === 'Soles' ? 'currency-pen' : 'currency-us'"
                           mode="currency"
                           :currency="currencyType === 'Soles' ? 'PEN' : 'USD'"
                           :locale="currencyType === 'Soles' ? 'es-PE' : 'en-US'">
          </pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          ¿Ha recibido anteriormente apoyo habitacional?
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-select-button v-model="isHousingSupport" :options="optionsSupport"
                            aria-labelledby="basic"></pv-select-button>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Cuota inicial
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="initialFee"
                           :inputId="currencyType === 'Soles' ? 'currency-pen' : 'currency-us'"
                           mode="currency"
                           :currency="currencyType === 'Soles' ? 'PEN' : 'USD'"
                           :locale="currencyType === 'Soles' ? 'es-PE' : 'en-US'">
          </pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Bono el Buen Pagador
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="bbp"
                           :inputId="currencyType === 'Soles' ? 'currency-pen' : 'currency-us'"
                           mode="currency"
                           :currency="currencyType === 'Soles' ? 'PEN' : 'USD'"
                           :locale="currencyType === 'Soles' ? 'es-PE' : 'en-US'">
          </pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          ¿La vivienda es sostenible?
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-select-button v-model="isHousingSustainable" :options="optionsSustainable"
                            aria-labelledby="basic"></pv-select-button>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Total del Bono el Buen Pagador
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="bbpTotal"
                           :inputId="currencyType === 'Soles' ? 'currency-pen' : 'currency-us'"
                           mode="currency"
                           :currency="currencyType === 'Soles' ? 'PEN' : 'USD'"
                           :locale="currencyType === 'Soles' ? 'es-PE' : 'en-US'">
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
                           :inputId="currencyType === 'Soles' ? 'currency-pen' : 'currency-us'"
                           mode="currency"
                           :currency="currencyType === 'Soles' ? 'PEN' : 'USD'"
                           :locale="currencyType === 'Soles' ? 'es-PE' : 'en-US'">
          </pv-input-number>
        </div>
      </div>

      <div v-if="interestRateType.code === 'TEA'" class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Tasa Efectiva Anual
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="tea" inputId="percent" suffix=" %"></pv-input-number>
        </div>
      </div>

      <div v-if="interestRateType.code !== 'TEA'" class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Tasa Nominal Anual
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="tna" inputId="percent" suffix=" %"></pv-input-number>
        </div>
      </div>

      <div v-if="interestRateType.code !== 'TEA'" class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Periodo de capitalización
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-dropdown v-model="capitalization" :options="capitalizationOptions" optionLabel="name"
                       placeholder="Select a capitalization"
                       class="w-full md:w-14rem"></pv-dropdown>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Seguro Degravamen Mensual {{lienInsurance}}
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="lienInsurance" inputId="percent" suffix=" %"></pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Seguro de Inmueble Anual {{propertyInsurance}}
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="propertyInsurance" inputId="percent" suffix=" %"></pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Plazo (en meses)
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="termInMonths" inputId="minmax-buttons" mode="decimal" showButtons
                           :min="60" :max="300"></pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Tasa de Costo Efectiva Anual
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="tcea" inputId="percent" suffix=" %"></pv-input-number>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import {defineComponent} from 'vue'
import {BankApiService} from "../services/bank-api.service.js";

export default defineComponent({
  name: "loan-content",
  data() {
    return {
      currencyType: 'Soles',
      currencyOptions: ['Soles', 'Dólares'],
      amountTotalGracePeriod: 0,
      amountPartialGracePeriod: 0,
      homeValue: 0,
      interestRateType: {
        name: 'Tasa Efectiva Anual',
        code: 'TEA'
      },
      ratesOptions: [
        { name: 'Tasa Efectiva Anual', code: 'TEA' },
        { name: 'Tasa Nominal Anual', code: 'TNA' }
      ],
      isHousingSupport: 'No',
      optionsSupport: ['Sí', 'No'],
      initialFee: 0,
      bbp: 0,
      isHousingSustainable: 'No',
      optionsSustainable: ['Sí', 'No'],
      bbpTotal: 0,
      amountToFinance: 0,
      tea: 0,
      tna: 0,
      capitalization: '',
      capitalizationOptions:[
        {name: 'Mensual', code: 'mensual'},
        {name: 'Trimestral', code: 'trimestral'},
        {name: 'Anual', code: 'anual'}
      ],
      lienInsurance: null,
      propertyInsurance: null,
      termInMonths: null,
      tcea: 0,
      banksService: null,
      bank: null,
      rangeBbp: null
    }
  },
  created() {
    this.banksService = new BankApiService();
    this.banksService.getByName('BBVA')
        .then(response => {
          this.bank = response
          this.lienInsurance = this.bank.lienInsurance;
          this.propertyInsurance = this.bank.propertyInsurance;
          this.termInMonths = this.bank.termForPayments.minimumTerm;
          this.rangeBbp = this.bank.bbpBasedOnHomeValue;
        });
  },
  methods:{

  },
  watch: {
    homeValue() {
      const bbpFounded = this.rangeBbp.find(b => {
        return this.homeValue >= b.minimumHomeValue && this.homeValue <= b.maximumHomeValue
      });

      if (typeof bbpFounded === 'undefined') {
        this.bbp = 0;
      } else {
        this.bbp = bbpFounded.bbpTraditional;
      }
    }
  }
})
</script>
<style scoped>
div.row {

}
</style>