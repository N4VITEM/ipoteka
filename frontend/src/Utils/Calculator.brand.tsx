import { Center, Container } from "@mantine/core";
interface CalculatorBrandProps {
    logo: string;
}

export default function CalculatorBrand({ logo }: CalculatorBrandProps) {
    return (
        <Container>
            <Center style={{ flexDirection: 'column' }}>
                <img src={logo} alt="sarmat.img" width='70px' />
                <label style={{ display: 'block', width: '100%', fontSize: '2rem', textAlign: 'center' }}>Ипотечный Калькулятор</label>
            </Center>
        </Container>
    )
}