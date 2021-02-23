<template>
  <div fluid>
    <v-tabs
    fixed-tabs
    background-color="indigo"
    dark
    height="70"
    class="rounded-xl"
    >
    <v-tab @click="go_page('/mypage/')">
      My page
    </v-tab>
    <v-tab @click="go_page('/mypage/favorite_list/')">
      Favorite List
    </v-tab>
    
    <v-tab @click="go_page('/mypage/profile/edit/')">
      Profile Edit
    </v-tab>
    </v-tabs>
    
    <br/>
    <h1 class="text-center">Favorite list </h1>
    <br/>
    <v-topics :topics="topics"></v-topics>
    <br/>
    <v-col class="text-right">
      <v-btn
          type="submit"
          block
          x-large
          color="success"
          class="white--text"
          @click="favorite_list()"
      > View more
      </v-btn>
    </v-col>
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
        items: [
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
          },
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          }, 
          {
            src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
          },
        ],
        topics: [
   
        ],
        group_id: 11,
      }
    },
    methods: {  
        go_page(path) {
          console.log(path)
          this.$router.push(path)
        },
        favorite_list() {
          this.$router.push("/mypage/favorite_list");
        },
        updateTopics() {
          var url = '/rcms-api/1/topics?topics_group_id=' + this.group_id + '&cnt=5' 
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
      this.updateTopics()
    }
  }
</script>