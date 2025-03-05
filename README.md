# Localendar

</div>

## 📝 프로젝트 소개

📅개발 기간: 2025.02.26 ~ 2025.03.05

위치기반 일정관리 사이트 "Localendar"입니다.<br/>
위치의 "Location"과 달력의 "Calendar"를 합친 이름입니다.

<br />

### 💬 배포 링크

https://out-source-project.vercel.app/

<br />

### ✨ 화면 구성

로그인 전 메인페이지
![Image](https://github.com/user-attachments/assets/fcb939e8-a0ab-42f6-8361-41560c0ea083)

<br/>

로그인 후 메인페이지
![Image](https://github.com/user-attachments/assets/12a93444-0cb1-4947-9ea6-686bced07e5c)

<br/>

마이페이지
![Image](https://github.com/user-attachments/assets/2b653de6-5f54-4f59-bd94-59cc51fa351b)

<br />

## 📄 기능 소개

- 로그인/로그아웃 기능
- 무한 스크롤을 적용한 남은 일정 목록 보여주는 기능
- 검색을 통한 지도 장소 검색 기능
- 장소의 마커 오버레이에서 모달을 통해 일정 생성하는 기능
- 지도에 표시된 마커를 클릭하여 상세 모달 확인 및 수정/삭제 기능
- 마이페이지에서 프로필 수정 기능
- perfecth를 적용하여 이전 일정을 페이지네이션으로 렌더링

<br />

## ⚙ 기술 스택

### Structure

<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg" height="40" alt="tailwindcss logo"  />
  <img src="https://velog.velcdn.com/images/yesoryeseul/post/3ba5774b-7c7c-4061-b34e-220f1fc60bc5/image.png" height="40" alt="shadcn-logo"  />
</div>
    
### Development
<div>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img src="https://user-images.githubusercontent.com/958486/218346783-72be5ae3-b953-4dd7-b239-788a882fdad6.svg" height="40" alt="zustand logo"  />
  <img src="https://i.ibb.co/hF6tvRw5/react-query-seeklogo.png" height="40" alt="tanstack-query-logo"  />
</div>

<br />

## 📁 프로젝트 구조

```
📁out-source-project
├─ .prettierrc
├─ components.json
├─ eslint.config.js
├─ index.html
├─ jsconfig.json
├─ package.json
├─ pnpm-lock.yaml
├─ 📁public
│  ├─ default_profile.png
│  ├─ favicon.ico
│  └─ logo.png
├─ README.md
├─ 📁src
│  ├─ App.jsx
│  ├─📁components
│  │  ├─📁features
│  │  │  ├─📁map
│  │  │  │  ├─ map-address-modal.jsx
│  │  │  │  ├─ map-marker.jsx
│  │  │  │  ├─ map-plans-marker.jsx
│  │  │  │  ├─ map-plans-modal.jsx
│  │  │  │  ├─ map-search-box.jsx
│  │  │  │  ├─ map-search-result-item.jsx
│  │  │  │  ├─ map-search-results.jsx
│  │  │  │  └─ map-search.jsx
│  │  │  ├─📁modal
│  │  │  │  ├─ edit-modal.jsx
│  │  │  │  └─ write-modal.jsx
│  │  │  ├─📁profile
│  │  │  │  └─ profile-form.jsx
│  │  │  └─📁protected-router
│  │  │     └─ warning-alert.jsx
│  │  ├─📁layouts
│  │  │  ├─📁modal
│  │  │  │  ├─ modal-date.jsx
│  │  │  │  ├─ modal-memo.jsx
│  │  │  │  ├─ modal-position.jsx
│  │  │  │  └─ modal-title.jsx
│  │  │  ├─ root-layout.jsx
│  │  │  └─📁sidebar
│  │  │     ├─ plan-card.jsx
│  │  │     ├─ plan-panel.jsx
│  │  │     ├─ sidebar.jsx
│  │  │     ├─ sign-error-panel.jsx
│  │  │     ├─ sign-in-form.jsx
│  │  │     ├─ sign-panel.jsx
│  │  │     ├─ sign-up-form.jsx
│  │  │     └─ user-panel.jsx
│  │  └─📁ui
│  │     ├─ alert-dialog.jsx
│  │     ├─ button.jsx
│  │     ├─ dialog.jsx
│  │     ├─ input.jsx
│  │     ├─ pagination.jsx
│  │     └─ textarea.jsx
│  ├─📁config
│  │  ├─ protected-router.jsx
│  │  └─ router.jsx
│  ├─📁constants
│  │  ├─ app-key.js
│  │  ├─ map-scale.js
│  │  ├─ modal-constants.js
│  │  ├─ page-constants.js
│  │  ├─ query-key.js
│  │  ├─ query-keys.js
│  │  └─ query-time.js
│  ├─📁lib
│  │  ├─📁apis
│  │  │  ├─ auth.api.js
│  │  │  ├─ axios.api.js
│  │  │  ├─ map.api.js
│  │  │  ├─ plan.api.js
│  │  │  └─ supabase.api.js
│  │  ├─📁hooks
│  │  │  ├─ use-auth-subscriber.hook.js
│  │  │  ├─ use-fetch-all-plans-on-page.hook.js
│  │  │  ├─ use-get-all-plans-query.js
│  │  │  ├─ use-get-all-plans-to-marker-query.js
│  │  │  ├─ use-get-upcoming-plans-query.hook.js
│  │  │  ├─ use-handle-plans-query.js
│  │  │  ├─ use-page-plans.hook.js
│  │  │  ├─ use-rank-address-query.js
│  │  │  ├─ use-sign-in-form.hook.js
│  │  │  ├─ use-sign-up-form.hook.js
│  │  │  ├─ use-update-nickname-mutation.js
│  │  │  ├─ use-update-profile-image-mutation.js
│  │  │  └─ useForm.jsx
│  │  ├─📁utils
│  │  │  ├─ auth-validate.util.js
│  │  │  └─ sweet-alert.util.js
│  │  └─ utils.js
│  ├─ main.jsx
│  ├─📁pages
│  │  ├─ home.jsx
│  │  └─ profile.jsx
│  ├─📁stores
│  │  ├─ auth.store.js
│  │  └─ map.store.js
│  └─📁styles
│     └─ globals.css
└─ vite.config.js
```

<br />

## 👥 팀원 소개

### 👨🏽‍💻김경민(팀장)

- axios연결 및 리팩토링

<br/>

### 👨🏽‍💻김종연(팀원)

- 프로필 이미지 업로드 및 닉네임 수정 기능 구현

<br/>

### 👩🏽‍💻박애리(팀원)

- 일정 추가 모달 및 기능 구현
- 일정 수정/삭제 모달 및 기능 구현

<br/>

### 👩🏽‍💻이다은(팀원)

- 사이드 바 구현
- 로그인/로그아웃 기능 구현

<br/>

### 👨🏽‍💻정현식(팀원)

- 카카오지도API를 활용한 검색 기능 구현
- 지도 클릭 이벤트 구현
