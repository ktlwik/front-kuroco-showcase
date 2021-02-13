<template>
	<v-textarea
	  outlined
	  dense
      v-model="textarea"
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
    @change="check($event)"

	></v-textarea>
</template>


<script>
  import { abstractField } from "vue-form-generator";
	import validator from 'validator';

  export default {
        mixins: [ abstractField ], 
        data: function() {
           return {
              textarea: ""
           }
        },
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
        check: function(e) {
          console.log(this.textarea)
          this.$emit('model-updated', this.textarea, this.schema.model)
        }
     	}
	};
</script>