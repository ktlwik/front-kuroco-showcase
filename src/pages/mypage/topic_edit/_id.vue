<template>
	<v-card>
    <v-toolbar
      flat
      color="primary"
      dark
    >
      <v-toolbar-title>Select type of the Topic #{{topic_id}} </v-toolbar-title>
    </v-toolbar>
    <v-tabs>
      <v-tab>
        <v-icon left>
          mdi-file-excel
        </v-icon>
        File document
      </v-tab>
      <v-tab>
        <v-icon left>
      	  mdi-launch
        </v-icon>
        Url link
      </v-tab>
      <v-tab>
        <v-icon left>
      	  mdi-details
        </v-icon>
        Detail page
      </v-tab>
      <v-tab-item>
        <v-card flat>
        	<v-container>
	            <vue-form-generator
		          ref="form"
		          :schema="schemaFile"
		          :model="model"
		          @model-updated="onInput"
		        >
		        </vue-form-generator>
	    	</v-container>
	        <br/>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
           <v-container>
            <vue-form-generator
	          ref="form"
	          :schema="schemaUrl"
	          :model="model"
	          @model-updated="onInput"
	        >
	        </vue-form-generator>
          </v-container>
        </v-card>
      </v-tab-item>
      <v-tab-item>
      	<v-row v-for="item in schemaDetailList">
        	<v-col>
		        <v-card outlined>
		           <v-container>
		            <vue-form-generator
			          ref="form"
			          :schema="item"
			          :model="model"
			          @model-updated="onInput"
			        >
			        </vue-form-generator>
		          </v-container>
		        </v-card>
    		</v-col>
    	</v-row>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
	import '~/assets/form.css'
	import Vue from 'vue'
	import VueFormGenerator from 'vue-form-generator'
	import KurocoParser from '~/plugins/parser.js';
	import fieldVuetifyUploadFile from '~/components/vuetify_file_upload.vue';
	import fieldVuetifyText from '~/components/vuetify_text.vue';
	import fieldVuetifyTextArea from '~/components/vuetify_textarea.vue';
	import fieldVuetifyDate from '~/components/vuetify_date.vue';
	import fieldVuetifyJson from '~/components/vuetify_json.vue';
	import fieldVuetifyPrefecture from '~/components/vuetify_prefecture.vue';
	import fieldVuetifyMultipleChoice from '~/components/vuetify_multiple_choice.vue';
	import fieldVuetifySingleChoice from '~/components/vuetify_single_choice.vue';
	import fieldVuetifySingleOption from '~/components/vuetify_single_option.vue';
	import fieldVuetifyPassword from '~/components/vuetify_password.vue'

	Vue.component('fieldVuetifyUploadFile', fieldVuetifyUploadFile);
	Vue.component('fieldVuetifyDate', fieldVuetifyDate);
	Vue.component('fieldVuetifyText', fieldVuetifyText);
	Vue.component('fieldVuetifyTextArea', fieldVuetifyTextArea);
	Vue.component('fieldVuetifyJson', fieldVuetifyJson);
	Vue.component('fieldVuetifyPrefecture', fieldVuetifyPrefecture);
	Vue.component('fieldVuetifySingleOption', fieldVuetifySingleOption);
	Vue.component('fieldVuetifySingleChoice', fieldVuetifySingleChoice);
	Vue.component('fieldVuetifyMultipleChoice', fieldVuetifyMultipleChoice);
	Vue.component('fieldVuetifyPassword', fieldVuetifyPassword);

	Vue.use(VueFormGenerator);
	Vue.use(KurocoParser);

	export default {
		methods: {
			onInput: function(value, fieldName) {
		      console.log("fieldName: ", fieldName)
		      console.log("value: ", value)
		      this.$set(this.model, fieldName, value)
		    },
		},
		data() {
			return {
				topic_id: null,
				text: "",
				model: {},
				schemaDetailList: [],
				schemaFile: {
			        fields: [
			          {
					      model: "ext_01",
					      label: "File type",
					      contents: [
					        {
					          key: 1,
					          value: "PDF",
					          default: false,
					          attribute:{"group":"1"}
					        },
					        {
					          key: 2,
					          value: "Word",
					          default:false,
					          attribute:{"group":"1"}
					        },
					        {
					          key:3,
					          value:"Excel",
					          default:false,
					          attribute:{"group":"1"}
					        }
					      ],
					      required:false,
					      type:"vuetifySingleChoice"
					  },
			          {
			          	model: 'file',
			            type: 'vuetifyUploadFile',
			            required: true
			          },
		    		]
		    	},
		    	schemaUrl: {
		    		fields: [
		    		  {
			              type: 'vuetifyText',
			              inputType: 'text',
			              text: '',
			              min: 0,
			              max: 100,
			              label: 'Link URL',
			              model: 'url',
			              texttype: 'url',
			              required: true
			          },
			          {
			              type: 'vuetifyText',
			              inputType: 'text',
			              text: '',
			              min: 0,
			              max: 100,
			              label: 'Text to display',
			              model: 'to_display',
			              required: true
			          },
		    		]
		    	}
		    }
		},
		mounted() {
	      this.topic_id = this.$route.params.id
	  	  var url = '/rcms-api/1/topic/detail/' + this.topic_id
	      let self = this
	      //console.log(url)
	      this.$store.$auth.ctx.$axios
	        .get(url)
	        .then(function (response) {
	          self.text = response.data.details
	        }).catch(function (error) {
	        //  console.log(error)
              self.$store.dispatch(
                "snackbar/setError",
                error.response.data.errors?.[0]
              )
              self.$store.dispatch("snackbar/snackOn")
	        })
	      
	      for (var i = 1; i <= 30; ++i) {
	      	var schemaDetail = {
	      	 fields: []
		  	}
	      	schemaDetail.fields.push({
	      		model: "level_" + i.toString(),
				type: 'vuetifySingleOption',
				label: 'text_size_' + i.toString(),
				options: [
					{ value: "01", text: "H2" },
					{ value: "02", text: "H3" },
					{ value: "03", text: "H4" },
					{ value: "04", text: "H5" },
					{ value: "05", text: "No level" },
				],
				required: true
	      	})
	      	schemaDetail.fields.push({
	          	model: 'file_' + i.toString(),
	          	label: 'image_' + i.toString(),
	            type: 'vuetifyUploadFile',
	            required: true
			})
			this.schemaDetailList.push(schemaDetail)
	      }
		}
	}
</script>