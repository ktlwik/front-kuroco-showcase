<template>
  <div class="theme--light v-stepper">

  <v-container fluid>
  <vue-form-generator ref="form"
    :schema="schema" :model="model" @model-updated='onInput'
  >    
  </vue-form-generator>
  </v-container>
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
        this.$axios
          .get("http://my-json-server.typicode.com/ktlwik/devapi/details")
          .then(function (response) {
            var model = {};
            var columns = response.data.cols
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
          })
       },
       getSchema() {
        let self = this
        this.$axios
          .get("http://my-json-server.typicode.com/ktlwik/devapi/details")
          .then(function (response) {
            var schema = {};
            schema['fields'] = []
            var columns = response.data.cols
            for (var key in columns) {
              var result = {}
              if (columns.hasOwnProperty(key)) {
                result = self.$parse(columns[key], key)
                if (typeof result != 'undefined' && Object.keys(result).length != 0) {
                   schema['fields'].push(result)
                }
              }
            }
          
            schema['fields'].push({
               'type': 'submit',
               'buttonText': 'submit',
                onSubmit(model) {

                  self.$children[0].$children.map(function(key, child) {
                    console.log(child)
                    self.disabled = false
                    console.log(key.$children[0].formValid)
                    if (key.$children[0].formValid == false) {
                      self.disabled = true 
                    }
                  });
                 
                  //console.log(self.$children)
                  console.log("Form submitted!", model);
                  //console.log(self.checkedCategories)
                },
                disabled() {
                  return false
                },
               'validateBeforeSubmit': false
            })
            console.log(schema['fields'])
            self.schema = schema
          })
       },
       onInput: function(value, fieldName) {
        console.log("fieldName: ", fieldName)
        console.log("value: ", value)
        this.$set(this.model, fieldName, value)
      }
    },
    data () {
      return {
        auth: false,
        disabled: true,
        model: {
        },
        schema: {
        }, 
      }
    }
  }
</script>
