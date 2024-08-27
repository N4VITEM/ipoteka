import { Variable } from "./Formula.interface";

export interface InputInterface {
    label?: string;
    type?: string;
    isShowable?: boolean;
    key?: string;
    description?: string;
    symbol?: string;
    w?: string;
    variant?: string;
    readonly?: boolean;
    pointer?: boolean;
    variable?: Variable;
    min_value?: string;
    max_value?: string;
    default_value?: string;
}