import "@/styles/globals.css";
import { useRouter } from "next/router";
import { UserProvider } from "@/contexts/userContext";
import Login from ".";
import Register from "./register";
import Home from "./home";
import Profil from "./profil/[user_id]";
import Games from "./games";

export default function App() {
  const router = useRouter();

  return (
    <UserProvider>
      {router.pathname === '/' && <Login />}
      {router.pathname === '/register' && <Register />}
      {router.pathname === '/home' && <Home />}
      {router.pathname.startsWith('/profil') && <Profil />}
      {router.pathname === '/games' && <Games />}
    </UserProvider>
  );
}
