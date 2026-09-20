import BrideCard from "./BrideCard";

function BrideSection() {
  return (
    <section className="brides-section section-shell">
      <div className="section-heading reveal">
        <p className="eyebrow">Two Beautiful Reasons to Celebrate</p>

        <h2>
          Our Beloved Brides
        </h2>

        <div className="ornamental-divider">
          <span />
          <b>❈</b>
          <span />
        </div>
      </div>

      <div className="brides-grid">
        <BrideCard name="SAROSH ABID" />
        <BrideCard name="ZOYA ABID" />
      </div>
    </section>
  );
}

export default BrideSection;