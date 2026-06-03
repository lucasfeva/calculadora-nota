"use client";
import { useState, useEffect, useRef, useCallback, ReactNode } from "react";

// ─── DADOS ────────────────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  { id: "s1", num: "01", label: "Produtor–Consumidor" },
  { id: "s2", num: "02", label: "Sincronização Python" },
  { id: "s3", num: "03", label: "Padrões SOLID" },
  { id: "s4", num: "04", label: "Padrões Pod" },
  { id: "s5", num: "05", label: "Padrões de Serviço" },
  { id: "s6", num: "06", label: "Filas & Eventos" },
  { id: "s7", num: "07", label: "HDFS & Hadoop" },
  { id: "s8", num: "08", label: "Apache Spark" },
  { id: "s9", num: "09", label: "Speedup & Amdahl" },
];

const SOLID_DATA = [
  {
    letter: "S",
    name: "Single Responsibility — Responsabilidade Única",
    desc: "Cada classe deve ter apenas uma razão para mudar — uma única responsabilidade.",
    analogy:
      "Robô de fábrica que aperta parafuso E pinta viola SRP. Um robô = uma função.",
    example:
      "No Log Processor: separar em LogReader, LogParser e ReportGenerator.",
  },
  {
    letter: "O",
    name: "Open/Closed — Aberto/Fechado",
    desc: "Código aberto para extensão, mas fechado para modificação.",
    analogy:
      "Porta USB — conecta periférico sem soldar na placa-mãe. Aceita novos sem reescrever.",
    example:
      "No Log Processor: ao invés de if/else para novo formato, cria-se um novo plugin.",
  },
  {
    letter: "L",
    name: "Liskov Substitution — Substituição de Liskov",
    desc: "Subclasses devem poder substituir suas classes pai sem quebrar o sistema.",
    analogy:
      "Pilhas padronizadas AA — qualquer marca funciona pois seguem o mesmo padrão.",
    example:
      "Se o orquestrador espera .txt, não retorne .zip. Respeitar contratos da classe base.",
  },
  {
    letter: "I",
    name: "Interface Segregation — Segregação de Interface",
    desc: "Interfaces devem ser enxutas e específicas. Nenhuma classe forçada a implementar o que não usa.",
    analogy:
      "Painel de carro sob medida — cada motorista vê apenas os controles relevantes.",
    example: "Quebrar interface gorda em: IReader, IParser, IReporter.",
  },
  {
    letter: "D",
    name: "Dependency Inversion — Inversão de Dependência",
    desc: "Módulos de alto nível não devem depender de baixo nível. Ambos dependem de abstrações.",
    analogy:
      "Tomada 127V — toda a indústria depende do padrão, não de um aparelho específico.",
    example:
      "Orquestrador depende de interface abstrata IStep, não de CsvReader concreto.",
  },
];

// ─── COMPONENTES REUTILIZÁVEIS ────────────────────────────────────────────────

function ProvaBadge() {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        background: "rgba(251,191,36,.12)",
        color: "#fbbf24",
        border: "1px solid rgba(251,191,36,.3)",
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 700,
        padding: "2px 10px",
        fontFamily: "var(--mono)",
        marginBottom: 12,
      }}
    >
      ⚠ Vai cair na prova
    </span>
  );
}

function SectionHeader({
  icon,
  title,
  sub,
  iconBg,
}: {
  icon: ReactNode;
  title: string;
  sub: string;
  iconBg: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 16,
        paddingBottom: 12,
        borderBottom: "1px solid #2a2a2a",
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 8,
          background: iconBg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 15, fontWeight: 700 }}>{title}</div>
        <div
          style={{
            fontSize: 10,
            color: "#888888",
            fontFamily: "var(--mono)",
            marginTop: 2,
          }}
        >
          {sub}
        </div>
      </div>
    </div>
  );
}

function InfoBox({
  children,
  color = "#4f8ef7",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <div
      style={{
        background: `rgba(${color === "#4f8ef7" ? "79,142,247" : color === "#2dd4b5" ? "45,212,181" : color === "#fbbf24" ? "251,191,36" : color === "#f87171" ? "248,113,113" : "74,222,128"},.07)`,
        borderLeft: `3px solid ${color}`,
        borderRadius: "0 6px 6px 0",
        padding: "10px 12px",
        fontSize: 12,
        marginBottom: 12,
      }}
    >
      {children}
    </div>
  );
}

function CardGrid({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
        gap: 8,
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}

function Card({
  title,
  titleColor,
  children,
}: {
  title: ReactNode;
  titleColor: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        background: "#1a1a1a",
        border: "1px solid #2a2a2a",
        borderRadius: 8,
        padding: 10,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: 12,
          color: titleColor,
          marginBottom: 4,
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: 11, color: "#888888", lineHeight: 1.5 }}>
        {children}
      </div>
    </div>
  );
}

function CodeBlock({ children }: { children: ReactNode }) {
  return (
    <pre
      style={{
        background: "#080808",
        border: "1px solid #2a2a2a",
        borderRadius: 6,
        padding: "12px",
        overflowX: "auto",
        fontSize: 11,
        color: "#2dd4b5",
        fontFamily: "var(--mono)",
        lineHeight: 1.7,
        margin: "8px 0",
      }}
    >
      {children}
    </pre>
  );
}

function Inl({ children }: { children: ReactNode }) {
  return (
    <code
      style={{
        background: "#080808",
        border: "1px solid #2a2a2a",
        borderRadius: 4,
        padding: "1px 5px",
        fontSize: 11,
        color: "#2dd4b5",
        fontFamily: "var(--mono)",
      }}
    >
      {children}
    </code>
  );
}

function Divider() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid #2a2a2a",
        margin: "14px 0",
      }}
    />
  );
}

function H3({ children }: { children: ReactNode }) {
  return (
    <h3
      style={{
        fontSize: 12,
        fontWeight: 700,
        color: "#eeeeee",
        margin: "12px 0 8px",
      }}
    >
      {children}
    </h3>
  );
}

