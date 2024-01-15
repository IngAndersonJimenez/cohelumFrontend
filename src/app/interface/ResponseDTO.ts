import { SettingFullTP } from "./settings/SettingFullTP";



export class ResponseDTO {

    private responseDTO: Array<SettingFullTP>;

    constructor(responseDTO: Array<SettingFullTP>) {
        this.responseDTO = responseDTO
    }

    public getResponseDTO(): Array<SettingFullTP> {
        return this.responseDTO;
    }

    public setResponseDTO(responseDTO: Array<SettingFullTP>): void {
        this.responseDTO = responseDTO;
    }

}