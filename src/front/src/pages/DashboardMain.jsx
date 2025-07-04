import { useEffect, useState } from "react";
import { getUserInfo } from "../servicios/login-service";
import { useNavigate } from "react-router";
import { Helix } from "ldrs/react";
import "ldrs/react/Helix.css";
import EventoDestacado from "../components/dashboard/EventoDestacado";
import Map from "../components/dashboard/Map";
import RankingMain from "../components/dashboard/ranking-component/RankingMain";
import CosmoDashboard from "../components/dashboard/cosmo-dashboard/CosmoDashboard";
import MisionActual from "../components/dashboard/MisionActual/MisionActual";
import MisionRealizada from "../components/dashboard/MisionRealizada/MisionRealizada";
import Calendar from "../components/dashboard/calendar/Calendar";
import Logotipo from "../components/dashboard/logotipo/Logotipo.jsx";
import EventoSugerido from "../components/dashboard/EventoSugerido.jsx";
import EventoProgramado from "../components/dashboard/EventoProgramado.jsx";
import InfoTopComponent from "../components/dashboard/InfoTopComponent/InfoTopComponent.jsx";
import { getUserLocation } from "../servicios/geolocation-service.js";
import SideBar from "../components/sidebar/SideBar.jsx";

function DashboardMain() {
  const [userData, getUserData] = useState({});
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserDataFromDatabase = async () => {
      const data = await getUserInfo();
      return getUserData(data);
    };

    getUserDataFromDatabase();

    getUserLocation(
      (coords) => {
        setUserLocation(coords);
        setErrorMsg(null);
      },
      (mensajeError) => {
        setErrorMsg(mensajeError);
      }
    );
  }, []);

  useEffect(() => {
    console.log(`user-data: ${JSON.stringify(userData)}`);
  }, [userData]);

  if (Object.keys(userData).length === 0) {
    return (
      <div className="flex flex-col gap-3 bg-gray-900 text-white rounded-3xl p-3">
        <Helix size="60" speed="1.3" color="#ffffff" />
        <button onClick={() => navigate("/")}>🏠</button>
      </div>
    );
  }

  return (
    <>
      <Logotipo />

      <div className="flex flex-row items-center justify-center gap-3">
        <SideBar />

        <div className="flex flex-col w-350 h-200 overflow-hidden dashboard--main-container">  {/*Aquí irá el Outlet */}
          <InfoTopComponent errorMsg={errorMsg} userLocation={userLocation} />
          <div className="flex flex-row gap-3 w-full">
            <div className="flex flex-col w-1/2 gap-1">
              <EventoDestacado />
              <Map userLocation={userLocation}/>
              <div className="flex flex-row w-full gap-1">
                <Calendar />
                <EventoSugerido />
              </div>
            </div>

            <div className="flex flex-col w-full gap-1">
              <div className="flex flex-row w-9/10 gap-1">
                <MisionActual />
                <MisionRealizada />
              </div>
              <EventoProgramado />
              <div className="flex flex-row w-9/10 gap-1 relative rounded-2xl borde-con-degradado">
                <RankingMain />
                <CosmoDashboard />
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </>
  );
}

export default DashboardMain;
