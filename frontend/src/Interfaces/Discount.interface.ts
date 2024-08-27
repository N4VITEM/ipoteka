import { Variable } from "./Formula.interface";
import { Project } from "./Project.interface";

export interface Discount {
    project: Project;
    variables: Variable[];
}

export interface DiscountProps {
    HandleAddDiscount: (discount: Discount) => void;
    HandleFetchDiscount?: (old_discount: Discount, new_discount: Discount) => void;
    Discount?: Discount;
}