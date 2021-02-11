<template>
  <v-container
    fluid
  >
    <v-checkbox
      v-for="item in schema.contents"
      v-model="item.key"
      :label="item.value"
      :value="item.value"
    ></v-checkbox>
  </v-container>
</template>


<script>
   import { abstractField } from "vue-form-generator";

   export default {
      data: function() {
         return {
            radioGroup: 1
         }
      },
      mixins: [ abstractField ],
   };
</script>