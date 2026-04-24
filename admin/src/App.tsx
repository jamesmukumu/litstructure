import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import CreateClient from "./pages/Clients/CreateClient";
import CreateService from "./pages/Services/CreateService";
import CreateProject from "./pages/Projects/CreateProject";

import { PrimeReactProvider } from 'primereact/api';

import "primereact/resources/themes/lara-light-cyan/theme.css";
import UserManagement from "./pages/Managements/UserManagement";
import {Provider} from "react-redux"
import SendEmail from "./pages/Emails/SendEmail";
import CreateBulk from "./pages/Emails/CreateBulk";
import ClientManagement from "./pages/Managements/ClientsManagement";
import EditClient from "./pages/Clients/EditClient";
import DoSettingsPage from "./pages/Managements/SettingsManagement";
import EnquiryManagement from "./pages/Managements/EnquiryManagement";
import ProjectsManagement from "./pages/Managements/ProjectsManagement";
import EditProject from "./pages/Projects/EditProject";
import ServiceManagement from "./pages/Managements/ServicesManagement";
import EditService from "./pages/Services/EditService";

export default function App() {
  return (
    <PrimeReactProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>


            <Route index path="/" element={<Home />} />
            <Route path="/view/enquiries" element={<EnquiryManagement/>}/>
            <Route path="/view/projects" element={<ProjectsManagement/>}/>
            <Route path="/create/client" element={<CreateClient/>}/>
            <Route path="/manage/clients" element={<ClientManagement/>}/>
          <Route path="/account/settings" element={<DoSettingsPage/>}/>
            <Route path="/edit/client/:slug" element={<EditClient/>}/>
             <Route path="/edit/project/:slug" element={<EditProject/>}/>
              <Route path="/create/service" element={<CreateService/>}/>
               <Route path="/create/project" element={<CreateProject/>}/>
                <Route path="/manage/users" element={<UserManagement/>}/>
                <Route path="/view/services" element={<ServiceManagement/>}/>
                <Route path="/edit/service/:slug" element={<EditService/>}/>
         
              
            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

       {/* Emails here */}
       <Route path="/send/new/email" element={<SendEmail/>}/>
       <Route path="/create/bulk" element={<CreateBulk/>}/>

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </PrimeReactProvider>
  );
}
