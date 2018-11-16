<template>
    <!-- <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label class="title" :text="message"  col="1"/>
            </GridLayout>
        </ActionBar> -->

        <StackLayout backgroundColor="#3c495e" height="100%">
            <ListView for="item in traktList" height="100%">
                <v-template>
                    <TraktShowNS :show="item"></TraktShowNS>
                </v-template>
            </ListView>
        </StackLayout>
    <!-- </Page> -->
</template>

<script>
    import TraktShowNS from './TraktShowNS.vue';

  export default {
    props: ['traktList'],
    data() {
      return {
        msg: 'Hello World!',
        myList: [],
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
        }
    },
    mounted: function () {
        // let that = this;
        // this.$store.state.services.trakt.traktList('trending').then( function (response) {
        //     that.$store.commit('lists/updateList',['trendingList',response]);
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
    },
    components: {
        TraktShowNS
    },
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .title {
        text-align: left;
        padding-left: 16;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    .drawer-header {
        padding: 50 16 16 16;
        margin-bottom: 16;
        background-color: #53ba82;
        color: #ffffff;
        font-size: 24;
    }

    .drawer-item {
        padding: 8 16;
        color: #333333;
        font-size: 16;
    }
</style>
