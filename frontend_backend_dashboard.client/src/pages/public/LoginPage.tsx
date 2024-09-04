import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { ILoginDto } from "../../types/auth.types";
import InputField from "../../components/general/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../hooks/useAuth.hook";
import Button from "../../components/general/Button";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PATH_PUBLIC } from "../../routes/paths";
import { GoogleLogin } from "react-google-login";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSuccess = async () => {
    console.log("LOGIN SUCCESS! Current User: ");
  };
  const onFailure = async () => {
    console.log("LOGIN FAILED! res: ");
  };

  const loginSchema = Yup.object().shape({
    userName: Yup.string().required("User Name is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 character"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginDto>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmitLoginForm = async (data: ILoginDto) => {
    try {
      setLoading(true);
      await login(data.userName, data.password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = error as { data: string; status: number };
      const { status, data } = err;
      if (status === 401) {
        toast.error("Invalid Username or Password");
      } else {
        toast.error("An Error occurred. Please contact admins");
      }
    }
  };


  //Firebase Auth-----------------------------------
  const handleSignIn = async () => {
    try {
        const data = await signInWithPopup(auth, provider);
        const user = data.user;
        
        const RegAcc = {
          // firstName: user.displayName?.split(" ")[0] || "",  
          // lastName: user.displayName?.split(" ")[1] || "",  
          userName: user.email?.split("@")[0] || "",         
          email: user.email || "",                           
          password: "",                                      
          // address: "",                                       
          registerType: "Google"
      };
            
      await login(
          RegAcc.userName,          
          RegAcc.password,          
          // RegAcc.registerType
      );      
      toast.success("Google Sign In Successfull :)")

        setLoading(false);
    } catch (error) {
        console.error('Google Sign-In Error:', error);
        toast.error('Google Sign-In Failed. Please Try Again.');
        setLoading(false);
    }
};

  return (
    <div className="pageTemplate1">
      {/* <div>Left</div> */}
      <div className="max-sm:hidden flex-1 min-h-[600px] h-4/5 bg-gradient-to-tr from-[#405162] via-gray-400 to-[#2E3944] hover:cursor-pointer flex flex-col justify-center items-center rounded-l-2xl"
      onClick={() => navigate("/")}>
        <div className="h-3/5 p-6 rounded-2xl flex flex-col gap-8 justify-center items-start bg-white bg-opacity-20 border border-[#FFFFFF] relative">
          <h1 className="text-6xl font-bold text-[#201e1e]">A Quick App</h1>
          <h1 className="text-3xl font-bold text-[#201e1e]">
            Welcome to Login Page
          </h1>
          <h4 className="text-3xl font-semibold text-white">
            By Abhishek
          </h4>
          <h4 className="text-2xl font-semibold text-white">V 8.8.8</h4>
          <div className="absolute -top-20 right-20 w-48 h-48 bg-gradient-to-br from-[#8a98a6]  to-[#f2f2f2] rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-[#a3c9ef] to-[#3c3d3d] rounded-full blur-3xl"></div>
        </div>
      </div>
      {/* <div>Right</div> */}
      <form
        onSubmit={handleSubmit(onSubmitLoginForm)}
        className="flex-1 min-h-[600px] h-4/5 bg-[#d3d9d4] flex flex-col justify-center items-center rounded-r-2xl "
      >
        <h1 className="text-4xl font-bold mb-2 text-[#000]">Login</h1>

        <InputField
          control={control}
          label="User Name"
          inputName="userName"
          error={errors.userName?.message}
        />
        <InputField
          control={control}
          label="Password"
          inputName="password"
          inputType="password"
          error={errors.password?.message}
        />

        <div className="px-4 mt-2 mb-6 w-9/12 flex gap-2">
          <h1>Don't have an account?</h1>
          <Link
            to={PATH_PUBLIC.register}
            className="text-blue-600 border border-blue-600 font-bold hover:shadow-[0_0_5px_2px_#754eb44c] px-3 rounded-2xl duration-200"
          >
            Register
          </Link>
        </div>
                
        <div className="mt-0 mb-0 w-9/12 justify-center items-center flex">        
        <Button 
          variant="secondary"
          type="button"
          label="Sign in with Google"
          onClick={handleSignIn}
          />
          </div>                  
        

        <div className="flex justify-center items-center gap-4 mt-4">
          <Button
            variant="secondary"
            type="button"
            label="Reset"
            onClick={() => reset()}
          />
          <Button
            variant="primary"
            type="submit"
            label="Login"
            onClick={() => {}}
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