function H4({ children }: { children: ReactNode }) {
  return (
    <h4
      style={{
        fontSize: 10,
        fontWeight: 700,
        color: "#2dd4b5",
        textTransform: "uppercase",
        letterSpacing: ".5px",
        fontFamily: "var(--mono)",
        margin: "10px 0 6px",
      }}
    >
      {children}
    </h4>
  );
}

function Blt({ children }: { children: ReactNode }) {
  return (
    <li
      style={{
        padding: "3px 0 3px 14px",
        position: "relative",
        fontSize: 12,
        listStyle: "none",
      }}
    >
      <span style={{ position: "absolute", left: 0, color: "#4f8ef7" }}>–</span>
      {children}
    </li>
  );
}

type CellValue =
  | ReactNode
  | { text?: ReactNode; color?: string; bold?: boolean };

function CmpTable({
  headers,
  rows,
  widths,
}: {
  headers: ReactNode[];
  rows: CellValue[][];
  widths?: string[];
}) {
  return (
    <div style={{ overflowX: "auto", marginBottom: 14 }}>
      <table
        style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}
      >
        <thead>
          <tr style={{ background: "#1a1a1a" }}>
            {headers.map((h, i) => (
              <th
                key={i}
                style={{
                  padding: "6px 10px",
                  textAlign: "left",
                  color: "#888888",
                  fontFamily: "var(--mono)",
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                  borderBottom: "1px solid #2a2a2a",
                  width: widths?.[i],
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              style={{
                borderBottom:
                  ri < rows.length - 1 ? "1px solid #2a2a2a" : "none",
              }}
            >
              {row.map((cell, ci) => {
                const c = cell as {
                  text?: ReactNode;
                  color?: string;
                  bold?: boolean;
                };
                return (
                  <td
                    key={ci}
                    style={{
                      padding: "6px 10px",
                      verticalAlign: "top",
                      color: c.color ?? "#eeeeee",
                      fontWeight: c.bold ? 700 : 400,
                    }}
                  >
                    {c.text ?? (cell as ReactNode)}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Pipeline({ steps }: { steps: { label: string; sub?: string }[] }) {
  return (
    <div style={{ display: "flex", margin: "8px 0 12px", gap: 0 }}>
      {steps.map((s, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderLeft: i === 0 ? "1px solid #2a2a2a" : "none",
            padding: "8px 4px",
            textAlign: "center",
            fontSize: 11,
            borderRadius:
              i === 0
                ? "6px 0 0 6px"
                : i === steps.length - 1
                  ? "0 6px 6px 0"
                  : 0,
          }}
        >
          <b>{s.label}</b>
          {s.sub && (
            <div style={{ color: "#888888", fontSize: 10 }}>{s.sub}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function StepRow({
  num,
  children,
}: {
  num: number | string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 10,
        alignItems: "flex-start",
        fontSize: 12,
        marginBottom: 8,
      }}
    >
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          background: "#4f8ef7",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 11,
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {num}
      </div>
      <div>{children}</div>
    </div>
  );
}

// ─── SEÇÕES ───────────────────────────────────────────────────────────────────

function S1() {
  return (
    <section id="s1" style={sectionStyle}>
      <SectionHeader
        icon="⚙️"
        title="Problema do Produtor–Consumidor"
        sub="Aula 7 — 29/04 · sincronização clássica"
        iconBg="rgba(249,115,22,.12)"
      />
      <ProvaBadge />
      <H3>Os Três Atores</H3>
      <CardGrid>
        <Card title="Produtor" titleColor="#4f8ef7">
          Fabrica itens e os insere no buffer em velocidade variável e
          independente.
        </Card>
        <Card title="Buffer (Esteira)" titleColor="#2dd4b5">
          Recurso compartilhado com tamanho físico <b>fixo</b> (ex: máx. 10
          itens). É a {'"zona crítica"'}.
        </Card>
        <Card title="Consumidor" titleColor="#f97316">
          Retira itens para processamento em velocidade independente do
          produtor.
        </Card>
      </CardGrid>

      <Divider />
      <H3>Os Dois Conflitos Críticos</H3>
      <InfoBox color="#f87171">
        <p style={{ marginBottom: 4 }}>
          <b>🔴 Buffer Cheio — Overdose de Dados</b>
        </p>
        <p style={{ marginBottom: 4 }}>
          Produtor mais rápido que o consumidor → risco de estouro de memória.
        </p>
        <p>
          <b>Regra:</b> o Produtor deve{" "}
          <b style={{ color: "#2dd4b5" }}>dormir (bloquear)</b> até que uma vaga
          seja liberada.
        </p>
      </InfoBox>
      <InfoBox color="#fbbf24">
        <p style={{ marginBottom: 4 }}>
          <b>🟡 Buffer Vazio — Fome de Dados</b>
        </p>
        <p style={{ marginBottom: 4 }}>
          Consumidor mais rápido que o produtor → risco de <Inl>IndexError</Inl>{" "}
          ao consumir lista vazia.
        </p>
        <p>
          <b>Regra:</b> o Consumidor deve{" "}
          <b style={{ color: "#2dd4b5" }}>dormir (bloquear)</b> até que um item
          seja produzido.
        </p>
      </InfoBox>

      <Divider />
      <H3>Blueprint Teórico: As 3 Garantias Simultâneas</H3>
      <CardGrid>
        <Card title="🔒 Mutex (Exclusão Mútua)" titleColor="#f87171">
          Garante acesso exclusivo. Produtor e consumidor NÃO podem tocar no
          buffer ao mesmo tempo.
        </Card>
        <Card title="📊 Semáforo de Vagas" titleColor="#fbbf24">
          Contador de espaços livres. Impede a Overdose de Dados (buffer cheio).
        </Card>
        <Card title="📦 Semáforo de Itens" titleColor="#4ade80">
          Contador de itens disponíveis. Impede a Fome de Dados (buffer vazio).
        </Card>
      </CardGrid>
      <InfoBox color="#4f8ef7">
        💡 <b>Primitivas clássicas:</b> operação <Inl>P</Inl> (acquire /
        decrementar) e operação <Inl>V</Inl> (release / incrementar).
      </InfoBox>

      <Divider />
      <H3>O Anti-Padrão: Envenenamento do Buffer</H3>
      <InfoBox color="#f87171">
        <p style={{ marginBottom: 4 }}>
          <b style={{ color: "#f87171" }}>PERIGO:</b> quando o estado do Lock
          interno se desconecta da realidade física do Buffer.
        </p>
        <p style={{ marginBottom: 4 }}>
          Com 3 produtores e 3 consumidores, um <Inl>release()</Inl>{" "}
          incondicional causa <Inl>IndexError</Inl> em T=10ms.
        </p>
        <p>
          <b>Lição:</b> o estado local de um lock deve ser a fonte absoluta da
          verdade.
        </p>
      </InfoBox>

      <H3>4 Situações de Impasse (Deadlock)</H3>
      <ul style={{ padding: 0 }}>
        {[
          "Não preempção",
          "Espera circular",
          "Condição de corrida",
          "Exclusão mútua mal gerenciada",
        ].map((i) => (
          <Blt key={i}>{i}</Blt>
        ))}
      </ul>
    </section>
  );
}

function S2() {
  return (
    <section id="s2" style={sectionStyle}>
      <SectionHeader
        icon="🐍"
        title="Ferramentas de Sincronização em Python"
        sub="Evolução do baixo ao alto nível"
        iconBg="rgba(45,212,181,.12)"
      />
      <ProvaBadge />
      <CmpTable
        headers={["Abordagem", "Nível", "Responsabilidade", "Risco"]}
        rows={[
          [
            "threading.Lock",
            "Baixo",
            "Gerenciar estados, contadores e flags manualmente",
            { text: "Altíssimo", color: "#f87171", bold: true },
          ],
          [
            "threading.Condition",
            "Médio",
            "Gerenciar sinalização (wait / notify)",
            { text: "Médio", color: "#fbbf24", bold: true },
          ],
          [
            "queue.Queue",
            "Alto",
            "Apenas interagir com put() e get()",
            { text: "Mínimo", color: "#4ade80", bold: true },
          ],
        ]}
      />

      <H4>Prática I — Padrão Monitor (threading.Condition)</H4>
      <CodeBlock>{`with condicao:\n    while len(buffer) == MAX:\n        condicao.wait()       # suspende sem consumir CPU\n    buffer.append(item)\n    condicao.notify_all()     # acorda consumidores`}</CodeBlock>
      <ul style={{ padding: 0, marginBottom: 14 }}>
        <Blt>
          <b>Exclusão implícita:</b> o bloco <Inl>with</Inl> substitui o
          controle manual do Mutex
        </Blt>
        <Blt>
          <b>Eficiência de CPU:</b> <Inl>wait()</Inl> suspende a thread sem
          busy-waiting
        </Blt>
        <Blt>
          <b>Abstração:</b> espelha a teoria de Monitores, nível superior aos
          semáforos
        </Blt>
      </ul>

      <H4>Prática II — Abordagem Pythonica (queue.Queue)</H4>
      <CodeBlock>{`buffer = queue.Queue(maxsize=5)\n\n# Produtor — bloqueia automaticamente se cheio\nbuffer.put(item)\n\n# Consumidor — bloqueia automaticamente se vazio\nitem = buffer.get()`}</CodeBlock>
      <ul style={{ padding: 0, marginBottom: 14 }}>
        <Blt>
          <b>Encapsulamento seguro:</b> a fila gerencia semáforos e locks
          internamente
        </Blt>
        <Blt>
          <b>Prevenção de erros:</b> elimina risco de esquecer um{" "}
          <Inl>release()</Inl>
        </Blt>
        <Blt>
          <b>Foco arquitetural:</b> libera o dev para focar no fluxo do sistema
        </Blt>
      </ul>

      <InfoBox color="#2dd4b5">
        <p style={{ marginBottom: 3 }}>
          A interface <Inl>put()</Inl>/<Inl>get()</Inl> <b>permanece a mesma</b>
          , mas o Lock local evolui para <b>Brokers de Mensagens</b> (ex:
          Kafka).
        </p>
        <p>
          Entender sincronização local é o{" "}
          <b style={{ color: "#2dd4b5" }}>pré-requisito definitivo</b> para
          projetar arquiteturas distribuídas resilientes.
        </p>
      </InfoBox>
    </section>
  );
}

function S3() {
  return (
    <section id="s3" style={sectionStyle}>
      <SectionHeader
        icon="🧱"
        title="Padrões SOLID"
        sub="Aula 5 — 01/04 · design orientado a objetos"
        iconBg="rgba(79,142,247,.12)"
      />
      <ProvaBadge />
      <InfoBox color="#4f8ef7">
        O professor usou um <b>Log Processor</b> como monolito que viola SOLID,
        depois mostrou como quebrar em partes menores. Com SOLID, cada step pode
        rodar em paralelo — conexão direta com o tema da disciplina.
      </InfoBox>

      <div style={{ marginBottom: 14 }}>
        {SOLID_DATA.map((s) => (
          <div
            key={s.letter}
            style={{
              display: "flex",
              gap: 12,
              padding: "12px 0",
              borderBottom: "1px solid #2a2a2a",
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#4f8ef7",
                fontFamily: "var(--mono)",
                lineHeight: 1,
                flexShrink: 0,
                width: 22,
              }}
            >
              {s.letter}
            </span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 3 }}>
                {s.name}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#888888",
                  marginBottom: 3,
                  lineHeight: 1.5,
                }}
              >
                {s.desc}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "#f97316",
                  marginBottom: 2,
                  fontStyle: "italic",
                }}
              >
                Analogia: {s.analogy}
              </div>
              <div style={{ fontSize: 11 }}>Ex: {s.example}</div>
            </div>
          </div>
        ))}
      </div>

      <Divider />
      <H3>Sem SOLID vs Com SOLID</H3>
      <CmpTable
        headers={["Critério", "Sem SOLID", "Com SOLID"]}
        rows={[
          [
            "Acoplamento",
            {
              text: "Forte — muda um, quebra outro",
              color: "#f87171",
              bold: true,
            },
            {
              text: "Fraco — componentes independentes",
              color: "#4ade80",
              bold: true,
            },
          ],
          [
            "Extensibilidade",
            {
              text: "Exige modificar código principal",
              color: "#f87171",
              bold: true,
            },
            {
              text: "Basta criar nova classe/plugin",
              color: "#4ade80",
              bold: true,
            },
          ],
          [
            "Testabilidade",
            {
              text: "Difícil, exige recursos reais",
              color: "#f87171",
              bold: true,
            },
            {
              text: "Fácil, permite uso de mocks",
              color: "#4ade80",
              bold: true,
            },
          ],
          [
            "Paralelismo",
            {
              text: "Difícil paralelizar monolito",
              color: "#f87171",
              bold: true,
            },
            {
              text: "Cada step roda em paralelo",
              color: "#4ade80",
              bold: true,
            },
          ],
        ]}
      />
    </section>
  );
}

function S4() {
  return (
    <section id="s4" style={sectionStyle}>
      <SectionHeader
        icon="🐳"
        title="Padrões Distribuídos — Nível Pod"
        sub="Aula 9 — 06/05 · Brendan Burns"
        iconBg="rgba(167,139,250,.12)"
      />
      <ProvaBadge />
      <InfoBox color="#2dd4b5">
        <b>Unidade atômica = Pod:</b> grupo de containers co-agendados na mesma
        máquina, compartilhando IP (<Inl>localhost</Inl>), disco e rede.
      </InfoBox>

      <H3>Padrão Sidecar</H3>
      <p style={{ fontSize: 12, color: "#888888", marginBottom: 8 }}>
        Container auxiliar que melhora a app principal muitas vezes sem o
        conhecimento dela.
      </p>
      <CardGrid>
        <Card title="Caso 1 — Legado" titleColor="#4f8ef7">
          Nginx Sidecar recebe HTTPS externo e passa HTTP para a app via
          localhost. A app não muda.
        </Card>
        <Card title="Caso 2 — Config Dinâmica" titleColor="#2dd4b5">
          Git-sync sidecar monitora repositório e coloca arquivos em volume
          compartilhado.
        </Card>
        <Card title="Key Takeaway" titleColor="#f97316">
          Separação entre lógica de negócio (app) e lógica de infraestrutura
          (sidecar).
        </Card>
      </CardGrid>

      <Divider />
      <H3>Padrão Adapter</H3>
      <p style={{ fontSize: 12, color: "#888888", marginBottom: 6 }}>
        <b style={{ color: "#eeeeee" }}>Problema:</b> apps diferentes geram logs
        em formatos variados; sistema central exige uniformidade.
      </p>
      <p style={{ fontSize: 12, marginBottom: 14 }}>
        <b>Solução:</b> container Adapter transforma a saída da app no formato
        padrão (ex: <Inl>fluentd</Inl> para JSON, <Inl>redis_exporter</Inl> para
        Prometheus).
      </p>

      <Divider />
      <H3>Padrão Ambassador</H3>
      <p style={{ fontSize: 12, color: "#888888", marginBottom: 6 }}>
        <b style={{ color: "#eeeeee" }}>Problema:</b> app precisa acessar bancos
        fragmentados e múltiplos serviços sem conhecer a topologia de rede.
      </p>
      <p style={{ fontSize: 12, marginBottom: 12 }}>
        <b>Solução:</b> container Ambassador intercepta conexões de saída do
        localhost e as encaminha para o destino correto no cluster.
      </p>

      <CmpTable
        headers={["Critério", "Sidecar", "Ambassador"]}
        rows={[
          [
            "Direção",
            "Melhora a app por dentro (local)",
            "Gerencia comunicação de saída (rede)",
          ],
          [
            "Função",
            "SSL, config dinâmica, logs",
            "Sharding, canary, roteamento",
          ],
          [
            "Se falhar",
            { text: "App perde funcionalidades extras", color: "#fbbf24" },
            { text: "Toda comunicação de saída falha", color: "#f87171" },
          ],
        ]}
      />
      <InfoBox color="#fbbf24">
        <p style={{ marginBottom: 4 }}>
          <b style={{ color: "#fbbf24" }}>
            Questão de prova citada pelo professor:
          </b>
        </p>
        <p style={{ marginBottom: 2 }}>
          a) Qual problema distribuído o Ambassador resolve?
        </p>
        <p style={{ marginBottom: 2 }}>
          b) Qual diferença entre Sidecar e Ambassador?
        </p>
        <p style={{ marginBottom: 2 }}>
          c) Como o Ambassador melhora a transparência de rede?
        </p>
        <p>
          d) O que acontece se o Ambassador ficar indisponível? → Toda
          comunicação de saída falha.
        </p>
      </InfoBox>
    </section>
  );
}

function S5() {
  return (
    <section id="s5" style={sectionStyle}>
      <SectionHeader
        icon="⚖️"
        title="Padrões de Serviço — Replicação & Escalabilidade"
        sub="Aula 9 — 06/05 · multi-node"
        iconBg="rgba(45,212,181,.12)"
      />

      <H3>Serviços Replicados (Stateless)</H3>
      <p style={{ fontSize: 12, color: "#888888", marginBottom: 8 }}>
        Escalonamento horizontal atrás de um Load Balancer. Ideal para serviços
        sem estado.
      </p>
      <ul style={{ padding: 0, marginBottom: 14 }}>
        <Blt>
          <b>Readiness Probe:</b> {'"estou pronto para receber tráfego?"'} —
          evita erros durante inicialização
        </Blt>
        <Blt>
          <b>Session Affinity (Stickiness):</b> necessário se houver estado
          transiente — baseado em IP ou Cookie
        </Blt>
        <Blt>
          <b>Cache Layer:</b> Varnish/Memcached protege o backend
        </Blt>
      </ul>

      <Divider />
      <H3>Sharding — Serviços Fragmentados</H3>
      <p style={{ fontSize: 12, color: "#888888", marginBottom: 8 }}>
        Quando dados não cabem em uma máquina. Cada réplica possui uma parte do
        estado global.
      </p>
      <CodeBlock>{`Shard = Hash(Key) % N   # determina para qual fragmento o dado vai`}</CodeBlock>
      <ul style={{ padding: 0, marginBottom: 14 }}>
        <Blt>
          <b>Consistent Hashing:</b> redimensiona o cluster movendo apenas K/N
          chaves
        </Blt>
        <Blt>
          <b>Hot Sharding:</b> replica dinamicamente fragmentos sobrecarregados
        </Blt>
      </ul>

      <Divider />
      <H3>Padrão Scatter/Gather — Escalabilidade de Tempo</H3>
      <p style={{ fontSize: 12, color: "#888888", marginBottom: 8 }}>
        Distribui uma requisição complexa para múltiplos nós simultaneamente e
        consolida as respostas.
      </p>
      <Pipeline
        steps={[
          { label: "Root", sub: "Scatter" },
          { label: "Leaves", sub: "Paralelo" },
          { label: "Root", sub: "Gather" },
          { label: "Resultado", sub: "Final" },
        ]}
      />
      <InfoBox color="#f87171">
        <p style={{ marginBottom: 4 }}>
          <b style={{ color: "#f87171" }}>Problema do Straggler:</b> o sistema é
          tão rápido quanto o nó mais lento.
        </p>
        <p style={{ marginBottom: 4 }}>
          Com 100 nós e 1% de chance de latência alta por nó → ~63% de chance de
          latência alta na resposta final.
        </p>
        <p>
          <b>Solução:</b> replicar os Leaves e aceitar a{" "}
          <b style={{ color: "#2dd4b5" }}>primeira resposta válida</b>.
        </p>
      </InfoBox>

      <Divider />
      <H3>Eleição de Líder (RAFT)</H3>
      <ul style={{ padding: 0 }}>
        <Blt>
          <b>CAS (Compare-And-Swap):</b> instrução atômica para atualização
          segura de estado
        </Blt>
        <Blt>
          <b>Locks e Leases (TTL):</b> bloqueio expira se o mestre falhar → nova
          eleição automática
        </Blt>
        <Blt>
          <b>RAFT:</b> candidato com menor latência ao manager atual assume o
          papel de líder
        </Blt>
      </ul>
    </section>
  );
}

function S6() {
  return (
    <section id="s6" style={sectionStyle}>
      <SectionHeader
        icon="📬"
        title="Padrões de Sistema — Filas & Eventos"
        sub="Aula 9 — 06/05 · work queues, batch, FaaS"
        iconBg="rgba(248,113,113,.12)"
      />

      <H3>Work Queue — Filas de Trabalho</H3>
      <p style={{ fontSize: 12, color: "#888888", marginBottom: 8 }}>
        Processamento em lote onde cada item é{" "}
        <b style={{ color: "#eeeeee" }}>independente</b>. Foca em
        confiabilidade, não em latência.
      </p>
      <ul style={{ padding: 0, marginBottom: 14 }}>
        <Blt>
          <b>Source Container:</b> define <i>o que</i> precisa ser feito (lista
          de itens)
        </Blt>
        <Blt>
          <b>Worker Container:</b> define <i>como</i> fazer — código genérico
          reutilizável
        </Blt>
        <Blt>
          <b>Dynamic Scaling:</b> ajusta número de workers com base no tamanho
          da fila
        </Blt>
      </ul>

      <Divider />
      <H3>Padrões de Composição de Batch</H3>
      <CardGrid>
        <Card title="Copier" titleColor="#4f8ef7">
          Duplica o trabalho para múltiplas filas (ex: mesma mensagem vai para
          Log e Análise simultaneamente).
        </Card>
        <Card title="Filter" titleColor="#fbbf24">
          Remove itens que não atendem critérios (ex: opt-out de marketing,
          message kill).
        </Card>
        <Card title="Splitter" titleColor="#2dd4b5">
          Separa entradas em filas diferentes com base em regras de negócio (ex:
          prioridade de pagamento).
        </Card>
      </CardGrid>

      <Divider />
      <H3>Processamento Coordenado: Join & Reduce</H3>
      <ul style={{ padding: 0, marginBottom: 14 }}>
        <Blt>
          <b>Join (Barrier Synchronization):</b> espera TODOS os fragmentos
          terminarem. Não deletar original antes de processar
        </Blt>
        <Blt>
          <b>Reduce:</b> agrega resultados parciais em um resultado final (base
          do MapReduce)
        </Blt>
      </ul>

      <H3>FaaS — Processamento Orientado a Eventos</H3>
      <p style={{ fontSize: 12, color: "#888888", marginBottom: 8 }}>
        Código executado em resposta a gatilhos (upload, login, webhook).
        Escalabilidade automática (Serverless).
      </p>
      <ul style={{ padding: 0, marginBottom: 14 }}>
        <Blt>
          <b>Decorator:</b> transforma a requisição antes de chegar à API —
          adicionar defaults
        </Blt>
        <Blt>
          <b>Pipeline de Eventos:</b> encadeamento de funções leves para fluxos
          complexos
        </Blt>
        <Blt>
          <b>Trade-off:</b> simplicidade de deploy vs. complexidade de debug
          (perde visão holística)
        </Blt>
      </ul>
      <InfoBox color="#4ade80">
        <p style={{ marginBottom: 3 }}>
          ✅ <b>70% dos problemas de escalabilidade</b> são resolvidos com
          escalabilidade horizontal.
        </p>
        <p>
          <b>Regra de ouro:</b> Não reinvente a roda. Use padrões para focar na
          lógica de negócio que torna seu produto único.
        </p>
      </InfoBox>
    </section>
  );
}

function S7() {
  return (
    <section id="s7" style={sectionStyle}>
      <SectionHeader
        icon="🗄️"
        title="HDFS & Ecossistema Hadoop"
        sub="Aula 11 — 20/05 · Big Data, armazenamento distribuído"
        iconBg="rgba(249,115,22,.12)"
      />
      <ProvaBadge />
      <InfoBox color="#4f8ef7">
        <p style={{ marginBottom: 4 }}>
          💡 <b>Princípio fundamental:</b> Mover a computação é mais barato que
          mover os dados.
        </p>
        <p>
          Paradigma clássico: mover petabytes até a CPU → satura a rede. Solução
          distribuída: enviar o código até onde os dados já residem.
        </p>
      </InfoBox>

      <H3>Os 3 Pilares do Ecossistema Hadoop</H3>
      <CardGrid>
        <Card title="HDFS — Storage" titleColor="#4f8ef7">
          Distribui petabytes em discos comuns. Blocos de <b>128 MB</b>{" "}
          minimizam seek time em disco magnético.
        </Card>
        <Card title="YARN — Resource Mgmt" titleColor="#2dd4b5">
          Monitora saúde do cluster, aloca memória/CPU. Heartbeats periódicos
          verificam disponibilidade dos nós.
        </Card>
        <Card title="MapReduce — Computing" titleColor="#f97316">
          Filtra (Map) e consolida (Reduce) diretamente na fonte. Modelo WORM:
          Write Once, Read Many.
        </Card>
      </CardGrid>

      <Divider />
      <H3>Topologia HDFS: NameNode vs DataNode</H3>
      <CmpTable
        headers={["Componente", "Papel", "Armazena", "Detalhe crítico"]}
        rows={[
          [
            <>
              <b>NameNode</b> (Mestre)
            </>,
            "Gerencia metadados e o mapa de blocos",
            <>
              Metadados em <b style={{ color: "#2dd4b5" }}>RAM</b> (JSON) — NÃO
              armazena dados
            </>,
            "RAM priorizada. Ponto único de falha — requer backup",
          ],
          [
            <>
              <b>DataNode</b> (Escravos)
            </>,
            "Armazenam os blocos reais de dados",
            "Blocos de 128 MB dos arquivos",
            "Enviam Heartbeats periódicos ao NameNode",
          ],
        ]}
      />
      <InfoBox color="#fbbf24">
        ⚠️ <b style={{ color: "#fbbf24" }}>Problema dos Arquivos Pequenos:</b>{" "}
        Milhões de arquivos minúsculos (1 KB) esgotam a RAM do NameNode (150
        bytes de metadados por arquivo), causando travamento sistêmico do
        cluster.
      </InfoBox>

      <Divider />
      <H3>Tolerância a Falhas: Replicação e Rack Awareness</H3>
      <ul style={{ padding: 0, marginBottom: 14 }}>
        <Blt>
          Fator de Replicação Padrão = <b>3</b> (duas réplicas no mesmo rack,
          uma em rack diferente)
        </Blt>
        <Blt>
          Se um switch de rede queimar o Rack 1 inteiro, o sistema sobrevive
          pelo Rack 2
        </Blt>
        <Blt>
          HDFS assume que a <b>falha de hardware é uma certeza matemática</b>
        </Blt>
      </ul>

      <Divider />
      <H3>Pipeline WORM: Escrita e Leitura</H3>
      <CmpTable
        headers={["Operação", "Fluxo", "Motivo"]}
        rows={[
          [
            <>
              <b>Escrita</b> (cascata)
            </>,
            "Cliente → DataNode1 → DataNode2 → DataNode3",
            "Evita saturar a rede do cliente; replicação pipeline",
          ],
          [
            <>
              <b>Leitura</b> (direta)
            </>,
            "Cliente consulta NameNode (mapa de blocos), depois conecta diretamente aos DataNodes em paralelo",
            "Tráfego pesado nunca passa pelo mestre — escala melhor",
          ],
        ]}
      />

      <Divider />
      <H3>MapReduce: As 3 Fases</H3>
      <StepRow num="1">
        <b>MAP:</b> filtra e transforma dados brutos em pares chave-valor
        intermediários. Execução paralela nos DataNodes (localidade dos dados).
      </StepRow>
      <StepRow num="2">
        <b>SHUFFLE & SORT:</b> agrupa todos os valores com a mesma chave e os
        envia juntos para o mesmo Reducer. É a desfragmentação (DEFRAG) dos
        dados.
      </StepRow>
      <StepRow num="3">
        <b>REDUCE:</b> agrega os dados agrupados em um resultado final. Aqui
        está a lógica de negócio (contagem global, soma, etc.).
      </StepRow>
    </section>
  );
}

function S8() {
  return (
    <section id="s8" style={sectionStyle}>
      <SectionHeader
        icon="⚡"
        title="Apache Spark"
        sub="Aula 12 — 27/05 · motor de Big Data moderno"
        iconBg="rgba(45,212,181,.12)"
      />
      <ProvaBadge />
      <InfoBox color="#2dd4b5">
        <p style={{ marginBottom: 4 }}>
          💡 Engine open-source de processamento em <b>memória RAM</b>. Nasceu
          em 2009 na UC Berkeley (AMPLab).
        </p>
        <p>
          <b>Até 100x mais rápido que Hadoop</b> para operações iterativas. Se a
          RAM acabar, move o excesso para disco (<i>Spill to Disk</i>) sem
          travar.
        </p>
      </InfoBox>

      <H3>Hadoop MapReduce vs Apache Spark</H3>
      <CmpTable
        headers={["Critério", "Hadoop MapReduce", "Apache Spark"]}
        rows={[
          [
            "Design de Processamento",
            {
              text: "Sequencial, multi-step (grava no disco)",
              color: "#888888",
            },
            {
              text: "Etapa única em memória (In-Memory)",
              color: "#4ade80",
              bold: true,
            },
          ],
          [
            "Velocidade",
            {
              text: "Limitado pela latência de disco",
              color: "#f87171",
              bold: true,
            },
            { text: "Até 100x mais rápido", color: "#4ade80", bold: true },
          ],
          [
            "Ecossistema",
            { text: "Acoplado ao HDFS e YARN", color: "#888888" },
            {
              text: "Agnóstico: S3, Cassandra, Delta Lake",
              color: "#4ade80",
              bold: true,
            },
          ],
          [
            "Tolerância a Falhas",
            { text: "Replicação física dos dados", color: "#888888" },
            {
              text: "Reconstrução via Grafo de Linhagem (DAG)",
              color: "#4ade80",
              bold: true,
            },
          ],
          [
            "Uso ideal",
            { text: "Batch massivo seguro, I/O sequencial", color: "#888888" },
            { text: "ML, Streaming, consultas iterativas", color: "#888888" },
          ],
        ]}
      />
      <InfoBox color="#fbbf24">
        ⚠️ <b>Veredito arquitetônico:</b> são <i>estruturas complementares</i>.
        O Spark frequentemente opera sobre a base do Hadoop, usando o YARN para
        gerenciar recursos do cluster.
      </InfoBox>

      <Divider />
      <H3>Conceitos Fundamentais do Spark</H3>
      <CardGrid>
        <Card title="RDD" titleColor="#4f8ef7">
          <b>Resilient Distributed Dataset.</b> Núcleo imutável. Mapeia o plano
          de execução para recriar dados perdidos sob demanda.
        </Card>
        <Card title="Lazy Evaluation" titleColor="#2dd4b5">
          O motor <i>anota</i> as transformações no DAG. A execução física só
          ocorre quando uma <b>Action</b> (<Inl>count</Inl>, <Inl>save</Inl>) é
          chamada.
        </Card>
        <Card title="DAG" titleColor="#f97316">
          <b>Directed Acyclic Graph.</b> Grafo de Linhagem. Em falha, reconstrói
          matematicamente apenas a partição de memória perdida.
        </Card>
        <Card title="Spill to Disk" titleColor="#a78bfa">
          Se o volume exceder a RAM, o Spark move o excesso para disco
          inteligentemente. O processamento não para.
        </Card>
      </CardGrid>

      <H3>Arquitetura de Workloads (Módulos)</H3>
      <CmpTable
        headers={["Módulo", "Função"]}
        rows={[
          [
            <>
              <b>Spark Core</b>
            </>,
            "Cérebro — gerencia memória, tolerância a falhas, distribuição de tarefas e APIs básicas",
          ],
          [
            <>
              <b>Spark SQL</b>
            </>,
            "Consultas interativas de baixa latência com dados colunares e otimizador baseado em custos",
          ],
          [
            <>
              <b>Spark Streaming</b>
            </>,
            "Ingestão em micro-batches para análise quase em tempo real — integra com Kafka",
          ],
          [
            <>
              <b>MLlib</b>
            </>,
            "Algoritmos de ML rodando em memória (classificação, regressão, agrupamento)",
          ],
          [
            <>
              <b>GraphX</b>
            </>,
            "Processamento distribuído de grafos e ETL exploratório",
          ],
        ]}
      />

      <H3>Código — Lazy Evaluation na Prática</H3>
      <CodeBlock>{`def benchmark_spark(partitions):\n    rdd = sc.parallelize(data_list, partitions)\n    # Lazy: só anota a transformação no DAG\n    pipeline = rdd.filter(lambda x: x % 2 != 0).map(lambda x: x ** 2)\n    # Action: dispara a execução real\n    return pipeline.sum()   # .sum() é a Action`}</CodeBlock>

      <H3>Arquitetura Medallion (Data Lakehouse)</H3>
      <Pipeline
        steps={[
          { label: "Bronze", sub: "dados brutos" },
          { label: "Prata", sub: "Spark limpa" },
          { label: "Ouro", sub: "BI/ML" },
        ]}
      />
    </section>
  );
}

function S9() {
  return (
    <section id="s9" style={sectionStyle}>
      <SectionHeader
        icon="📐"
        title="Speedup, Eficiência & Lei de Amdahl"
        sub="Aulas 2–4 · métricas de desempenho paralelo"
        iconBg="rgba(79,142,247,.12)"
      />
      <ProvaBadge />

      <H3>Fórmulas Essenciais</H3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 8,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: 8,
            padding: 12,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 12,
              color: "#4f8ef7",
              marginBottom: 6,
            }}
          >
            Speedup (S)
          </div>
          <CodeBlock>S = T_sequencial / T_paralelo</CodeBlock>
          <div style={{ fontSize: 11, color: "#888888" }}>
            Grandeza própria (sem unidade). Ex: S = 70/40 ={" "}
            <b style={{ color: "#eeeeee" }}>1.75</b>. Speedup de 10 = altíssimo.
          </div>
        </div>
        <div
          style={{
            background: "#1a1a1a",
            border: "1px solid #2a2a2a",
            borderRadius: 8,
            padding: 12,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 12,
              color: "#2dd4b5",
              marginBottom: 6,
            }}
          >
            Eficiência (E)
          </div>
          <CodeBlock>E = S / P</CodeBlock>
          <div style={{ fontSize: 11, color: "#888888" }}>
            P = número de processadores. Ex: E = 1.75/3 ={" "}
            <b style={{ color: "#eeeeee" }}>58%</b>. Mede aproveitamento real.
          </div>
        </div>
      </div>

      <H3>Lei de Amdahl</H3>
      <CodeBlock>{`S = 1 / ( f + (1-f)/p )\n\nf = fração sequencial (não paralelizável)\np = número de processadores\n\nExemplo: f = 0.1 (10% sequencial), p = 10\nS = 1 / (0.1 + 0.9/10) = 1 / 0.19 ≈ 5.3\n\nCom p → ∞:\nS_max = 1 / f = 1 / 0.1 = 10  (limite absoluto!)`}</CodeBlock>
      <InfoBox color="#fbbf24">
        <p style={{ marginBottom: 4 }}>
          ⚠️ Se 10% do código é sequencial → speedup máximo é 10, independente
          de quantos processadores você use.
        </p>
        <p>
          A partir de ~20 núcleos o ganho se torna quase nulo. Por isso o limite
          prático é <b>16 núcleos</b>.
        </p>
      </InfoBox>

      <Divider />
      <H3>Tipos de Paralelismo</H3>
      <CmpTable
        headers={["Tipo", "Descrição", "Exemplo"]}
        rows={[
          [
            <>
              <b>Por Controle</b>
            </>,
            "Executa instruções diferentes para dados diferentes",
            "Crivo de Eratóstenes: cada processador filtra um primo diferente",
          ],
          [
            <>
              <b>De Dado</b>
            </>,
            "Executa as mesmas instruções simultaneamente em um conjunto de dados",
            "Bubble Sort paralelo, operações em vetores/RDDs",
          ],
        ]}
      />
      <InfoBox color="#2dd4b5">
        <p style={{ marginBottom: 4 }}>
          ✅ <b>Como pensar em paralelo:</b> particionar o problema em partes
          independentes.
        </p>
        <p>
          Workers do mesmo nível NÃO podem depender do resultado um do outro —
          essa é a regra de ouro da concorrência.
        </p>
        <p>
          <Inl>for</Inl> é naturalmente sequencial (difícil de paralelizar). Um
          Pool de Threads faz todas as iterações concorrentemente sem
          dependência entre elas.
        </p>
      </InfoBox>
    </section>
  );
}

// ─── ESTILOS ──────────────────────────────────────────────────────────────────

const sectionStyle = {
  background: "#111111",
  border: "1px solid #2a2a2a",
  borderRadius: 12,
  padding: 8,
  marginBottom: 16,
  scrollMarginTop: 16,
};

// ─── APP PRINCIPAL ────────────────────────────────────────────────────────────

export default function ResumoPararela() {
  const [activeId, setActiveId] = useState("s1");
  const mainRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const main = mainRef.current;
    if (!main) return;
    const mainTop = main.getBoundingClientRect().top;
    let current = null;
    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top - mainTop <= 80) current = id;
      }
    });
    if (current) setActiveId(current);
  }, []);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    main.addEventListener("scroll", handleScroll, { passive: true });
    return () => main.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap');
        :root { --mono: 'IBM Plex Mono', monospace; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #000000; color: #eeeeee; font-family: 'Segoe UI', system-ui, sans-serif; }
        pre { white-space: pre-wrap; word-break: break-all; }
        p { margin-bottom: 0; }
        @media (max-width: 640px) { .sidebar-nav { display: none !important; } }
      `}</style>

      <div
        style={{
          display: "flex",
          height: "100vh",
          background: "#000000",
          color: "#eeeeee",
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          fontSize: 14,
        }}
      >
        {/* SIDEBAR */}
        <nav
          className="sidebar-nav"
          style={{
            width: 220,
            flexShrink: 0,
            background: "#111111",
            borderRight: "1px solid #2a2a2a",
            padding: "16px 0",
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              padding: "0 16px 16px",
              borderBottom: "1px solid #2a2a2a",
              marginBottom: 8,
            }}
          >
            <div
              style={{
                fontSize: 9,
                fontFamily: "var(--mono)",
                color: "#888888",
                letterSpacing: 2,
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Resumo
            </div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#4f8ef7",
                lineHeight: 1.35,
              }}
            >
              Prog. Paralela
              <br />
              &amp; Distribuída
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#888888",
                marginTop: 3,
                fontFamily: "var(--mono)",
              }}
            >
              Aulas 7–12
            </div>
          </div>
          <div style={{ flex: 1, padding: "0 8px" }}>
            {NAV_SECTIONS.map(({ id, num, label }) => {
              const isActive = activeId === id;
              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    width: "100%",
                    padding: "6px 10px",
                    borderRadius: 6,
                    fontSize: 12,
                    cursor: "pointer",
                    marginBottom: 2,
                    background: isActive
                      ? "rgba(79,142,247,.15)"
                      : "transparent",
                    color: isActive ? "#4f8ef7" : "#eeeeee",
                    border: "none",
                    textAlign: "left",
                    transition: "background .15s, color .15s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = "#1a1a1a";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.background = "transparent";
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: 9,
                      color: "#888888",
                      minWidth: 20,
                    }}
                  >
                    {num}
                  </span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* CONTEÚDO PRINCIPAL */}
        <main
          ref={mainRef}
          style={{ flex: 1, overflowY: "auto", padding: "0 8px" }}
        >
          {/* HERO */}
          <div
            style={{
              textAlign: "center",
              padding: "32px 16px 24px",
              borderBottom: "1px solid #2a2a2a",
              marginBottom: 24,
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: 260,
                height: 2,
                background:
                  "linear-gradient(90deg,transparent,#4f8ef7,#2dd4b5,transparent)",
              }}
            />
            <h1
              style={{
                fontSize: 22,
                fontWeight: 800,
                background: "linear-gradient(135deg,#4f8ef7,#2dd4b5)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: 4,
              }}
            >
              Programação Paralela &amp; Distribuída
            </h1>
            <p style={{ color: "#888888", fontSize: 12 }}>
              Resumo focado para a prova — Aulas 7 a 12
            </p>
            <div
              style={{
                display: "flex",
                gap: 6,
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: 10,
              }}
            >
              {[
                ["Produtor–Consumidor", "#4f8ef7", "79,142,247"],
                ["Padrões SOLID", "#2dd4b5", "45,212,181"],
                ["Padrões Distribuídos", "#f97316", "249,115,22"],
                ["HDFS + Spark", "#a78bfa", "167,139,250"],
              ].map(([label, color, rgb]) => (
                <span
                  key={label}
                  style={{
                    fontSize: 10,
                    fontFamily: "var(--mono)",
                    padding: "2px 10px",
                    borderRadius: 999,
                    border: `1px solid ${color}`,
                    color,
                    background: `rgba(${rgb},.08)`,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <S1 />
          <S2 />
          <S3 />
          <S4 />
          <S5 />
          <S6 />
          <S7 />
          <S8 />
          <S9 />

          <div
            style={{
              textAlign: "center",
              padding: 20,
              color: "#888888",
              fontFamily: "var(--mono)",
              fontSize: 10,
            }}
          >
            Resumo gerado com base nos slides e anotações de sala — Aulas 7 a 12
            (29/04 a 27/05/2026)
          </div>
        </main>
      </div>
    </>
  );
}
