export interface Bank  {
    id?: number;
    name: string;
    primaryColor: string;
    secondaryColor: string;
}

export interface BankProps {
    setBank: (bank: Bank) => void
}