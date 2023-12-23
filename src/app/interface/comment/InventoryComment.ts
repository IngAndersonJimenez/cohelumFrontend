export class InventoryComment {
    private idInventoryComment:number;
    private qualification:number;
    private active:boolean;
    private review:string;
    private name:string;
    private email:string
    private highDate:string

    constructor(idInventoryComment: number, qualification: number, active: boolean, review: string, name: string, email: string,highDate:string) {
        this.idInventoryComment = idInventoryComment;
        this.qualification = qualification;
        this.active = active;
        this.review = review;
        this.name = name;
        this.email = email;
        this.highDate=highDate
    }

    public getHighDate(): string {
        return this.highDate;
    }

    setHighDate(value: string) {
        this.highDate = value;
    }
    public getIdInventoryComment(): number {
        return this.idInventoryComment;
    }

    setIdInventoryComment(value: number) {
        this.idInventoryComment = value;
    }

    public getQualification(): number {
        return this.qualification;
    }

    setQualification(value: number) {
        this.qualification = value;
    }

    public getActive(): boolean {
        return this.active;
    }

    public setActive(value: boolean) {
        this.active = value;
    }

    public getReview(): string {
        return this.review;
    }

    public setReview(value: string) {
        this.review = value;
    }

    public getName(): string {
        return this.name;
    }

    public setName(value: string) {
        this.name = value;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(value: string) {
        this.email = value;
    }
}
