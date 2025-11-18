import Image from "next/image";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-soft py-10 text-sm text-subtle">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3 text-[var(--foreground)]">
          <Image src="/images/logo.png" alt="Logotipo" width={32} height={32} />
          <span className="text-muted">Alonso Viñé</span>
        </div>
        <p className="text-xs tracking-wide text-subtle">
          © {new Date().getFullYear()} Alonso Viñé Barrancos. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

