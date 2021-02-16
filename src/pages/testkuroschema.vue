<template>
  <div>
  <vue-form-generator ref="form"
    :schema="schema" :model="model" @model-updated='onInput'
  >    
  </vue-form-generator>
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
        disabled: true,
        model: {
        },
        schema: {
        }, 
      }
    }
  }
</script>
