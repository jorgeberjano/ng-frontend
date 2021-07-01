
export enum Alineacion {
    Izquierda = 0,
    Derecha,
    Centro    
}

export interface Campo {
    idCampo: string;
    titulo: string;
    tipoDato: string;
    tipoRol: string;
    alineacion: number;
    longitud: number;
    estilo: number;
    formato: string;
    tamano: number;
    consultaSeleccion: string;
    idCampoRelacion: string;
    idCampoSeleccion: string;
    valorNulo: string;
    valorPorDefecto: string;
    opciones: Array<string>;
}

export interface Consulta {
    idConsulta: string;
    nombreEnSingular: string;
    nombreEnPlural: string;
    campos: Array<Campo>;
}

export interface Paginacion {
    pagina: number;
    limite: number;
}

export interface Orden {
    idCampo: string;
    descendente: boolean;
}

export interface CondicionFiltro {
    indice: number;
    campo: Campo;
    operador: string;
    valor: string;
}

export interface Filtro {
    condiciones: Array<CondicionFiltro>;
}

export interface EstadoConsulta {
    consulta: Consulta;
    filtro: Filtro;
    orden: Orden;
    paginacion: Paginacion;
    campos: Array<Campo>;
}

export interface PersonalizacionConsulta {
    rutaEdicion: string;
}