import { useAuth } from "@/context/AuthContext";

const Header = () => {
 const { user } = useAuth();
 return (
  <div className="bg-gray-800 w-screen h-[10vh] flex items-center justify-center gap-[2vw] border-b-2 border-black">
   {user && (
    <div className="text-white"> Welcome, {user.email}</div>
   )}
  </div>
 );
};

export default Header;
