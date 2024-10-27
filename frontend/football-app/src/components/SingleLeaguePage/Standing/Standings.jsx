import classes from "./Standings.module.css";

export default function Standings({ team }) {
  const renderForm = (form) => {
    return form.split("").map((result, index) => {
      let className;
      if (result === "W") {
        className = classes.win;
      } else if (result === "D") {
        className = classes.draw;
      } else if (result === "L") {
        className = classes.lose;
      }

      return (
        <div key={index} className={className}>
          {result}
        </div>
      );
    });
  };

  return (
    <>
      <span style={{ paddingLeft: "1.4rem" }}>{team.rank}.</span>
      <span>{team.team.name}</span>
      <span>{team.all.goals.for}</span>
      <span>{team.all.goals.against}</span>
      <span>{team.goalsDiff}</span>

      <span className={classes.formContainer}>{renderForm(team.form)}</span>

      <span>{team.all.played}</span>
      <span>{team.all.win}</span>
      <span>{team.all.draw}</span>
      <span>{team.all.lose}</span>
      <span>{team.points}</span>
    </>
  );
}
