<template>
  <div>

  <h1>Inquiry</h1>
  <div class="theme--light v-stepper">

  <v-container fluid>
  <vue-form-generator ref="form"
    :schema="schema" :model="model" @model-updated='onInput'
  >    
  </vue-form-generator>
  <v-btn
    type="submit"
    block
    x-large
    color="success"
    class="white--text"
    @click="submitF()"
    :disabled="disabled"
  >submit</v-btn>
  </v-container>
  </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueFormGenerator from 'vue-form-generator'
  import KurocoParser from '../plugins/parser.js';
  import '../assets/form.css'
  import fieldUploadFile from '../components/vuetify_file_upload.vue';
  import fieldVuetifyText from '../components/vuetify_input.vue';
  import fieldVuetifyTextArea from '../components/vuetify_textarea.vue';
  import fieldVuetifyDate from '../components/vuetify_date.vue';
  import fieldVuetifyJson from '../components/vuetify_json.vue';
  import fieldVuetifyPrefecture from '../components/vuetify_prefecture.vue';
  import fieldVuetifyMultipleChoice from '../components/vuetify_multiple_choice.vue';
  import fieldVuetifySingleChoice from '../components/vuetify_single_choice.vue';
  import fieldVuetifySingleOption from '../components/vuetify_single_option.vue';

  Vue.component('fieldUploadFile', fieldUploadFile);
  Vue.component('fieldVuetifyDate', fieldVuetifyDate);
  Vue.component('fieldVuetifyText', fieldVuetifyText);
  Vue.component('fieldVuetifyTextArea', fieldVuetifyTextArea);
  Vue.component('fieldVuetifyJson', fieldVuetifyJson);
  Vue.component('fieldVuetifyPrefecture', fieldVuetifyPrefecture);
  Vue.component('fieldVuetifySingleOption', fieldVuetifySingleOption);
  Vue.component('fieldVuetifySingleChoice', fieldVuetifySingleChoice);
  Vue.component('fieldVuetifyMultipleChoice', fieldVuetifyMultipleChoice);

  Vue.use(VueFormGenerator);
  Vue.use(KurocoParser);

  export default {
    components: {
     "vue-form-generator": VueFormGenerator.component
    },
    mounted() {
      this.getModel(),
      this.getSchema()
    },
    methods: {
      getModel() {
        let self = this
        this.$store.$auth.ctx.$axios
          .get('/rcms-api/1/inquiry/get/6')
          .then(function (response) {
            var model = {};
            console.log(response.data.details.cols)
            var columns = response.data.details.cols
            for (var key in columns) {
              if (columns.hasOwnProperty(key)) {
                if (columns[key].hasOwnProperty('attribute')) {
                  if (columns[key]['attribute'].hasOwnProperty('placeholder')) {
                    model[key] = columns[key]['attribute']['placeholder']
                  }
                }
              }
            }
            self.model = model
          }).catch(function (error) {
                console.log(error)
                self.$store.dispatch(
                  "snackbar/setError",
                  error.response.data.errors?.[0]
                )
                self.$store.dispatch("snackbar/snackOn")
                self.loading = false
          })
       },
       getSchema() {
        let self = this
        this.$store.$auth.ctx.$axios
          .get('/rcms-api/1/inquiry/get/6')
          .then(function (response) {
            var schema = {};
            schema['fields'] = []
            var columns = response.data.details.cols
            for (var key in columns) {
              var result = {}
              if (columns.hasOwnProperty(key)) {
                result = self.$parse(columns[key], key)
                if (typeof result != 'undefined' && Object.keys(result).length != 0) {
                   schema['fields'].push(result)
                }
              }
            }
      
            self.schema = schema
          }).catch(function (error) {
                console.log(error)
                self.$store.dispatch(
                  "snackbar/setError",
                  error.response.data.errors?.[0]
                )
                self.$store.dispatch("snackbar/snackOn")
                self.loading = false
              })

       },
       onInput: function(value, fieldName) {
        console.log("fieldName: ", fieldName)
        console.log("value: ", value)
        this.$set(this.model, fieldName, value)
      },
      submitF: function() {
        let self = this
        console.log(this.model)
        this.validForm = true
        for (var key in self.$children[0].$children) {
          if (self.$children[0].$children[key].$children[0].formValid == false) {
            this.validForm = false
            console.log("invalid key", key)
          }
        }
        console.log(this.validForm)
       
        if (this.validForm) {
          var send_model = JSON.parse(JSON.stringify(self.model))
          send_model['body'] = 'example message'
          self.$store.$auth.ctx.$axios
            .post('/rcms-api/1/inquiry/6', send_model)
            .then(function (response) { 
              console.log(response.data)
            })
          console.log("Form submitted!", self.model);
        } else {
          console.log("Fill all the fields")
        }

      }
    },
    title() {
      return 'Inquiry'
    },
    data () {
      return {
        auth: false,
        disabled: false,
        validForm: true,
        model: {
        },
        schema: {
        }, 
      }
    }
  }
</script>
