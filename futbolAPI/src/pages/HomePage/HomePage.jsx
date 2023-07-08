import "./styles.scss";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../components/DataContext/dataContext.jsx";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  const { teamsData, setTeamsData } = useContext(DataContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const url =
      "https://api-football-beta.p.rapidapi.com/teams?season=2023&league=128";
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
      setTeamsData(data.response);
    } catch (error) {
      console.error(error);
    }
  }

  const teamsName = () => {
    const filteredTeams = teamsData.filter((team) =>
      team.team.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredTeams.map((team) => {
      const handleClick = () => {
        navigate(`/team/${team.team.id}`);
      };

      return (
        <a className="team-name" key={team.team.id} onClick={handleClick}>
          {team.team.name}
        </a>
      );
    });
  };

  return (
    <section className="home-section">
      <div className="teamstable-conteiner">
        <div className="teamstable">
          <a>Equipos del fútbol Argentino. 1ra división</a>
          <input
            type="text"
            placeholder="Buscar equipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {teamsName()}
        </div>
      </div>
    </section>
  );
}
