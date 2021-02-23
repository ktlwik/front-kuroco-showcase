<template>
<div>
 <v-row v-for="item in topics">
	<br/>
	<v-col>
	{{item.date}}
	</v-col>
	<v-col> 
	{{item.label}}
	</v-col>
	<v-col> 
	<NuxtLink :to="{ path: '/topics_detail/' + item.link }" no-prefetch>{{item.link}}</NuxtLink>
	<v-icon v-if="item.icon=='pdf'">mdi-pdf-box</v-icon>
	<v-icon v-else-if="item.icon=='excel'">mdi-file-excel</v-icon>
	<v-icon v-else-if="item.icon=='word'">mdi-file-word</v-icon>
	<v-icon v-else>mdi-launch</v-icon>
	</v-col>
</v-row>
</div>
</template>

<script>
    export default {
        props: {
            topics: []
        }
    }
</script>