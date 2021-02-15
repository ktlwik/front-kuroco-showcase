<template>
  <v-form v-model="formValid" ref="myForm">
   <v-select
       v-model="option"
       :items="schema.contents"
       menu-props="auto"
       item-text="value"
       item-value="key"
      :rules="[v => (schema.required == false || (schema.required == true && !!v)) || 'required field']"
       @change="check($event)"
   ></v-select>
  </v-form>
</template>


<script>
   import { abstractField } from "vue-form-generator";

   export default {
      mixins: [ abstractField ], 
      data: function() {
         return {
            formValid: false,
            option: null
         }
      },
      methods: {
        check: function(e) {
          this.formValid = this.$refs.myForm.validate()
          if (this.formValid) {
            this.$emit('model-updated', this.option, this.schema.model)
          }
        }
      },
      mounted() {
        this.formValid = this.$refs.myForm.validate()
      }
   };
</script>