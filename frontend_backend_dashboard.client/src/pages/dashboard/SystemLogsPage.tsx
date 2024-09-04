import { useState, useEffect } from "react";
import { ILogDto } from "../../types/log.types";
import axiosInstance from "../../utils/axiosInstance";
import { LOGS_URL } from "../../utils/globalConfig";
import toast from "react-hot-toast";
import Spinner from "../../components/general/Spinner";
import moment from "moment";

const SystemLogsPage = () => {
  const [logs, setLogs] = useState<ILogDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const logsPerPage = 20;

  const getLogs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ILogDto[]>(LOGS_URL);
      const { data } = response;
      setLogs(data);
      setLoading(false);
    } catch (error) {
      toast.error("An error happened. Please contact admins");
      setLoading(false);
    }
  };

  useEffect(() => {
    getLogs();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
  const totalLogs = logs.length;

  if (loading) {
    return (
      <div className="w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="pageTemplate2 bg-[#d3d9d4]">
      <h1 className="text-2xl font-bold">System Logs</h1>    
    <span className="text-lg">
      Showimg {indexOfFirstLog +1} - {Math.min(indexOfLastLog, totalLogs)}{" "} 
      of {totalLogs} logs

    </span>

      <div className="pageTemplate3 items-stretch">
        <div className="grid grid-cols-6 p-2 border-gray-300 rounded-lg">
          <span>No</span>
          <span>Date</span>
          <span>Username</span>
          <span className="col-span-3">Description</span>
        </div>
        {currentLogs.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-6 border-2 border-gray-300 rounded-lg"
          >
            <span>{indexOfFirstLog + index + 1}</span>
            <span>{moment(item.createdAt).fromNow()}</span>
            <span>{item.userName}</span>
            <span className="col-span-3">{item.description}</span>
          </div>
        ))}
        <div className="flex justify-between mt-4">
          {currentPage > 1 && (
            <button
              onClick={handlePrevPage}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Previous
            </button>
          )}
          {indexOfLastLog < logs.length && (
            <button
              onClick={handleNextPage}
              className="px-4 py-2 bg-blue-500 text-white rounded ml-auto"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SystemLogsPage;
