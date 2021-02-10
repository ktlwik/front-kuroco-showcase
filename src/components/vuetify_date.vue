<template>
  <div v-if="schema.time == '1'">
  <v-dialog
     ref="dialogdate"
     v-model="modal"
     :return-value.sync="date"
     persistent
     width="290px"
   >
     <template v-slot:activator="{ on, attrs }">
       <v-text-field
         v-model="date"
         label="Date picker."
         prepend-icon="mdi-calendar"
         readonly
         v-bind="attrs"
         v-on="on"
       ></v-text-field>
     </template>
     <v-date-picker
       v-model="date"
       mode="dateTime"
        is24hr
       scrollable
     >
       <v-spacer></v-spacer>
       <v-btn
         text
         color="primary"
         @click="modal = false"
       >
         Cancel
       </v-btn>
       <v-btn
         text
         color="primary"
         @click="$refs.dialogdate.save(date)"
       >
         OK
       </v-btn>
     </v-date-picker>
   </v-dialog>
   <v-dialog
        ref="dialogtime"
        v-model="modal2"
        :return-value.sync="time"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="time"
            label="Time picker."
            prepend-icon="mdi-clock-time-four-outline"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-time-picker
          v-if="modal2"
          v-model="time"
          full-width
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal2 = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialogtime.save(time)"
          >
            OK
          </v-btn>
        </v-time-picker>
      </v-dialog>
   </div>
   <div v-else>
     <v-dialog
        ref="dialogdate"
        v-model="modal"
        :return-value.sync="date"
        persistent
        width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="date"
            label="Date picker."
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="date"
          mode="dateTime"
           is24hr
          scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="modal = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.dialogdate.save(date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-dialog>
   </div>
</template>

<script>
   import { abstractField } from "vue-form-generator";

   export default {
         mixins: [ abstractField ],
         data: function() {
            return {
               date: new Date().toISOString().substr(0, 10),
               time: null, 
               modal: false,
               modal2: false
            }
         },
   };
</script>