import { useTranslation } from "../hooks/useTranslation";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-left">
        <strong>Jóhann Hallgrímsson</strong>
        <span className="footer-phone">611 4748</span>
        <a className="footer-email" href="mailto:joh@mi.is">joh@mi.is</a>
      </div>

      <div className="footer-links">
        <a href="https://www.linkedin.com/in/joihallgrims/" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="/cv-is.pdf" download>CV (IS)</a>
        <a href="/cv-en.pdf" download>CV (EN)</a>
      </div>
    </footer>
  );
}
