import { useState, useEffect } from "react";
import { IMessageDto } from "../../types/message.types";
import axiosInstance from "../../utils/axiosInstance";
import { DELETE_MY_MESSAGE, MY_MESSAGE_URL } from "../../utils/globalConfig";
import { toast } from "react-hot-toast";
import Spinner from "../../components/general/Spinner";
import moment from "moment";
import { MdInput, MdOutput } from "react-icons/md";
import useAuth from "../../hooks/useAuth.hook";
import { MdDelete } from "react-icons/md";

const InboxPage = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<IMessageDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const messagesPerPage = 20;

  const getMyMessage = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<IMessageDto[]>(MY_MESSAGE_URL);
      const { data } = response;
      setMessages(data);
      setLoading(false);
    } catch (error) {
      toast.error("An error happened. Please contact admins");
      setLoading(false);
    }
  };

  const handleDeleteMessage = async (id: number) => {
    try {
      await axiosInstance.delete(`${DELETE_MY_MESSAGE}/${id}`);
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error("Failed to delete the message. Please try again.");
    }
  };

  useEffect(() => {
    getMyMessage();
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
      <h1 className="text-2xl font-bold">Inbox</h1>
      <div className="pageTemplate3 items-stretch">
        <div className="grid grid-cols-9 p-2 border-2 border-gray-300 rounded-lg">
          <span>Date</span>
          <span>Type</span>
          <span className="col-span-4">Text</span>
          <span>Sender</span>
          <span>Receiver</span>
          <span>Delete</span>
        </div>
        {currentMessages.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-9 p-2 border-2 border-gray-300 rounded-lg"
          >
            <span>{moment(item.createdAt).fromNow()}</span>
            <span>
              {item.senderUserName === user?.userName ? (
                <MdOutput className="text-2xl text-purple-500" />
              ) : (
                <MdInput className="text-2xl text-green-500" />
              )}
            </span>
            <span className="col-span-4">{item.text}</span>
            <span>{item.senderUserName}</span>
            <span>{item.receiverUserName}</span>
            <span>            
              <MdDelete
                className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => handleDeleteMessage(item.id)}
              />
            </span>
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

export default InboxPage;
