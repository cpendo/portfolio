import "./case-study.css";

/* Converted from case-studies/hr-payroll-users-data-model-v2.html.
 * Prose is straight JSX. The two ERD panels use `white-space: pre` box-drawing
 * art with inline colour spans; converting that to JSX byte-for-byte is fragile,
 * so the original markup is injected verbatim below. It's static, self-authored,
 * and takes no user input, so the injection is safe — and the shared .erd styles
 * (see case-study.css) restyle it to the portfolio palette. */
const ERD_PAYROLL = `<b>Employee</b> <span class="rel">──&lt;</span> <b>SalaryChange</b>     <span class="rel">effective-dated · current = latest ≤ today</span>
    <span class="rel">│      └─&lt;</span> <b>Assignment</b>   <span class="rel">title / branch over time — appended, not edited</span>
    <span class="rel">│</span>
    <span class="rel">├─&lt;</span> <b>Loan</b> <span class="rel">──&lt;</span> <b>LoanTxn</b>    <span class="rel">signed entries · </span><span class="der">balance = Σ txns</span><span class="rel"> (never stored)</span>
    <span class="rel">└─&lt;</span> <b>Advance / Allowance / Shortage</b>   <span class="rel">a dated amount → one payslip line</span>

<b>PayrollRun</b> <span class="rel">──&lt;</span> <b>Payslip</b> <span class="rel">──&lt;</span> <b>PayslipLine</b>    <span class="rel">frozen as-paid snapshot · line ← source FK</span>

<b>StatutoryType</b> <span class="rel">──&lt;</span> <b>RateBand</b>    <span class="rel">effective-dated [{ upTo, rate, fixed }]</span>
                            <span class="rel">payroll uses the band effective for the period</span>

state is not a column →  <span class="der">balance · current salary = derived on read</span>`;

const ERD_IDENTITY = `<b>Employee</b> <span class="rel">(the employment · 1 per person)</span>  <span class="rel">──○</span>  <b>User</b> <span class="rel">(the login · optional)</span>
    <span class="rel">many are on payroll and never sign in</span>

<b>User</b> <span class="rel">──&lt;</span> <b>UserRole</b> <span class="rel">&gt;──</span> <b>Role</b> <span class="rel">──&lt;</span> <b>RolePermission</b> <span class="rel">&gt;──</span> <b>Permission</b>
 <span class="rel">auth identity</span>   <span class="rel">the grant</span>      <span class="rel">the bundle</span>                     <span class="rel">code = resource:action</span>
      <span class="rel">│</span>          <span class="rel">└─ scope: branch? · dept? · effectiveFrom? · expiresAt?</span>
      <span class="rel">│</span>
      <span class="rel">├─</span> legacyRef <span class="rel">{ app, oldId }</span>   <span class="rel">consolidation trail across cloned apps</span>
      <span class="rel">└─</span> passwordHash <span class="rel">argon2 · mustReset (migrated MD5) · lockout · token families</span>

grant resolves on read →  <span class="der">global (see all)</span>  <span class="rel">|</span>  <span class="der">branch/dept-scoped (results filtered)</span>
new capability →  <span class="rel">a new</span> <b>Permission</b> <span class="rel">row in a catalog — not a new column and a deploy</span>`;

