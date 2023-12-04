import IProjeto from "./IProjeto";

export default interface ITarefa {
    id: Number,
    descricao: String,
    tempoDeExecucao: number,
    projeto: IProjeto    
}