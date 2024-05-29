import Image from "next/image";
import Login from "./login/page";
import Signup from "./signup/page";
import Questionaire from "./questionaire/page";
import { LoadingRender } from "./components/helper/LoadingRender";
import ChatDashboard from "./chat/app/page";
import Profile from "./profile/page";
import HomePage from "./HomePage";
import { Html, Head, Main, NextScript } from "next/document";
import Icon from '../app/favicon.ico'

export default function Home() {
  return (
    <>

      <HomePage />
    </>
  );
}
