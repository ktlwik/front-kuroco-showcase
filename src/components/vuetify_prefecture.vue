<template>
   <v-select
       v-model="schema.model"
       :items="schema.options"
       append-outer-icon="mdi-map"
       menu-props="auto"
       :label="schema.options[0]"
   ></v-select>
</template>


<script>
   import { abstractField } from "vue-form-generator";

   export default {
      mixins: [ abstractField ],
   };
</script>