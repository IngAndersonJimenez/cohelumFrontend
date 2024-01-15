export class ShowCaseGallery {

    private idResouce: number;
    private sourceResorce: string;
    private titleInfo: string;
    private description: string;

    constructor(idResouce: number, sourceResorce: string, titleInfo: string, description: string) {
        this.idResouce = idResouce;
        this.sourceResorce = sourceResorce;
        this.titleInfo = titleInfo;
        this.description = description;
    }

    getIdResouce(): number {
        return this.idResouce;
    }

    getSourceResorce(): string {
        return this.sourceResorce;
    }

    getTitleInfo(): string {
        return this.titleInfo;
    }

    getDescription(): string {
        return this.description;
    }

    setIdResouce(idResouce: number) {
        this.idResouce = idResouce;
    }

    setSourceResorce(sourceResorce: string) {
        this.sourceResorce = sourceResorce;
    }

    setTitleInfo(titleInfo: string) {
        this.titleInfo = titleInfo;
    }

    setDescription(description: string) {
        this.description = description;
    }


}