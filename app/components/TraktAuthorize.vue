<template>
    <Page class="page">
        <GridLayout>
            <Button text="Authorize Trakt" @tap="goToTrakt()" />
        </GridLayout>
    </Page>
</template>

<script>
    import AppInit from "./AppInit";
    var utilsModule = require("tns-core-modules/utils/utils");
    const application = require("tns-core-modules/application");

    export default {
        name: 'TraktAuthorize',
        data: function() {
            return {
                //code: this.$route.query.code
            };
        },
        methods: {
            goToTrakt() {
                utilsModule.openUrl(this.$store.state.services.trakt.traktUrl);
            },
            getCodeFromIntent() {
                
            }
        },
        created: function () {

            let that=this;
            this.traktUrl = this.$store.state.services.trakt.traktUrl;
            let code = null;
            
            application.android.on(application.AndroidApplication.activityResumedEvent, function (args) {
                console.log("Event: " + args.eventName + ", Activity: " + args.activity);
                var intentDataUri = args.activity.getIntent().toURI();
                var regex = /[?&]([^=#]+)=([^&#]*)/g,
                    url = intentDataUri,
                    params = {},
                    match;
                while(match = regex.exec(url)) {
                    params[match[1]] = match[2];
                }
                console.log(params.code);
                if (params.code) {
                    that.$store.state.services.trakt.authorize(params.code).then(function () {
                        console.log("authorized");
                        setTimeout(function(){ that.$navigateTo(AppInit) }, 200);
                       // that.$root.router.push("/");
                    }).catch(function (error) {
                        console.log(error);
                        //that.$root.router.push("/authorize");
                    });
                }
            });
            console.log ("Trakt Code: "+code);
            

        },
    }
</script>

<style lang="scss">
    #trakt-authorize {
        a {
            text-decoration: none;
        }
    }
</style>