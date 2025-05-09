"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useIsMobile } from "@/hooks/use-mobile";
import { InfoComponent } from "@/components/info";

export default function Home() {
  const [notaA1, setNotaA1] = useState(0);
  const [bonusTrabalho, setBonusTrabalho] = useState(false);
  const [resultado, setResultado] = useState<number | null>(null);
  const isMobile = useIsMobile();

  const calcular = () => {
    const mediaNecessaria = 5 - (bonusTrabalho ? 0.5 : 0);
    const numerador = mediaNecessaria * 3 - notaA1;
    const notaA2 = numerador / 2;
    setResultado(Number(notaA2.toFixed(2)));
  };

  const infoContent = (
    <div className="space-y-2 text-sm">
      <p>
        Fórmula usada: <code>((A1) + 2 * (A2)) / 3</code>
      </p>
      <p>
        Onde A1 = mb1 + ma1 + p1 = <strong>{notaA1}</strong>
      </p>
      <p>
        Meta de média: 5, com bônus de palestra:{" "}
        <strong>{bonusTrabalho ? "Sim (+0,5)" : "Não"}</strong>
      </p>
      <p>
        Importante: o valor de A2 não define diretamente as notas de mb2, ma2 e
        p2, apenas o total combinado necessário.
      </p>
    </div>
  );

  return (
    <div className="flex flex-col justify-between min-h-screen bg-background">
      <Header />
      <main className="flex items-center flex-1 justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <Card>
            <CardContent className="space-y-6">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl font-bold">
                  Calculadora de Nota Final
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Descubra quanto precisa tirar na A2 para passar na disciplina
                  com média 5.
                </CardDescription>
              </CardHeader>
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
                  Congresso/semana da engenharia (+0,5 na média)
                </Label>
              </div>
              <Button onClick={calcular} className="w-full" variant="secondary">
                Calcular
              </Button>
            </CardContent>
          </Card>
          {resultado !== null && (
            <Card>
              <CardContent>
                <div className="text-center text-lg font-medium flex items-center justify-center gap-2">
                  Você precisa tirar{" "}
                  <span className="font-bold">{resultado}</span> na A2.
                  <InfoComponent isMobile={isMobile}>
                    {infoContent}
                  </InfoComponent>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
