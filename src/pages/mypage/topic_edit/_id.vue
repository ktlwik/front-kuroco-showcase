<template>
	<div fluid>
	<v-card>
		
    <v-toolbar
      flat
      color="primary"
      dark
    >
    	<v-toolbar-title>Select type of the Topic #{{topic_id}} </v-toolbar-title>
    	<v-col class="text-right">
			<v-btn class="ma-2" color="green" dark>
				Save
				<v-icon dark right>
					mdi-checkbox-marked-circle
				</v-icon>
			</v-btn>
		</v-col>
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
  </div>
</template>

<script>
	import '~/assets/form.css'
	import Vue from 'vue'
	import VueFormGenerator from 'vue-form-generator'
	import KurocoParser from '~/plugins/parser.js';
	import fieldVuetifyUploadFile from '~/components/vuetify_file_upload.vue';
	import fieldVuetifyUploadImage from '~/components/vuetify_image_upload.vue';
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
	Vue.component('fieldVuetifyUploadImage', fieldVuetifyUploadImage);
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
				type: 'vuetifyText',
				inputType: 'text',
				text: '',
				min: 0,
				max: 100,
				label: 'subtitle_' + i.toString(),
				model: 'subtitle_' + i.toString(),
				required: true
			})
			schemaDetail.fields.push({
	            model:"area_" + i.toString(),
	            type:"vuetifyTextArea",
	            inputType:"text",
	            label:"Text_" + i.toString(),
	            placeholder:"",
	            text: "",
	            required:false,
	            counter:400,
	            max:400,
	            min:0
          	})
	      	schemaDetail.fields.push({
	      		model: "level_" + i.toString(),
				type: 'vuetifySingleOption',
				label: 'text_size_' + i.toString(),
				contents: [
					{ key: "01", value: "H2" },
					{ key: "02", value: "H3" },
					{ key: "03", value: "H4" },
					{ key: "04", value: "H5" },
					{ key: "05", value: "No level" },
				],
				required: true
	      	})
	      	schemaDetail.fields.push({
	      		model: "position_" + i.toString(),
				type: 'vuetifySingleOption',
				label: 'position_' + i.toString(),
				contents: [
					{ key: "01", value: "Top" },
					{ key: "02", value: "Left" },
					{ key: "03", value: "Right" },
					{ key: "04", value: "Bottom" },
					{ key: "05", value: "No image" },
				],
				required: true
	      	})
	      	schemaDetail.fields.push({
	      		type: 'vuetifyUploadImage'
	      	})
			this.schemaDetailList.push(schemaDetail)
	      }
		}
	}
</script>