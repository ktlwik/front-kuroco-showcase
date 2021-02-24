<template>
  <div fluid>
    <v-carousel>
      <v-carousel-item
        v-for="(item,i) in items"
        :key="i"
        :src="item.src"
        reverse-transition="fade-transition"
        transition="fade-transition"
      ></v-carousel-item>
    </v-carousel>
    
    <br/>
    <h1 class="text-center">Topics</h1>
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
          @click="back()"
      > View more
      </v-btn>
    </v-col>
  </div>
</template>

<script>
 import topicList from '../components/topics'
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
        back() {
          this.$router.push("/topics_list");
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