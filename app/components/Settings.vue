<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" text="Trakt lists"  col="1"/>
            </GridLayout>
            
        </ActionBar>
        
        <RadSideDrawer ref="drawer">
            <SideDrawer></SideDrawer>
            <GridLayout ~mainContent columns="*" rows="*">
                <FlexboxLayout backgroundColor="#3c495e">
                    <Image :src="photo" stretch="none" />
                    <Label textWrap="true">
                    <FormattedString>
                        <Span fontWeight="bold" :text="name" />
                        <Span :text="username" fontStyle="italic" />
                        
                    </FormattedString>
                    </Label>
                </FlexboxLayout>
            </GridLayout>
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
                this.$root.trakt.deauthorize().then(function () {
                   //that.$root.router.push("/");
                })
            },
        },
        components: {
            SideDrawer
        }
    }
</script>

<style lang="scss">
</style>