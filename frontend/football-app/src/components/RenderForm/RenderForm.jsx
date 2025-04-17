import classes from "./RenderForm.module.css";

export const RenderForm = ({ form }) => {
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
