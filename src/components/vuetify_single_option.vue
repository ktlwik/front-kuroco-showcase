<template>
   <v-select
       v-model="option"
       :items="schema.contents"
       menu-props="auto"
       item-text="value"
       item-value="key"
       @change="check($event)"
   ></v-select>
</template>


<script>
   import { abstractField } from "vue-form-generator";

   export default {
      mixins: [ abstractField ], 
      data: function() {
         return {
            option: 1
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