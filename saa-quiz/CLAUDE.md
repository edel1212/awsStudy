# saa-quiz

SAA-C03 문제풀이 Next.js 앱. 문제는 두 세트로 나뉜다.

- **전체(all) / 실전(essential)** — `data/questions.json`, 라우트 `/[id]`, 클라이언트 `src/app/[id]/client.jsx`
- **신규(new)** — `data/new-questions.json`, 라우트 `/new/[id]`, 클라이언트 `src/app/new/[id]/client.jsx`

## 신규 문제 추가 워크플로

사용자가 "신규 문제 추가해줘" 라고 하면 아래 순서로 처리한다.

1. **원본은 `../SAA-C03/new-anwser/quize.md`** — 이 파일이 유일한 source of truth. `data/new-questions.json`은 파서로 생성되는 산출물이므로 직접 편집 금지.
2. **파서 실행**: `python3 scripts/parse-new-questions.py`
   - `../SAA-C03/new-anwser/quize.md` → `data/new-questions.json` 재생성
   - `---` 로 문제 블록 분리, 헤더에서 label(예: `Q59`, `Q추가1`, `Q.23`, `48`)과 질문 추출
   - `> 정답 : X` 라인에서 정답 파싱 (`A, E` → `A,E`, 다중 정답은 콤마 구분)
   - id는 파일 순서대로 1부터 순차 부여 (label과 무관)
3. 파서 실행 후 사용자에게 `Wrote N questions to data/new-questions.json` 개수 확인.

### quize.md 포맷

```
---
# Q<label>. <질문 본문 (여러 줄 가능)>
> 정답 : D            ← 또는 "> 정답: B,C", "> 정답 : A, E"

- A. 보기 A 내용
- B. 보기 B 내용
- C. 보기 C 내용
- D. 보기 D 내용
- E. 보기 E 내용 (선택)

---
```

- 블록은 `---` 로 구분. 첫 블록(`# 신규 덤프 ...` 헤더)은 파서가 자동으로 스킵.
- label은 `Q1`, `Q추가1`, `Q.23`, `48` 등 자유 포맷 허용. 파서 정규식: `LABEL_RE = r"^(Q추가\d+|Q\.?\d+|\d+)\.?\s*(.*)$"`.
- 다중 정답은 콤마로 여러 글자를 나열하기만 하면 됨. 순서/공백 무관.
- 옵션 라인은 `- A. ...` 또는 `A. ...` 둘 다 허용.

## 클라이언트 동작 요약

- 신규 클라이언트는 `question.answer` 필드로 정답 확인 (선택 → 제출, 오답/모르겠음 시 정답 노출, 다중 선택 지원). 실전 모드나 wrong-answers 로깅은 없음.
- 만약 신규 세트도 로깅이 필요해지면: `/api/log/route.js` 는 `Q<id>` 키로 저장하므로 구 문제(Q1~Q138)와 ID가 겹친다. 접두어 분리(예: `N<id>`) 등 스키마 확장이 먼저 필요하다.

## 최근 상태 (2026-07-03)

- 파서에 `answer` 추출 로직 추가됨. 신규 60문항 모두 정답 확인 가능.
- Q68 중복이라 사용자가 quize.md에서 삭제 → 61 → 60문항.
