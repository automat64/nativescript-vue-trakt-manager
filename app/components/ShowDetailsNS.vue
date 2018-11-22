<template>
    <Page id="details-page">
        
            <ActionBar :title="show.title" flat="true">
                <NavigationButton text="Go Back" android.systemIcon="ic_menu_back" @tap="$navigateBack"/>
                <ActionItem @tap="openMenu" android.systemIcon="ic_menu_moreoverflow_normal_holo_light" android.position="actionBar" />
            </ActionBar>
        <StackLayout>
            
           <StackLayout>
                <Carousel height="235" width="100%" showIndicator ="false" finite="false" bounce="false" verticalAlignment="top" android:indicatorAnimation="swap" color="white"> 
                    <CarouselItem v-for="item in this.$store.state.lists.photoLists['backgroundList'][this.show.ids.tvdb]" :key="item.id">
                            <!-- Shows the list item label in the default color and style. -->
                            <!-- <Label text="Slide 4" backgroundColor="#50000000" horizontalAlignment="center"/> -->
                        <Image  :src="item.url" stretch="aspectFit" />
                    </CarouselItem>
                </Carousel>
            </StackLayout>
            <Label id="show-title" textWrap="true" :text="show.title" width="100%"/>
            <ScrollView height="100%" width="100%">
                <GridLayout columns="200, *" rows="200,*" id="show-details">
                    <StackLayout row="0" col="0">
                        <Image  :src="this.$store.state.lists.photoLists['posterList'][this.show.ids.tvdb][0].url" stretch="aspectFit" />
                    </StackLayout>
                    <StackLayout row="0" col="1">
                        <Label textWrap="true" :text="readableGenres()" width="100%"/>    
                        <Label textWrap="true" :text="'Certification: ' + show.certification" width="100%"/>
                        <Label textWrap="true" :text="'Network: ' + show.network" width="100%"/>
                        <Label textWrap="true" :text="'Runtime: ' + show.runtime" width="100%"/>
                        <Label textWrap="true" :text="'Aired episodes: ' + show.aired_episodes" width="100%"/>
                        <Label textWrap="true" :text="'Status: ' + show.status" width="100%"/>
                    </StackLayout>
                    <StackLayout row="1" col="0" colSpan="2" id="show-synopsis">
                        <Label textWrap="true" :text="show.overview" width="100%"/>
                    </StackLayout>
                </GridLayout>
            
                
            </ScrollView>
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
            console.log(this.$store.state.lists.photoLists['posterList'][this.show.ids.tvdb][0].url)
        },
        methods: {
            readableGenres: function () {
                return 'Genres: ' +this.show.genres.join(", ");
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
    #details-page {
        Label {
            color:#fff;
        }
        #show-title {
            font-size:22px;
            padding:20px;
            text-align:center;
        }
        #show-details {
            padding:20px;
            Label {
                font-size:16px;
                margin-bottom: 10px;
            }
        }
        #show-synopsis {
            padding:20px;
            font-size:18px;
        }
        GridLayout {
            padding:20px;
        }
    }
</style>