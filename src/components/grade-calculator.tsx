"use client";

import { useState } from "react";
import { Calculator, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function GradeCalculator() {
  const [notaA1, setNotaA1] = useState("");
  const [hasBonus, setHasBonus] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Fórmula: (A1 + 2·A2) / 3 >= media → A2 = (media·3 - A1) / 2
  const calculateGrade = () => {
    const a1 = parseFloat(notaA1);
    if (isNaN(a1) || a1 < 0 || a1 > 10) return;

    const mediaNecessaria = 5 - (hasBonus ? 0.5 : 0);
    const notaA2 = (mediaNecessaria * 3 - a1) / 2;
    setResult(Number(notaA2.toFixed(2)));
    setShowResult(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") calculateGrade();
  };

  const impossible = result !== null && result > 10;

  return (
    <Card className="w-full max-w-md border border-blue-100/50 bg-white/70 shadow-xl shadow-blue-500/10 backdrop-blur-xl">
      <CardHeader className="space-y-3 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex p-3 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-balance text-2xl font-bold tracking-tight text-gray-900">
            Calculadora
          </CardTitle>
        </div>
        <CardDescription className="text-pretty text-base leading-relaxed text-gray-500">
          Descubra quanto precisa tirar na A2 para passar na disciplina com
          média 5.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label
            htmlFor="nota-a1"
            className="text-sm font-medium text-gray-700"
          >
            Nota A1
          </Label>
          <Input
            id="nota-a1"
            type="number"
            min="0"
            max="10"
            step="0.1"
            placeholder="Ex: 7.5"
            value={notaA1}
            onChange={(e) => {
              let newValue = e.target.value;
              if (newValue.length > 1 && newValue.startsWith("0")) {
                newValue = newValue.replace(/^0+/, "");
                if (newValue === "") newValue = "0";
              }
              const num = parseFloat(newValue);
              if (!isNaN(num)) {
                if (num > 10) newValue = "10";
                if (num < 0) newValue = "0";
              }
              setNotaA1(newValue);
              setShowResult(false);
            }}
            onKeyDown={handleKeyDown}
            className="h-12 border-gray-200 bg-white/80 text-base transition-all placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-blue-50/80 p-4">
          <Checkbox
            id="bonus"
            checked={hasBonus}
            onCheckedChange={(checked) => {
              setHasBonus(checked as boolean);
              setShowResult(false);
            }}
            className="h-5 w-5 border-blue-300 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
          />
          <Label
            htmlFor="bonus"
            className="cursor-pointer text-sm font-medium leading-snug text-gray-700 md:flex-row flex-col items-start gap-1"
          >
            <p>
              Congresso/semana da engenharia{" "}
              <span className="text-blue-600">(+0,5 na média)</span>
            </p>
          </Label>
        </div>

        <Button
          onClick={calculateGrade}
          disabled={!notaA1}
          className="h-12 w-full bg-gradient-to-r from-blue-500 to-blue-600 text-base font-semibold shadow-lg shadow-blue-500/30 transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-500/40 disabled:opacity-50"
        >
          Calcular
        </Button>

        {showResult && result !== null && (
          <div className="animate-in fade-in slide-in-from-bottom-2 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-center shadow-lg shadow-blue-500/30">
            {impossible ? (
              <>
                <p className="text-sm font-medium text-blue-100">
                  Nota necessária na A2
                </p>
                <p className="text-5xl font-bold tracking-tight text-white">
                  {result.toFixed(2)}
                </p>
                <p className="mt-3 rounded-lg bg-white/20 px-3 py-2 text-sm font-medium text-white">
                  Infelizmente não é possível passar apenas com a A2
                </p>
              </>
            ) : (
              <>
                <p className="mb-1 text-sm font-medium text-blue-100">
                  Você precisa tirar no mínimo
                </p>
                <p className="text-5xl font-bold tracking-tight text-white">
                  {result.toFixed(2)}
                </p>
                <p className="mt-1 text-sm text-blue-100">na A2 para passar</p>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
