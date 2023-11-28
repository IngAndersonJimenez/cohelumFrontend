export enum ReasonEnum {
    Garantia = 'GARANTIA',
    ContactoGeneral = 'CONTACTO_GENERAL'
}

export interface Contact {
    idContact:number;
    nameContact: string;
    email: string;
    reason: ReasonEnum;
    attach?: string  | null;
    department: string;
    city: string;
    cellphone: string;
    comment: string;
}
