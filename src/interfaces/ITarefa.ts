import IProjeto from "./IProjeto";

export default interface ITarefa {
    id: String,
    descricao: String,
    tempoDeExecucao: number,
    projeto: IProjeto    
}