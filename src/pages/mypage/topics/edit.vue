<template>
  <div>
    topics
    <v-btn icon :color="color" @click="onClick()" class="mr-auto">
      <v-icon x-large>mdi-heart</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
	data() {
		return {
			color: "red",
		}
	},
	methods: {
		onClick() {
			console.log(this.color)
			if (this.color == "red") {
				this.color = "blue"
			} else {
				this.color = "red"
			}
		}
	}
}
</script>
