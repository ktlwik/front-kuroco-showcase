<template>
   <div>
  
	<v-textarea
      v-model="jsonstr"
	  outlined
      auto-grow
      filled
      label="Json"
      id="jsonText"
      placeholder="paste or type JSON here..."
   > 
   </v-textarea>
   <div class="text-danger" v-if="jsonstr && jsonerror">{{ jsonerror }}</div>
   <div class="text-success" v-if="!jsonerror">Valid JSON ✔</div>
   <v-card-text>{{prettyFormat}}</v-card-text>
   </div>
</template>


<script>
   import { abstractField } from "vue-form-generator";

   export default {  
      mixins: [ abstractField ],
      data: function() {
         return {
            jsonstr: "",
            jsonerror: ""
         }
      },
      computed: {
       prettyFormat: function() {
           // reset error
           this.jsonerror = "";
           let jsonValue = "";
           try {
               // try to parse
               jsonValue = JSON.parse(this.jsonstr);
           }
           catch(e) {
               this.jsonerror = JSON.stringify(e.message)
               var textarea = document.getElementById("jsonText");
               if (this.jsonerror.indexOf('position')>-1) {
                   // highlight error position
                   var positionStr = this.jsonerror.lastIndexOf('position') + 8;
                   var posi = parseInt(this.jsonerror.substr(positionStr,this.jsonerror.lastIndexOf('"')))
                   if (posi >= 0) {
                       textarea.setSelectionRange(posi,posi+1);
                   }
               }
               return "";
           }
           return JSON.stringify(jsonValue, null, 2);
       }
      }
   };
</script>