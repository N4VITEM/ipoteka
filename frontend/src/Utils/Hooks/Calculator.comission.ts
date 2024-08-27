import { useEffect } from "react";
import { Variable } from "../../Interfaces/Formula.interface";

interface LoanType {
    name: string; // Тип кредита
    baseRate: number; // Базовая ставка кредита
    overLimitRate: number; // Ставка на превышение лимита
}

interface Estate {
    price: number; // базовая цена объекта 
    zeroCommissionLimit: number; // лимит суммы без комиссии
    moneyCostMultiplier: number; // множитель стоимости денег
    taxPercent: number; // Процент налога на прирост стоимости
    greedyMultiplier: number; // Жадный коэффициент удорожания
    economyPlanPercent: number; // Процент экономического плана
    subsidyPlanPercent: number; // Процент субсидии
    loanType: LoanType;
    pvPercentBase: number; // Минимальный процент первого взноса
}

export default function useComission(
    Hypoteka: Variable[] | undefined,
    HandleHypoteka: (name: string, value: string) => void
){
        useEffect(() => {
            HandleHypoteka(
                'PRICE_FACT',
                 Hypoteka ? calculatePrice(
                    {
                        price: parseFloat(Hypoteka.find(variable => variable.name === 'PRICE')?.definition || '0'),
                        zeroCommissionLimit: parseFloat(Hypoteka.find(variable => variable.name === 'ZERO_COMISSION_LIMIT')?.definition || '0') / 100,
                        moneyCostMultiplier: 1.02,
                        taxPercent: 10,
                        greedyMultiplier: 1.02,
                        economyPlanPercent: 0.14,
                        subsidyPlanPercent: parseFloat(Hypoteka.find(variable => variable.name === 'STAVKA_SUB')?.definition || '0') / 100,
                        loanType: {
                            name: 'standard',
                            baseRate: parseFloat(Hypoteka.find(variable => variable.name === 'STAVKA_BASE')?.definition || '0') / 100,
                            overLimitRate: 0.02
                        },
                        pvPercentBase: parseFloat(Hypoteka.find(variable => variable.name === 'MIN_PV')?.definition || '0') / 100
                    }, 
                    parseFloat(Hypoteka.find(variable => variable.name === 'CLIENT_MONEY')?.definition || '0'), 
                    0.02
                ).toString() : '0')
        }, [JSON.stringify(Hypoteka)])
}

function calculatePrice(
    estate: Estate, 
    pvClientValue: number, 
    subsidyCommissionPercent: number
): number {
    const subsidyCommission = subsidyCommissionPercent / 100;
    const pvPercentBase = estate.pvPercentBase > 1 ? estate.pvPercentBase / 100 : estate.pvPercentBase;

    let currentPrice = estate.price;
    let iterationCount = 0;
    const maxIterations = Math.max(Math.round(currentPrice * 0.0009), 999);

    let finalPrice = currentPrice + 1;
    let increaseStep = 1;

    let pvPercent = pvClientValue / currentPrice;
    
    while (finalPrice > currentPrice && iterationCount < maxIterations) {
        currentPrice += increaseStep;
        pvPercent = pvPercent < pvPercentBase ? pvPercentBase : pvPercent;

        const pvValue = Math.round(currentPrice * pvPercent);
        const pvShortfall = pvValue - pvClientValue;

        const moneyCost = Math.ceil(pvShortfall * estate.moneyCostMultiplier * estate.taxPercent);

        const overPrice = Math.max(currentPrice - estate.price, 0);
        const tax = Math.ceil(overPrice * estate.taxPercent);

        const overLimit = Math.max(currentPrice - estate.zeroCommissionLimit - pvValue, 0);
        const zeroCommission = Math.ceil(overLimit * estate.loanType.overLimitRate / 100);

        const subsidy = Math.ceil((currentPrice - pvValue) * subsidyCommission + zeroCommission);

        finalPrice = Math.ceil(estate.price * estate.economyPlanPercent + pvShortfall + moneyCost + tax + subsidy);

        increaseStep = Math.ceil((finalPrice - currentPrice) * 0.10);

        iterationCount++;
    }

    if (estate.loanType.name === "IT" && estate.zeroCommissionLimit < 1) {
        estate.greedyMultiplier = 1;
    }

    const adjustedLoanAmount = currentPrice - (currentPrice * pvPercent);
    let adjustedPrice = estate.price;

    if (pvClientValue < Math.round(pvPercent * estate.price - 999)) {
        adjustedPrice = estate.price * estate.greedyMultiplier;
    }

    if (pvClientValue + adjustedLoanAmount - 999 < adjustedPrice) {
        currentPrice = (adjustedPrice - pvClientValue) / (1 - pvPercent);
    }

    currentPrice = Math.max(currentPrice, estate.price);

    return Math.round(currentPrice);
}
