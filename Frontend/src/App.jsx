import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import WelcomePage from "./pages/WelcomePage";
import CustomersPage from "./pages/CustomersPage";
import AccountsPage from "./pages/AccountsPage";
import AddCustomerPage from "./pages/AddCustomerPage";
import AddAccountPage from "./pages/AddAccountPage";
import EditCustomerPage from "./pages/EditCustomerPage.jsx";
import UpdateBalancePage from "./pages/UpdateBalancePage.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Header />

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/customers/new" element={<AddCustomerPage />} />
          <Route path="/accounts/new" element={<AddAccountPage />} />
          <Route path="/customers/:customerId/edit" element={<EditCustomerPage />} />
          <Route path="/customers/:customerId/accounts/:accountId/:action" element={<UpdateBalancePage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;