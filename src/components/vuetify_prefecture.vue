<template>
   <v-select
       v-model="option"
       :items="schema.options"
       append-outer-icon="mdi-map"
       menu-props="auto"
       :label="schema.options[0]"
       @change="check($event)"
   ></v-select>
</template>


<script>
   import { abstractField } from "vue-form-generator";

   export default {
      mixins: [ abstractField ],
      data: function() {
         return {
            option: ""
         }
      },
      methods: {
        check: function(e) {
          console.log(this.option)
          this.$emit('model-updated', this.option, this.schema.model)
        }
      },
   };
</script>