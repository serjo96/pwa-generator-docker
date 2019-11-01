import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import SnackBar from '@/UI/Snackbar/SnackBar.vue';
import Header from '@/components/Header/Header';



@Component({
    components: { Header, SnackBar},
})
export default class MainPage extends Vue {

}
