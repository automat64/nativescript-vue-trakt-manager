<template>
    <Page>
        
            <ActionBar :title="show.title" flat="true">
                <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"/>
                <ActionItem @tap="openMenu" android.systemIcon="ic_menu_moreoverflow_normal_holo_light" android.position="actionBar" />
            </ActionBar>
        <DockLayout  backgroundColor="#eee">
            <TextView editable="false" :text="show.overview" />
        </DockLayout >
    </Page>
</template>

<script>
    import ListMenu from "./ListMenu.vue"
    export default {
        name: 'ShowDetails',
        props: ['show','photo'],
        data: function () {
            return {
                viewDetails: false
            }
        },
        methods: {
            readableGenres: function () {
                return this.show.genres.join(", ");
            },
            openModal: function () {
                this.viewDetails = true;
            },
            closeModal: function () {
                this.viewDetails = false;
            },
            openMenu: function () {
                console.log("saf");
                this.$showModal(ListMenu, { props: { show: this.show }});
            }
        },
        computed: {
            cssProps() { 
                return {
                    'background-image': 'url('+ this.show.background +')',
                    'background-size': 'cover',
                    'opacity' :'1'
                }
            }
        },
        components: {
            ListMenu
        }
    }
</script>

<style lang="scss">
    
</style>