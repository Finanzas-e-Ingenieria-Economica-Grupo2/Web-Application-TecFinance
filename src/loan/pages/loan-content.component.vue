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

<!--      <div class="row flex bg-yellow-100">
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
      </div>-->

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
          <pv-inline-message severity="info" @click="visibleHomeValue = true"></pv-inline-message>
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
                           :locale="currencyType === 'Soles' ? 'es-PE' : 'en-US'" readonly>
          </pv-input-number>
          <pv-inline-message severity="info" @click="visibleInitialFee = true"></pv-inline-message>
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
                           :locale="currencyType === 'Soles' ? 'es-PE' : 'en-US'" readonly>
          </pv-input-number>
          <pv-inline-message severity="info" @click="visibleBbp = true"></pv-inline-message>
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
                           :locale="currencyType === 'Soles' ? 'es-PE' : 'en-US'" readonly>
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
                           :locale="currencyType === 'Soles' ? 'es-PE' : 'en-US'" readonly>
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
          <pv-inline-message severity="info" @click="visibleTea = true"></pv-inline-message>
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
          <pv-inline-message severity="info" @click="visibleTna = true"></pv-inline-message>
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
          Seguro Degravamen Mensual
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="lienInsurancePercentage" inputId="percent" suffix=" %" step="0.0001"
                           readonly></pv-input-number>
          <pv-inline-message severity="info" @click="visibleLienInsurance = true"></pv-inline-message>
        </div>
      </div>

      <div class="row flex bg-yellow-100">
        <div class="flex-1 flex align-items-center justify-content-start
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          Seguro de Inmueble Anual
        </div>
        <div class="flex-1 flex align-items-center justify-content-end
                    bg-yellow-500 font-bold text-gray-900 m-2 px-5 py-3 border-round">
          <pv-input-number v-model="propertyInsurancePercentage" inputId="percent"
                           suffix=" %" readonly></pv-input-number>
          <pv-inline-message severity="info" @click="visiblePropertyInsurance = true"></pv-inline-message>
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
          <pv-input-number v-model="tcea" inputId="percent" suffix=" %" readonly></pv-input-number>
        </div>
      </div>

    </div>

    <pv-toast></pv-toast>
    <pv-confirm-dialog></pv-confirm-dialog>

    <div class="flex justify-content-center flex-wrap card-container bg-yellow-100">
      <pv-button label="Calcular cronograma" class="m-2 px-5 py-3"
                 @click="confirm()"></pv-button>
    </div>
  </div>

  <pv-dialog v-model:visible="visibleHomeValue" modal header="Valor de vivienda" :style="{ width:
  '50vw' }">
    <p v-if="currencyType === 'Soles'">
      El valor de la vivienda debe rondar entre los S/ {{minimumLoan.toLocaleString('es-PE')}} y
      los S/ {{ maximumLoan.toLocaleString('es-PE') }} para poder aplicar a los beneficios del
      banco BBVA.
    </p>
    <p v-else>
      El valor de la vivienda debe rondar entre los $ {{minimumLoan.toLocaleString('en-US')}} y
      los $ {{ maximumLoan.toLocaleString('en-US') }} para poder aplicar a los beneficios del
      banco BBVA.
    </p>
  </pv-dialog>

  <pv-dialog v-model:visible="visibleInitialFee" modal header="Cuota inicial" :style="{ width:
  '50vw' }">
    <p>Dependiendo de cuanto sea el valor de la vivienda, BBVA dispondrá de un porcentaje para
      calcular su cuota inicial.</p>
    <div v-for="parameter in rangeInitialFee">
      <p v-if="currencyType === 'Soles'">
        Si el valor de la vivienda ronda entre los S/
        {{parameter.minimumHomeValue.toLocaleString('es-PE')}} y los S/
        {{parameter.maximumHomeValue.toLocaleString('es-PE')}} el porcentaje de la cuota inicial
        será de {{parameter.minimumInitialFeePercentage * 100}}%.
      </p>
      <p v-else>
        Si el valor de la vivienda ronda entre los $
        {{parameter.minimumHomeValue.toLocaleString('en-US')}} y los $
        {{parameter.maximumHomeValue.toLocaleString('en-US')}} el porcentaje de la cuota inicial
        será de {{parameter.minimumInitialFeePercentage * 100}}%.
      </p>
    </div>
  </pv-dialog>

  <pv-dialog v-model:visible="visibleBbp" modal header="Bono el Buen Pagador" :style="{ width:
  '50vw' }">
    <p>El Bono al Buen Pagador es una ayuda económica directa no reembolsable que se otorga a las
      personas que accedan al crédito MIVIVIENDA por medio de las Entidades Financieras, cuyo
      valor fluctúa, en función al valor del inmueble, en los siguientes rangos establecidos por
      Ley:</p>
    <p v-if="currencyType === 'Soles'">
      <pv-data-table :value="rangeBbp" showGridlines tableStyle="min-width: 50rem">
        <pv-column field="minimumHomeValue"
                   header="Valor de mínimo de vivienda"></pv-column>
        <pv-column field="maximumHomeValue"
                   header="Valor de máximo de vivienda"></pv-column>
        <pv-column field="bbpTraditional" header="Valor del BBP Tradicional"></pv-column>
        <pv-column field="bbpSustainable" header="Valor del BBP Sostenible"></pv-column>
      </pv-data-table>
    </p>
    <p v-else>
      No hay datos expresados en dólares para mostrar.
    </p>
  </pv-dialog>

  <pv-dialog v-model:visible="visibleTea" modal header="Tasa Efectiva Anual" :style="{ width:
  '50vw' }">
    <p>Tasa referencial sujeta a otras condiciones de la entidad financiera.</p>
    <p>No puede ser cero.</p>
  </pv-dialog>

  <pv-dialog v-model:visible="visibleTna" modal header="Tasa Nominal Anual" :style="{ width:
  '50vw' }">
    <p>Tasa referencial sujeta a otras condiciones de la entidad financiera.</p>
    <p>No puede ser cero.</p>
  </pv-dialog>

  <pv-dialog v-model:visible="visibleLienInsurance" modal header="Seguro Degravamen Mensual"
             :style="{ width:'50vw' }">
    <p>Es un seguro que brinda tranquilidad a tus seres queridos en caso el beneficiario fallezca
      o sufra de invalidez total o permanente por accidente o enfermedad. La deuda no se
      transfiere a otro miembro de su familia.</p>
    <p class="p-error">En la pantalla principal solo se muestra el Seguro Degravamen Mensual con el redondeo a
      solo 3 decimales pero su valor completo es <strong>{{lienInsurancePercentage}}</strong>%</p>
  </pv-dialog>

  <pv-dialog v-model:visible="visiblePropertyInsurance" modal header="Seguro de Inmueble Anual"
             :style="{ width:'50vw' }">
    <p>Seguro que brinda protección a una propiedad y sus bienes en caso de cualquier tipo de
      siniestro , como incendios, robos, daños causados por la naturaleza u otros accidentes.
      Este seguro también puede cubrir la responsabilidad civil del propietario ante terceros.</p>
    <p class="p-error">En la pantalla principal solo se muestra el Seguro de Inmueble Mensual con
      el redondeo a solo 3 decimales pero su valor completo es <strong>{{propertyInsurancePercentage }}
      </strong>%</p>
  </pv-dialog>

  <!--NO SERA NECESARIO-->
  <pv-dialog v-model:visible="visibleSummary" modal header="Resumen"
             :style="{ width:'50vw' }">
    <div class="flex bg-yellow-500 m-1">
      <div class="flex-1 flex align-items-center justify-content-start
                    font-bold text-gray-900 px-3 border-round">
        <p>Valor de vivienda: </p>
      </div>
      <div class="flex-1 flex align-items-center justify-content-end
                    font-bold text-gray-900 px-3 border-round">
        <p v-if="currencyType === 'Soles'">S/ {{ homeValue.toLocaleString('es-PE') }}</p>
        <p v-else>$ {{ homeValue.toLocaleString('en-US') }}</p>
      </div>
    </div>

    <div class="flex bg-yellow-500 m-1">
      <div class="flex-1 flex align-items-center justify-content-start
                    font-bold text-gray-900 px-3 border-round">
        <p>Valor de vivienda: </p>
      </div>
      <div class="flex-1 flex align-items-center justify-content-end
                    font-bold text-gray-900 px-3 border-round">
        <p v-if="currencyType === 'Soles'">S/ {{ homeValue.toLocaleString('es-PE') }}</p>
        <p v-else>$ {{ homeValue.toLocaleString('en-US') }}</p>
      </div>
    </div>

  </pv-dialog>

  <pv-dialog v-model:visible="visibleErrorMessages" modal header="Errores"
             :style="{ width:'50vw' }">
    <p v-if="homeValueError !== null" class="p-error"><li>{{homeValueError}}</li></p>
    <p v-if="teaError !== null" class="p-error"><li>{{teaError}}</li></p>
    <p v-if="tnaError !== null" class="p-error"><li>{{tnaError}}</li></p>
    <p v-if="capitalizationError !== null" class="p-error"><li>{{capitalizationError}}</li></p>
  </pv-dialog>


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
      //amountTotalGracePeriod: 0,
      //amountPartialGracePeriod: 0,
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
      bbpTraditional: 0,
      bbpSustainable: 0,
      isHousingSustainable: 'No',
      optionsSustainable: ['Sí', 'No'],
      bbpTotal: 0,
      amountToFinance: 0,
      tea: 0,
      tna: 0,
      capitalization: null,
      capitalizationOptions:[
        {name: 'Diaria', code: 'diaria', days: 1 },
        {name: 'Quincenal', code: 'quincenal', days: 15},
        {name: 'Mensual', code: 'mensual', days: 30},
        {name: 'Bimestral', code: 'bimestral', days: 60},
        {name: 'Trimestral', code: 'trimestral', days: 90},
        {name: 'Cuatrimestral', code: 'cuatrimestral', days: 120},
        {name: 'Semestral', code: 'semestral', days: 180},
        {name: 'Anual', code: 'anual', days: 360}
      ],
      lienInsurance: null,
      propertyInsurance: null,
      termInMonths: null,
      tcea: 0,
      banksService: null,
      bank: null,
      rangeBbp: null,
      visibleHomeValue: false,
      visibleInitialFee: false,
      visibleBbp: false,
      visibleTea: false,
      visibleTna: false,
      visibleLienInsurance: false,
      visiblePropertyInsurance: false,
      visibleSummary: false,
      visibleErrorMessages: false,

      minimumLoan: null,
      maximumLoan: null,

      homeValueError: null,
      teaError: null,
      tnaError: null,
      capitalizationError: null
    }
  },
  created() {
    this.banksService = new BankApiService();
    this.banksService.getByName('BBVA')
        .then(response => {
          this.bank = response
          this.minimumLoan = this.bank.minimumLoan;
          this.maximumLoan = this.bank.maximumLoan;
          this.lienInsurance = this.bank.lienInsurance;
          this.propertyInsurance = this.bank.propertyInsurance;
          this.termInMonths = this.bank.termForPayments.minimumTerm;
          this.rangeBbp = this.bank.bbpBasedOnHomeValue;
          this.rangeInitialFee = this.bank.initialFeeBasedOnHomeValue;
        });
  },
  computed:{
    lienInsurancePercentage(){
      return this.lienInsurance * 100;
    },
    propertyInsurancePercentage(){
      return this.propertyInsurance * 100;
    }
  },
  watch: {
    homeValue() {
      this.initializeInitialFee();
      this.initializeBbpAndBbpTotal();
      this.calculateAmountToFinance();
    },
    isHousingSupport(){
      this.verifyHousingSupport();
      this.verifyHousingSustainable();
      this.calculateAmountToFinance();
    },
    isHousingSustainable(){
      this.verifyHousingSustainable();
      this.calculateAmountToFinance();
    },
    visibleErrorMessages(){
      this.evaluateForm();
    }
  },
  methods:{
    initializeInitialFee(){
      const initialFeeFounded = this.rangeInitialFee.find(b => {
        return this.homeValue >= b.minimumHomeValue && this.homeValue <= b.maximumHomeValue
      });

      if (typeof initialFeeFounded === 'undefined') {
        this.initialFee = 0;
      } else {
        this.initialFee = this.homeValue * initialFeeFounded.minimumInitialFeePercentage;
      }
    },
    initializeBbpAndBbpTotal(){
      const bbpFounded = this.rangeBbp.find(b => {
        return this.homeValue >= b.minimumHomeValue && this.homeValue <= b.maximumHomeValue
      });

      if (typeof bbpFounded === 'undefined') {
        this.bbp = 0;
      } else {
        this.bbpTraditional = bbpFounded.bbpTraditional;
        this.bbpSustainable = bbpFounded.bbpSustainable;
        this.verifyHousingSupport();
        this.verifyHousingSustainable();
      }
    },
    verifyHousingSupport(){
      if (this.isHousingSupport === 'Sí'){
        this.bbp = 0;
      } else{
        this.bbp = this.bbpTraditional;
      }
    },
    verifyHousingSustainable(){
      if (this.isHousingSupport === 'No'){
        if(this.isHousingSustainable === 'Sí'){
          this.bbpTotal = this.bbpSustainable;
        }else {
          this.bbpTotal = this.bbpTraditional;
        }
      }else{
        this.bbpTotal = 0;
      }
    },
    calculateAmountToFinance(){
      this.amountToFinance = this.homeValue - this.initialFee - this.bbpTotal;
    },
    evaluateForm(){
      let countErrors = 0;

      if(this.homeValue === 0) {
        this.homeValueError = "Revisar el valor de la vivienda";
        countErrors += 1;
      }
      else this.homeValueError = null;

      if(this.tea === 0 && this.interestRateType.code === 'TEA') {
        this.teaError = "Revisar la Tasa Efectiva Anual";
        countErrors += 1;
      }
      else this.teaError = null;

      if(this.tna === 0 && this.interestRateType.code === 'TNA') {
        this.tnaError = "Revisar la Tasa Nominal Anual";
        countErrors += 1;
      }
      else this.tnaError = null;

      if(this.capitalization === null && this.interestRateType.code === 'TNA') {
        this.capitalizationError = "Revisar la capitalización";
        countErrors += 1;
      }
      else this.tnaError = null;

      return countErrors !== 0;
    },
    confirm(){
      this.$confirm.require({
        message: '¿Estas seguro de querer proceder?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          if (this.evaluateForm()){
            this.visibleErrorMessages = true;
            this.$toast.add({ severity: 'error', summary: 'Rechazado', detail: 'Datos invalidos',
              life: 3000 });
          }
          else {
            this.visibleErrorMessages = false;
            this.$toast.add({ severity: 'success', summary: 'Aceptado', detail: 'Datos aceptados',
              life: 3000 });
          }
        },
        reject: () => {

        }
      });
    }
  }
})
</script>
<style scoped>
div.row {

}
</style>