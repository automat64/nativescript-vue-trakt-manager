<template>
    <!-- <ul id="right-click-menu" tabindex="-1" v-if="viewMenu" v-on:blur="closeMenu"  v-bind:style="{top:top, left:left}"> -->
    <Page>
        <StackLayout>
            <Button v-if="inWatchlist == false"  @tap="addToWatchlist" text="Add to Watchlist"/>
            <Button v-if="inWatchlist == true"  @tap="removeFromWatchlist" text="Remove from Watchlist"/>
            <Button v-if="inCollection == false"  @tap="addToCollection" text="Add to Collection"/>
            <Button v-if="inCollection == true"  @tap="removeFromCollection" text="Remove from Collection"/>
            <Button @tap="$modal.close" text="close me"/>
        </StackLayout>
    </Page>
</template>

<script>
    

   export default {
        name: 'ListMenu',
        props: ['show'],
        
        data: function () {
            return {
                viewMenu: false,
                top: '0px',
                left: '0px'
            }
        },
        computed: {
            inWatchlist () {
                return (this.$store.state.lists.traktLists['watchList'].indexOf(this.show) > -1) ? true : false;   
            },
            inCollection: function () {
                return (this.$store.state.lists.traktLists['collectionList'].indexOf(this.show) > -1) ? true : false; 
            }
        },
        created: function () {
            console.log(this.show);
            
        },
        methods: {
            // setMenu: function(top, left) {
            //     this.top = top  + 'px';
            //     this.left = left + 30 + 'px';
            //     if (left>(window.innerWidth-150)) this.left = left - 260 + 'px';
            // },
            // closeMenu: function() {
            //     this.viewMenu = false;  
            // },
            // clickMenu: function(e) {

            //     (this.viewMenu ? this.closeMenu() : this.openMenu(e));        
            // },
            // openMenu: function(e) {
            //     let that=this;
            //     setTimeout(function(){ 
            //         let bounds = e.target.getBoundingClientRect()
            //         that.viewMenu = true;

            //         that.setMenu(bounds.top, bounds.left,)
            //     }, 20);
                
            //     e.preventDefault();
            // },
            addToWatchlist: function () {
                let that=this;
                
                this.$store.state.services.trakt.addToWatchlist(this.show).then(function (response) {
                    if (response) {
                        that.$store.commit('lists/insertItem',['watchList',that.show]);
                        
                        that.$feedback.success({
                            title: "Trakt Watchlist",
                            message: "Item added succesfully",
                            duration: 1000,
                        });
                        that.$modal.close();
                    }
                    else {  
                        that.$feedback.error({
                            title: "Trakt Watchlist",
                            message: "Item already exists in Watchlist",
                            duration: 1000,
                        });
                        that.$modal.close();
                    }
                }).catch(function () {
                   that.$feedback.error({
                        title: "Trakt error",
                        message: "Could not complete action",
                        duration: 1000,
                    });
                    that.$modal.close();
                });

                this.viewMenu = false; 
            },
            removeFromWatchlist: function () {
                let that=this;

                this.$store.state.services.trakt.removeFromWatchlist(this.show).then(function (response) {
                    if (response) {
                        that.$store.commit('lists/removeItem',['watchList',that.show]);

                        that.$feedback.success({
                            title: "Trakt Watchlist",
                            message: "Item removed succesfully",
                            duration: 1000,
                        });
                        that.$modal.close();

                    }
                    else {
                        that.$feedback.error({
                            title: "Trakt Watchlist",
                            message: "Item does not exist in Watchlist",
                            duration: 1000,
                        });
                        that.$modal.close();
                    }
                }).catch(function () {
                    that.$feedback.error({
                        title: "Trakt error",
                        message: "Could not complete action",
                        duration: 1000,
                    });
                    that.$modal.close();
                });

                this.viewMenu = false; 
            },
            addToCollection: function () {
                let that=this;

                this.$store.state.services.trakt.addToCollection(this.show).then(function (response) {
                    if (response) {
                        that.$store.commit('lists/insertItem',['collectionList',that.show]);
                        that.$feedback.success({
                            title: "Trakt Collection",
                            message: "Item added succesfully",
                            duration: 1000,
                        });
                        that.$modal.close();
                    }
                    else {
                        that.$feedback.error({
                            title: "Trakt Collection",
                            message: "Item already exists in Collection",
                            duration: 1000,
                        });
                        that.$modal.close();
                    }
                }).catch(function () {
                    that.$feedback.error({
                        title: "Trakt error",
                        message: "Could not complete action",
                        duration: 1000,
                    });
                    that.$modal.close();
                });

                this.viewMenu = false; 
            },
            removeFromCollection: function () {
                let that=this;

                this.$store.state.services.trakt.removeFromCollection(this.show).then(function (response) {
                    if (response) {
                        that.$store.commit('lists/removeItem',['collectionList',that.show]);
                        that.$feedback.success({
                            title: "Trakt Collection",
                            message: "Item removed succesfully",
                            duration: 1000,
                        });
                        that.$modal.close();
                    }
                    else {
                        that.$feedback.error({
                            title: "Trakt Watchlist",
                            message: "Item does not exist in Collection",
                            duration: 1000,
                        });
                        that.$modal.close();
                    }
                }).catch(function () {
                    that.$feedback.error({
                        title: "Trakt error",
                        message: "Could not complete action",
                        duration: 1000,
                    });
                    that.$modal.close();
                });

                this .viewMenu = false; 
            },
        }
    }
</script>

<style lang="scss">
</style>