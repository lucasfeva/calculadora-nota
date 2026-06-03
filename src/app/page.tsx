"use client";

import { GradientBackground } from "@/components/ui/gradient-background";
import { GradeCalculator } from "@/components/grade-calculator";
import { Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <GradientBackground>
      <div className="flex min-h-screen w-full flex-col">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-10 border-b border-blue-100/50 bg-white/60 shadow-sm shadow-blue-500/5 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
            <h1 className="text-xl font-bold tracking-tight text-gray-800">
              Calcular Nota
            </h1>
            <Link
              href="https://github.com/lucasfeva/"
              target="_blank"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 items-center justify-center px-4 py-12 pt-24">
          <GradeCalculator />
        </main>

        {/* Footer */}
        <footer className="border-t border-blue-100/50 bg-white/60 py-6 shadow-inner shadow-blue-500/5 backdrop-blur-xl">
          <div className="text-center text-sm text-gray-600">
            <p>© 2025 - Todos os direitos reservados.</p>
            <p className="mt-1">
              Desenvolvido por{" "}
              <a
                href="https://www.instagram.com/lucasfevaa"
                target="_blank"
                className="font-medium text-blue-600 transition-colors hover:text-blue-700 hover:underline"
              >
                Lucas Ferreira
              </a>
              .
            </p>
          </div>
        </footer>
      </div>
    </GradientBackground>
  );
}
