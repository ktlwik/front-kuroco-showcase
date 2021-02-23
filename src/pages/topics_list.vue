<template>	

<v-container fluid>
  	<h1>Topics</h1>
  	<v-col
	  cols="12"
      class="py-2"
  	>
      <v-btn-toggle
        v-model="text"
        tile
        color="deep-purple accent-3"
        group
      >
        <v-btn @change="changeCategoryAll()">
        	ALL
        </v-btn>
      	<v-btn v-for="item in categories" :value="item.key" @change="changeCategory(item)">
          {{item.value}}
        </v-btn>
      </v-btn-toggle>
    </v-col>
    <v-col>
    	<v-topics :topics="topics"></v-topics>
    </v-col>
    <br/>
	<br/>
	<div class="text-center">
	  <v-pagination
	    v-model="page"
	    :length="Math.ceil(totalCnt/perPage)"
	    @input="next"
	  ></v-pagination>
	</div>
</v-container>
</template>

<script>
	import topicList from '../components/topics'
	export default {
	   components: {
		'v-topics': topicList
	   },
	   data () {
	    return {
	      text: "",
          auth: false,
          group_id: 11,
          categories: [
       
          ],
          topics: [
   
          ],
	      page: 1,
	      perPage: 10,
	      category_key: null,
          totalCnt: 0
	    }
	  },
	  methods: {
	  	next(page) {
	  		this.updateTopics()
	  	},
	  	changeCategoryAll() {
	  		this.category_key = null
	  		this.page = 1
	  		this.updateTopics()
	  	},
	  	changeCategory(item) {
	  		this.category_key = item.key
	  		this.page = 1
	  		this.updateTopics()
	  	}, 
	  	updateTopics() {
	  		var url = '/rcms-api/1/topics?topics_group_id=' + this.group_id +
	    				'&pageID=' + this.page + '&cnt=' + this.perPage
	    	if (this.category_key != null) {
	    		url += '&contents_type=' + this.category_key
	    	}
	    	console.log(url)
	    	let self = this
    		this.$store.$auth.ctx.$axios
     			.get(url)
     			.then(function (response) {
              		self.totalCnt = response.data.pageInfo.totalCnt
     				var topics = []
     				for (var key in response.data.list) {
     					var item = response.data.list[key]
     					topics.push({
     						"date": item['inst_ymdhi'].substring(0, 10),
        					"label": item['contents_type_nm'],
        					"link": item['subject'],
        					'icon': ""
     					})
     				}
     				self.topics = topics
     				
     			}).catch(function (error) {
		            console.log(error)
	                self.$store.dispatch(
	                  "snackbar/setError",
	                  error.response.data.errors?.[0]
	                )
	                self.$store.dispatch("snackbar/snackOn")
		        })
	  	}
	  },
	  mounted() {
	  	let self = this
	  	this.category_key = null
	  	this.$store.$auth.ctx.$axios
	  		.get('/rcms-api/1/topic/category?topics_group_id=' + this.group_id)
	  		.then(function (response) {
	  			var categories = []
	  			for (var key in response.data.list) {
	  				var item = response.data.list[key]
	  				categories.push({
	        			"key": item['topics_category_id'],
	        			"value": item['category_nm']	
	  				})
	  				self.categories = categories
	  			}
	        }).catch(function (error) {
	            console.log(error)
                self.$store.dispatch(
                  "snackbar/setError",
                  error.response.data.errors?.[0]
                )
                self.$store.dispatch("snackbar/snackOn")
	        })

	  	 this.updateTopics()
	  }
	}
</script>