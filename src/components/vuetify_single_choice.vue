<template> 
  <v-form v-model="formValid" ref="myForm">
    <v-radio-group v-model="radioGroup" :rules="[v => (schema.required == false || (schema.required == true && !!v)) || 'required field']" @change="check($event)">
      <v-radio
        v-for="item in schema.contents"
        :key="item.key"
        :label="item.value"
        :value="item"
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
          console.log(this.radioGroup)
          this.formValid = this.$refs.myForm.validate()
          if (this.formValid) {
            this.$emit('model-updated', {
              "key": this.radioGroup.key,
              "label": this.radioGroup.value
            }, this.schema.model)
          }
        }
      },
      mounted() {
        this.formValid = this.$refs.myForm.validate()
      },
      mixins: [ abstractField ],
   };
</script>