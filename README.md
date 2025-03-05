# Localendar
<div align="center">
  <img width="400px" src="https://github.com/user-attachments/assets/039ffaf2-b574-449e-8eef-609b82ddee2f" alt="logo" />
</div>

## 📝 프로젝트 소개
**장소 기반으로 일정을 관리할 수 있는 웹 어플리케이션**

- 위치기반 일정관리 사이트 "Localendar"입니다.
- 위치의 "Location"과 달력의 "Calendar"를 합친 이름입니다.
- 장소 기반으로 자신의 일정을 시각적으로 관리할 수 있는 웹 애플리케이션입니다.
- 사용자는 지도 위에서 자신의 일정을 한눈에 확인하고 관리할 수 있습니다.
- 지난 일정을 아카이브 형태로 확인할 수 있어 과거 활동을 쉽게 되돌아볼 수 있습니다.

<br />

> 📅 개발 기간: 2025.02.26 ~ 2025.03.05 (총 7일) <br />
> 💬 배포 주소: [https://out-source-project.vercel.app/](https://out-source-project.vercel.app/)

<br />
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

## 📄 프로젝트 기능 소개

- **React 기반 웹 애플리케이션**입니다.
- TanStack Query의 **Infinite Query**와 **Prefetch**를 사용하여 사용자 경험을 향상시켰습니다.
- TanStack Query와 함께 **Suspense**를 사용하여 개발자 경험을 향상시켰습니다.
- supabase를 이용하여 **이메일 회원가입 및 로그인 기능**을 제공합니다.
- 로그인된 유저의 인증 상태에 따라 **ProtectedRoute**를 적용하여 비인가 사용자의 접근을 제한합니다.
- 일정을 지도 위 마커로 시각화하여 위치 기반 일정 관리를 직관적으로 구현했습니다.
- 검색창을 통해 장소를 쉽게 찾고, 직관적인 모달을 통해 일정을 생성/수정할 수 있어 사용자 편의성을 높였습니다.
- 마이페이지에서 프로필 수정 및 지난 일정 기록과 가장 자주 방문한 장소를 한눈에 확인할 수 있도록 구성했습니다.

<br />
<br />

## ⚙ 기술 스택

<div align="left">

### Cooperation
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git" />
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="Github" />
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" alt="Figma" />
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white" alt="Notion" />
<br>

### Development
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black" alt="React" />
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" alt="JavaScript" />
<img src="https://img.shields.io/badge/Tanstackquery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white" alt="TanstackQeury">
<img src="https://img.shields.io/badge/Zustand-82612C?style=for-the-badge&logo=&logoColor=white" alt="Zustand">      
<img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=for-the-badge&amp;logo=Tailwind CSS&amp;logoColor=white" alt="TailwindCSS">
<img src="https://img.shields.io/badge/shadcn/ui-000000.svg?style=for-the-badge&logo=shadcn/ui&logoColor=white" alt="Shadcn" />

</div>

<br />
<br />

## 📁 프로젝트 구조

```
📦 out-source-project
├─ public
└─ src
   ├─ App.jsx
   ├─ main.jsx
   ├─ components
   │  ├─ features
   │  ├─ layouts
   │  └─ ui
   ├─ config
   ├─ constants
   ├─ lib
   │  ├─ apis
   │  ├─ hooks
   │  └─ utils
   ├─ pages
   ├─ stores
   └─ styles
```

<br />
<br />

## 👩‍👩‍👧‍👧 프로젝트 멤버 소개

<table>
  <tbody>
    <tr>
      <td width="300px" align="center">
        <a href="https://github.com/KIMgyeongmIN00">
        <img src="https://github.com/KIMgyeongmIN00.png" width="80" alt="KIMgyeongmIN00"/>
        <br />
        <sub><b>KIMgyeongmIN00</b></sub>
        </a>
        <br />
      </td>
      <td width="300px" align="center">
        <a href="https://github.com/kjjyyy01">
        <img src="https://github.com/kjjyyy01.png" width="80" alt="kjjyyy01"/>
        <br />
        <sub><b>kjjyyy01</b></sub>
        </a>
        <br />
      </td>
      <td width="300px" align="center">
        <a href="https://github.com/Aeri0730">
        <img src="https://github.com/Aeri0730.png" width="80" alt="Aeri0730"/>
        <br />
        <sub><b>Aeri0730</b></sub>
        </a>
        <br />
      </td>
    </tr>
    <tr>
      <td align="center">
        protectedRouter 및 라우팅 경로 설계 <br/>
        API 정의 및 TanStackQuery Hook 구현 <br/>
        전역 상태 관리 <br/>
      </td>
      <td align="center">
        supabase의 storage에 이미지 로드 <br/>
        프로필 이미지 및 닉네임 수정 기능 <br/>
      </td>
      <td align="center">
        일정 생성/수정 모달 구현 <br/>
        지도에 일정 위치를 노란 마커로 표시 <br/>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/llddang">
        <img src="https://github.com/llddang.png" width="80" alt="llddang"/>
        <br />
        <sub><b>llddang</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/sharet9446">
        <img src="https://github.com/sharet9446.png" width="80" alt="sharet9446"/>
        <br />
        <sub><b>sharet9446</b></sub>
        </a>
        <br />
      </td>
      <td rowspan="2" align="center">
      </td>
    </tr>
    <tr>
      <td align="center">
        사이드바 구현 <br/>
        로그인/회원가입 구현 <br/>
      </td>
      <td align="center">
        전체적인 지도 API 구현 담당 <br/>
        장소 검색을 통한 지도 이동 구현 <br/>
      </td>
    </tr>
  </tbody>
</table>
