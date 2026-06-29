import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-6">
      <div className="max-w-md text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold">Página não encontrada</p>
        <h1 className="mb-4 font-serif text-5xl font-bold text-white">404</h1>
        <p className="mb-8 text-base leading-relaxed text-white/60">
          O endereço acessado não existe ou foi movido. Volte para a página inicial para continuar navegando.
        </p>
        <Link to="/" className="btn-cta btn-cta-primary">
          Voltar ao início
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
