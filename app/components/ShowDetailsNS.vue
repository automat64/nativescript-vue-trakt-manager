<template>
    <Page>
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <ActionItem android.position="actionBar" text="Go back" android.systemIcon="ic_menu_back" @tap="goBack" />
                <Label :text="show.title" fontSize="24" verticalAlignment="center" />
            </GridLayout>
        </ActionBar>
        <DockLayout  backgroundColor="#eee">
            <ActionItem  text="Go back" android.systemIcon="ic_menu_back" @tap="goBack" />
            <TextView editable="false" :text="show.overview" />
        </DockLayout >
    </Page>
</template>

<script>

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
            goBack: function () {
                
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
        }
    }
</script>

<style lang="scss">
    
</style>