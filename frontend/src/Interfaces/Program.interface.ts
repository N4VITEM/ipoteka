import { Discount } from "./Discount.interface";
import { Variable } from "./Formula.interface";

export interface Program {
    id?: number;
    name: string;
    variables: Variable[];
    discounts?: Discount[];
    bankId: number;
}

export interface ProgramProps {
    setProgram: (program: Program) => void;
    HandleHypoteka: (name: string, value: string) => void;
    BankId: number;
}