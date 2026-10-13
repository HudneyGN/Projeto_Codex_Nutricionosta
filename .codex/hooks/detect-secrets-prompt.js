function readStdin() {
  return new Promise((resolve) => {
    let data = "";

    process.stdin.setEncoding("utf8");

    process.stdin.on("data", (chunk) => {
      data += chunk;
    });

    process.stdin.on("end", () => {
      resolve(data);
    });
  });
}

function outputJson(payload) {
  process.stdout.write(JSON.stringify(payload));
}

function maskSecret(value) {
  if (!value || value.length <= 8) {
    return "***";
  }

  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}

function normalizeValue(value) {
  return String(value || "")
    .trim()
    .replace(/^["']/, "")
    .replace(/["']$/, "");
}

function isPublicEnv(name) {
  const publicEnvNames = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
    "NEXT_PUBLIC_APP_URL",
    "NEXT_PUBLIC_SITE_URL",
    "VITE_SUPABASE_URL",
    "VITE_SUPABASE_ANON_KEY"
  ];

  return (
    name.startsWith("NEXT_PUBLIC_") ||
    name.startsWith("VITE_PUBLIC_") ||
    name.startsWith("PUBLIC_") ||
    publicEnvNames.includes(name)
  );
}

function isSuspiciousEnvName(name) {
  const suspiciousWords = [
    "SECRET",
    "TOKEN",
    "PASSWORD",
    "PRIVATE",
    "CREDENTIAL",
    "SERVICE_ROLE",
    "WEBHOOK_SECRET",
    "ACCESS_TOKEN",
    "REFRESH_TOKEN"
  ];

  return suspiciousWords.some((word) => name.includes(word));
}

async function main() {
  const rawInput = await readStdin();
  const input = rawInput ? JSON.parse(rawInput) : {};

  const prompt = input.prompt || "";

  const secretEnvNames = [
    // IA / LLMs
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "GEMINI_API_KEY",
    "GOOGLE_API_KEY",
    "MISTRAL_API_KEY",
    "GROQ_API_KEY",
    "DEEPSEEK_API_KEY",
    "PERPLEXITY_API_KEY",
    "TOGETHER_API_KEY",
    "REPLICATE_API_TOKEN",
    "HUGGINGFACE_API_TOKEN",

    // Database
    "DATABASE_URL",
    "DIRECT_URL",
    "POSTGRES_URL",
    "POSTGRES_PRISMA_URL",
    "POSTGRES_URL_NON_POOLING",
    "MYSQL_URL",
    "MONGODB_URI",
    "REDIS_URL",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",

    // Auth / Session
    "JWT_SECRET",
    "AUTH_SECRET",
    "NEXTAUTH_SECRET",
    "SESSION_SECRET",
    "COOKIE_SECRET",
    "ENCRYPTION_KEY",
    "APP_SECRET",
    "SECRET_KEY",
    "PRIVATE_KEY",

    // Supabase
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_JWT_SECRET",
    "SUPABASE_DB_PASSWORD",
    "SUPABASE_ACCESS_TOKEN",

    // Stripe
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "STRIPE_RESTRICTED_KEY",
    "STRIPE_CONNECT_CLIENT_SECRET",
    "STRIPE_SK",
    "STRIPE_API_KEY",

    // Firebase / Google
    "FIREBASE_PRIVATE_KEY",
    "FIREBASE_CLIENT_EMAIL",
    "GOOGLE_APPLICATION_CREDENTIALS",
    "GOOGLE_CLIENT_SECRET",

    // AWS / S3 / R2
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "AWS_SESSION_TOKEN",
    "CLOUDFLARE_API_TOKEN",
    "R2_ACCESS_KEY_ID",
    "R2_SECRET_ACCESS_KEY",
    "S3_ACCESS_KEY_ID",
    "S3_SECRET_ACCESS_KEY",
    "S3_ACCESS_KEY",
    "S3_SECRET_KEY",

    // Email
    "SMTP_USER",
    "SMTP_PASS",
    "SMTP_PASSWORD",
    "EMAIL_SERVER_PASSWORD",
    "RESEND_API_KEY",
    "SENDGRID_API_KEY",
    "BREVO_API_KEY",
    "MAILGUN_API_KEY",
    "POSTMARK_SERVER_TOKEN",

    // Bots / Webhooks / Automação
    "WEBHOOK_SECRET",
    "N8N_API_KEY",
    "N8N_ENCRYPTION_KEY",
    "TELEGRAM_BOT_TOKEN",
    "DISCORD_BOT_TOKEN",
    "SLACK_BOT_TOKEN",
    "SLACK_SIGNING_SECRET",

    // Git / Deploy / CI
    "GITHUB_TOKEN",
    "GITHUB_PAT",
    "GITLAB_TOKEN",
    "VERCEL_TOKEN",
    "RAILWAY_TOKEN",
    "RENDER_API_KEY",
    "NETLIFY_AUTH_TOKEN",
  ];

  const detectedSecrets = [];
  const alreadyDetected = new Set();

  const envRegex =
    /(?:^|\s)(?:export\s+)?([A-Z][A-Z0-9_]{2,})\s*=\s*("([^"]*)"|'([^']*)'|[^\s]+)/gm;

  let match;

  while ((match = envRegex.exec(prompt)) !== null) {
    const name = match[1];
    const rawValue = match[3] || match[4] || match[2] || "";
    const value = normalizeValue(rawValue);

    const isExplicitSecret = secretEnvNames.includes(name);
    const isSuspicious = isSuspiciousEnvName(name);

    if (isPublicEnv(name)) {
      continue;
    }

    if (!isExplicitSecret && !isSuspicious) {
      continue;
    }

    if (alreadyDetected.has(name)) {
      continue;
    }

    alreadyDetected.add(name);

    detectedSecrets.push({
      name,
      preview: maskSecret(value)
    });
  }

  if (detectedSecrets.length === 0) {
    outputJson({
      continue: true
    });
    return;
  }

  const detectedList = detectedSecrets
    .map((secret) => `- ${secret.name}: ${secret.preview}`)
    .join("\n");

  outputJson({
    decision: "block",
    reason: `
Prompt bloqueado por possível vazamento de secrets.

Foram encontrados valores sensíveis no prompt:

${detectedList}

Remova as chaves, tokens, senhas ou URLs privadas antes de enviar novamente.

Boas práticas:
- Não cole arquivo .env completo no Codex.
- Substitua valores reais por exemplos.
- Use nomes como OPENAI_API_KEY=sk-xxxx ou DATABASE_URL=postgresql://user:password@host/db.
- Se esse secret já foi exposto, gere uma nova chave no serviço correspondente.
`.trim()
  });
}

main().catch((error) => {
  outputJson({
    decision: "block",
    reason: `Erro ao verificar secrets no prompt: ${error.message}`
  });
});