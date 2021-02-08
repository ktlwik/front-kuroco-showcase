<template>
	<v-textarea
	  outlined
      auto-grow
      filled
      label="Json"
   > 
   </v-textarea>
</template>


<script>
   import { abstractField } from "vue-form-generator";

   export default {
         mixins: [ abstractField ]
   };
</script>