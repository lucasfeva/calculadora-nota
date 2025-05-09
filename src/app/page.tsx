"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [notaA1, setNotaA1] = useState(0);
  const [bonusTrabalho, setBonusTrabalho] = useState(false);
  const [resultado, setResultado] = useState<number | null>(null);

  const calcular = () => {
    const mediaNecessaria = 5 - (bonusTrabalho ? 0.5 : 0);
    const numerador = mediaNecessaria * 3 - notaA1;
    const notaA2 = numerador / 2;
    setResultado(Number(notaA2.toFixed(2)));
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h1 className="text-2xl font-bold text-center">
              Calculadora de Nota Final
            </h1>
            <p className="text-sm text-center text-muted-foreground">
              Descubra quanto precisa tirar na A2 para passar na disciplina.
            </p>
            <div className="space-y-2">
              <Label htmlFor="notaA1">Nota A1</Label>
              <Input
                id="notaA1"
                type="number"
                step="0.1"
                min="0"
                max="10"
                value={notaA1}
                onChange={(e) => setNotaA1(parseFloat(e.target.value))}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="bonusTrabalho"
                checked={bonusTrabalho}
                onCheckedChange={() => setBonusTrabalho(!bonusTrabalho)}
              />
              <Label htmlFor="bonusTrabalho">
                Vou fazer o trabalho (+0,5 na média)
              </Label>
            </div>
            <Button onClick={calcular} className="w-full" variant="secondary">
              Calcular
            </Button>
            {resultado !== null && (
              <div className="text-center text-lg font-medium">
                Você precisa tirar{" "}
                <span className="font-bold">{resultado}</span> na A2.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
