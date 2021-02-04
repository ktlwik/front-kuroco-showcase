<template>
  <div>
  <vue-form-generator :schema="schema" :model="model"></vue-form-generator>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueFormGenerator from 'vue-form-generator'
  import 'vue-form-generator/dist/vfg-core.css'
  import {types} from '../constants/types.js'
  import {inputTypes} from '../constants/input_types.js'
  import {required} from '../constants/required.js'

  Vue.use(VueFormGenerator)

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
                //console.log(key)
                if (columns[key].hasOwnProperty('attribute')) {
                  if (columns[key]['attribute'].hasOwnProperty('placeholder')) {
                    model[key] = columns[key]['attribute']['placeholder']
                  }
                }
              }
            }
            console.log(model)
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
                if (columns[key].hasOwnProperty('type')) {
                    var type_id = columns[key]['type']
                    console.log(type_id)
                    result['model'] = key
                    result['type'] = types[type_id]
                    if (inputTypes.hasOwnProperty(type_id)) {
                      result['inputType'] = inputTypes[type_id]
                    }
                }
              }
              if (columns[key].hasOwnProperty('title')) {
                result['label'] = columns[key]['title']
              }        

              if (columns[key].hasOwnProperty('required')) {
                var required_type = columns[key]['required']
                if (required.hasOwnProperty(required_type)) {
                  result['required'] =  required[required_type]
                }
              }

              schema['fields'].push(result)
    
            }
            schema['fields'].push({
               'type': 'submit',
               'buttonText': 'submit'
            })
            console.log(schema['fields'])
            self.schema = schema
            //self.schema = response.data
          })

       },
    },
    data () {
      return {
        model: {
        },
        schema: {
        }
      }
    }
  }
</script>

