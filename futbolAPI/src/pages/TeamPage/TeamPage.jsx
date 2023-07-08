import "./styles.scss";
import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../components/DataContext/dataContext.jsx";

export function TeamPage() {
  const { id } = useParams();
  const [teamName, setTeamName] = useState("");
  const [coaches, setCoaches] = useState([]);
  const { teamsData } = useContext(DataContext);

  useEffect(() => {
    // Lógica para obtener los datos del equipo según el ID y establecer el nombre del equipo
    const team = teamsData.find((item) => item.team.id == id);
    if (team) {
      setTeamName(team.team.name);
    }
  }, [id, teamsData]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const url = `https://api-football-beta.p.rapidapi.com/coachs?team=${id}`;

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "ee1fca078dmsh7b7cb78c119a3a2p17b35bjsn2a48047cad75",
        "X-RapidAPI-Host": "api-football-beta.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setCoaches(data.response);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="home-section">
      <div className=" data-container">
        <h2>Coaches del equipo: {teamName}</h2>
        <div className="coach-names">
          {coaches.map((coach) => (
            <h5 key={coach.id}>{coach.name} , </h5>
          ))}
        </div>
        <div className="data-stadium">
          <h3>
            Estadio: {teamsData.find((item) => item.team.id == id)?.venue.name}
          </h3>
          <h3>
            Ciudad: {teamsData.find((item) => item.team.id == id)?.venue.city}
          </h3>
          <h3>
            Capacidad:{" "}
            {teamsData.find((item) => item.team.id == id)?.venue.capacity}
          </h3>
          <img
            src={teamsData.find((item) => item.team.id == id)?.venue.image}
          ></img>
        </div>
      </div>
    </section>
  );
}
