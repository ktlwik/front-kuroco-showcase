<template>
   <v-select
       v-model="schema.model"
       :items="schema.contents"
       menu-props="auto"
       item-text="value"
       item-value="key"
   ></v-select>
</template>


<script>
   import { abstractField } from "vue-form-generator";

   export default {
      mixins: [ abstractField ],
   };
</script>