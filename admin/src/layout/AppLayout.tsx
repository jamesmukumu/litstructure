import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet, useNavigate } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar from "./AppSidebar";
import { useEffect, useState } from "react";
import { GetProfile } from "../services/admin";
import Cookies from "js-cookie";
const LayoutContent = ({profile}) => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        {profile && (<AppHeader  profile={profile}/>)}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  const [userProfile,setUserProfile] = useState(null)
  let navigate = useNavigate()
useEffect(()=>{
let token = Cookies.get('auth_token')
if(!token || token == undefined || token == null){
navigate("/signin")
return
}
GetProfile().then((data)=>{
if(data.status){
setUserProfile(data.data)
}
}).catch((err)=>{
console.error(err)
})
  },[])
  return (
    <SidebarProvider>
      <LayoutContent  profile={userProfile}/>
    </SidebarProvider>
  );
};

export default AppLayout;
