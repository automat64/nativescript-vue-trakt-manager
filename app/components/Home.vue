<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" text="Trakt lists"  col="1"/>
            </GridLayout>
            
        </ActionBar>
        
        <RadSideDrawer ref="drawer">
            <SideDrawer></SideDrawer>
            
            <GridLayout ~mainContent columns="*" rows="*">
                <TabView android:tabBackgroundColor="#53ba82"
                        android:tabTextColor="#c4ffdf"
                        android:selectedTabTextColor="#ffffff"
                        androidSelectedTabHighlightColor="#ffffff">
                    <TabViewItem title="Trending">
                        <ShowList v-bind:traktList="this.$store.state.lists.traktLists['trendingList']"></ShowList>
                    </TabViewItem>
                    <TabViewItem title="Popular">
                        <ShowList v-bind:traktList="this.$store.state.lists.traktLists['popularList']"></ShowList>
                    </TabViewItem>
                    <TabViewItem title="Recommended">
                        <ShowList v-bind:traktList="this.$store.state.lists.traktLists['recommendedList']"></ShowList>
                    </TabViewItem>
                </TabView>
            </GridLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
    import ShowList from '@/components/ShowList';
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
                if (this.$store.state.lists.traktLists['trendingList'].length==0) {
                    this.$store.state.services.trakt.traktList('trending').then( function (response) {
                        that.$store.commit('lists/updateList',['trendingList',response]);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }

                if (this.$store.state.lists.traktLists['popularList'].length==0) {
                    this.$store.state.services.trakt.traktList('popular').then( function (response) {
                        that.$store.commit('lists/updateList',['popularList',response]);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }

                if (this.$store.state.lists.traktLists['recommendedList'].length==0) {
                    this.$store.state.services.trakt.recommendations().then( function (response) {
                        that.$store.commit('lists/updateList',['recommendedList',response]);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
            }
            
        },
        components: {
            ShowList,SideDrawer
        }
    }
</script>

<style scoped>
    
</style>
