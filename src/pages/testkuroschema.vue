<template>
  <div>
  <vue-form-generator :schema="schema" :model="model"></vue-form-generator>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueFormGenerator from 'vue-form-generator'
  import '../assets/form.css'
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
               'onSubmit': {},
               'validateBeforeSubmit': true
            })
            console.log(schema['fields'])
            self.schema = schema
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
