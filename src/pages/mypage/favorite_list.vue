<template>
  <div fluid>
    <h1 class="text-center">Favorite list </h1>
    <br/>
    <v-topics :topics="topics"></v-topics>
    <br/>
    <div class="text-center">
	  <v-pagination
	    v-model="page"
	    :length="Math.ceil(totalCnt/perPage)"
	    @input="next"
	  ></v-pagination>
	</div>
  </div>
</template>

<script>
  import topicList from '../../components/topics'
  export default {
    components: {
      'v-topics': topicList
    },
    data () {
      return {
        topics: [],
        group_id: 11,
        page: 1,
        perPage: 10,
        totalCnt: 0
      }
    },
    methods: {   	
    	next(page) {
	  		this.updateTopics()
	  	},
        updateTopics() {
          var url = '/rcms-api/1/topics?topics_group_id=' + this.group_id +
	    				'&pageID=' + this.page + '&cnt=' + this.perPage
          let self = this
          this.$store.$auth.ctx.$axios
            .get(url)
            .then(function (response) {
              console.log(response.data.list)
              var topics = []
              self.totalCnt = response.data.pageInfo.totalCnt
              for (var key in response.data.list) {
                var item = response.data.list[key]
                topics.push({
                    "date": item['inst_ymdhi'].substring(0, 10),
                    "label": item['contents_type_nm'],
                    "link": item['subject'],
                    'icon': "",
        			"id": item['topics_id']
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
      this.updateTopics()
    }
  }
</script>