import { CiUser } from "react-icons/ci";
import useAuth from "../../hooks/useAuth.hook";
import Button from "../general/Button";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD } from "../../routes/paths";
// import CIcon from '@coreui/icons-react';
// import {cilMenu} from '@coreui/icons';
// import { CHeaderToggler } from '@coreui/react'
// import { AiOutlineHome } from "react-icons/ai";
// import { toast } from 'react-hot-toast';
import {FaComment, FaEnvelope, FaReply, FaUserCog, FaUsers} from 'react-icons/fa';
import { IoDocumentText } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RolesEnum } from "../../types/auth.types";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faMessage } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const sidebarShow = useSelector((state: any ) => state.sidebar.sidebarShow)

  const [visibleButton, setVisibleButton] = useState({
    userManagement: false,
    allLogs: false,
    allMessage: false
  });

  const handleClick = (url: string) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    navigate(url);    
  };

  const userRolesLabelCreator = () => {
    if (user) {
      let result = "";
      user.roles.forEach((role, index) => {
        result += role;
        if (index < user.roles.length - 1) {
          result += ", ";
        }
      });
      return result;
    }
    return "--";
  };

  useEffect(() => {
if(user){
  const roles = user.roles;
  setVisibleButton({
    userManagement: roles.includes(RolesEnum.OWNER) || roles.includes(RolesEnum.ADMIN) || roles.includes(RolesEnum.MANAGER),
    allLogs: roles.includes(RolesEnum.OWNER) || roles.includes(RolesEnum.ADMIN),
    allMessage: roles.includes(RolesEnum.OWNER) || roles.includes(RolesEnum.ADMIN)
  });
}
  }, [user])


  return (    
    // <div className=
    // {`shrink-0 bg-[#1f2937] w-60 p-2 min-h-[calc(100vh-48px)] flex flex-col items-stretch gap-8 transition-transform duration-300 
    // ${sidebarShow ? 'translate-x-0' : '-translate-x-full'}
    // `}>

    //   <div className="self-center flex flex-col items-center">                 

    //     <CiUser className="w-10 h-10 text-white" />
    //     <h4 className="text-white">
    //       {user?.firstName} {user?.lasName}
    //     </h4>
    //     <h1 className="px-1 bg-[#2E3944] text-[#FFFFFF] border border-dashed border-black rounded-lg mt-2">
    //         UserRoles : {userRolesLabelCreator()}
    //       </h1>
    //   </div>

    //   <hr />
    //   <Button
    //     label="User Management"
    //     onClick={() => handleClick(PATH_DASHBOARD.usersManagement)}
    //     type="button"
    //     variant="secondary"
    //   />
    //   <Button
    //     label="Send Message"
    //     onClick={() => handleClick(PATH_DASHBOARD.sendMessage)}
    //     type="button"
    //     variant="secondary"
    //   />
    //   <Button
    //     label="Inbox"
    //     onClick={() => handleClick(PATH_DASHBOARD.inbox)}
    //     type="button"
    //     variant="secondary"
    //   />
    //   <Button
    //     label="All Messages"
    //     onClick={() => handleClick(PATH_DASHBOARD.allMessages)}
    //     type="button"
    //     variant="secondary"
    //   />
    //   <Button
    //     label="All Logs"
    //     onClick={() => handleClick(PATH_DASHBOARD.systemLogs)}
    //     type="button"
    //     variant="secondary"
    //   />
    //   <Button
    //     label="My Logs"
    //     onClick={() => handleClick(PATH_DASHBOARD.myLogs)}
    //     type="button"
    //     variant="secondary"
    //   />

        
    
    <div
    style={{ height: '100%' }}
    className={`shrink-0 bg-[#1f2937] rounded-tr-xl p-2 flex flex-col items-stretch gap-8 transition-all duration-500 ease-in-out mt-0 border-t-2 border-t-gray-400 ${
      sidebarShow ? "w-[280px]" : "w-[50px]"
    }`}
  >          

<div className="self-center flex flex-col items-center">
  <div className="relative group">
    <CiUser 
      className="w-10 h-10 text-white mt-4 hover:cursor-pointer transition-transform duration-200 transform hover:scale-110" 
    />
    {!sidebarShow && (
      <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white bg-black bg-opacity-50 rounded ml-[100px] whitespace-nowrap -translate-y-10 left-1/2 transform -translate-x-1/2">
        {user?.firstName} {user?.lastName}
        <br/>
        UserRoles: {userRolesLabelCreator()}
      </span>
    )}
  </div>
  {sidebarShow && (
    <>
      <h4 className="text-white mt-2">
        {user?.firstName} {user?.lastName}
      </h4>
      <h1 className="px-1 bg-[#2E3944] text-[#FFFFFF] border border-dashed border-gray-400 rounded-lg mt-2">
        UserRoles: {userRolesLabelCreator()}
      </h1>
    </>
  )}
</div>



      <hr className={`${sidebarShow? "block" : "hidden"}`} />

      {sidebarShow ? (
        <>

        {visibleButton.userManagement && (
          <Button
        label="User Management"
        onClick={() => handleClick(PATH_DASHBOARD.usersManagement)}
        type="button"
        variant="secondary"
        />
      )}
        <Button
        label="Send Message"
        onClick={() => handleClick(PATH_DASHBOARD.sendMessage)}
        type="button"
        variant="secondary"
        />

      <Button
        label="Inbox"
        onClick={() => handleClick(PATH_DASHBOARD.inbox)}
        type="button"
        variant="secondary"
        />
        {visibleButton.allMessage && (
          <Button
        label="All Messages"
        onClick={() => handleClick(PATH_DASHBOARD.allMessages)}
        type="button"
        variant="secondary"
        />
      )}
      {visibleButton.allLogs && (
        <Button
        label="All Logs"
        onClick={() => handleClick(PATH_DASHBOARD.systemLogs)}
        type="button"
        variant="secondary"
        />
      )}
      <Button
      label="My Logs"
      onClick={() => handleClick(PATH_DASHBOARD.myLogs)}
        type="button"
        variant="secondary"
        />
        </>
      ) : (
        <>        

       {visibleButton.userManagement && (         
         <div className="flex flex-col items-center mt-2">
         <div className="relative group">
           <FaUsers 
             className="text-white w-8 h-8 mt-4 hover:cursor-pointer transition-transform duration-200 transform hover:scale-110"
             onClick={() => handleClick(PATH_DASHBOARD.usersManagement)} 
           />
           <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white bg-black bg-opacity-50 rounded ml-[97px] mt-[14px] whitespace-nowrap -translate-y-10 left-1/2 transform -translate-x-1/2">
             User Management
           </span>
         </div>
       </div>
      )}

        <div className="flex flex-col items-center mt-2">
        <div className="relative group">
        <FaReply className="text-white w-8 h-8 hover: cursor-pointer transition-transform duration-200 transform hover:scale-110"
        onClick={() => handleClick(PATH_DASHBOARD.sendMessage)}/>
        <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white bg-black bg-opacity-50 rounded ml-[83px] mt-[14px] whitespace-nowrap -translate-y-10 left-1/2 transform -translate-x-1/2">
             Send Message
           </span>
        </div>        
        </div>

        <div className="flex flex-col items-center mt-2">
        <div className="relative group">
        <FaEnvelope className="text-white w-8 h-8 hover: cursor-pointer transition-transform duration-200 transform hover:scale-110"
        onClick={() => handleClick(PATH_DASHBOARD.inbox)}/> 
        <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white bg-black bg-opacity-50 rounded ml-[70px] mt-[14px] whitespace-nowrap -translate-y-10 transform -translate-x-1/2">
             Inbox
           </span>       
        </div>
        </div>


      {visibleButton.allMessage && (        
        <div className="flex flex-col items-center mt-2">
          <div className="relative group">
        <FaComment className="text-white w-8 h-8 hover: cursor-pointer transition-transform duration-200 transform hover:scale-110"
        onClick={() => handleClick(PATH_DASHBOARD.allMessages)}/>
        <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white bg-black bg-opacity-50 rounded ml-[95px] mt-[14px] whitespace-nowrap -translate-y-10 transform -translate-x-1/2">
             All Messages
           </span>
        </div>
        </div>
      )}

        {visibleButton.allLogs && (
          <div className="flex flex-col items-center mt-2">
            <div className="relative group">
          <FaUserCog className="text-white w-8 h-8 hover: cursor-pointer transition-transform duration-200 transform hover:scale-110" 
          onClick={() => handleClick(PATH_DASHBOARD.systemLogs)}
          />   
          <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white bg-black bg-opacity-50 rounded ml-[78px] mt-[14px] whitespace-nowrap -translate-y-10 transform -translate-x-1/2">
             All Logs
           </span>   
          </div>
        </div>
        )}

      <div className="flex flex-col items-center mt-2">
      <div className="relative group">
        <IoDocumentText className="text-white w-8 h-8 hover: cursor-pointer transition-transform duration-200 transform hover:scale-110" 
        onClick={() => handleClick(PATH_DASHBOARD.myLogs)}
        />
        <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white bg-black bg-opacity-50 rounded ml-[78px] mt-[14px] whitespace-nowrap -translate-y-10 transform -translate-x-1/2">
             My Logs
           </span>   
           </div>
      </div>

        </>
      )}

      </div>      

    
  );
};

export default Sidebar;
