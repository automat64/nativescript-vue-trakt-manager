<template>
    <!-- <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label class="title" :text="message"  col="1"/>
            </GridLayout>
        </ActionBar> -->
            <!-- <StackLayout>
                <RadListView ref="listView"
                            for="item in itemList"
                            @itemTap="onItemTap">
                    <v-template>
                    <StackLayout orientation="vertical">
                        <Label :text="item.name"></Label>
                        <Label :text="item.description"></Label>
                    </StackLayout>
                    </v-template>
                </RadListView>
                </StackLayout> -->
        
            <!-- <StackLayout v-for="item in traktList" height="100%" :key="item.ids.imdb"> -->
                <!-- <v-template> -->

                <!-- <ScrollView orientation="vertical">
                    <StackLayout>
                        <StackLayout backgroundColor="#3c495e" v-for="item in traktList" height="60" :key="item.ids.imdb">
                            <TraktShowNS  :show="item"></TraktShowNS>
                        </StackLayout>   
                    </StackLayout> 
                </ScrollView> -->

               <StackLayout>
                    <RadListView ref="listView" :items="traktList">
                        <v-template>
                        <StackLayout orientation="vertical">
                            <TraktShowNS  :show="item"></TraktShowNS>
                        </StackLayout>
                        </v-template>
                    </RadListView>
                </StackLayout>

                <!-- </v-template> -->
            <!-- </StackLayout> -->
        <!-- </StackLayout> -->
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
        itemList: [
            {name: 'Item 1', description: 'Item 1 description'},
            {name: 'Item 2', description: 'Item 2 description'},
            {name: 'Item 3', description: 'Item 3 description'},
        ],
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
        addMoreItemsFromSource(chunkSize) {
            let newItems = this.traktList.splice(0, chunkSize);
            this.dataItems.push(newItems);
        },
        onLoadMoreItemsRequested(args) {
            const that = this
            const listView = this.traktList;
            if (this.traktList.length > 0) {
                setTimeout(function () {
                    that.get().addMoreItemsFromSource(2);
                    listView.notifyLoadOnDemandFinished();
                }, 1000);
                args.returnValue = true;
            } else {
                args.returnValue = false;
                listView.notifyLoadOnDemandFinished(true);
            }
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
