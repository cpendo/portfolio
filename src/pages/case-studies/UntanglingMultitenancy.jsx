import "./case-study.css";

/* Converted from case-studies/untangling-multitenancy.html.
 * Prose is straight JSX; the two .sig diagram panes use `white-space: pre-wrap`,
 * so their newlines/alignment spaces are kept as explicit string expressions
 * (JSX would otherwise collapse them). */
const UntanglingMultitenancy = () => {
  return (
    <article className="case-study">
      <div className="wrap">
        <div className="bar">
          <span className="id">
            <b>Case study</b> &nbsp;/&nbsp; Systems &amp; product design
          </span>
          <span>2026</span>
        </div>

        {/* HERO */}
        <header className="hero">
          <p className="kick">Multi-tenancy · design judgment</p>
          <h1>
            Untangling <em>Multi-tenancy</em>
          </h1>
          <p className="stand">
            I spent a stretch as the Frontend lead on an operational ERP that
            had quietly calcified around one customer's assumptions. The system
            worked great for exactly one business and couldn't bend for the
            next. Untangling it taught me{" "}
            <strong>
              where flexibility actually belongs in a system, and where reaching
              for it is just speculation dressed as foresight.
            </strong>{" "}
            Here's the lesson and how I build with it now.
          </p>

          <div className="facts">
            <div className="fact">
              <div className="l">My role</div>
              <div className="v">Frontend lead · systems research</div>
            </div>
            <div className="fact">
              <div className="l">Where the bias lived</div>
              <div className="v">Model to screen</div>
            </div>
            <div className="fact">
              <div className="l">The rule I took</div>
              <div className="v">Flexibility at the seams</div>
            </div>
            <div className="fact">
              <div className="l">The proof</div>
              <div className="v">A multi-tenant project of my own</div>
            </div>
          </div>
        </header>

        {/* THE TANGLE */}
        <section>
          <div className="col">
            <p className="tag">The tangle</p>
            <h2>We'd built an ERP that worked for exactly one operation</h2>
            <p className="muted">
              And it was hardcoded end to end. The screens assumed one business
              and so did the backend. The material hierarchy was fixed in the
              models. The processing steps were their own dedicated pages and
              endpoints, not anything you could reconfigure. Even the meaning of
              a "purchase" was welded in so a prospective customer for whom a
              purchase was <em className="i">both an expense and a revenue</em>{" "}
              simply had no shape in the system.
            </p>
            <p className="muted">
              If the bias had lived only in the UI, you'd repaint a few screens
              and move on. This problem ran through the data model itself -
              every layer - encoded one customer's business as if it were the
              only one that could exist. Onboarding anyone different meant
              editing code - in every layer at once.
            </p>
          </div>
        </section>

        <hr className="divider" />

        {/* THE REBUILD */}
        <section>
          <div className="col">
            <p className="tag">The rebuild</p>
            <h2>We didn't repaint. We rebuilt the app</h2>
            <p className="muted">
              The honest fix was never a settings screen bolted onto the old
              model; it was going back to first principles and asking what the
              primitives actually were. The sharpest move the team made was
              refusing to model "operations" at all. Sorting, baling, washing,
              composting, crushing — dozens of named processes — collapse into a
              handful of <strong>shapes</strong> with fixed conservation math.
              Name the shapes once in code; make the operations pure
              configuration on top.
            </p>
          </div>

          <div
            className="sig"
            role="img"
            aria-label="On the left, a stack of hardcoded operations — sorting, baling, washing, composting, crushing, blending, purchase, sale — each its own model, page and endpoint. On the right, they collapse into a few primitives: Splitter one-to-many, Assembler many-to-one, Transformer one-to-one, and Intake/Dispatch for money — with the math fixed and the names left as data."
          >
            <p className="cap">
              The clever collapse — dozens of named operations become a few
              primitives
            </p>
            <div className="sig-grid">
              <div className="pane plain">
                <span className="h">Hardcoded · one page each</span>
                {"Sorting\nBaling\nWashing\nComposting\nCrushing"}
                <span style={{ color: "#66727d" }}>
                  {"// each its own model,\n// page and endpoint"}
                </span>
              </div>
              <div className="sig-arrow">→</div>
              <div className="pane good">
                <span className="h">A few primitives + config</span>
                {"Splitter     1 → N   "}
                <span style={{ color: "#5a6f61" }}>(sorting)</span>
                {"\nAssembler    N → 1   "}
                <span style={{ color: "#5a6f61" }}>(baling)</span>
                {"\nTransformer  1 → 1   "}
                <span style={{ color: "#5a6f61" }}>(washing)</span>
                {"\n\n"}
                <span style={{ color: "#5a6f61" }}>
                  {"// the math is fixed;\n// the names are data"}
                </span>
              </div>
            </div>
          </div>

          <div className="col" style={{ marginTop: "34px" }}>
            <p className="muted">
              Alongside it, two more moves that pulled assumptions out of the
              code: a clean split between the <strong>blueprint</strong> (where
              you define how a business runs) and the <strong>instance</strong>{" "}
              (the daily records that flow through it); and{" "}
              <strong>per-tenant feature flags</strong>, so each customer is
              handed only the parts of the system they actually use.
            </p>

            <div className="note">
              <div className="nl">Honest scope</div>
              <p>
                <strong>
                  This rebuild was a team effort, and the engine that shipped
                  isn't mine to claim.
                </strong>{" "}
                My title was Frontend lead but I also worked the systems-design
                problem directly, spending weeks reasoning through the
                configurable-architecture question in my own research, alongside
                leading the front-end untangling. So I understood the rebuild
                from the model up and shaped how it met the user; I did not
                author its core engine.
              </p>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* THE LESSON */}
        <section>
          <div className="col">
            <p className="tag">The lesson</p>
            <h2>Collapse scattered assumptions into one thing you can name</h2>
            <p className="muted">
              The rebuild was a great lesson in finding the small set of
              primitives hiding under the mess and naming them{" "}
              <em className="i">once</em> — so what used to be welded into
              twenty places becomes a single definition you can question and
              change. Operations became a few shapes. And the same move works
              anywhere assumptions scatter — including the one I reach for most
              in my own work now: permissions.
            </p>
            <p className="pull">
              An assumption you can see in a config is a <span>setting</span>.
              One baked into a model or a screen is a <span>constraint</span>.
            </p>
          </div>

          <div
            className="sig"
            role="img"
            aria-label="Two ways to enforce the same rule: on the left, permission checks scattered inline across many service methods, which drift out of sync; on the right, a single central permission map that names each role's actions once."
          >
            <p className="cap">
              The same rule, two ways — scattered until it drifts, vs. named
              once
            </p>
            <div className="sig-grid">
              <div className="pane bad">
                <span className="h">Baked in &amp; scattered</span>
                {"if ("}
                <span className="k">role</span>
                {' !== "OWNER") deny()   '}
                <span style={{ color: "#6f5a5a" }}>// projects.ts</span>
                {"\nif ("}
                <span className="k">role</span>
                {' === "VIEWER") deny()    '}
                <span style={{ color: "#6f5a5a" }}>// templates.ts</span>
                {'\nif (![ "OWNER","ADMIN" ]\n     .includes('}
                <span className="k">role</span>
                {")) deny()   "}
                <span style={{ color: "#6f5a5a" }}>// members.ts</span>
                {"\n"}
                <span style={{ color: "#6f5a5a" }}>
                  {
                    "// …and 20 more, each its own\n// source of truth, each free\n// to drift out of sync"
                  }
                </span>
              </div>
              <div className="sig-arrow">→</div>
              <div className="pane good">
                <span className="h">Named once</span>
                <span className="k">can</span>
                {"(role, action)         "}
                <span style={{ color: "#5a6f61" }}>// shared/permissions</span>
                {"\n\nVIEWER  ⊂ EDITOR\nEDITOR  ⊂ ADMIN\nADMIN   ⊂ OWNER\n\n"}
                <span style={{ color: "#5a6f61" }}>
                  {
                    '// one map answers\n// "what may an EDITOR do?"\n// change it in one place'
                  }
                </span>
              </div>
            </div>
            <p className="foot">
              <b>
                Collapsing the scattered assumptions into a single thing you can
                name, question, and change makes it a visible setting
              </b>
            </p>
          </div>
        </section>

        <hr className="divider" />

        {/* HOW I BUILD NOW */}
        <section>
          <div className="col">
            <p className="tag">How I build now</p>
            <h2>The same judgment, on a project that's entirely mine</h2>
            <p className="muted">
              I'm building a headless email-template manager and this time every
              architectural call, and the reasoning behind it, is written down
              in my own ADRs. It's where I get to make the decisions I wish we'd
              made, deliberately, and watch the flexibility-vs-YAGNI tension
              play out in real time. The clearest example is a decision I made,
              unmade, and remade.
            </p>
          </div>

          <div className="col" style={{ marginTop: "8px" }}>
            <div className="arc">
              <div className="step">
                <div className="when">May · ADR-002</div>
                <h3>Cut roles as YAGNI</h3>
                <p>
                  Defining the MVP, I explicitly put{" "}
                  <em className="i">"complex user roles and permissions"</em>{" "}
                  out of scope, basic tenant membership only. Building a role
                  system I didn't yet need would've been speculation dressed as
                  foresight.
                </p>
              </div>
              <div className="step">
                <div className="when">July · ADR-006</div>
                <h3>Built full RBAC</h3>
                <p>
                  Two months on, I added four roles with hierarchical
                  inheritance and tenant isolation. What changed was{" "}
                  <strong>evidence</strong>. The moment resources were addressed
                  by id (<code>/tenants/:t/projects/:p</code>), a real
                  cross-tenant hole (IDOR) opened — the kind only proper
                  authorization can close.
                </p>
              </div>
            </div>
            <p className="arc-mid">
              — the same call, revisited on evidence, not speculation —
            </p>
          </div>

          <div className="col points" style={{ marginTop: "24px" }}>
            <div className="pt">
              <div className="ph">
                <h3>Tenancy is a day-one seam</h3>
                <span className="code">where flexibility earns it</span>
              </div>
              <div className="pb">
                <p>
                  Multi-tenancy and tenant isolation went in from the first
                  commit — because a tenancy boundary is the single most
                  expensive thing to retrofit into a system that never assumed
                  it. That <em className="i">is</em> the ERP's baked-in bias,
                  run in reverse: build the seam in <strong>before</strong> the
                  assumptions harden around its absence.
                </p>
              </div>
            </div>
            <div className="pt">
              <div className="ph">
                <h3>…but defer the reinforcement</h3>
                <span className="code">where YAGNI wins</span>
              </div>
              <div className="pb">
                <p>
                  Even while building RBAC, I refused the heavier "scope every
                  query inside the repository" pattern — it's a stronger
                  guarantee, but it pushes authorization into the data layer
                  before there's load to justify it. From the ADR:
                </p>
                <blockquote>
                  "Deferred: repositories stay thin… This can be revisited as
                  the number of tenant-scoped queries grows."
                </blockquote>
                <p>
                  Flexibility isn't "build everything now." It's{" "}
                  <strong>
                    build the seam, defer the reinforcement until something
                    leans on it.
                  </strong>
                </p>
              </div>
            </div>
            <div className="pt">
              <div className="ph">
                <h3>Let UX drive the data model</h3>
                <span className="code">the interface lens</span>
              </div>
              <div className="pb">
                <p>
                  Projects group templates — but forcing a new user to create
                  one before their first template is friction. So: keep{" "}
                  <code>project_id</code> strictly <code>NOT NULL</code> for
                  integrity, auto-provision a hidden "default project" on tenant
                  creation, and hide the picker until there's a second one.{" "}
                  <strong>
                    Don't make the user pay for a structure they don't need yet
                  </strong>{" "}
                  — the same instinct that made the old ERP's rigidity feel so
                  wrong from the UI.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* THE RULE */}
        <section>
          <div className="rule col" style={{ maxWidth: "760px" }}>
            <p className="tag">The rule I carry</p>
            <h2>Flexibility at the seams. YAGNI everywhere else.</h2>
            <p>
              Build flexibility where a wrong assumption is expensive to remove
              later - the seams that touch everything: tenancy, identity, the
              boundaries a whole system is scoped by. Everywhere else, don't.
              And when you're unsure, wait for evidence rather than guessing,
              the deferral is reversible. The premature abstraction usually
              isn't.
            </p>
            <p className="big">
              The skill is knowing, for any given decision,{" "}
              <span>which axis you're on</span> and the fastest way to learn
              that is to work on a system where someone guessed wrong.
            </p>
          </div>
        </section>

        <hr className="divider" />

        {/* ROLE */}
        <section>
          <div className="col">
            <p className="tag">For the record</p>
            <h2>What was mine</h2>
          </div>
          <div className="role">
            <div className="r">
              <div className="rl">I owned</div>
              <p>
                On my own project:{" "}
                <strong>every architectural call and every ADR</strong> quoted
                here. On the ERP: the{" "}
                <strong>UI/UX role and the front-end untangling</strong>, plus{" "}
                <strong>my own weeks of systems-design research</strong> into
                the configurable-architecture problem, where much of this
                thinking formed.
              </p>
            </div>
            <div className="r">
              <div className="rl">I didn't</div>
              <p>
                Architect the ERP's multi-tenant engine — that was a{" "}
                <strong>team effort I learned from</strong>, not one I claim.
                The lesson, and the practice I now apply, are what I carry
                forward.
              </p>
            </div>
          </div>
        </section>

        <footer className="doc">
          The earlier system's domain, employer, and specifics are omitted —
          this is about the design judgment, not the product.
          <br />
          Written as a portfolio case study. The ADRs quoted are from a project
          of my own; happy to walk through them in full.
        </footer>
      </div>
    </article>
  );
};

export default UntanglingMultitenancy;
