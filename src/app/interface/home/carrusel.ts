export class Carrusel {

    private sourceImage: string;
    private titleImage: string;
    private subTitleImage: string;
    private interval: string;

    constructor(
        sourceImage: string,
        titleImage: string,
        subTitleImage: string,
        interval: string
    ) {
        this.sourceImage = sourceImage
        this.titleImage = titleImage
        this.subTitleImage = subTitleImage
        this.interval = interval
    }


    public getSourceImage(): string {
        return this.sourceImage;
    }

    public setSourceImage(sourceImage: string): void {
        this.sourceImage = sourceImage;
    }

    public getTitleImage(): string {
        return this.titleImage;
    }

    public setTitleImage(titleImage: string): void {
        this.titleImage = titleImage;
    }

    public getSubTitleImage(): string {
        return this.subTitleImage;
    }

    public setSubTitleImage(subTitleImage: string): void {
        this.subTitleImage = subTitleImage;
    }

    public getInterval(): string {
        return this.interval;
    }

    public setInterval(interval: string): void {
        this.interval = interval;
    }

}