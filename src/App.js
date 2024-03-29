import "./App.css";
import { Route, Routes } from "react-router-dom";
import Aos from "aos";
import Dashboard from "./screens/Dashboard";
import Toast from "./components/Notifications/Toast";
import Payments from "./screens/Payments/Payments";
import Appointments from "./screens/Appointments";
import Patients from "./screens/Patients/Patients";
import Campaings from "./screens/Campaings";
import Services from "./screens/Services";
import Invoices from "./screens/Invoices/Invoices";
import Settings from "./screens/Settings";
import CreateInvoice from "./screens/Invoices/CreateInvoice";
import EditInvoice from "./screens/Invoices/EditInvoice";
import PreviewInvoice from "./screens/Invoices/PreviewInvoice";
import EditPayment from "./screens/Payments/EditPayment";
import PreviewPayment from "./screens/Payments/PreviewPayment";
import Medicine from "./screens/Medicine";
import PatientProfile from "./screens/Patients/PatientProfile";
import CreatePatient from "./screens/Patients/CreatePatient";
import Doctors from "./screens/Doctors/Doctors";
import DoctorProfile from "./screens/Doctors/DoctorProfile";
import NewMedicalRecode from "./screens/Patients/NewMedicalRecode";
import NotFound from "./screens/NotFound";
import Login from "./screens/Login";
import Nurses from "./screens/Nurses/Nurses";
import NurseProfile from "./screens/Nurses/NursesProfile";
import Reception from "./screens/Reception/Reception";
import ReceptionProfile from "./screens/Reception/ReceptionProfile";
import Clinics from "./screens/Clinics/clinic";
import Wards from "./screens/wards/wards";

function App() {
  Aos.init();

  return (
    <>
      {/* Toaster */}
      <Toast />
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        {/* invoce */}
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/invoices/create" element={<CreateInvoice />} />
        <Route path="/invoices/edit/:id" element={<EditInvoice />} />
        <Route path="/invoices/preview/:id" element={<PreviewInvoice />} />
        {/* payments */}
        <Route path="/payments" element={<Payments />} />
        <Route path="/payments/edit/:id" element={<EditPayment />} />
        <Route path="/payments/preview/:id" element={<PreviewPayment />} />
        {/* patient */}
        <Route path="/patients" element={<Patients />} />
        <Route path="/patients/preview/:id" element={<PatientProfile />} />
        <Route path="/patients/create" element={<CreatePatient />} />
        <Route path="/patients/visiting/:id" element={<NewMedicalRecode />} />
        {/* doctors */}
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/preview/:id" element={<DoctorProfile />} />
        {/* reception */}
        <Route path="/recordofficers" element={<Reception />} />
        <Route path="/recordofficers/preview/:id" element={<ReceptionProfile />} />
        {/* Nurses */}
        <Route path="/nurses" element={<Nurses />} />
        <Route path="/nurses/preview/:id" element={<NurseProfile />} />
        {/* {clinics} */}
        <Route path="/clinics" element={<Clinics />} />
        {/* {wards} */}
        <Route path="/wards" element={<Wards />} />
        {/* others */}
        <Route path="/login" element={<Login />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/campaigns" element={<Campaings />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/services" element={<Services />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
