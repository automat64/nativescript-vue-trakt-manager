<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" text="Welcome to NativeScript-Vue!"  col="1"/>
            </GridLayout>
            
        </ActionBar>
        
        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#ffffff">
                <Label class="drawer-header" text="Drawer"/>

                <Label class="drawer-item" text="Item 1"/>
                <Label class="drawer-item" text="Item 2"/>
                <Label class="drawer-item" text="Item 3"/>
            </StackLayout>

            <GridLayout ~mainContent columns="*" rows="*">
                <TabView android:tabBackgroundColor="#53ba82"
                        android:tabTextColor="#c4ffdf"
                        android:selectedTabTextColor="#ffffff"
                        androidSelectedTabHighlightColor="#ffffff">
                    <TabViewItem title="Trending">
                        <GridLayout columns="*" rows="*">
                            <ShowList v-bind:traktList="this.$store.state.lists.traktLists['trendingList']"></ShowList>
                        </GridLayout>
                    </TabViewItem>
                    <TabViewItem title="Popular">
                        <GridLayout columns="*" rows="*">
                            <ShowList v-bind:traktList="this.$store.state.lists.traktLists['popularList']"></ShowList>
                        </GridLayout>
                    </TabViewItem>
                    <TabViewItem title="Recommended">
                        <GridLayout columns="*" rows="*">
                            <ShowList v-bind:traktList="this.$store.state.lists.traktLists['recommendedList']"></ShowList>
                        </GridLayout>
                    </TabViewItem>
                </TabView>
            </GridLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
    import ShowList from './ShowList.vue';
    export default {
        data() {
            return {
                msg: 'Hello World!'
            }
        },
        mounted: function () {
            let that = this;
            this.$store.state.services.trakt.traktList('trending').then( function (response) {
                that.$store.commit('lists/updateList',['trendingList',response]);
            })
            .catch(function (error) {
                console.log(error);
            });
            this.$store.state.services.trakt.traktList('popular').then( function (response) {
                that.$store.commit('lists/updateList',['popularList',response]);
            })
            .catch(function (error) {
                console.log(error);
            });
            this.$store.state.services.trakt.recommendations().then( function (response) {
                that.$store.commit('lists/updateList',['recommendedList',response]);
            })
            .catch(function (error) {
                console.log(error);
            });
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
