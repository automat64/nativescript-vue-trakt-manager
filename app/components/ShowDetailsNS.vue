<template>
    <Page>
        
            <ActionBar :title="show.title" flat="true">
                <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"/>
                <ActionItem @tap="openMenu" android.systemIcon="ic_menu_moreoverflow_normal_holo_light" android.position="actionBar" />
            </ActionBar>
        <StackLayout  backgroundColor="#eee">
            
           <StackLayout>
                <Carousel height="230" width="100%" indicatorColor="#fff000" finite="true" bounce="false" showIndicator="true" verticalAlignment="top" android:indicatorAnimation="swap" color="white"> 
                    <CarouselItem v-for="item in this.$store.state.lists.photoLists['backgroundList'][this.show.ids.tvdb]" :key="item.id">
                            <!-- Shows the list item label in the default color and style. -->
                            <!-- <Label text="Slide 4" backgroundColor="#50000000" horizontalAlignment="center"/> -->
                        <Image  :src="item.url" stretch="aspectFit" />
                    </CarouselItem>
                </Carousel>
            </StackLayout>
            <StackLayout>
                <TextView editable="false" :text="show.overview" width="100%"/>    
            </StackLayout>
        </StackLayout >
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
        computed: {
            cssProps() { 
                return {
                    'background-image': 'url('+ this.show.background +')',
                    'background-size': 'cover',
                    'opacity' :'1'
                }
            }
        },
        mounted: function () {
            console.log(this.$store.state.lists.photoLists['backgroundList'][this.show.ids.tvdb])
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
        
        components: {
            ListMenu
        }
    }
</script>

<style lang="scss">
    
</style>