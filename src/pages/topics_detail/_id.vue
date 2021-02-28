<template>
	<div>
		<v-row>
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
		</v-row>
		<v-row class="text-right">
			<v-col>
				<v-btn
		              icon
		              :color="color"
		              @click="onClick()"
		        >
		          <v-icon x-large left>mdi-heart</v-icon>
		        </v-btn>
	    	</v-col>
	    </v-row>
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
			},	
			onClick() {
				console.log(this.color)
				let self = this
				console.log(this.$auth.user.member_id)
				if (this.color == "gray") {
		    		this.$store.$auth.ctx.$axios
		    			.post('/rcms-api/1/favorites', {
						  module_type: "topics",
						  module_id: parseInt(this.topic_id)
						})
		    			.then(function (response) {
		    				console.log("added")
							self.color = "red"
		    			}).catch(function (error) {
				            console.log(error)
				        })
				} else {
					this.$store.$auth.ctx.$axios
		    			.post('/rcms-api/1/favorites/delete', {
						  module_type: "topics",
						  module_id: parseInt(this.topic_id),
						})
		    			.then(function (response) {
		    				console.log("deleted")
							self.color = "gray"
		    			}).catch(function (error) {
				            console.log(error)

				        })
				}	
			}
		},
		data() {
			return {
				color: "white",
		        items: [ 	
  					{"text": "", "pattern": 1, "image_url": "", "text_size": "H2", "subtitle": "type 1"},
		        ],
		        topic_id: 957
		     }
		},
		mounted() {
			this.topic_id = this.$route.params.id
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
	        })

		    var favoritesUrl = '/rcms-api/1/favorites?member_id' + 
		    			this.$auth.user.member_id +
		    			'&module_type=topics&module_id=' + 
		    			this.topic_id
        	this.$store.$auth.ctx.$axios
	    			.get(favoritesUrl)
	    			.then(function (response) {
	    				console.log(response.data)
	    				if (response.data.pageInfo.totalCnt > 0) {
							self.color = "red"
						} else {
							self.color = "gray"
						}
	    			}).catch(function (error) {
						self.color = "gray"
					})
		}
	}
</script>