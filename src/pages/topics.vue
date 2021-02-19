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
    <v-row v-for="item in visiblePages">
    	<br/>
    	<v-col>
    	{{item.date}}
    	</v-col>
    	<v-col> 
    	{{item.label}}
    	</v-col>
    	<v-col> 
    	<NuxtLink :to="{ path: '/topic/' + item.link }" no-prefetch>{{item.link}}</NuxtLink>
    	<v-icon v-if="item.icon=='pdf'">mdi-pdf-box</v-icon>
    	<v-icon v-else-if="item.icon=='excel'">mdi-file-excel</v-icon>
    	<v-icon v-else-if="item.icon=='word'">mdi-file-word</v-icon>
    	<v-icon v-else>mdi-launch</v-icon>
    	</v-col>
    </v-row>
    </v-col>
    <br/>
	<br/>
	<div class="text-center">
	  <v-pagination
	    v-model="page"
	    :length="Math.ceil(topics.length/perPage)"
	  ></v-pagination>
	</div>
</v-container>
</template>

<script>
	export default {
	   data () {
	    return {
          auth: false,
          group_id: 11,
          categories: [
       
          ],
          topics: [
   
          ],
	      page: 1,
	      perPage: 10,
	      category_key: null
	    }
	  },
	  methods: {
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
     				console.log(response.data.list)
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
	  },
	  computed: {
	    visiblePages () {
	    
	      	return this.topics.slice((this.page - 1)* this.perPage, this.page* this.perPage)
	    }
	  }
	}
</script>