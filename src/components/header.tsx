import { Github } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-card text-primary">
      <h1 className="text-xl font-bold">Calcular Nota</h1>
      <Button variant="ghost" size="icon" asChild>
        <Link href="https://github.com/lucasfeva/" target="_blank">
          <Github className="h-6 w-6 text-muted-foreground hover:text-primary transition-colors" />
        </Link>
      </Button>
    </header>
  );
}
