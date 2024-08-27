import { IMaskInput } from "react-imask";
import { VariableInput } from "../Interfaces/Formula.interface";

export const InputConfig = (input: VariableInput) => ({
  description: input.description,
  readOnly: input.readonly,
  pointer: input.pointer,
  rightSection: input.symbol,
  value: input.definition?.toString(),
  w: input.w,
  placeholder: "0",
  variant: input.filled === true? 'filled' : 'default',
  component: IMaskInput,
  mask: Number,
  thousandsSeparator: " ",
  radix: ".",
  scale: 2,
  my: 10
})

export const NumberInputConfig = ({
  component: IMaskInput,
  mask: Number,
  thousandsSeparator: " ",
  radix: ".",
  scale: 2,
})

export const StringInputConfig = ({
  component: IMaskInput,
  mask: String,
})

export const SelectConfig = (input: VariableInput) => ({
  description: input.description,
  readOnly: input.readonly,
  pointer: input.pointer,
  rightSection: input.symbol,
  value: input.definition?.toString(),
  w: input.w,
  variant: input.filled === true? 'filled' : 'default',
  my: 10
})

export const TextConfig = (input: VariableInput) => ({
  description: input.description,
  readOnly: input.readonly,
  pointer: input.pointer,
  rightSection: input.symbol,
  value: input.definition?.toString(),
  w: input.w,
  placeholder: `введите: ${input.key}`,
  variant: input.filled === true? 'filled' : 'default',
  my: 10
})