const HrPayrollDataModel = () => {
  return (
    <article className="case-study">
      <div className="wrap">
        <div className="bar">
          <span className="id">
            <b>Case study</b> &nbsp;/&nbsp; Data modeling &amp; system design
          </span>
          <span>2026</span>
        </div>

        {/* HERO */}
        <header className="hero">
          <p className="kick">HR &amp; payroll platform</p>
          <h1>
            Two data models behind a <em>system of record</em>
          </h1>
          <p className="stand">
            I led the data modelling for the rebuild of an HR &amp; payroll
            platform — the system of record for a multi-company group moving off
            a decade-old legacy database. This walks through the two shapes that
            carry the whole system: the <strong>payroll spine</strong>, which
            treats time as three separate things and derives its numbers rather
            than storing them, and the <strong>identity &amp; access</strong>{" "}
            layer, which keeps a person, their employment, and their login as
            three separate things so that access can be added without a rewrite.
            Each went through roughly three iterations; I refined them against
            the legacy shape, a frontend spec, and a thinking partner I used as
            a design foil.
          </p>

          <div className="facts">
            <div className="fact">
              <div className="l">My role</div>
              <div className="v">Data model · system design</div>
            </div>
            <div className="fact">
              <div className="l">Scope</div>
              <div className="v">Payroll + identity/login</div>
            </div>
            <div className="fact">
              <div className="l">Context</div>
              <div className="v">Legacy replacement</div>
            </div>
            <div className="fact">
              <div className="l">Method</div>
              <div className="v">~3 iterations each</div>
            </div>
          </div>
        </header>

        {/* PROBLEM */}
        <section>
          <div className="col">
            <p className="tag">The problem</p>
            <h2>Two bad shapes, one blind spot</h2>
            <p className="lead muted">
              The legacy system stored answers, not the facts they came from — a
              balance was a column some code updated, a tax rate was a number
              hardcoded in the app — and it conflated a person, their job, and
              their login into one row. Both shapes fail in the same quiet way:
              nothing in the data can tell you it's gone wrong.
            </p>
            <p className="muted">
              For payroll that's not cosmetic. A payslip issued last year must
              stay exactly what was paid after this year's rates change; a loan
              balance must reconcile to the cent against a decade of legacy
              transactions at cutover. And in a multi-company group, half the
              people on payroll never log in at all — so the identity model has
              to let access be <strong>added later</strong>, scoped to the right
              branch, without rewriting the employment record to bolt on an
              account. The two data models below are how the rebuild made both
              of those true by construction.
            </p>
          </div>
        </section>

        <hr className="divider" />

        {/* DATA MODEL I — PAYROLL */}
        <section>
          <div className="col">
            <p className="tag">
              <span className="n">Data model 01 —</span> the payroll spine
            </p>
            <h2>No fact is a single mutable column</h2>
            <p className="muted">
              Most of the domain reduces to one observation: a salary, a job
              title, a statutory rate, a balance — each is true{" "}
              <em className="i">as of a date</em>, and a payroll run reads all
              of them at once across different points in time. So none of them
              is allowed to be a single mutable column. Each fact lives in
              whichever of three tenses matches how it actually behaves.
            </p>
          </div>

          <div
            className="schema"
            role="img"
            aria-label="Payroll entity model: an Employee has effective-dated salary changes and assignments; loans have a signed transaction ledger whose balance is derived; advances, allowances and shortages become payslip lines; a payroll run produces immutable payslips with itemised lines; statutory types have effective-dated rate bands. Current salary, loan balance, and status are derived on read, never stored."
          >
            <p className="cap">The spine — one fact, one tense</p>
            <pre
              className="erd"
              dangerouslySetInnerHTML={{ __html: ERD_PAYROLL }}
            />

            <div className="tenses">
              <div className="t">
                <div className="tl">Tense 1 — the past</div>
                <div className="tn">Append, never overwrite</div>
                <p>
                  Salary and position are effective-dated histories. A raise
                  inserts a row; the old figure stays true for the period it was
                  true. Nothing is edited in place.
                </p>
              </div>
              <div className="t">
                <div className="tl">Tense 2 — the present</div>
                <div className="tn">Derive, never store</div>
                <p>
                  A loan balance is the sum of a signed ledger. Current salary
                  is the latest effective row. No status or balance column
                  exists to forget to update.
                </p>
              </div>
              <div className="t">
                <div className="tl">Tense 3 — frozen</div>
                <div className="tn">Snapshot, never recompute</div>
                <p>
                  A finalised payslip is an immutable record of what was
                  actually paid. It never re-derives, so last year's numbers
                  survive this year's rate change.
                </p>
              </div>
            </div>
          </div>

          <div className="col" style={{ marginTop: "40px" }}>
            <div className="dec">
              <div className="d-head">
                <h3>The signed ledger</h3>
                <span className="code">derive, don't store</span>
              </div>
              <div className="d-body">
                <p>
                  A loan holds no <strong>balance</strong> column. Every
                  disbursement, repayment, top-up, write-off and reversal is a{" "}
                  <strong>signed entry</strong>; the balance is their running
                  sum, computed on every read. It removes a whole class of bug —
                  no denormalised total that can drift away from the entries it
                  summarises. Re-summing has a ceiling as entries pile up, but
                  reads aren't a bottleneck yet, so the checkpoint that fixes it
                  stays deferred until the numbers say otherwise. Appends run at
                  serializable isolation, so two concurrent entries can't
                  compute a balance off a stale predecessor.
                </p>
              </div>
            </div>
            <div className="dec">
              <div className="d-head">
                <h3>Rates as effective-dated bands</h3>
                <span className="code">not a number in code</span>
              </div>
              <div className="d-body">
                <p>
                  Statutory deductions are a user-managed catalog of{" "}
                  <strong>graduated bands with an effective date</strong>, not
                  constants baked into the application. Payroll reads the band
                  in force for the run's period. An admin adds next year's rates
                  with no developer and no deploy — the exact failure the old
                  system was built on.
                </p>
              </div>
            </div>
            <div className="dec">
              <div className="d-head">
                <h3>Every payslip line cites its source</h3>
                <span className="code">reconcilable by construction</span>
              </div>
              <div className="d-body">
                <p>
                  A deduction line carries a foreign key back to the loan or
                  advance it came from, and posting it writes{" "}
                  <strong>both</strong> the line and the ledger entry, linked.
                  You can trace any figure on a payslip to the record that
                  produced it — which is what made the migration's financial
                  reconciliation provable rather than hopeful.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* DATA MODEL II — IDENTITY & ACCESS */}
        <section>
          <div className="col">
            <p className="tag">
              <span className="n">Data model 02 —</span> identity &amp; access
            </p>
            <h2>
              A person, their employment, and their login are three different
              things
            </h2>
            <p className="muted">
              The old schema was one row for all three. That's fine until
              someone on payroll has no login, or one person works across two
              companies, or you need to grant a branch manager access to{" "}
              <em className="i">only</em> their branch. So the rebuild splits
              identity into separate shapes that link rather than merge — and
              makes authorization <strong>data you grant</strong>, not flags
              edited in code. This model went through the same three passes as
              the payroll spine; most of the iterating was about keeping every
              future capability additive.
            </p>
          </div>

          <div
            className="schema"
            role="img"
            aria-label="Identity and access model: an Employee record (the employment) optionally links to a User (the login); a User is granted Roles through scoped UserRole rows carrying an optional branch, department and expiry; a Role bundles Permissions expressed as resource:action; a legacy consolidation trail records the source app and old id. Permission scope resolves on read to either global or a specific set of branches and departments."
          >
            <p className="cap">The shape — split identities, access as data</p>
            <pre
              className="erd"
              dangerouslySetInnerHTML={{ __html: ERD_IDENTITY }}
            />

            <div className="tenses">
              <div className="t">
                <div className="tl">Split 1 — the person</div>
                <div className="tn">Employment ≠ account</div>
                <p>
                  An Employee record is the employment, one per person across
                  companies. It exists and is paid whether or not a login is
                  ever attached.
                </p>
              </div>
              <div className="t">
                <div className="tl">Split 2 — the login</div>
                <div className="tn">Optional, linked, additive</div>
                <p>
                  A User is a separate auth identity, optionally linked to an
                  Employee. Adding access later is one nullable link — never a
                  rewrite of the record.
                </p>
              </div>
              <div className="t">
                <div className="tl">Split 3 — the grant</div>
                <div className="tn">Scoped, expiring rows</div>
                <p>
                  A role is granted to a user scoped to a branch or department
                  with an optional expiry. Authorization is rows you can add and
                  revoke, not code you redeploy.
                </p>
              </div>
            </div>
          </div>

          <div className="col" style={{ marginTop: "40px" }}>
            <div className="dec">
              <div className="d-head">
                <h3>Access is data, not code</h3>
                <span className="code">roles &amp; permissions, not flags</span>
              </div>
              <div className="d-body">
                <p>
                  Legacy authorization was a row of{" "}
                  <strong>binary module flags</strong> per user, edited in code.
                  The replacement is a catalog: <code>resource:action</code>{" "}
                  permissions bundled into roles, granted through join rows. A
                  new capability is a new permission row, not a new column and a
                  deploy — the same "structure lives in data" principle that
                  pulled the statutory rates out of the source code.
                </p>
              </div>
            </div>
            <div className="dec">
              <div className="d-head">
                <h3>Grants carry their own scope</h3>
                <span className="code">branch · department · expiry</span>
              </div>
              <div className="d-body">
                <p>
                  A grant isn't just <em className="i">user has role</em> — it's{" "}
                  <em className="i">
                    user has role, in this branch, until this date
                  </em>
                  . The scope lives on the join row. That single decision is
                  what lets a branch manager see only their branch and a
                  covering role lapse on its own, with no separate "temporary
                  access" mechanism bolted on.
                </p>
              </div>
            </div>
            <div className="dec">
              <div className="d-head">
                <h3>Scope resolves on read</h3>
                <span className="code">the same rule, everywhere</span>
              </div>
              <div className="d-body">
                <p>
                  Reads don't hardcode "who sees what." A helper resolves a
                  user's grants for a permission into either{" "}
                  <strong>global</strong> or a concrete set of{" "}
                  <strong>branches / departments</strong>, and the service
                  filters its query by that set. A global grant (no branch, no
                  department) simply returns "see everything," so an org-wide
                  role needs no special case — the same resolution covers both.
                </p>
              </div>
            </div>
            <div className="dec">
              <div className="d-head">
                <h3>A consolidation trail, not a clean-slate</h3>
                <span className="code">legacyRef {"{ app, oldId }"}</span>
              </div>
              <div className="d-body">
                <p>
                  The group ran several <strong>cloned copies</strong> of the
                  old app, so the same person existed many times over. Rather
                  than hide that, every user carries a{" "}
                  <strong>legacyRef</strong> naming its source app and old id.
                  That trail is what lets duplicates across instances be merged
                  into one identity deliberately — and audited afterwards —
                  instead of silently collapsed at import.
                </p>
              </div>
            </div>
            <div className="dec">
              <div className="d-head">
                <h3>The login itself is hardened by shape</h3>
                <span className="code">migrate without weakening</span>
              </div>
              <div className="d-body">
                <p>
                  Passwords are <strong>argon2</strong>; the decade of legacy{" "}
                  <strong>MD5</strong> hashes migrate as-is but carry a{" "}
                  <em className="i">must-reset</em> flag, so a weak hash is
                  forced to rotate on first login rather than lingering. Refresh
                  tokens are stored only as hashes and grouped into a{" "}
                  <strong>rotation family</strong> — replaying a revoked token
                  revokes the whole family — and repeated failures lock the
                  account. None of that is enforcement code sprinkled around;
                  it's fields the auth path reads.
                </p>
              </div>
            </div>
            <div className="dec">
              <div className="d-head">
                <h3>One settings shape, read through one layer</h3>
                <span className="code">config is data too</span>
              </div>
              <div className="d-body">
                <p>
                  Configuration is a single <strong>key/value</strong> store,
                  but the payoff only appears once reads go through{" "}
                  <strong>one typed layer</strong> that owns the key strings and
                  the defaults. Before, defaults were copy-pasted at each call
                  site — the same relief figure hardcoded in three services.
                  Centralising the read means a setting has exactly one default
                  and one meaning, and each key can gate its own visibility by
                  permission.
                </p>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* PUSHBACK */}
        <section>
          <div className="col">
            <p className="tag">The decisions I made</p>
            <h2>
              Model how the data behaves, not how it's convenient to store
            </h2>
            <p className="muted">
              A schema is easy to add to and expensive to walk back, so across
              the three passes on each model the judgment that mattered was
              mostly about what <em className="i">not</em> to put in — telling a
              fact the model should hold apart from a convenience someone wanted
              it to store. Each of these was a call made against the proposal on
              the table: the legacy shape, a frontend spec, or an earlier draft
              of my own.
            </p>
          </div>

          <div className="col" style={{ marginTop: "26px" }}>
            <div className="vrow">
              <div className="vtag cut">Cut · the column</div>
              <div className="body">
                <h3>Refused to store a balance — derive it from a ledger</h3>
                <p>
                  The legacy model carried a <code>balance</code> column that
                  application code kept updating, and it drifted. The obvious
                  path was to migrate that column forward. I{" "}
                  <strong>removed it entirely</strong> and modeled loans as a
                  signed, append-only ledger whose balance is a sum computed on
                  read. No stored total means no total that can silently
                  disagree with its own transactions — the single most important
                  shape in the system, and it was a subtraction.
                </p>
              </div>
            </div>
            <div className="vrow">
              <div className="vtag kept">Kept · the harder shape</div>
              <div className="body">
                <h3>Salary is an appended history, not an editable field</h3>
                <p>
                  A raise looks like it should just update a number. It's an{" "}
                  <strong>effective-dated history</strong> instead — a raise
                  inserts a row, and "current salary" is the latest row dated on
                  or before today. It's more tables and more query, and it's
                  non-negotiable: a payroll run for a past period must read the
                  salary that was true <em className="i">then</em>, which a
                  mutable field destroys the moment it's overwritten.
                </p>
              </div>
            </div>
            <div className="vrow">
              <div className="vtag kept">Kept · additive by design</div>
              <div className="body">
                <h3>
                  Split the person from the login, even with one login today
                </h3>
                <p>
                  The MVP mostly grants the one owner account, so merging login
                  into the employee row would have been less schema up front. I
                  kept them <strong>separate and optionally linked</strong>{" "}
                  anyway, because most people on payroll never sign in and
                  adding access later must be a nullable link, not a migration.
                  Same instinct as the rate that stays a field: model for how
                  the thing actually behaves, not for the smallest MVP.
                </p>
              </div>
            </div>
            <div className="vrow">
              <div className="vtag stopped">Caught · the wrong key</div>
              <div className="body">
                <h3>A cross-company reference needs a composite key</h3>
                <p>
                  A legacy identifier looked unique, so the first cut modeled it
                  as a plain unique key. In the new{" "}
                  <strong>multi-company</strong> model the same reference
                  legitimately recurs — once per company — so uniqueness had to
                  be the <strong>composite of reference and company</strong>. A
                  scalar unique there would have rejected valid rows at import
                  and silently collided two companies' figures into one during
                  reconciliation.
                </p>
              </div>
            </div>
            <div className="vrow">
              <div className="vtag kept">Held · restraint</div>
              <div className="body">
                <h3>A shape earns its complexity — advances stayed flat</h3>
                <p>
                  Loans became a full ledger because their data genuinely is
                  many transactions over time. Advances look similar, so the
                  tempting move was to model them the same way — but today
                  they're single-shot recovery, so they{" "}
                  <strong>stayed a flat record</strong>, with the trigger to
                  promote them to a ledger noted in case multi-installment
                  recovery ever turns out to be real. Same model, opposite
                  calls, decided by what the data actually does — not by
                  symmetry for its own sake.
                </p>
              </div>
            </div>
          </div>

          <div className="col">
            <p className="pull">
              The recurring instinct across both models:{" "}
              <span>
                a value stays a field until it earns the right to be its own
                model
              </span>
              , state stays derived until a measurement forces a cache, access
              stays additive until someone actually needs it, and a setting
              stays unmodeled until real code reads it.
            </p>
          </div>
        </section>

        <hr className="divider" />

        {/* MIGRATION */}
        <section>
          <div className="col">
            <p className="tag">The verifiable part</p>
            <h2>A migration that had to prove itself, not just run</h2>
            <p className="muted">
              A clean model is worthless if the decade of history landing in it
              is wrong. The legacy import was designed to be{" "}
              <strong>re-runnable and self-checking</strong>, because a payroll
              cutover you can't verify is one you can't trust.
            </p>
          </div>

          <div className="col" style={{ marginTop: "20px" }}>
            <h3>Idempotent by construction</h3>
            <p className="muted">
              Every migrated row carries its <strong>legacy id</strong>, so the
              import keys on it and can run again without doubling anything —
              you fix a transform, re-run, and the result converges instead of
              duplicating. Those same legacy ids are what let the tooling
              reconstruct relationships the old schema only implied — matching a
              loose repayment back to its loan using the legacy balance as an
              oracle, and merging a person's duplicated accounts across cloned
              apps into one identity.
            </p>

            <h3 style={{ marginTop: "30px" }}>
              Reconciliation as a gate, not a report
            </h3>
            <p className="muted">
              Cutover <strong>blocks</strong> on a mismatch. Row counts and
              financial totals — the sum of net pay per run, each loan's balance
              against the legacy figure — have to tie out before the switch
              flips, and the old system stays read-only through a grace period.
              Verification isn't a report you read after the fact; it's a
              condition the migration has to satisfy before it's allowed to
              finish.
            </p>
          </div>
        </section>

        <hr className="divider" />

        {/* HONEST LIMITS */}
        <section>
          <div className="limits col" style={{ maxWidth: "760px" }}>
            <p className="tag" style={{ color: "var(--accent)" }}>
              The Tradeoffs
            </p>
            <h2>Derived-everything has a cost, and I chose where to pay it</h2>
            <p>
              Computing balances and current values on every read instead of
              storing them is the right call for correctness, but it isn't free
              — it trades cheap writes for more expensive reads. That was
              accepted deliberately: at this scale the read cost is negligible,
              and if a hot path ever needs it, a derived value can be{" "}
              <strong>cached</strong> without changing the source of truth. The
              rule is that a cache may be wrong and recoverable; a stored
              balance that's wrong is just wrong.
            </p>
            <p>
              Splitting person / employment / login pays off mostly later —
              today there's often one login per employer, so the boundary is
              latent. It's insurance against the second and third front door,
              bought cheaply now. Naming the boundary was the point: the model
              claims exactly what it can enforce, and no more.
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
                <strong>The two data models and the judgment calls</strong> —
                the three-tense treatment of time, the signed ledgers, the
                effective-dated rates, the three-way split of person /
                employment / login, and access-as-data. Above all the editing:
                what to cut, what to refuse, when to stop and check. I directed
                the design, ran it through about three iterations each, and
                documented the schema and its rules module by module.
              </p>
            </div>
            <div className="r">
              <div className="rl">I didn't do alone</div>
              <p>
                I worked against a{" "}
                <strong>
                  legacy system and a frontend spec other people wrote
                </strong>
                , and I designed with a <strong>thinking partner</strong> I used
                as a foil — some framings, like the field-versus-model
                heuristic, weren't mine to originate, and implementation was
                shared. What was mine was the direction, the decisions, the
                pushback, and the reconciliation discipline.
              </p>
            </div>
          </div>
        </section>

        <footer className="doc">
          Domain, entities, and figures are generalised — this describes the
          system thinking, not the specific product or employer.
          <br />
          Written as a portfolio case study. Happy to walk through the real
          schema, the migration harness, and the cut list in conversation.
        </footer>
      </div>
    </article>
  );
};

export default HrPayrollDataModel;
