<template>
  <div class="container">
    <client-only>
      <div v-if="!auth.loggedIn">
        <form class="login-page" @submit.prevent="login">
          <div class="login-screen lgn-left">
            <h3 class="subtitle mb-3">
              会員ログイン
            </h3>
            <div class="inner">
              <form @submit.prevent="login">
                <p class="pm">
                  <strong>メールアドレスとパスワードを<br
                    class="spbr"
                  />入力してください。</strong>
                </p>
                <p>
                  <v-text-field
                    v-model="form.email"
                    label="メールアドレス"
                    type="email"
                    outlined
                  />
                </p>
                <p>
                  <v-text-field
                    v-model="form.password"
                    label="パスワード"
                    :type="show_pwd1 ? 'text' : 'password'"
                    :append-icon="show_pwd1 ? 'mdi-eye' : 'mdi-eye-off'"
                    outlined
                    @click:append="show_pwd1 = !show_pwd1"
                  />
                </p>
                <v-btn
                  type="submit"
                  block
                  x-large
                  color="success"
                  dark
                  :loading="loading"
                >
                  ログインする
                </v-btn>
              </form>
              <p>
                <NuxtLink to="/reminder">
                  パスワードを忘れた方はこちらから
                </NuxtLink>
              </p>
            </div>
          </div>
          <div class="login-screen lgn-right">
            <h3 class="subtitle mb-3">
              新規入会はこちら
            </h3>
            <div class="inner">
              <p class="body-1 new-btn">
                <NuxtLink to="/form">
                  会員新規入会登録
                </NuxtLink>
              </p>
            </div>
          </div>
        </form>
      </div>

      <div v-else class="mypage">
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
    </client-only>
  </div>
</template>

<script>
import topicList from '../components/topics'
import Vue from 'vue';

export default {
  components: {
    'v-topics': topicList
  },
  middleware: "auth",
  auth: false,
  data: () => ({
    topics_list1: [],
    loading: false,
    show_pwd1: false,
    show_pwd2: false,
    form: {
      email: "",
      password: "",
    },
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
    group_id: 13,
  }),
  computed: {
    user() {
      return this.$auth.user
    },
    auth() {
      return this.$store.$auth
    },
    can_upgrade() {
      if (this.$auth.loggedIn) {
        self.can_upgrade = true
        const group_ids = JSON.parse(JSON.stringify(this.$auth.user.group_ids))
        Object.keys(group_ids).forEach(function (key) {
          if (["100"].indexOf(key) !== -1) {
            self.can_upgrade = false
          }
        })
        return self.can_upgrade
      }
      return false
    },
  },
  mounted() {
    this.updateTopics()
    this.getInfo()
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
            var fileurl = ''
            var linkurl = ''
            if (item.hasOwnProperty('ext_col_02') && item['ext_col_02'].hasOwnProperty('url')) {
              fileurl = item['ext_col_02']['url']
            }
            if (item.hasOwnProperty('ext_col_03') && item['ext_col_03'].hasOwnProperty('url')) {
              linkurl = item['ext_col_03']['url']
            }
            topics.push({
                "date": item['inst_ymdhi'].substring(0, 10).replaceAll("-", "/"),
                "label": item['contents_type_nm'],
                "link": item['subject'],
                'icon': "",
                "id": item['topics_id'],
                'icon': item['ext_col_01']['key'],
                'fileurl': fileurl,
                'linkurl': linkurl
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
    },
    getInfo() {
      if (this.$auth.loggedIn) {
        let self = this

        this.$auth.ctx.$axios
          .get("/rcms-api/1/infos")
          .then(function (response) {
            self.topics_list1 = response.data.list
          })
      }
    },
    async login() {
      this.loading = true
      await this.$auth
        .loginWith("local", { data: this.form })
        .then(() => {
          const group_ids = JSON.parse(
            JSON.stringify(this.$auth.user.group_ids)
          )
          let upgraded_flg = false
          Object.keys(group_ids).forEach(function (key) {
            if (key == 110) {
              upgraded_flg = true
            }
          })
          if (!upgraded_flg) {
            this.$router.push("/upgrade")
          } else {
            this.getInfo()
            this.$router.push("/")
          }
          this.$store.dispatch("snackbar/setMessage", "ログインしました")
          this.$store.dispatch("snackbar/snackOn")
          this.loading = false
        })
        .catch(() => {
          this.$store.dispatch("snackbar/setError", "ログインに失敗しました")
          this.$store.dispatch("snackbar/snackOn")
          this.loading = false
        })
    },
  },
}
</script>
