export enum ReasonEnum {
    Garantia = 'Garantía',
    ContactoGeneral = 'Contacto general'
}

export interface Contact {
    nameContact: string;
    email: string;
    reason: ReasonEnum;
    attach: string;
    department: string;
    city: string;
    cellphone: string;
    comment: string;
}
