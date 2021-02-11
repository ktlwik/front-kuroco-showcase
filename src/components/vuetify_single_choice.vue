<template>
  <v-container
    class="px-0"
    fluid
  >
    <v-radio-group v-model="radioGroup">
      <v-radio
        v-for="item in schema.contents"
        :key="item.key"
        :label="item.value"
        :value="item.value"
      ></v-radio>
    </v-radio-group>
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