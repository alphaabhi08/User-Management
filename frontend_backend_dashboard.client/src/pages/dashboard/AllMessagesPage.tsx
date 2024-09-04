import { useState, useEffect } from "react";
import { IMessageDto } from "../../types/message.types";
import axiosInstance from "../../utils/axiosInstance";
import { ALL_MESSAGES_URL } from "../../utils/globalConfig";
import { toast } from "react-hot-toast";
import Spinner from "../../components/general/Spinner";
import moment from "moment";

const AllMessagesPage = () => {
  const [messages, setMessages] = useState<IMessageDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const messagesPerPage = 20;

  const getAllMessages = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<IMessageDto[]>(ALL_MESSAGES_URL);
      const { data } = response;
      setMessages(data);
      setLoading(false);
    } catch (error) {
      toast.error("An error happened. Please contact admins");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMessages();
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = messages.slice(indexOfFirstMessage, indexOfLastMessage);

  if (loading) {
    return (
      <div className="w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="pageTemplate2 bg-[#d3d9d4]">
      <h1 className="text-2xl font-bold">All Messages</h1>
      <div className="pageTemplate3 items-stretch">
        <div className="grid grid-cols-8 p-2 border-2 border-gray-300 rounded-lg">
          <span>Date</span>
          <span className="col-span-5">Text</span>
          <span>Sender</span>
          <span>Receiver</span>
        </div>
        {currentMessages.map((item) => (
          <div key={item.id} className="grid grid-cols-8 p-2 border-2 border-gray-300 rounded-lg">
            <span>{moment(item.createdAt).fromNow()}</span>
            <span className="col-span-5">{item.text}</span>
            <span>{item.senderUserName}</span>
            <span>{item.receiverUserName}</span>
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
          {indexOfLastMessage < messages.length && (
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

export default AllMessagesPage;
