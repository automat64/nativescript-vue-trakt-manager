<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" text="User lists"  col="1"/>
            </GridLayout>
            
        </ActionBar>
        
        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#ffffff">
                <Label class="drawer-header" text="Drawer"/>

                <Label class="drawer-item" text="Trakt lists"  @tap="gotoTraktLists()"/>
                <Label class="drawer-item" text="User Lists"/>
                <Label class="drawer-item" text="Progress"/>
                <Label class="drawer-item" text="Calendar"/>
                <Label class="drawer-item" text="Search"/>
                <Label class="drawer-item" text="Settings"/>
            </StackLayout>

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
    import Home from '@/components/Home';
    import ShowList from './ShowList.vue';
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

                if (this.$store.state.lists.traktLists['collectionList'].length==0) {
                    this.$store.state.services.trakt.userList('collection').then( function (response) {
                        that.$store.commit('lists/updateList',['collectionList',response]);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }

                if (this.$store.state.lists.traktLists['watchList'].length==0) {
                    this.$store.state.services.trakt.userList('watchlist').then( function (response) {
                        that.$store.commit('lists/updateList',['watchList',response]);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                }
        
            },
            gotoTraktLists: function() {
                this.$navigateTo(Home);
            }
        },
        components: {
            ShowList
        }
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
