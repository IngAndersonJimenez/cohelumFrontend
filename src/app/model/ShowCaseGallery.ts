export class ShowCaseGallery {

    private idResouce: string;
    private sourceResorce: string;
    private titleInfo: string;
    private description: string;

    constructor(idResouce: string, sourceResorce: string, titleInfo: string, description: string) {
        this.idResouce = idResouce;
        this.sourceResorce = sourceResorce;
        this.titleInfo = titleInfo;
        this.description = description;
    }

    getIdResouce(): string {
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

    setIdResouce(idResouce: string) {
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