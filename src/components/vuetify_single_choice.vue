<template>
  <v-container
    class="px-0"
    fluid
  >
    <v-radio-group v-model="radioGroup">
      <v-radio
        v-for="item in schema.contents"
        :key="item.key"
        :label="item.value"
        :value="item.value"
         @change="check($event)"
      ></v-radio>
    </v-radio-group>
  </v-container>
</template>


<script>
   import { abstractField } from "vue-form-generator";

   export default {
      data: function() {
         return {
            radioGroup: 1
         }
      },
      methods: {
        check: function(e) {
          console.log(this.radioGroup)
          this.$emit('model-updated', this.radioGroup, this.schema.model)
        }
      },
      mixins: [ abstractField ],
   };
</script>