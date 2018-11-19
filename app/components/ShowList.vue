<template>
    <StackLayout>
        <RadListView ref="listView" :items="traktList">
            <v-template>
            <StackLayout orientation="vertical">
                <TraktShowNS  :show="item"></TraktShowNS>
            </StackLayout>
            </v-template>
        </RadListView>
    </StackLayout>
</template>

<script>
    import TraktShowNS from './TraktShowNS.vue';

  export default {
    props: ['traktList'],
    data() {
      return {
        
      }
    },
    computed: {
        message() {
            return this.$store.state.tabs.currentPage;
        },
    },
    methods:  {
        onItemTap () {
            console.log("tapped");
        },
    },
    mounted: function () {
       
    },
    components: {
        TraktShowNS
    },
  }
</script>