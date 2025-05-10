# Calcular Nota - FHO

Aplicação desenvolvida para ajudar estudantes da FHO a calcular quanto precisam tirar na A2 para alcançar a média mínima de 5, com base na nota A1 já obtida.

## ✨ Funcionalidades

- Inserção da nota A1
- Opção de bônus de +0,5 na média final (ex: participação em congresso ou semana da engenharia)
- Cálculo automático da nota mínima necessária na A2
- Explicação da fórmula de cálculo utilizada
- Interface responsiva (suporte a mobile e desktop)
- Exibição da fórmula matemática em LaTeX

## 🧮 Fórmula utilizada

A média final é calculada da seguinte forma:

```bash
Média = (A1 + 2 × A2) / 3
```

Se houver bônus, ele é somado após o cálculo da média.

## 🧑‍💻 Tecnologias utilizadas

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [react-katex](https://www.npmjs.com/package/react-katex) (renderização LaTeX)

## 🚀 Como executar o projeto local

```bash
npm install
npm run dev
```

Acesse em https://calcularnota.com.br.
