export class Subject {

  public constructor(
    public id: string,
    public text: string,
    public index: number,
    public levelEscuela: boolean,
    public levelSecundaria: boolean,
    public levelPreparatoria: boolean,
    public levelUniversidad: boolean,
  ) {}

}
