import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import Preloader from '@/UI/Preloader/Preloader.vue';


@Component({
    components: { Preloader },
})
export default class WrapperPreloader extends Vue {
    @Prop(Boolean) public status!: boolean;
}
