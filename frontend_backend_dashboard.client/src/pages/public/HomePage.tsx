import Button from "../../components/general/Button";
import { PATH_PUBLIC } from "../../routes/paths";
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth.hook'

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className='pageTemplate1'>
      <div className='w-full flex justify-center items-center gap-4 bg-[#1f2937] border-4 border-white rounded-[300px] ring-4 ring-gray-700 p-10 '>
        <div className='flex-1 flex flex-col justify-center items-start gap-8 ml-16 '>
          <h1 className='text-7xl font-bold text-transparent bg-gradient-to-b from-amber-400 to-amber-600 bg-clip-text'>
            A Quick App
          </h1>
          <h1 className='text-[37px] leading-6 font-bold text-white'>Welcome to the UI🚀</h1>
          <div className='space-y-1 text-[35px] leading-6 font-bold text-white'>
            {/* <h1>This is a tutorial project</h1> */}
            <h1 className='text-4xl leading-[68px] font-bold text-transparent bg-gradient-to-tr from-[#DAC6FB] to-[#AAC1F6] bg-clip-text'>
              By Abhishek
            </h1>
            

            {!isAuthenticated ?
            (
              <div className='flex items-center justify-center gap-4 ml-[200px] pt-[25px]'>
              <Button
                label="Register"
                onClick={() => navigate(PATH_PUBLIC.register)}
                type="button"
                variant="light"                
                />
              <Button
                label="Login"
                onClick={() => navigate(PATH_PUBLIC.login)}
                type="button"
                variant="light"                
                />
            </div>
              ) : 
                (
null
                )}



            
          </div>
        </div>
        <div className='flex-1 flex flex-col justify-center items-end'>
          <img src='images/abhi.jpg' className='w-[360px] h-[360px] object-cover rounded-full' />
        </div>
      </div>
    </div>
  );
};

export default HomePage;