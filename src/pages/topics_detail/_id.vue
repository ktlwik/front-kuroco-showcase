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
	import item from '../../components/topic_detail'
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
  					{"text": "", "pattern": 1, "image_url": "", "text_size": "H2", "subtitle": "type 1"},
		        ],
		        topic_id: 957
		     }
		},
		mounted() {
			//this.topic_id = this.$route.params.id
			var url = 'https://dev-nuxt-auth.a.kuroco.app/rcms-api/1/topic/detail/' + this.topic_id
			let self = this
		    this.$store.$auth.ctx.$axios
		        .get(url)
		        .then(function (response) {
		          var items = []
		          var positions = response.data.details.ext_col_04
		          var image_urls = response.data.details.ext_col_05
		          var text_size = response.data.details.ext_col_06
		          var texts = response.data.details.ext_col_07
		          console.log(text_size)
		          for (var i = 0; i < texts.length; i++) {
		          	var textSize = null
		          	var imageUrl = null
		          	if (text_size[i] != undefined && text_size[i].hasOwnProperty('label')) {
		          		textSize = text_size[i]['label']
		          	}
		          	if (image_urls[i] != undefined && image_urls[i].hasOwnProperty('url')) {
		          		imageUrl = image_urls[i]['url']
		          	}
		          	items.push({
		          		"text":texts[i] ,
		          		"pattern": 2,
		          		"image_url": imageUrl,
		          		"text_size": textSize
		          	})
		          }
		          console.log(items)
		          self.items = items
		    }).catch(function (error) {
	            console.log(error)
				self.$store.dispatch(
					"snackbar/setError",
					error.response.data.errors?.[0]
				)
				self.$store.dispatch("snackbar/snackOn")
	        })
		}
	}
</script>