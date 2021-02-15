<template>
  
  <v-form v-model="formValid" ref="myForm">
    <v-checkbox
      v-for="item in schema.contents"
      ref="mul"
      v-model="checkedCategories"
      :label="item.value"
      :value="item.value"
      :rules="rules"
      @change="check($event)"
    ></v-checkbox>
  </v-form>
</template>


<script>
   import { abstractField } from "vue-form-generator";

   export default {
      data: function() {
         return {
            formValid: false,
            checkedCategories: []
         }
      },
      computed: {
        rules() {
          return [
            this.schema.required == false || (this.schema.required == true && this.checkedCategories.length > 0) || "At least one item should be selected"
          ];
        }
      },
      methods: {
        check: function(e) {
          this.formValid = this.$refs.myForm.validate()
          if (this.formValid) {
            this.$emit('model-updated', this.checkedCategories, this.schema.model)
          }
        }
      },
      mounted() {
        this.formValid = this.$refs.myForm.validate()
      },
      mixins: [ abstractField ],
   };
</script>