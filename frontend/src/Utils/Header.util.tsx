import { AppShell, Burger, Button, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [opened, { toggle }] = useDisclosure();

  const Navigate = useNavigate();

  return (
    <AppShell.Header bg='dark' c='white' display='flex'>
      <Burger
        color='white'
        opened={opened}
        onClick={toggle}
        hiddenFrom="sm"
        size="md"
      />
      <Container display='flex' style={{ alignItems: 'center' }}>
        <label style={{ fontSize: '1.2rem', textWrap: 'nowrap', marginRight: '1rem' }}>DENEB 93 | Smart Calc.</label>
        <Button style={{ backgroundColor: '#1E3D2C', color: '#009A00' }} mx={5} onClick={() => Navigate('/utils')}>Управление</Button>
        <Button style={{ backgroundColor: '#1E3D2C', color: '#009A00' }} mx={5} onClick={() => Navigate('/')}>Ипотечныый калькулятор</Button>
      </Container>
    </AppShell.Header>
  )
}