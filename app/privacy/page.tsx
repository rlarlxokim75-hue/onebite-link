import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...pageMetadata(
    "개인정보 처리방침",
    "한입 링크의 개인정보 처리방침 안내 페이지입니다.",
  ),
  // 로그인 없이 누구나 볼 수 있는 공개 페이지
  robots: { index: true, follow: true },
};

const SERVICE_NAME = "한입 링크";
const OPERATOR_NAME = "KKT";
const CONTACT_EMAIL = "kkt@uxis.co.kr";
/** 처리방침을 개정할 때만 직접 수정한다 (렌더링 시점의 날짜를 쓰지 않는다) */
const EFFECTIVE_DATE = "2026-11-24";

const SECTIONS = [
  "개인정보의 처리 목적",
  "처리하는 개인정보의 항목",
  "개인정보의 처리 및 보유 기간",
  "개인정보의 파기 절차 및 방법",
  "개인정보 처리업무의 위탁",
  "개인정보의 국외 이전",
  "정보주체의 권리·의무 및 행사방법",
  "개인정보의 안전성 확보 조치",
  "쿠키 운영 및 거부 방법",
  "개인정보 보호책임자",
  "권익침해 구제방법",
  "처리방침의 변경",
];

const linkClass = "text-[var(--accent)] underline";
const thClass = "border border-[var(--disabled)] bg-[var(--bg)] px-3 py-2 text-left";
const tdClass = "border border-[var(--disabled)] px-3 py-2 align-top";

