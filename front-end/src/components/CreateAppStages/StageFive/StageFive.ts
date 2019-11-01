import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { requireField, validateImageSize } from '@/Helpers/FormValidate';
import StageFiveInterface from '@/components/CreateAppStages/StageFive/StageFiveInterface';
import { SnackBarInterface } from '@/Store/Global/Interfaces/Interface';

@Component({ })
export default class StageFive extends Vue {
    @Prop(Function) public nextStep!: () => void;
    @Prop(Function) public prevStep!: () => void;
    @Prop(Function) public submitStepData!: (name: string, data: any) => void;
    @Prop(Function) public addSnackBarMessage!: (message: SnackBarInterface) => void;

    public listOfInputs: StageFiveInterface[] = [];
    public count: number = 0;

    public fieldRules = {
        requireField,
    };

    get disabledButton() {
        return this.listOfInputs.length >= 5;
    }

    public addInputImage() {
        this.count++;
        const id = `f${(+new Date()).toString(16)}`;
        this.listOfInputs.push({
            name: `Скриншот ${this.count}*`,
            nameID: '',
            id,
            file: null,
            index: this.count,
        });
    }

    public removeInputImage(index: number) {
        this.count--;
        this.$delete(this.listOfInputs, index);
    }

    public onNextStep() {
        const stageFive = this.listOfInputs;
        this.submitStepData('stageFive', stageFive);
        this.nextStep();
    }

    public onPrevStep() {
        this.prevStep();
    }

    public onFilePicked(file: File, inputIndex: number, id: string) {
        const screenshotsList = (this as any).listOfInputs[inputIndex];
        if (file) {
            const fr = new FileReader ();
            const blob = file.slice(0, file.size, 'image/png');
            const newFile = new File([blob], `${id}-${file.name}`, { type: 'image/png'});
            fr.readAsDataURL(file);
            fr.addEventListener('load', () => {
                const res = fr.result as any;
                validateImageSize(res, { min: 200, max: 750} )
                    .then((response) => {
                        if (response) {
                            screenshotsList.file = newFile;
                            screenshotsList.nameID = newFile.name;
                            screenshotsList.name = file.name;
                        } else {
                            this.addSnackBarMessage({
                                message: 'Image sizes must be at least 200px and not more than 750px',
                                color: 'error',
                            });
                        }
                    })
                    .catch((err) =>  new Error(err));
            });
        }
    }
}
