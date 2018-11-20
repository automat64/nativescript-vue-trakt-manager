<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" text="Settings"  col="1"/>
            </GridLayout>
            
        </ActionBar>
        
        <RadSideDrawer ref="drawer">
            <SideDrawer></SideDrawer>
            <StackLayout ~mainContent columns="*" rows="*" backgroundColor="#3c495e">
                <FlexboxLayout class="p-30">
                    <Image :src="photo" stretch="none" />
                    <Label textWrap="true"  class="trakt_user">
                    <FormattedString >
                        <Span fontWeight="bold" :text="name" />
                        <Span text=" (" />
                        <Span :text="username" fontStyle="italic" />
                        <Span text=") " />    
                    </FormattedString>
                    </Label>
                    
                </FlexboxLayout>
                <StackLayout>
                    <Button class="btn btn-primary btn-active" id="button" text="Deauthorize Trakt" @tap="deauthorizeTrakt"></Button>
                    <Button class="btn btn-primary btn-active" id="button" text="Clear Storage" @tap="clearStorage"></Button>
                </StackLayout>
            </StackLayout>
            
        </RadSideDrawer>
    </Page>
</template>

<script>
    import SideDrawer from '@/components/SideDrawer';
    export default {
        name: 'Settings',
        props: [],
        data: function () {
            return {
              photo:'',
              name:'loading...',
              username:'loading...'
            };
        },
        created: function () {
            let that = this;
            this.$store.state.services.trakt.user().then(function (response) {
                that.name=response.data.name;
                that.username=response.data.username;
                that.photo=response.data.images.avatar.full;
            }).catch(function (error) {
                console.log(error);
                //that.$root.router.push("/authorize");
            });
        },
        methods: {
            deauthorizeTrakt: function () {
                let that = this;
                this.$store.state.services.trakt.deauthorize().then(function () {
                    console.log("deauthorized");
                    that.$navigateTo(that.$routes.AppInit);
                })
            },
            clearStorage: function () {
                require( "nativescript-localstorage" );
                localStorage.clear();    
                console.log("cleared storage");
            }

        },
        components: {
            SideDrawer
        }
    }
</script>

<style lang="scss">
.trakt_user {
    color:#fff;
    margin:85px;
    font-size: 18px;
}
</style>