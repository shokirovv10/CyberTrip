import json
import os
import urllib.error
import urllib.request
from typing import Dict, Optional

try:
    from dotenv import load_dotenv
    load_dotenv()
except Exception:
    pass

MODES = {
    "learn": "Explain the concept clearly, then give a concise mental model and safe examples.",
    "detect": "Teach how to identify indicators and collect evidence in the CYBERTRIP training lab without targeting real systems.",
    "practice": "Turn the topic into a safe step-by-step exercise for an isolated CYBERTRIP lab.",
    "fix": "Explain defensive remediation, secure coding/configuration, validation and verification.",
    "review": "Act as a mentor: quiz the learner with a few checks, diagnose gaps, and recommend the next lesson/lab.",
}

BASE_FALLBACK = {
    "learn": "Avval tushunchani aniqlang. Keyin normal holatni bilib oling, so‘ng CYBERTRIP labida amaliy kuzatuv qiling.",
    "detect": "1) Targetni faqat CYBERTRIP labida oching. 2) Input/artefaktni aniqlang. 3) Normal javobni yozib oling. 4) O‘zgarishni taqqoslang. 5) Dalilni qayd qiling.",
    "practice": "Virtual Lab → Inspect → Analyze → Verify ketma-ketligini bajaring. Har bosqichdan keyin nimani ko‘rganingizni yozing.",
    "fix": "Muammoning sababini bartaraf qiling: secure defaults, validation, least privilege, parameterization/encoding yoki monitoringdan mavzuga mosini tanlang. Keyin qayta test qiling.",
    "review": "O‘zingizni 3 savol bilan tekshiring: zaiflik/indikatorni qayerdan bildingiz, qanday dalil topdingiz va developer/defender sifatida uni qanday yopasiz?",
}


def _fallback(topic: str, mode: str) -> str:
    topic = topic.strip()
    parts = [
        topic,
        "",
        BASE_FALLBACK.get(mode, BASE_FALLBACK["learn"]),
        "",
        "Keyingi qadam: shu mavzu bo‘yicha CYBERTRIP darsini va Virtual Labni ochib, natijani qayd eting.",
        "AI Tutor API kaliti ulanmagan bo‘lsa ham platforma shu o‘quv rejimida ishlaydi.",
    ]
    return "\n".join(parts)


def _openai_answer(topic: str, mode: str) -> Optional[str]:
    api_key = os.getenv("OPENAI_API_KEY", "").strip()
    if not api_key:
        return None
    model = os.getenv("OPENAI_MODEL", "gpt-5.6").strip() or "gpt-5.6"
    base_url = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1/responses").strip()
    system = (
        "You are CYBERTRIP AI Tutor, an educational cybersecurity mentor. "
        "Teach defensive, authorized, isolated-lab learning. Never encourage targeting real systems. "
        "Use the requested mode: " + MODES.get(mode, MODES['learn']) + " "
        "Structure answers with: Concept, How to Detect, Safe Practice, How to Fix, Verification. "
        "Keep it practical and beginner-friendly when appropriate."
    )
    payload = json.dumps({
        "model": model,
        "input": [
            {"role": "system", "content": [{"type": "input_text", "text": system}]},
            {"role": "user", "content": [{"type": "input_text", "text": topic}]},
        ],
    }).encode("utf-8")
    req = urllib.request.Request(
        base_url,
        data=payload,
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {api_key}"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        out = data.get("output_text")
        if out:
            return out.strip()
        # Robust fallback for response shapes where output_text is not top-level.
        chunks = []
        for item in data.get("output", []):
            for content in item.get("content", []):
                if content.get("type") == "output_text" and content.get("text"):
                    chunks.append(content["text"])
        return "\n".join(chunks).strip() or None
    except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, json.JSONDecodeError):
        return None
    except Exception:
        return None


def answer(topic: str, mode: str) -> Dict[str, str]:
    result = _openai_answer(topic, mode)
    if result:
        return {"text": result, "provider": "openai"}
    return {"text": _fallback(topic, mode), "provider": "local"}
