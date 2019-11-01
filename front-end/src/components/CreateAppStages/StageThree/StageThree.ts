import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { requireField } from '@/Helpers/FormValidate';
import StageThreeInterface from '@/components/CreateAppStages/StageThree/StageThreeInterface';

@Component({ })
export default class StageThree extends Vue {
    @Prop(Function) public nextStep!: () => void;
    @Prop(Function) public prevStep!: () => void;
    @Prop(Function) public submitStepData!: (name: string, data: any) => void;
    @Prop(Object) public stepData!: StageThreeInterface;

    public valid: boolean = true;
    public fieldRules = {
        required: requireField,
    };


    get formValidate() {
        return (this.$refs.form as Vue & { validate: () => boolean }).validate();
    }

    public onNextStep() {
        if (this.formValidate) {
            this.nextStep();
        }
    }

    public onPrevStep() {
        this.prevStep();
    }

}
