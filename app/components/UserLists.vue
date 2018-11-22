<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" text="User lists"  col="1"/>
            </GridLayout>
            
        </ActionBar>
        
        <RadSideDrawer ref="drawer">
            <SideDrawer></SideDrawer>

            <GridLayout ~mainContent columns="*" rows="*">
                <TabView android:tabBackgroundColor="#53ba82"
                        android:tabTextColor="#c4ffdf"
                        android:selectedTabTextColor="#ffffff"
                        androidSelectedTabHighlightColor="#ffffff">
                    <TabViewItem title="Collection">
                        <ShowList v-bind:traktList="this.$store.state.lists.traktLists['collectionList']"></ShowList>
                    </TabViewItem>
                    <TabViewItem title="Watchlist">
                        <ShowList v-bind:traktList="this.$store.state.lists.traktLists['watchList']"></ShowList>
                    </TabViewItem>
                </TabView>
            </GridLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
    import ShowList from './ShowList.vue';
    import SideDrawer from '@/components/SideDrawer';
    const application = require("tns-core-modules/application");
    
    export default {
        data() {
            return {
                msg: 'Hello World!'
            }
        },
        created: function () {
            
        },      
        mounted: function () {
            application.android.on(application.AndroidApplication.activityBackPressedEvent, function (args) {
                console.log("Event: " + args.eventName + ", Activity: " + args.activity);
            });

            this.getTraktLists();
        },
        methods: {
            getTraktLists: function() {
                let that = this;

                if (this.$store.state.lists.traktLists['collectionList']!=undefined && this.$store.state.lists.traktLists['collectionList'].length==0) {
                    this.$store.state.services.trakt.userList('collection').then( function (response) {
                        that.$store.commit('lists/updateList',['collectionList',response]);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }

                if (this.$store.state.lists.traktLists['watchList']!=undefined && this.$store.state.lists.traktLists['watchList'].length==0) {
                    this.$store.state.services.trakt.userList('watchlist').then( function (response) {
                        that.$store.commit('lists/updateList',['watchList',response]);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
        
            },
            
        },
        components: {
            ShowList, SideDrawer
        }
    }
</script>

<style scoped>
    
</style>
