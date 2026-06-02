export default function Footer() {
  return (
    <footer className="bg-white/50 backdrop-blur-md border-t border-blue-100/60 text-center p-4">
      <p className="text-sm text-muted-foreground">
        © 2025 - Todos os direitos reservados.
      </p>
      <p className="text-sm text-muted-foreground">
        Desenvolvido por{" "}
        <a
          target="_blank"
          href="https://www.instagram.com/lucasfevaa"
          className="text-primary"
        >
          Lucas Ferreira.
        </a>
      </p>
    </footer>
  );
}
