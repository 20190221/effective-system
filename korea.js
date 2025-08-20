@charset "UTF-8";

/* ===== Main Container ===== */
.container{
  padding: 32px 24px 80px;
  margin-left: 240px; /* space for side menu */
  max-width: 1120px;
}

/* ===== Film Sections (clean blue accent) ===== */
.film-section{
  display: grid;
  grid-template-columns: 420px 1fr;
  gap: 32px;
  align-items: start;
  margin: 48px 0;
  opacity: 0;
  transform: translateY(12px);
  transition: opacity .7s ease, transform .7s ease;
}
.film-section.reverse{ grid-template-columns: 1fr 420px; }
.film-section.show{ opacity: 1; transform: translateY(0); }

/* Photo (polaroid-ish, subtle) */
.film-photo{
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 10px;
  position: relative;
}
.film-photo img{
  width: 100%;
  height: auto;
  display:block;
  border-radius: 10px;
}
.film-date{
  position: absolute;
  right: 16px;
  bottom: 10px;
  background: rgba(59,130,246,0.12);
  color: var(--blue-700);
  padding: 6px 10px;
  border-radius: 8px;
  font-size: .8rem;
  border: 1px solid var(--blue-200);
}

/* Note Card */
.film-note{
  background: #fff;
  border: 1px solid var(--line);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 24px 26px;
}
.film-note h2{
  margin: 0 0 12px;
  font-size: 1.25rem;
  color: var(--blue-700);
}
.film-note p{
  margin: 0;
  color: var(--text);
}
