<template>
  <div>
  <vue-form-generator :schema="schema" :model="model"></vue-form-generator>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueFormGenerator from 'vue-form-generator'
  import 'vue-form-generator/dist/vfg-core.css'

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
          .get("http://my-json-server.typicode.com/ktlwik/fakeapi/model")
          .then(function (response) {
            self.model = response.data
          })
       },
       getSchema() {
        let self = this

        this.$axios
          .get("http://my-json-server.typicode.com/ktlwik/fakeapi/schema")
          .then(function (response) {
            self.schema = response.data
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
