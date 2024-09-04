import PageAccessTemplate from "../../components/dashboard/page-access/PageAccessTemplate";
import { BsGlobeAmericas } from "react-icons/bs";

const DashboardPage = () => {
  return (
    <div className="pageTemplate2 bg-[#d3d9d4] p-6">
      <PageAccessTemplate color="#000" icon={BsGlobeAmericas} role="Dashboard">
        <div className="text-3xl space-y-4 text-gray-800">
          <h1 className="font-semibold">Dashboard Access can be either:</h1>
          <ul className="list-disc list-inside">
            <li><span className="font-medium">Owner</span></li>
            <li><span className="font-medium">Admin</span></li>
            <li><span className="font-medium">Manager</span></li>
            <li><span className="font-medium">User</span></li>
          </ul>
        </div>
      </PageAccessTemplate>
    </div>
  );
};

export default DashboardPage;
