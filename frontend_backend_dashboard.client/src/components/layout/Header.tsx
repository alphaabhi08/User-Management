import useAuth from "../../hooks/useAuth.hook";
import Button from "../general/Button";
import { AiOutlineHome } from "react-icons/ai";
import { FiUnlock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { PATH_DASHBOARD, PATH_PUBLIC } from "../../routes/paths";
import { toast } from "react-hot-toast";
import CIcon from '@coreui/icons-react';
import { cilMenu } from '@coreui/icons';
import { CHeaderToggler } from '@coreui/react';
import { useDispatch } from 'react-redux';
import { toggleSidebar } from '../../Redux/sidebarSlice';

const Header = () => {
  const { isAuthLoading, isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Successfully logged out");
    } catch (error) {
      toast.error("Logout failed");
    }
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

  return (
    <header className="flex justify-between items-center bg-[#1f2937] h-14 px-6 shadow-md">
      <div className="flex items-center gap-6">
        <CHeaderToggler onClick={() => dispatch(toggleSidebar())}>
          <CIcon
            icon={cilMenu}
            className="w-8 h-8 text-gray-300 -ml-[10px] mt-[5px] hover:text-white transition-colors duration-300 transform hover:scale-110"
          />
        </CHeaderToggler>

        <AiOutlineHome
          className="w-8 h-8 text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-110 cursor-pointer"
          onClick={() => navigate("/")}
        />

        <div className="flex gap-3 items-center">
          <div className="px-2 py-1 bg-[#2E3944] text-gray-300 rounded-lg">
            AuthLoading: {isAuthLoading ? "True" : "False"}
          </div>
          <div className="flex items-center gap-1 px-2 py-1 bg-[#2E3944] text-gray-300 rounded-lg">
            Auth:{" "}
            {isAuthenticated ? (
              <FiUnlock className="text-green-500" />
            ) : (
              <FiUnlock className="text-red-500" />
            )}
          </div>
          <div className="px-2 py-1 bg-[#2E3944] text-gray-300 rounded-lg">
            UserName: {user ? user.userName : "--"}
          </div>
          <div className="px-2 py-1 bg-[#2E3944] text-gray-300 rounded-lg">
            UserRoles: {userRolesLabelCreator()}
          </div>
        </div>
      </div>

      <div>
        {isAuthenticated ? (
          <div className="flex items-center gap-4">
            <Button
              label="Dashboard"
              onClick={() => navigate(PATH_DASHBOARD.dashboard)}
              type="button"
              variant="secondary"              
            />
            <Button
              label="Logout"
              onClick={handleLogout}
              type="button"
              variant="secondary"              
            />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button
              label="Register"
              onClick={() => navigate(PATH_PUBLIC.register)}
              type="button"
              variant="secondary"              
            />
            <Button
              label="Login"
              onClick={() => navigate(PATH_PUBLIC.login)}
              type="button"
              variant="secondary"              
            />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
