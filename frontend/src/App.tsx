import '@mantine/core/styles.css';
import { MantineProvider, AppShell } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Utils/Header.util';
import UtilsPage from './Pages/Utils.page';
import HelpPage from './Pages/Help.page';
import CalculatorHypotekaPage from './Pages/Calculator.page';

function App() {
  return (
      <MantineProvider>
        <AppShell header={{ height: 60 }} padding="md">
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path='/utils' element={<UtilsPage />} />
              <Route path='/help' element={<HelpPage />} />
              <Route path='/' element={<CalculatorHypotekaPage />} />
            </Routes>
          </BrowserRouter>
        </AppShell>
      </MantineProvider>
  )
}

export default App
