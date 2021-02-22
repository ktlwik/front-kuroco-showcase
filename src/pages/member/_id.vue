<template>
	<div>
		<v-col>
			<v-row>
			<v-col>
  				<v-img fluid class="mx-auto" :aspect-ration="16/9" :src="detail.url" width="33%" max-height="900" max-width="900"></v-img>
			</v-col>
			<v-col class="mx-auto">
				<v-row class="headline">
				<br/>
				{{detail.name}}
				</v-row>
				<v-row>
				{{detail.location}}
				</v-row>
				<v-row>
				<br/>
				<br/>
				{{detail.department}}
				</v-row>
				<v-row>
				{{detail.position}}
				</v-row>
			</v-col>
			</v-row>
			<br/>
			<br/>
			<v-row >
			<v-col>
			  <v-simple-table 
      class="elevation-1" >
			    <template v-slot:default>
			      <tbody>
			        <tr
			          v-for="item in profile"
			          :key="item.name"
			        >
			          <td width="200">{{ item.name }}</td>
			          <td width="1000">{{ item.value }}</td>
			        </tr>
			      </tbody>
			    </template>
			  </v-simple-table>
			</v-col>
			</v-row>
		</v-col>
		<br/><br/>
		<br/><br/>	
		<v-btn
		    type="submit"
		    block
		    x-large
		    color="success"
		    class="white--text"
		    @click="back()"
		> Back
		</v-btn>
	</div>
</template>

<script>
	export default {
		methods: {
			back() {
				this.$router.go(-1);
			}
		},
		data() {
			return {
		        detail: {
		        	"name": "Nuri Yergozha", 
		        	"department": "Computer Department", 
		        	"position": "Programmer",
		        	"url": "https://astutegraphics.com/assets/training/How-to-create-filled-line-avatars-with-Scott-Lewis/11_how-to-create-filled-line-avatars-with-scott-lewis.jpg", 
		        	"zip": "111-1111", "location": 
		        	"1-1-1 Shinjuku, Tokyo Japan", 
		        	"phone": "03-0000-0000", 
		        	"email": "nuri@sample.co.jp", 
		        	"text": "Here is the first message"
		        },
		        profile: [
			          {
			            name: 'Zip Code',
			            value: '111-1111',
			          },
			          {
			            name: 'Location',
			            value: '1-1-1 Shinjuku, Tokyo Japan',
			          },
			          {
			            name: 'Phone',
			            value: '03-0000-0000',
			          },
			          {
			            name: 'Email',
			            value: 'nuri@sample.co.jp',
			          },
			          {
			            name: 'Item',
			            value: 'text text text text',
			          },
			          {
			            name: 'Item',
			            value: 'text text text text',
			          },
			          {
			            name: 'Notes',
			            value: 'Here is the first message',
			          },
	   	     	],
		     }
		},
		mounted() {

		}
	}
</script>