function Section({
  n,
  children,
}: {
  n: number;
  children: React.ReactNode;
}) {
  return (
    <section id={`s${n}`} className="mt-10 scroll-mt-6">
      <h2 className="mb-3 text-[20px] font-bold text-[var(--text)]">
        {n}. {SECTIONS[n - 1]}
      </h2>
      <div className="flex flex-col gap-3 text-[16px] leading-[1.7]">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10">
      <article className="rounded-2xl bg-[var(--card)] p-6 shadow-[var(--shadow-card)] sm:p-10">
        <header className="border-b border-[var(--hover-bg)] pb-6">
          <Link href="/" className="link-hover text-[14px] text-[var(--text-sub)]">
            ← {SERVICE_NAME}
          </Link>
          <h1 className="mt-3 text-[28px] leading-[1.3] font-bold text-[var(--text)]">
            개인정보 처리방침
          </h1>
          <p className="mt-2 text-[14px] text-[var(--text-sub)]">
            시행일: <time dateTime={EFFECTIVE_DATE}>{EFFECTIVE_DATE}</time>
          </p>
        </header>

        <p className="mt-6 text-[16px] leading-[1.7]">
          {SERVICE_NAME}(이하 &quot;서비스&quot;)은 정보주체의 자유와 권리 보호를
          위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여 개인정보를
          적법하게 처리하고 안전하게 관리합니다. 「개인정보 보호법」 제30조에 따라
          개인정보의 처리와 보호에 관한 절차 및 기준을 안내하고, 이와 관련한
          고충을 신속하고 원활하게 처리할 수 있도록 다음과 같이 개인정보
          처리방침을 수립·공개합니다.
        </p>

        <nav
          aria-label="목차"
          className="mt-8 rounded-xl bg-[var(--bg)] p-5"
        >
          <h2 className="mb-3 text-[15px] font-bold">목차</h2>
          <ol className="list-decimal space-y-1 pl-5 text-[15px] text-[var(--text-sub)]">
            {SECTIONS.map((title, i) => (
              <li key={title}>
                <a href={`#s${i + 1}`} className="hover:underline">
                  {title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <Section n={1}>
          <p>
            {SERVICE_NAME}은 다음의 목적을 위하여 개인정보를 처리합니다. 처리한
            개인정보는 아래 목적 이외의 용도로 이용하지 않으며, 이용 목적이
            변경되는 경우 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등
            필요한 조치를 이행합니다.
          </p>
          <ol className="list-decimal space-y-2 pl-6">
            <li>
              <strong>회원 가입 및 관리</strong>: 회원 가입 의사 확인, 본인
              식별·인증, 회원 자격 유지·관리, 비밀번호 재설정 안내 메일 발송,
              서비스 부정 이용 방지
            </li>
            <li>
              <strong>서비스 제공</strong>: 이용자가 저장한 링크와 폴더의 저장·조회·수정·삭제
              등 북마크 관리 기능 제공
            </li>
            <li>
              <strong>고충 처리</strong>: 정보주체의 문의사항 확인 및 사실조사를
              위한 연락·통지, 처리 결과 통보
            </li>
          </ol>
        </Section>

        <Section n={2}>
          <div>
            <h3 className="mb-1 font-bold">가. 회원가입 시 수집·이용 항목</h3>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                <strong>법적 근거</strong>: 「개인정보 보호법」 제15조제1항제4호(계약
                체결·이행)
              </li>
              <li>
                <strong>이메일·비밀번호로 가입하는 경우</strong>: 이메일 주소,
                비밀번호(암호화하여 저장하며 원문은 보관하지 않음)
              </li>
              <li>
                <strong>카카오 계정으로 로그인하는 경우</strong>: 카카오로부터
                제공받는 계정 식별 정보 및 이용자가 동의한 항목(이메일 주소
                등 카카오 로그인 동의 항목)
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-1 font-bold">나. 서비스 이용 과정에서 이용자가 직접 입력하는 항목</h3>
            <ul className="list-disc space-y-1 pl-6">
              <li>
                저장한 링크 주소, 링크의 제목·설명·썸네일 이미지 주소(링크
                저장 시 해당 웹페이지에서 가져옴), 폴더 이름
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-1 font-bold">다. 서비스 이용 과정에서 자동 수집되는 항목</h3>
            <p>IP 주소, 쿠키, 서비스 이용 기록, 접속 로그, 브라우저 정보, 기기 정보</p>
          </div>
        </Section>

        <Section n={3}>
          <p>
            {SERVICE_NAME}은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터
            개인정보를 수집할 때 동의받은 보유·이용기간 내에서 개인정보를
            처리·보유합니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[15px]">
              <thead>
                <tr>
                  <th className={thClass}>처리 목적</th>
                  <th className={thClass}>보유 기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tdClass}>회원 가입 및 관리</td>
                  <td className={tdClass}>회원 탈퇴 시까지</td>
                </tr>
                <tr>
                  <td className={tdClass}>서비스 제공(저장한 링크·폴더)</td>
                  <td className={tdClass}>회원 탈퇴 시까지</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[14px] text-[var(--text-sub)]">
            다만 관계 법령 위반에 따른 수사·조사가 진행 중인 경우 또는 관련
            법령에 따른 보존 의무가 있는 경우에는 해당 기간이 끝날 때까지
            보유합니다.
          </p>
        </Section>

        <Section n={4}>
          <p>
            {SERVICE_NAME}은 보유기간의 경과, 처리 목적 달성 등으로 개인정보가
            불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>파기 절차</strong>: 이용자의 회원 탈퇴 요청 또는 보유기간
              만료 시 파기
            </li>
            <li>
              <strong>파기 방법</strong>: 전자적 파일 형태의 정보는 복구 및
              재생이 불가능한 방법으로 영구 삭제
            </li>
          </ul>
        </Section>

        <Section n={5}>
          <p>
            {SERVICE_NAME}은 원활한 서비스 운영을 위해 다음과 같이 개인정보
            처리업무를 위탁하고 있습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[15px]">
              <thead>
                <tr>
                  <th className={thClass}>수탁업체</th>
                  <th className={thClass}>위탁 업무</th>
                  <th className={thClass}>보유·이용 기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={tdClass}>Supabase Inc.</td>
                  <td className={tdClass}>
                    회원 정보 저장 및 인증 처리, 데이터베이스 운영, 비밀번호
                    재설정 메일 발송
                  </td>
                  <td className={tdClass}>회원 탈퇴 또는 위탁계약 종료 시까지</td>
                </tr>
                <tr>
                  <td className={tdClass}>Vercel Inc.</td>
                  <td className={tdClass}>웹 서비스 호스팅 및 배포</td>
                  <td className={tdClass}>위탁계약 종료 시까지</td>
                </tr>
                <tr>
                  <td className={tdClass}>주식회사 카카오</td>
                  <td className={tdClass}>카카오 계정을 통한 로그인 인증</td>
                  <td className={tdClass}>회원 탈퇴 시까지</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[14px] text-[var(--text-sub)]">
            {SERVICE_NAME}은 「개인정보 보호법」 제26조에 따라 위탁계약 시
            개인정보의 안전한 처리를 위한 기술적·관리적 보호조치, 재위탁 제한,
            관리·감독 등에 관한 사항을 계약에 반영하고 있습니다.
          </p>
        </Section>

        <Section n={6}>
          <p>
            {SERVICE_NAME}은 서비스 운영을 위해 아래와 같이 개인정보를 국외의
            사업자가 운영하는 시스템에 저장·처리할 수 있습니다.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[15px]">
              <tbody>
                <tr>
                  <th className={thClass}>이전받는 자</th>
                  <td className={tdClass}>
                    Supabase Inc., Vercel Inc. (연락처는 각 사의 개인정보
                    처리방침에 따름)
                  </td>
                </tr>
                <tr>
                  <th className={thClass}>이전 국가</th>
                  <td className={tdClass}>
                    미국 등 각 수탁자의 서버가 위치한 국가
                  </td>
                </tr>
                <tr>
                  <th className={thClass}>이전 항목</th>
                  <td className={tdClass}>
                    이메일 주소, 암호화된 비밀번호, 저장한 링크·폴더 정보, 접속
                    로그
                  </td>
                </tr>
                <tr>
                  <th className={thClass}>이전 일시 및 방법</th>
                  <td className={tdClass}>
                    서비스 이용 시점에 정보통신망을 통한 암호화 전송(HTTPS)
                  </td>
                </tr>
                <tr>
                  <th className={thClass}>이전 목적 및 보유기간</th>
                  <td className={tdClass}>
                    회원 정보 저장·인증 및 서비스 호스팅 / 회원 탈퇴 또는
                    위탁계약 종료 시까지
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-[14px] text-[var(--text-sub)]">
            국외 이전을 원하지 않는 경우 회원 탈퇴를 통해 거부할 수 있으며,
            이 경우 서비스 이용이 제한됩니다.
          </p>
        </Section>

        <Section n={7}>
          <p>
            정보주체는 {SERVICE_NAME}에 대해 언제든지 다음과 같은 개인정보 보호
            관련 권리를 행사할 수 있습니다.
          </p>
          <ol className="list-decimal space-y-1 pl-6">
            <li>개인정보 열람 요구</li>
            <li>개인정보 정정·삭제 요구</li>
            <li>개인정보 처리정지 요구</li>
            <li>개인정보 처리에 대한 동의 철회</li>
          </ol>
          <p>
            권리 행사는{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
              {CONTACT_EMAIL}
            </a>
            로 이메일을 보내 요청할 수 있으며, {SERVICE_NAME}은 이에 대해 지체
            없이 조치하겠습니다.
          </p>
        </Section>

        <Section n={8}>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>기술적 조치</strong>: 접근 권한 관리, 비밀번호 암호화 저장,
              HTTPS 통신 암호화, 사용자별 데이터 접근 제한(Row Level Security)
              적용
            </li>
            <li>
              <strong>관리적 조치</strong>: 개인정보 취급 담당자 최소화, 정기적인
              자체 점검
            </li>
            <li>
              <strong>물리적 조치</strong>: 국제 보안 인증(SOC 2 등)을 획득한
              클라우드 인프라 활용
            </li>
          </ul>
        </Section>

        <Section n={9}>
          <p>
            {SERVICE_NAME}은 로그인 상태 유지를 위해 쿠키(cookie)를 사용합니다.
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong>사용 목적</strong>: 로그인 세션 유지
            </li>
            <li>
              <strong>거부 방법</strong>: 웹브라우저의 설정 메뉴에서 쿠키 저장을
              거부할 수 있습니다. 다만 쿠키 저장을 거부하면 로그인이 필요한
              서비스를 이용할 수 없습니다.
            </li>
          </ul>
        </Section>

        <Section n={10}>
          <p>
            {SERVICE_NAME}은 개인정보 처리에 관한 업무를 총괄하고, 개인정보 처리와
            관련한 정보주체의 불만 처리 및 피해 구제를 위하여 아래와 같이
            개인정보 보호책임자를 지정하고 있습니다.
          </p>
          <div className="rounded-xl bg-[var(--bg)] p-4">
            <p>
              <strong>개인정보 보호책임자</strong>: {OPERATOR_NAME}
            </p>
            <p>
              <strong>연락처</strong>:{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </Section>

        <Section n={11}>
          <p>
            정보주체는 개인정보 침해로 인한 구제를 받기 위하여 아래 기관에 분쟁
            해결이나 상담 등을 신청할 수 있습니다.
          </p>
          <ul className="list-disc space-y-1 pl-6">
            {[
              ["개인정보분쟁조정위원회", "1833-6972", "https://www.kopico.go.kr", "www.kopico.go.kr"],
              ["개인정보침해신고센터", "118", "https://privacy.kisa.or.kr", "privacy.kisa.or.kr"],
              ["대검찰청", "1301", "https://www.spo.go.kr", "www.spo.go.kr"],
              ["경찰청", "182", "https://ecrm.cyber.go.kr", "ecrm.cyber.go.kr"],
            ].map(([name, tel, href, label]) => (
              <li key={name}>
                {name}: (국번없이) {tel} (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={linkClass}
                >
                  {label}
                </a>
                )
              </li>
            ))}
          </ul>
        </Section>

        <Section n={12}>
          <p>
            이 개인정보 처리방침은 {EFFECTIVE_DATE}부터 적용됩니다. 법령, 정책 또는
            보안기술의 변경에 따라 내용이 추가·삭제·수정될 경우 변경 사항을
            시행일 7일 전부터 서비스를 통해 공지합니다.
          </p>
        </Section>
      </article>
    </main>
  );
}
