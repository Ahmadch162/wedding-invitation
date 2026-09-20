function BrideCard({ name }) {
  return (
    <article className="bride-card">
      <div className="bride-card-border">
        <div className="bride-card-inner">
          <div className="bride-monogram">
            {name
              .split(" ")
              .map((word) => word[0])
              .join("")}
          </div>

          <div className="bride-flourish">
            <span />
            <b>✦</b>
            <span />
          </div>

          <p className="bride-label">THE BRIDE</p>

          <h3>{name}</h3>

          <p className="bride-parent">
            Daughter of Abid Farooq
          </p>

          <div className="bride-paisley">
            ❧
          </div>
        </div>
      </div>
    </article>
  );
}

export default BrideCard;