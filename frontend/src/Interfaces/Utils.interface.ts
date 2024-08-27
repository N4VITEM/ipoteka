import { Program } from "./Program.interface";

export interface UtilsProps {
    setProgram: (program: Program) => void;
}

export interface SettingsProps {
    setProgram: (program: Program | undefined) => void;
    Program: Program | undefined;
}