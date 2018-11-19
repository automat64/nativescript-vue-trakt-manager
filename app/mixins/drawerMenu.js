export default {
    data () {
        return {
        }
    },
    computed: {
    },
    watch: {
    },
    methods: {
        gotoSettings: function() {
            this.$navigateTo(this.$routes.Settings);
        },
        gotoUserLists: function() {
            this.$navigateTo(this.$routes.UserLists);
            //this.$refs.drawer.nativeView.closeDrawer();
        },
        gotoTraktLists: function() {
            this.$navigateTo(this.$routes.Home);
        },
    }
  }