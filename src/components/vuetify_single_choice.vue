<template> 
  <v-form v-model="formValid" ref="myForm">
    <v-radio-group v-model="radioGroup" :rules="[v => (schema.required == false || (schema.required == true && !!v)) || 'required field']">
      <v-radio
        v-for="item in schema.contents"
        :key="item.key"
        :label="item.value"
        :value="item.value"
         @change="check($event)"
      ></v-radio>
    </v-radio-group>
  </v-form>
</template>


<script>
   import { abstractField } from "vue-form-generator";

   export default {
      data: function() {
         return {
            formValid: false,
            radioGroup: null
         }
      },
      methods: {
        check: function(e) {
          this.formValid = this.$refs.myForm.validate()
          if (this.formValid) {
            this.$emit('model-updated', this.radioGroup, this.schema.model)
          }
        }
      },
      mounted() {
        this.formValid = this.$refs.myForm.validate()
      },
      mixins: [ abstractField ],
   };
</script>