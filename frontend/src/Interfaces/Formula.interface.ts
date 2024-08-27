import { Program } from "./Program.interface"

export default interface Formula {
    id: number,
    name: string,
    variables: string[],
    operations: string[],
    expression: string
}

export interface Variable {
    name: string,
    definition?: string ,
    isConstant: boolean,
}

export interface VariableInput {
    component?: string,
    data?: string[],
    definition?: number,
    w?: string,
    filled?: boolean,
    key: string,
    description?: string,
    symbol?: string,
    variant?: string,
    readonly?: boolean,
    pointer?: boolean,
    mask?: string,
}

export interface HypotekaDTOprops {
    HandleHypoteka: (name: string, value: string) => void,
    Hypoteka: Variable[] | undefined,
    Program?: Program
}

export interface Calculateprops {
    index: number,
    variables: number[]
}