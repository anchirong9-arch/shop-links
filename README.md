# 짤 & 꿀템 — 프로필 링크 페이지

틱톡 · 인스타 · 쓰레드 · 유튜브 프로필에 걸어 두는 **상품 모음 링크 페이지**입니다.
`products.json` 한 곳만 고치면 사이트에 바로 반영됩니다.

- 주소: https://anchirong9-arch.github.io/shop-links/
- 구성: `index.html` (화면) · `styles.css` (디자인) · `app.js` (목록·검색) · `products.json` (상품 데이터) · `images/` (상품 사진)

## 새 상품 올리기 (한 줄만 추가)

1. 상품 사진을 `images/`에 넣습니다. (정사각형 640~800px 권장, 없으면 `"image": ""` 로 두면 아이콘 카드로 나옵니다.)
2. `products.json` **맨 위**에 아래 한 덩어리를 붙여 넣습니다.

```json
{
  "id": "고유값-영문-숫자",
  "name": "상품 이름 그대로",
  "tag": "한 줄 키워드 · 특징",
  "category": "생활용품",
  "price": 12900,
  "listPrice": 21900,
  "image": "images/파일명.jpg",
  "url": "https://link.coupang.com/a/단축코드",
  "posted": "2026-11-18"
}
```

- `price`는 실제 판매가(숫자만), `listPrice`는 정가입니다. 정가가 없으면 `null`.
- `category`는 `생활용품` · `식품` 처럼 묶음 이름입니다. 새 이름을 쓰면 상단 칩이 자동으로 하나 늘어납니다.
- `keywords`를 추가하면 이름·태그에 없는 단어로도 검색됩니다. (선택)
3. 저장하고 아래 두 줄을 실행하면 1~2분 뒤 사이트에 반영됩니다.

```bash
git add -A && git commit -m "새 상품 추가" && git push
```

## 표기

- 쿠팡 파트너스 대가성 문구(공정위 고지)는 페이지 하단에 고정으로 들어가 있습니다. 지우지 마세요.
- 가격은 글을 올린 날 기준입니다. 바뀐 가격을 알고 있으면 `products.json`의 `price`만 고치면 됩니다.
