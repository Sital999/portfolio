import { portfolioData } from "@/lib/portfolio-data";
import { NextResponse } from "next/server";

type AskBody = {
  question?: string;
};

const TECH_KNOWLEDGE: Record<string, string> = {
  "next.js": "Next.js is a React framework for full-stack web apps with file-based routing, server rendering, API routes, and strong performance defaults.",
  react: "React is a UI library for building component-driven interfaces with state and declarative rendering.",
  typescript: "TypeScript adds static types to JavaScript, helping catch bugs earlier and improving editor support.",
  fastapi: "FastAPI is a Python web framework known for async performance, automatic docs, and type-driven validation.",
  "spring boot": "Spring Boot is a Java framework for production-ready backend services with auto-configuration and large ecosystem support.",
  cardano: "Cardano is a proof-of-stake blockchain that emphasizes peer-reviewed design and formal methods.",
  "cip-1694": "CIP-1694 is a Cardano governance proposal introducing decentralized on-chain governance and voting structures.",
  "smart contracts": "Smart contracts are on-chain programs that execute predefined rules without centralized intermediaries.",
  dapps: "Decentralized applications combine frontend interfaces with smart contracts and blockchain-connected logic.",
  docker: "Docker packages apps with dependencies into containers for consistent development and deployment environments.",
  "zero trust": "Zero Trust is a security model where every request is continuously verified, regardless of network location.",
};

function buildPortfolioContext() {
  const works = portfolioData.works.items
    .map((item) => `- ${item.title}: ${item.description} [${item.categories.join(", ")}]`)
    .join("\n");

  const skills = [
    ...portfolioData.stack.languages.map((item) => item.label),
    ...portfolioData.stack.frameworks.map((item) => item.label),
  ].join(", ");

  return [
    `Name: ${portfolioData.header.brand.replaceAll("_", " ")}`,
    `Hero: ${portfolioData.hero.description}`,
    `Skills: ${skills}`,
    `Timeline: ${portfolioData.timeline.entries.map((entry) => `${entry.role} at ${entry.company}`).join("; ")}`,
    `Works:\n${works}`,
    `Contact: ${portfolioData.cta.email.label}`,
  ].join("\n\n");
}

function fallbackReply(question: string) {
  const input = question.toLowerCase();

  const isTechExplainRequest =
    input.includes("what is") ||
    input.includes("explain") ||
    input.includes("how does") ||
    input.includes("difference") ||
    input.includes("compare");

  if (isTechExplainRequest) {
    const matched = Object.entries(TECH_KNOWLEDGE).find(([topic]) => input.includes(topic));

    if (matched) {
      const [topic, detail] = matched;
      return [`Topic: ${topic}`, detail, "In this portfolio context, these technologies are used to build scalable, secure, and user-focused systems."].join("\n\n");
    }

    const stack = [
      ...portfolioData.stack.languages.map((item) => item.label),
      ...portfolioData.stack.frameworks.map((item) => item.label),
    ].join(", ");

    return [
      "I can explain many technologies in this portfolio.",
      `Try asking about: ${stack}.`,
      "Example: 'Explain Next.js in simple terms' or 'How does CIP-1694 work?'",
    ].join("\n\n");
  }

  if (input.includes("contact") || input.includes("email") || input.includes("hire")) {
    return `You can reach Sital at ${portfolioData.cta.email.label} or connect via ${portfolioData.cta.action.href}.`;
  }

  if (input.includes("skill") || input.includes("stack") || input.includes("tech")) {
    const stack = [
      ...portfolioData.stack.languages.map((item) => item.label),
      ...portfolioData.stack.frameworks.map((item) => item.label),
    ].join(", ");
    return `Core stack includes: ${stack}.`;
  }

  if (input.includes("project") || input.includes("work")) {
    return `Featured projects are ${portfolioData.works.items.map((item) => item.title).join(", ")}.`;
  }

  return `Sital is a software developer focused on web apps, dApps, and secure, scalable systems. Ask about skills, projects, or how to collaborate.`;
}

async function askOpenAI(question: string, context: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are an assistant embedded in a personal portfolio. For profile-specific questions, rely on provided context. For general technology questions, provide clear, concise educational explanations and connect back to this portfolio when relevant.",
        },
        {
          role: "user",
          content: `Context:\n${context}\n\nQuestion: ${question}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    return null;
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const content = data.choices?.[0]?.message?.content?.trim();
  return content || null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AskBody;
    const question = body.question?.trim();

    if (!question) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }

    const context = buildPortfolioContext();
    const llmReply = await askOpenAI(question, context);
    const reply = llmReply ?? fallbackReply(question);

    return NextResponse.json({ reply, source: llmReply ? "llm" : "fallback" });
  } catch {
    return NextResponse.json({ error: "Failed to process request." }, { status: 500 });
  }
}
