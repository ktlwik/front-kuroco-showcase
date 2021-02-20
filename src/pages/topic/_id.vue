<template>
	<div>
		<v-col v-for="item in items">
			<v-item 
				:text="item.text" 
				:image_url="item.image_url" 
				:subtitle="item.subtitle" 
				:pattern="item.pattern"
				:text_size="item.text_size"
			>
			</v-item>
		</v-col>
		<v-btn
		    type="submit"
		    block
		    x-large
		    color="success"
		    class="white--text"
		    @click="back()"
		> Back to List
		</v-btn>
	</div>
</template>

<script>
	import item from '../../components/item'
	export default {
		components: {
			'v-item': item
		},
		methods: {
			back() {
				this.$router.go(-1);
			}
		},
		data() {
			return {
		        items: [ 	
  					{"text": "first News", "pattern": 1, "image_url": "https://bit.ly/3azDwkY", "text_size": "H2", "subtitle": "type 1"},
  					{"text": "second News", "pattern": 2, "image_url": "https://bit.ly/3azDwkY", "text_size": "H3", "subtitle": "type 2"},
  					{"text": "third News", "pattern": 3, "image_url": "https://bit.ly/3azDwkY", "text_size": "H2", "subtitle": "type 3"},
  					{"text": "fourth News", "pattern": 4, "image_url": "https://bit.ly/3azDwkY", "text_size": "H4", "subtitle": "type 4"},
  					{"text": "fifth News", "pattern": 5, "image_url": "https://bit.ly/3azDwkY", "text_size": "H5", "subtitle": "type 5"},
  					{"text": "five News", "pattern": 6, "image_url": "https://bit.ly/3azDwkY", "text_size": "H2", "subtitle": "type 6"},
		        ]
		     }
		},
		mounted() {

		}
	}
</script>