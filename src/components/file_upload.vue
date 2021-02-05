<template>
	<!-- https://vuetifyjs.com/en/api/v-file-input/#props for more information 
		add schema based properties -->
	<v-file-input truncate-length="10"></v-file-input>
</template>

<script>
   import { abstractField } from "vue-form-generator";

   export default {
         mixins: [ abstractField ]
   };
</script>