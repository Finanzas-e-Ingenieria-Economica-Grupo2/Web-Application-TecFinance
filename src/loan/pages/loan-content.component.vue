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
          <pv-select-button v-model="value" :options="options"
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
          <pv-input-number v-model="value2" inputId="minmax-buttons" mode="decimal" showButtons
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
          <pv-input-number v-model="value13" inputId="minmax-buttons" mode="decimal" showButtons
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
          <pv-dropdown v-model="selectedRate" :options="rates" optionLabel="name"
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
          <pv-input-number v-model="value3" inputId="currency-us" mode="currency" currency="USD"
                           locale="en-US"></pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          ¿Ha recibido anteriormente apoyo habitacional?
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-select-button v-model="valueSupport" :options="optionsSupport"
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
          <pv-input-number v-model="value4" inputId="currency-us" mode="currency" currency="USD"
                           locale="en-US"></pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Bono el Buen Pagador
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="value5" inputId="currency-us" mode="currency" currency="USD"
                           locale="en-US"></pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          ¿La vivienda es sostenible?
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-select-button v-model="valueSustainable" :options="optionsSustainable"
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
          <pv-input-number v-model="value6" inputId="currency-us" mode="currency" currency="USD"
                           locale="en-US"></pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Monto a financiar
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="value7" inputId="currency-us" mode="currency" currency="USD"
                           locale="en-US"></pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Tasa Efectiva Anual
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="value8" inputId="percent" suffix=" %"></pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Seguro Degravamen Mensual
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="value9" inputId="percent" suffix=" %"></pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Seguro de Inmueble Anual
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="value10" inputId="percent" suffix=" %"></pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Plazo (en meses)
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="value11" inputId="minmax-buttons" mode="decimal" showButtons
                           :min="0" :max="100"></pv-input-number>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Tasa de Costo Efectiva Anual
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="value12" inputId="percent" suffix=" %"></pv-input-number>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "loan-content",
  data() {
    return {
      value: 'Soles',
      options: ['Soles', 'Dolares'],
      value2: 0,
      value13: 0,
      value3: 0,
      selectedRate: null,
      rates: [
        { name: 'Tasa Efectiva Anual', code: 'TEA' },
        { name: 'Tasa Nominal Anual', code: 'TNA' }
      ],
      valueSupport: 'No',
      optionsSupport: ['Sí', 'No'],
      value4: 0,
      value5: 0,
      valueSustainable: 'No',
      optionsSustainable: ['Sí', 'No'],
      value6: 0,
      value7: 0,
      value8: 0,
      value9: 0,
      value10: 0,
      value11: 0,
      value12: 0
    }
  }
})
</script>
<style scoped>
div.row {

}
</style>