import classes from "./MatchesPage.module.css";
import matchesData from "../../../data/PLMatches.json";

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function StandingsPage() {
  const matches = [...matchesData]
    .filter((match) => match.fixture.status.short === "FT")
    .sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date));

  const groupedMatches = matches.reduce((groups, match) => {
    const matchDate = formatDate(match.fixture.date);
    if (!groups[matchDate]) {
      groups[matchDate] = [];
    }
    groups[matchDate].push(match);
    return groups;
  }, {});

  return (
    <>
      <div className={classes.matches}>
        {Object.keys(groupedMatches).map((date) => (
          <div key={date}>
            <div className={classes.dateHeader}>{date}</div>
            {groupedMatches[date].map((match) => (
              <div key={match.fixture.id} className={classes.singleMatch}>
                <span>{match.teams.home.name}</span>
                <span>{match.goals.home}</span>
                <span> &nbsp;:&nbsp;</span>
                <span>{match.goals.away}</span>
                <span>{match.teams.away.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
