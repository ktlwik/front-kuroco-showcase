<template>
	<v-textarea
	  outlined
	  dense
      v-model="schema.model"
      ref="schema.model"
      :required="schema.required"
      :readonly="schema.readonly"
      :disabled="schema.disabled"
      :rules='[v => v.length >= schema.min || "minimum " + schema.min + " characters",
      		   v => v.length <= schema.max || "maximum " + schema.max + " characters",
      		   v => isValid(schema, v),
      ]'
      :placeholder="schema.placeholder"
	  :counter="schema.counter"
	  :hint="schema.hint"	  
	></v-textarea>
</template>


<script>
  import { abstractField } from "vue-form-generator";
	import validator from 'validator';

  export default {
        mixins: [ abstractField ], 
        methods: {
     	  	isValid: function(schema, value) {
     			  console.log(value)
    	 			if (schema.texttype == 'regex') {
     					var regex = new RegExp(schema.regex)
     					if (!regex.test(value)) {
     						return "Wrong regex format. " + regex;
     					}
     				}
     			
     			return true
     		},
     	}
	};
</script>