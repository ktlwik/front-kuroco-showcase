<template>
  <v-container
    fluid
  >
    <v-checkbox
      v-for="item in schema.contents"
      ref="mul"
      v-model="checkedCategories"
      :label="item.value"
      :value="item.value"
      @change="check($event)"
    ></v-checkbox>
  </v-container>
</template>


<script>
   import { abstractField } from "vue-form-generator";

   export default {
      data: function() {
         return {
            checkedCategories: []
         }
      },
      methods: {
        check: function(e) {
          console.log(this.checkedCategories)
          this.$emit('model-updated', this.checkedCategories, this.schema.model)
        }
      },
      mixins: [ abstractField ],
   };
</script>