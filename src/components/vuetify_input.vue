<template>
	<v-text-field
	  outlined
	  dense
      v-model="schema.model"
      ref="schema.model"
      :required="schema.required"
      :readonly="schema.readonly"
      :disabled="schema.disabled"
      :rules='[v => v.length >= schema.min || "minimum " + schema.min + " characters",
      		   v => v.length <= schema.max || "maximum " + schema.max + " characters"
      ]'
      :placeholder="schema.placeholder"
	  :counter="schema.counter"
	  :hint="schema.hint"	  
	></v-text-field>
</template>


<script>
   import { abstractField } from "vue-form-generator";

   export default {
         mixins: [ abstractField ]
   };
</script>