import { Flex, Container, InputBase, Button } from "@mantine/core";
import { HypotekaDTOprops } from "../Interfaces/Formula.interface";
import { NumberInputConfig } from "../Config/Configurations.config";
import useCalculate from "./Hooks/Calculator.calculate";
import { useEffect, useState } from "react";
import { InputInterface } from "../Interfaces/input.interface";

export default function CalculatorBase({ HandleHypoteka, Hypoteka }: HypotekaDTOprops) {
    const [isSettings, setIsSettings] = useState<boolean>(false);
    const [inputs, setInputs] = useState<InputInterface[]>(
        [
            { key: 'PRICE', description: 'цена', symbol: '₽', w: '100%', readonly: false },
            { key: 'MIN_PV', description: 'минимальный первоначальный взнос', symbol: '%', w: '45%', readonly: false },
            { key: 'MIN_PV_RUB', description: 'минимальный первоначальный взнос в рублях', symbol: '₽', w: '45%', variant: 'filled', readonly: true },
            { key: 'CLIENT_MONEY', description: 'первоначальный взнос клиента', symbol: '₽', w: '45%', readonly: false },
            { key: 'COMPANY_MONEY', description: 'первоначальный взнос компании', symbol: '₽', w: '45%', variant: 'filled', readonly: true },
            { key: 'PV_RUB', description: 'итоговый первоначальный взнос', symbol: '₽', w: '100%', variant: 'filled', readonly: true },
            { isShowable: false, key: 'PV', description: 'ПВ в %', symbol: '%', w: '20%', variant: 'filled', readonly: true },
            { key: 'DURATION', description: 'срок кредитования', symbol: 'мес', w: '30%', variant: 'default', readonly: false },
            { key: 'CREDIT', description: 'сумма кредитования', symbol: '₽', w: '30%', variant: 'filled', readonly: true },
            { key: 'STAVKA_BASE', description: 'базовая ставка кредитования', symbol: '%', w: '30%', variant: 'default', readonly: false },
        ]
    )
    const [inputs_settings, setInputs_settings] = useState<InputInterface[]>(
        [
            { key: 'COMISSION', description: 'Комиссия за превышение', w: '49%', symbol: '%' },
            { key: 'ZERO_COMISSION_LIMIT', description: 'максимальная сумма кредитования', w: '49%', symbol: '₽' },
            { key: 'BANK_COMISSION', description: 'Комиссия банка за превышение', w: '49%', symbol: '%' },
            { key: 'PROGRAM_LIMIT', description: 'Ограничение программы (без комиссии)', w: '49%', symbol: '₽' },
        ]
    )

    useEffect(() => {
        if (Hypoteka) {
            setInputs(
                inputs.map(input => {
                    return {
                        ...input,
                        variable: Hypoteka.find(variable => variable.name === input.key),
                        min_value: Hypoteka.find(variable => variable.name === input.key + '_min')?.definition,
                        max_value: Hypoteka.find(variable => variable.name === input.key + '_max')?.definition,
                    }
                })
            )
            setInputs_settings(
                inputs_settings.map(input => {
                    return {
                        ...input,
                        variable: Hypoteka.find(variable => variable.name === input.key),
                        min_value: Hypoteka.find(variable => variable.name === input.key + '_min')?.definition,
                        max_value: Hypoteka.find(variable => variable.name === input.key + '_max')?.definition,
                    }
                })
            )
        }
    }, [JSON.stringify(Hypoteka)])

    useEffect(() => {
        (parseFloat(inputs[6].variable?.definition || '0') > 100) && HandleHypoteka('PV', '100')
        inputs[5].label = `(${parseFloat(inputs[6].variable?.definition || '0') <= 100 ? inputs[6].variable?.definition : 100} % от цены)`
    }, [inputs])

    useCalculate(1, [inputs[0].variable?.definition, inputs[1].variable?.definition], 'MIN_PV_RUB', HandleHypoteka);
    useCalculate(2, [inputs[2].variable?.definition, inputs[3].variable?.definition], 'COMPANY_MONEY', HandleHypoteka);
    useCalculate(3, [inputs[3].variable?.definition, inputs[4].variable?.definition], 'PV_RUB', HandleHypoteka);
    useCalculate(4, [inputs[0].variable?.definition, inputs[5].variable?.definition], 'PV', HandleHypoteka);
    useCalculate(5, [inputs[0].variable?.definition, inputs[5].variable?.definition], 'CREDIT', HandleHypoteka);

    return (
        <Container style={{ borderTop: '1px solid #ccc' }} p={20}>
            <Flex direction='row' wrap='wrap' justify='center' align='center'>
                <label style={{ display: 'block', width: '100%', fontSize: '1.5rem', textAlign: 'center', fontWeight: 'lighter', marginBottom: '1rem' }}>базовые параметры сделки</label>
                <Flex gap="md" justify="space-between" align="center" direction="row" wrap="wrap" mb='2rem'>
                    {
                        inputs?.map((input, index) => (
                            input.isShowable !== false && <InputBase
                                key={index}
                                placeholder={
                                    input.min_value || input.max_value ? (input.max_value ? 'макс. ' + input.max_value : 'мин. ' + input.min_value) :
                                        (input.variable?.definition ? input.variable?.definition : '0')
                                }
                                value={input.readonly === true && input.variable?.definition ? input.variable?.definition : undefined}
                                description={input.description}
                                rightSection={input.symbol}
                                w={input.w}
                                label={input.label}
                                variant={input.variant}
                                readOnly={input.readonly}
                                min={input.min_value ? parseFloat(input.min_value || '0') : 0}
                                max={input.max_value ? parseFloat(input.max_value || '0') : (input.symbol === '₽' && index !== 0 && parseFloat(inputs[0].variable?.definition || '0') || (input.symbol === '%' ? 100 : undefined))}
                                onAccept={
                                    (e) => HandleHypoteka(
                                        input.key || '',
                                        e.replace(/\s/g, '')
                                    )}
                                {...NumberInputConfig}
                            />
                        ))
                    }
                </Flex>
                <Button bg='transparent' c='black' style={{ fontWeight: 'lighter' }} onClick={() => setIsSettings(!isSettings)}><label style={{ display: 'block', width: '100%', fontSize: '1rem', textAlign: 'center', marginBottom: '1rem' }}>Дополнительно{isSettings === true ? ' ⏶ ' : ' ⏷ '}</label> </Button>
                {
                    isSettings === true && <>
                        <Flex w='100%' gap="md" justify="space-between" align="center" direction="row" wrap="wrap" my={10}>
                            {
                                inputs_settings?.map((input, index) => (
                                    input.isShowable !== false && <InputBase
                                        key={index}
                                        placeholder={
                                            input.min_value || input.max_value ? (input.max_value ? 'макс. ' + input.max_value : 'мин. ' + input.min_value) :
                                                (input.variable?.definition ? input.variable?.definition : '0')
                                        }
                                        value={input.readonly === true && input.variable?.definition ? input.variable?.definition : undefined}
                                        description={input.description}
                                        rightSection={input.symbol}
                                        w={input.w}
                                        label={input.label}
                                        variant={input.variant}
                                        readOnly={input.readonly}
                                        min={input.min_value ? parseFloat(input.min_value || '0') : 0}
                                        max={input.max_value ? parseFloat(input.max_value || '0') : (input.symbol === '₽' && index !== 0 && parseFloat(inputs[0].variable?.definition || '0') || (input.symbol === '%' ? 100 : undefined))}
                                        onAccept={
                                            (e) => HandleHypoteka(
                                                input.key || '',
                                                e.replace(/\s/g, '')
                                            )}
                                        {...NumberInputConfig}
                                    />
                                ))
                            }
                        </Flex>
                    </>
                }
            </Flex>
        </Container>
    )
}