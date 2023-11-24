export enum ReasonEnum {
    Garantia = 'GARANTIA',
    ContactoGeneral = 'CONTACTO_GENERAL'
}

export interface Contact {
    nameContact: string;
    email: string;
    reason: ReasonEnum;  // Cambiado a usar el enum
    attach: string;
    department: string;
    city: string;
    cellphone: string;
    comment: string;
}
