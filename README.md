# Codeit TodoList
할 일 목록을 관리하는 To Do 서비스

## 주요 기능

- ✅ 할 일 목록 조회 및 추가/삭제
- ✅ 할 일 상태 변경 (완료/미완료)
- ✅ 할 일 상세 정보 편집
- ✅ 이미지 업로드 및 수정
- ✅ 메모 작성 및 수정

##기술스택
Typescript, Next.js, scss

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```
[http://localhost:3000](http://localhost:3000) 열어서 개발 서버 확인

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
│   ├── items/          # 할 일 상세 페이지
│   ├── layout.tsx      # 루트 레이아웃
│   └── page.tsx        # 메인 페이지
├── components/          # 재사용 가능한 컴포넌트(gnb, 버튼 등)
├── assets/             # 이미지 및 아이콘
└── styles/             # SCSS 변수 및 스타일
```

## API 엔드포인트
### tenantId: annann5026(임시)

- `GET /api/annann5026/items` - 할 일 목록 조회
- `POST /api/annann5026/items` - 할 일 추가
- `PATCH /api/annann5026/items/{id}` - 할 일 수정
- `DELETE /api/annann5026/items/{id}` - 할 일 삭제
- `POST /api/annann5026/images/upload` - 이미지 업로드

