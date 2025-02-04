import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
 const { user, logout } = useAuth();

 return (
  <div className="bg-gray-500 w-screen h-[10vh] flex items-center justify-center gap-[2vw] border-b-2 border-black">
   {user ? (
    <Button variant="secondary" size="lg" onClick={logout}>
     Выход
    </Button>
   ) : (
    <>
     <Link to="/login">
      <Button variant="secondary" size="lg">
       Логин
      </Button>
     </Link>
     <Link to="/register">
      <Button variant="secondary" size="lg">
       Регистрация
      </Button>
     </Link>
    </>
   )}
  </div>
 );
};

export default Header;
