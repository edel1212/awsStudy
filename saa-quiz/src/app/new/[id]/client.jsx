"use client";

import { useState } from "react";
import Link from "next/link";

export default function NewQuizClient({ question, total }) {
  const answerLetters = question.answer ? question.answer.split(",") : [];
  const isMulti = answerLetters.length > 1;

  const [selected, setSelected] = useState(() => new Set());
  const [result, setResult] = useState(null);

  const prevId = question.id > 1 ? question.id - 1 : null;
  const nextId = question.id < total ? question.id + 1 : null;

  function toggle(letter) {
    if (result) return;
    if (typeof window !== "undefined") {
      const sel = window.getSelection();
      if (sel && sel.toString().length > 0) return;
    }
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(letter)) {
        next.delete(letter);
      } else {
        if (!isMulti) next.clear();
        next.add(letter);
      }
      return next;
    });
  }

  function submit() {
    if (selected.size === 0 || result) return;
    const correct =
      selected.size === answerLetters.length &&
      answerLetters.every((l) => selected.has(l));
    setResult(correct ? "correct" : "wrong");
  }

  function dontKnow() {
    if (result) return;
    setResult("dontknow");
  }

  return (
    <main style={{ padding: "32px 24px", maxWidth: 900, margin: "0 auto" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
          fontSize: 13,
          color: "#888",
        }}
      >
        <Link href="/" style={{ color: "#888" }}>
          ← 목록
        </Link>
        <span>
          신규 {question.id} / {total} · {question.label}
          {isMulti && ` · 다중 선택 ${answerLetters.length}개`}
        </span>
      </nav>

      <p
        style={{
          fontSize: 16,
          lineHeight: 1.7,
          marginBottom: 8,
          whiteSpace: "pre-wrap",
        }}
      >
        {question.question}
      </p>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginTop: 20,
        }}
      >
        {Object.entries(question.options).map(([letter, text]) => {
          const isSelected = selected.has(letter);
          return (
            <button
              key={letter}
              onClick={() => toggle(letter)}
              disabled={!!result}
              style={{
                background: "transparent",
                border: "none",
                padding: "4px 0",
                textAlign: "left",
                cursor: result ? "default" : "pointer",
                fontSize: 15,
                lineHeight: 1.7,
                color: "#ddd",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                userSelect: "text",
                WebkitUserSelect: "text",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: isSelected ? "#fff" : "transparent",
                  border: isSelected ? "none" : "1px solid #555",
                  flexShrink: 0,
                  marginTop: 7,
                }}
              />
              <span>
                <span style={{ marginRight: 8 }}>{letter}.</span>
                {text}
              </span>
            </button>
          );
        })}
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 24, fontSize: 14 }}>
        <button
          onClick={submit}
          disabled={!!result || selected.size === 0}
          style={{
            background: "transparent",
            border: "none",
            color:
              result || selected.size === 0 ? "#555" : "#8ab4f8",
            cursor:
              result || selected.size === 0 ? "default" : "pointer",
            padding: 0,
          }}
        >
          제출
        </button>
        <button
          onClick={dontKnow}
          disabled={!!result}
          style={{
            background: "transparent",
            border: "none",
            color: result ? "#555" : "#aaa",
            cursor: result ? "default" : "pointer",
            padding: 0,
          }}
        >
          모르겠음
        </button>
      </div>

      {result === "correct" && (
        <p style={{ marginTop: 20, color: "#7bd87b", fontSize: 14 }}>
          정답 ({question.answer})
        </p>
      )}
      {result === "wrong" && (
        <p style={{ marginTop: 20, color: "#ff6b6b", fontSize: 14 }}>
          오답 · 정답: {question.answer}
        </p>
      )}
      {result === "dontknow" && (
        <p style={{ marginTop: 20, color: "#aaa", fontSize: 14 }}>
          정답: {question.answer}
        </p>
      )}

      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 36,
          fontSize: 14,
        }}
      >
        {prevId ? (
          <Link href={`/new/${prevId}`} style={{ color: "#888" }}>
            ← 이전
          </Link>
        ) : (
          <span />
        )}
        {nextId ? (
          <Link href={`/new/${nextId}`} style={{ color: "#888" }}>
            다음 →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
