<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" text="Search"  col="1"/>
            </GridLayout>
        </ActionBar>
        <RadSideDrawer ref="drawer">
            <SideDrawer></SideDrawer>
            <GridLayout ~mainContent columns="*" rows="*">
               <StackLayout>
                   <SearchBar v-model="searchString" v-on:textChange="searchTrakt" v-on:Submit="searchTrakt" hint="Enter text"/>
                   <ShowList v-bind:traktList="this.searchResults"></ShowList>
               </StackLayout>
            </GridLayout>
        </RadSideDrawer>
    </Page>
</template>

<script>
    import ShowList from './ShowList.vue';
    import SideDrawer from '@/components/SideDrawer';
    
    export default {
        data() {
            return {
                searchResults: [],
                searchString: '',
                searching: false,
            }
        },
        created: function () {
            
        },      
        mounted: function () {

        },
        methods: {
            searchTrakt: function () {
                let that = this;
                if (this.searchString.length<3) {
                    this.searchResults = [];
                }
                else {
                    this.searching=true;
                    this.$store.state.services.trakt.search(this.searchString).then(function(response) {
                        that.searchResults=response;
                        that.searching=false;
                    })
                    .catch(function () {
                        that.searching=false;
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
    SearchBar {
        background-color: #eee;
    }
</style>
