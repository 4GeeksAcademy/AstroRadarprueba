import { useEffect, useState } from "react"
import { getUserInfo } from "../servicios/login-service"
import { useNavigate } from "react-router"
import { Helix } from 'ldrs/react'
import 'ldrs/react/Helix.css'
import EventoDestacado from "../components/dashboard/EventoDestacado"
import Map from "../components/dashboard/Map"
import RankingMain from "../components/dashboard/ranking-component/RankingMain"
import CosmoDashboard from "../components/dashboard/cosmo-dashboard/CosmoDashboard"
import MisionActual from "../components/dashboard/MisionActual/MisionActual"
import MisionRealizada from "../components/dashboard/MisionRealizada/MisionRealizada"

function DashboardMain(){
  const [userData, getUserData] = useState({})
 
  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.removeItem("jwt-token")
    navigate('/')
  }

  const JWTToken = localStorage.getItem("jwt-token")

  useEffect(() => {
    const getUserDataFromDatabase = async () => {
      const data = await getUserInfo()
      return getUserData(data)
    }

    getUserDataFromDatabase()
  }, [])

  useEffect(() => {
    console.log(`user-data: ${JSON.stringify(userData)}`)
  }, [userData])

  if(Object.keys(userData).length === 0){
    return(
      <div className="flex flex-col gap-3 bg-gray-900 text-white rounded-3xl p-3">
        <Helix
          size="60"
          speed="1.3"
          color="#ffffff"
        />
        <button onClick={() => navigate('/')}>🏠</button>
      </div>
    )
  }
 
  return (
    <>
      {/* <div className="flex flex-col gap-3 bg-gray-900 text-white rounded-3xl p-3">
        <h1>Nombre de usuario: {userData.username || "⚠️"}</h1>
        <h2>User id: {userData.id || "⚠️"}</h2>
        <h2>Nombre: {userData.name || "⚠️"}</h2>
        <h2>Apellidos: {userData.lastname || "⚠️"}</h2>
        <h2>Email: {userData.email || "⚠️"}</h2>
        <h2>Ciudad: {userData.city || "⚠️"}</h2>
        <h2>País: {userData.country || "⚠️"}</h2>
        <p>TOKEN: </p>
        <p className="w-200 overflow-y-auto">{JWTToken}</p>
        <button className="bg-purple-900 hover:bg-purple-300 text-white rounded-3xl p-2" onClick={handleClick}>
          Cerrar Sesión
        </button>
      </div> */}
      <div className="flex">
        <div className="flex flex-col">
          <EventoDestacado />
          <Map />
        </div>

        <div className="flex flex-col">
          <div className="flex">
            <MisionActual />
            <MisionRealizada />
          </div>
          <div className="flex gap-1 w-auto">
            <RankingMain />
            <CosmoDashboard />
          </div>
        </div>
      </div>
      
    </>
  )
}

export default DashboardMain