export interface Roles {
    user: boolean;
    admin?: boolean;
}

export class User {
    nome?: string;
    email: string;
    photoURL: string;
    roles: Roles;

    constructor(authData) {
        this.email = authData.email;
        this.photoURL = authData.photoURL;
        this.roles = { user: true };
    }
}

export interface Foto {
    id?: number;
    anexo: string;
    urlAnexo: string;
}

export interface Pessoa {
    id: number;
    situacao?: string;
    sexo: string;
    nome: string;
    cpf: string;
    creci?: string;
    rg: string;
    estadoCivil: string;
    profissao: string;
    nacionalidade: string;
    email?: string;
    telefone: string;
    cep?: string;
    uf: number;
    cidade: string;
    bairro: string;
    logradouro: string;
    numero?: string;
    complemento?: string;
}

export interface Imovel {
    id?: number;
    situacao: string;
    tipoImovel: number;
    qtdQuarto?: number;
    qtdSuite?: number;
    qtdBanheiro?: number;
    qtdSala?: number;
    qtdGaragem?: number;
    areaTerreno?: number;
    areaConstruida?: number;
    valorAluguel?: number;
    valorCondominio?: number;
    valorIptu?: number;
    acessorios?: string;
    cep?: string;
    uf: number;
    cidade: string;
    bairro: string;
    logradouro: string;
    numero?: string;
    complemento?: string;
    fotos?: Foto[];
    despesas?: DespesaImovel[];
    proprietario?: Pessoa;
}

export interface DespesaImovel {
    id?: number;
    descricao: string;
    data: Date;
    valor: number;
    imovel: number;
}

export interface DespesaImovelNewDTO {
    descricao: string;
    data: Date;
    valor: number;
    idImovel: number;
}

export interface Contrato {
    id?: number;
    dataInicio: Date;
    dataFim: Date;
    duracao: number;
    diaVencimento: Date;
    valorAluguel: number;
    agregarIptu: string;
    valorIptu?: number;
    caucao?: string;
    valorCaucao?: number;
    obs: string;
    situacao?: string;
    imovel?: Imovel;
    locatario1: Pessoa;
    locatario2: Pessoa;
    fiador?: Pessoa;
    locador: Pessoa;
    procurador?: Pessoa;
}

export interface ContratoNewDTO {
    dataInicio: Date;
    dataFim: Date;
    duracao: number;
    diaVencimento: Date;
    valorAluguel: number;
    caucao?: number;
    obs?: string;
    situacao?: string;

    idImovel: number;
    idLocatario: number;
    idFiador?: number;
    idLocador: number;
    idProcurador?: number;
}

export interface Aluguel {
    id: number;
    dtVencimento: Date;
    dtPagamento?: Date;
    valor?: number;
    iptu: number;
    desconto?: number;
    total?: number;
    status?: string;
    color?: string;
    contrato?: Contrato;
}

export interface Repasse {
    id: number;
    dtEntrada: Date;
    dtPagamento?: Date;
    despesa?: number;
    info_despesa?: string;
    receita?: number;
    info_receita?: string;
    referente?: string;
}

export interface AluContNotifications {
    id: string;
    msg: string;
    dtVencimento: Date;
}

export interface AluguelEstatisticaMes {
    nomeMes: string;
    total: number;
}

export interface EstatisticaMesCaixa {
    nomeMes: string;
    total: number;
    operacao: string;
}

export interface QtdImoveis {
    livre: number;
    ocupado: number;
    total: number;
}

export interface Uf {
    label: string;
    value: string;
}

export interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}

export interface Location {
    lat: number;
    lng: number;
    viewport?: Object;
    zoom: number;
    address_level_1?: string;
    address_level_2?: string;
    address_country?: string;
    address_zip?: string;
    address_state?: string;
    marker?: Marker;
}

