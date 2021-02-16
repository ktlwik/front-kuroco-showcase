<template>
	<!-- https://vuetifyjs.com/en/api/v-file-input/#props for more information 
		add schema based properties -->   
	<v-form v-model="formValid" ref="myForm">
 		<v-file-input ref="schema.model"
 		v-model="file"
 		 :rules='[v => (schema.required == false || (schema.required == true && !!v)) || "need to upload file"]'
 		 :label="schema.accept"
 		 :accept="schema.accept"
 		@change="check($event)" 
 		></v-file-input>
 	</v-form>
</template>

<script>
   import { abstractField } from "vue-form-generator";
   export default {
   		 data: function() {
	         return {
	      		formValid: true,
	      		file: null
	         }
      	 },
      	 methods: {
     		check: function(e) {
     			let self = this
     			this.$store.$auth.ctx.$axios
			        .post("/rcms-api/1/upload", {
			          file: this.file
			        })
			        .then(function (response) {
			          console.log(response)
			        }).catch(function (error) {
			          console.log(error)
			        })
	        }
      	 },
         mixins: [ abstractField ],
         mounted() {
     		this.formValid = this.$refs.myForm.validate()
     		console.log(this.formValid)
            //this.$emit("validated", this.formValid, ["asds"], this)
     	}
   };
</script>