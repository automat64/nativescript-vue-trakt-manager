<template>
    <DockLayout  backgroundColor="#eee">
        <TextView editable="false" :text="show.overview" />
    </DockLayout >
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