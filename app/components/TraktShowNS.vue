<template>
    <DockLayout  backgroundColor="#3c495e">
        <Image :src="photo" dock="left" width="150" stretch="aspectFit" @tap="showDetails()"/>
        <Label :text="show.title" dock="top" width="" backgroundColor="#43b883"/>
        <Label text="IMDB" dock="top" width="" backgroundColor="#1c6b48" @tap="goToImdb()"/>
        <Label text="Trailer" dock="top" width="" backgroundColor="#289062" @tap="goToTrailer()"/>
    </DockLayout >
</template>

<script>

    // import ListMenu from './ListMenu.vue';
    import ShowDetailsNS from './ShowDetailsNS.vue';

    var utilsModule = require("tns-core-modules/utils/utils");

    export default {
        name: 'TraktShow',
        props: ['show'],
        data: function () {
            return {
              photo:'',
              imdb_link:'#',
              component_show:this.show,
            };
        },
        watch: {
            show: {
                // the callback will be called immediately after the start of the observation
                immediate: true, 
                handler (val, oldVal) {
                    this.photo="";
                    this.getDetails();
                }
            }
        },
        mounted: function () {
            //this.getDetails();
        },
        methods: {
            showDetails () {
                //console.log(this.$store.state.lists.photoLists['hdtvList'][this.show.ids.tvdb]);
                this.$navigateTo(ShowDetailsNS, {
                    props: {
                        show: this.show,
                    }
                });
            },
            goToImdb () {
                utilsModule.openUrl(this.imdb_link);
            },
            goToTrailer () {
                utilsModule.openUrl(this.show.trailer);
            },
            getDetails () {
                let that = this;
                this.imdb_link="http://www.imdb.com/title/"+this.show.ids.imdb+"/"; 
                //console.log("running mounted for "+that.show.title);  
                if (this.$store.state.lists.photoLists['hdtvList'][this.show.ids.tvdb]!=undefined) {
                    that.photo=this.$store.state.lists.photoLists['hdtvList'][this.show.ids.tvdb];
                    //console.log("photo exists in state");
                } else {
                    this.$store.state.services.fanart.query(this.show.ids.tvdb).then(function (response) {
                        //console.log("running fanart for "+that.show.title);
                        that.photo=response.data.hdtvlogo[0].url;
                        that.show.photo = that.photo;
                        //console.log(that.show.photo);
                        if (response.data.tvposter) that.show.poster = response.data.tvposter[0].url;
                        if (response.data.showbackground) that.show.background = response.data.showbackground[0].url;
                          
                        that.$store.commit('lists/updateHdtvList',[that.show.ids.tvdb,response.data.hdtvlogo[0].url]);
                        that.$store.commit('lists/updateBackgroundList',[that.show.ids.tvdb,response.data.showbackground]);
                        that.$store.commit('lists/updatePosterList',[that.show.ids.tvdb,response.data.tvposter]);

                    }).catch(function (error) {
                        console.log(error);
                        that.photo="/no-banner.png";
                        that.show.photo = that.photo;
                    });
                }
            }
        },
        components: {
            ShowDetailsNS
        },
    }
</script>

<style lang="scss">
#trakt-show {
    display:flex;
    flex-shrink: 0;
    .show-container {
        position: relative;
        h5 {
            color:#222;
        }
        .button {
            position: absolute;
            right:0;
            top:0;
            border: none;
            background: transparent;
        }
        .imdb-link a:first-of-type {
            margin-right: 10px;
        }
    }
}
</style>