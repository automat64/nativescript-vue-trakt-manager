<template>
    <Page ref="page" class="page">
        <ActionBar class="action-bar">
            <Label class="action-bar-title" text="Trakt App"></Label>
        </ActionBar>

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
    import Home from '@/components/Home';
    import ShowList from '@/components/ShowList';
    import TraktAuthorize from '@/components/TraktAuthorize';
    import TraktApp from '@/components/TraktApp';
    import Vue from 'nativescript-vue';

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
            }
        },
        components: {
            Home
        },
        mounted: function () {
           // this.$navigateTo(Home);
            require( "nativescript-localstorage" );
            localStorage.clear();
            let that = this;
            console.log("app init template loaded");  
            this.appStatus = "Checking refresh token";
            if (this.$store.state.services.trakt.traktRefreshToken==null || this.$store.state.services.trakt.traktRefreshToken=='') {
                this.appStatus = "Refresh token not found, redirecting.";
                setTimeout(function(){ that.$navigateTo(TraktAuthorize) }, 300);
            }
            else {
                this.appStatus = "Refresh token found. Refreshing...";
                this.$store.state.services.trakt.refresh().then(function () {
                    that.appStatus = "Token refreshed, moving on..";
                    setTimeout(function(){ that.$navigateTo(Home) }, 200);

                })
                .catch(function (error) {
                    console.log(error);
                    that.$root.router.push("/authorize");
                }); 
            }
        },
    }
</script>

<style lang="scss">

</style>