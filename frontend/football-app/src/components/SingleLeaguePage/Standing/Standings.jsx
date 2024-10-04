import classes from "./Standings.module.css";

export default function Standings({ team }) {
  return (
    <>
      <span>{team.rank}</span>
      <span>{team.team.name}</span>
      <span>{team.all.goals.for}</span>
      <span>{team.all.goals.against}</span>
      <span>{team.goalsDiff}</span>
      <span>{team.form}</span>
      <span>{team.all.played}</span>
      <span>{team.all.win}</span>
      <span>{team.all.draw}</span>
      <span>{team.all.lose}</span>
      <span>{team.points}</span>
    </>
  );
}
