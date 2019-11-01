import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { requireField, validateImages, validateImageSize } from '@/Helpers/FormValidate';
import StageOneInterface from '@/components/CreateAppStages/StageOne/StageOneInterface';
import { TemplatesListInterfaces } from '@/Store/Templates/TemplatesInterfaces';
import { FilesPayloadInterface } from '@/Store/Files/FilesInterfaces';

@Component({ })
export default class StageOne extends Vue {
    @Prop(Array) public templatesList!: TemplatesListInterfaces;
    @Prop(Function) public onUploadFiles!: (payload: FilesPayloadInterface) => void;
    @Prop(Function) public nextStep!: () => void;
    @Prop(Function) public submitStepData!: (name: string, data: any) => void;
    @Prop(Function) public onSelectTemplate!: ({ id }: { id: string }) => void;
    @Prop(Object) public stepData!: StageOneInterface;
    @Prop(String) public fileResponse!: string;
    @Prop(Boolean) public createApp!: boolean;

    public imageError: string = '';
    public category: string[] = [
        'Казино',
        'Спорт',
    ];

    public valid: boolean = true;
    public fieldRules = {
        requireField,
        shortLength: (v: string) => v.length <= 12 || 'Name must be less than 12 characters',
    };

    public selectTemplate({ id }: { id: string}) {
        if (id) {
            this.onSelectTemplate({
                id,
            });
        }
    }

    public onFilePicked(file: File) {
        this.onUploadFiles({
            file,
            name: 'appLogo',
            dimension: [180, 180],
            extension: ['png'],
        });
    }

    get formValidate() {
        return (this.$refs.form as Vue & { validate: () => boolean }).validate();
    }

    public onNextStep() {
        if (this.formValidate) {
            this.stepData.appName.trim();
            this.submitStepData('stageOne', this.stepData);
            this.nextStep();
        }
    }


}
