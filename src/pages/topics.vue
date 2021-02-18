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
      	<v-btn v-for="item in categories" :value="item.key">
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
    	<NuxtLink :to="item.link" no-prefetch>Title to be prefetched</NuxtLink>
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
	    :length="Math.ceil(pages.length/perPage)"
	  ></v-pagination>
	</div>
</v-container>
</template>

<script>
	export default {
	   data () {
	    return {
          auth: false,
          categories: [
          	{"key": "1", "value": "all"},
          	{"key": "2", "value": "right"},
          	{"key": "3", "value": "up"},
          	{"key": "4", "value": "down"},
          	{"key": "5", "value": "left"},
          ],
          topics: [
          	{"date": "2012/01/01", "label": "left", "link": "http://google.com", "icon": "pdf"}, 
          	{"date": "2012/01/01", "label": "right", "link": "http://google.com", "icon": "excel"}, 
          	{"date": "2012/01/01", "label": "up", "link": "http://google.com", "icon": "word"}, 
          	{"date": "2012/01/01", "label": "down", "link": "http://google.com", "icon": ""}, 
          	{"date": "2012/01/01", "label": "left", "link": "http://google.com", "icon": ""}, 
          	{"date": "2012/01/01", "label": "left", "link": "http://google.com", "icon": ""}, 
          	{"date": "2012/01/01", "label": "left", "link": "http://google.com", "icon": "pdf"}, 
          	{"date": "2012/01/01", "label": "left", "link": "http://google.com", "icon": "pdf"}, 
          	{"date": "2012/01/01", "label": "left", "link": "http://google.com", "icon": "pdf"}, 
          	{"date": "2012/01/01", "label": "left", "link": "http://google.com", "icon": "pdf"}, 
          	{"date": "2012/01/01", "label": "left", "link": "http://google.com", "icon": "pdf"}, 
          	{"date": "2012/01/01", "label": "left", "link": "http://google.com", "icon": "pdf"}, 
          ],
	      page: 1,
	      perPage: 10,
	      pages: [0,1,2,3,4,5,6,7,8,9,10,11,12,13]
	    }
	  },
	  computed: {
	    visiblePages () {
	      return this.topics.slice((this.page - 1)* this.perPage, this.page* this.perPage)
	    }
	  }
	}
</script>