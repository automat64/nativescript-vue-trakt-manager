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

    import Fanart from "../services/fanart.js";
    var utilsModule = require("tns-core-modules/utils/utils");

    export default {
        name: 'TraktShow',
        props: ['show'],
        data: function () {
            return {
              photo:'',
              imdb_link:'#',
            };
        },
        mounted: function () {
            let that = this;
            const fanart = new Fanart();
            this.imdb_link="http://www.imdb.com/title/"+this.show.ids.imdb+"/"; 
            
            this.$store.state.services.fanart.query(this.show.ids.tvdb).then(function (response) {
                that.photo=response.data.hdtvlogo[0].url;
                that.show.photo = that.photo;
                console.log(that.show.photo);
                if (response.data.tvposter) that.show.poster = response.data.tvposter[0].url;
                if (response.data.showbackground) that.show.background = response.data.showbackground[0].url;
            }).catch(function (error) {
                console.log(error);
                that.photo="/no-banner.png";
                that.show.photo = that.photo;
            });
        },
        methods: {
            showDetails () {
                this.$showModal(ShowDetailsNS, {
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