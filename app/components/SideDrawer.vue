<template>
    <StackLayout ~drawerContent backgroundColor="#ffffff">
        <Label class="drawer-header" text="Drawer"/>

        <Label class="drawer-item" text="Trakt lists" @tap="gotoTraktLists()"/>
        <Label class="drawer-item" text="User Lists"  @tap="gotoUserLists()"/>
        <Label class="drawer-item" text="Progress"/>
        <Label class="drawer-item" text="Calendar"/>
        <Label class="drawer-item" text="Search"/>
        <Label class="drawer-item" text="Settings"  @tap="gotoSettings()"/>
    </StackLayout>
</template>


<script>
    import drawerMenu from '~/mixins/drawerMenu';
    
    export default {
        data() {
           
        },
        mixins: [ drawerMenu ]
    }
</script>