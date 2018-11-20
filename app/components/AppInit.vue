<template>
    <Page actionBarHidden="true" ref="page" class="page" @navigatedTo="onNavigatedTo()">
        <!-- <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Trakt App"></Label>
        </ActionBar> -->

        <GridLayout>
            <Label class="info" horizontalAlignment="center" verticalAlignment="center">
                <FormattedString>
                    <Span class="fa" text.decode="&#xf135; "/>
                    <Span :text="appStatus"/>
                </FormattedString>
            </Label>
        </GridLayout>
    </Page>
</template>

<script>

    export default {
        name: 'AppInit',
        data: function() {
            return {
                appStatus : "Initializing App. Stand By..."
            };
        },
        methods: {
            goToDetailPage() {
                this.$navigateTo(Home);
            },
            onNavigatedTo() {
                this.checkTrakt();
            },
            checkTrakt() {
                let that = this;
                this.appStatus = "Checking refresh token";
                if (this.$store.state.services.trakt.traktRefreshToken==null || this.$store.state.services.trakt.traktRefreshToken=='') {
                    this.appStatus = "Refresh token not found, redirecting.";
                    setTimeout(function(){ that.$navigateTo(that.$routes.TraktAuthorize) }, 300);
                }
                else {
                    this.appStatus = "Refresh token found. Refreshing...";
                    this.$store.state.services.trakt.refresh().then(function () {
                        that.appStatus = "Token refreshed, moving on..";
                        setTimeout(function(){ that.$navigateTo(that.$routes.Home) }, 200);

                    })
                    .catch(function (error) {
                        console.log(error);
                    }); 
                }
            }
        },

        created: function () {      
            console.log("app init template loaded");  
        },
    }
</script>

<style lang="scss">

</style>