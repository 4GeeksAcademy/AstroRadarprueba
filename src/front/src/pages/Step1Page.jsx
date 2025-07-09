import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { updateMissionData } from "../servicios/mission-service.js";
import cosmoTip1 from "../pages/assest/cosmo-tip1.png";
import { getUserLocation } from "../servicios/geolocation-service";
import { getJSONCoords } from "../servicios/cosmo-service.js";
import Map from "../components/dashboard/Map.jsx";
function Step1Page() {
  const [location, setLocation] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [spots, setSpots] = useState(null);
  const navigate = useNavigate();

  const fetchAI = async (lat, lon) => {
    try {
      const data = await getJSONCoords(lat, lon);
      setSpots(data.spots);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchAI(latitude, longitude);
      },
      (err) => {
        alert("Ubicación no permitida.");
        console.error(err);
      }
    );
  }, []);
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
  const _handleSelectLocation = () => {
    setLocation({
      lat: 39.3,
      lng: -0.4,
      name: "Alberic Base---mokeado",
    });
  };
  const _confirmLocation = () => {
    if (!location) return;
    updateMissionData({ location });
    navigate("/dashboard/missions/step2");
  };

  return (
    <>
      <div className="flex flex-col gap-4 text-white pr-4">
        <h3 className="text-md font-medium">
          🌍 Seleccioná la ubicación del evento
        </h3>
        {/* MAPAAAAAAA */}
        <div className="bg-gray-800 rounded-xl p-4 w-full h-[500px] relative">
          <Map locations={spots} userPosition={userLocation} />
          <div className="flex justify-center mt-2">
            {/* BOTÓN -- SELECCIONAR UBICACIÓN -- BOTON*/}
            <button
              onClick={_handleSelectLocation}
              className="btn-sug group rounded-[12px] p-[1.5px] text-white text-sm h-10 w-auto font-medium transition duration-300 flex items-center justify-center hover:shadow-2xl hover:shadow-purple-600/30"
              style={{
                backgroundImage:
                  "linear-gradient(var(--components-background), var(--components-background)), " +
                  "linear-gradient(to right, #a855f7, #d946ef, #22d3ee)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                border: "2px solid transparent",
              }}
            >
              <div
                className="rounded-[12px] w-full h-full flex items-center justify-center transition duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-gray-700 group-hover:to-gray-900 px-4"
                style={{ backgroundColor: "var(--components-background)" }}
              >
                Seleccionar ubicación
              </div>
            </button>
          </div>
        </div>
        {/* UBICACIÓN SELECCIONADA */}
        {location && (
          <div className="bg-gray-900 rounded-xl p-4 text-sm text-gray-300 mb-2 w-fit">
            ✅ Ubicación seleccionada:{" "}
            <span className="text-white font-semibold">{location.name}</span>
          </div>
        )}
        {/* BOTÓN -- CONFIRMAR */}
        {location && (
          <div className="absolute top-[400px] left-10 z-40 ">
            <button
              onClick={_confirmLocation}
              className="btn-sug group rounded-[12px] p-[1.5px] text-white text-sm h-10 w-auto font-medium transition duration-300 flex items-center justify-center hover:shadow-2xl hover:shadow-purple-600/30"
              style={{
                backgroundImage:
                  "linear-gradient(var(--components-background), var(--components-background)), " +
                  "linear-gradient(to right, #a855f7, #d946ef, #22d3ee)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                border: "2px solid transparent",
              }}
            >
              <div
                className="rounded-[12px] w-full h-full flex items-center justify-center transition duration-300 ease-in-out group-hover:bg-gradient-to-br group-hover:from-gray-700 group-hover:to-gray-900 px-6 py-3"
                style={{ backgroundColor: "var(--components-background)" }}
              >
                Confirmar base estelar
              </div>
            </button>
          </div>
        )}
      </div>
      {/* COSMOTIP--falta implementar ia */}
      <div className="fixed bottom-60 right-20 z-50 bg-gray-900 rounded-xl p-4 shadow-lg max-w-[400px]">
        <h4 className="text-purple-300 font-bold mb-4">✨ Cosmotip</h4>
        <p>Para una lluvia de meteoros, elegí un lugar alejado de luces</p>
      </div>
      <img
        src={cosmoTip1}
        alt="Cosmotip"
        className="fixed bottom-10 right-10 w-[12%] rounded-md z-50"
      />
    </>
  );
}
export default Step1Page;
