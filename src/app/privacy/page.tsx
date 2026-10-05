import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import content from "@/content/content.json";

export const metadata: Metadata = {
  title: "개인정보 처리방침",
  description: "그룹비 광고주 성과 보고 대시보드의 개인정보 처리방침과 데이터 삭제 요청 방법",
  alternates: { canonical: "/privacy" },
};

// Meta 앱(GroupB Site Dashboard) 운영 모드 전환에 필요한 공개 처리방침 URL.
// 데이터 삭제 안내 URL 은 이 페이지의 #data-deletion 이다.
// ⚠️ 표준 초안 — 사업자 정보(content.json company.legal 의 ▢)를 채우기 전에는 배포하지 않는다.
//    배포 전 법무 검토를 권장한다.
const UPDATED = "2026-10-05";

export default function PrivacyPolicyPage() {
  const c = content.company;
  const legal = c.legal;
  const tradeName = legal.trade_name === "▢" ? `${c.name_ko}(${c.name_en})` : legal.trade_name;

  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <article className="text-[15px] leading-7 text-text-default [&_h2]:mt-12 [&_h2]:scroll-mt-24 [&_h2]:text-lg [&_h2]:font-bold [&_h2]:text-text-strong [&_li]:mt-1.5 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
        <h1 className="text-3xl font-black tracking-[-0.03em] text-text-strong sm:text-4xl">
          개인정보 처리방침
        </h1>
        <p className="!mt-3 text-sm text-text-subtle">시행일 {UPDATED}</p>

        <p className="!mt-8">
          {tradeName}(이하 &ldquo;회사&rdquo;)는 광고주에게 제공하는 성과 보고 대시보드(ads.grb-mkt.com, 이하
          &ldquo;서비스&rdquo;)를 운영하면서 「개인정보 보호법」 등 관련 법령에 따라 정보주체의 개인정보를
          처리·보호합니다. 이 방침은 서비스가 어떤 정보를 어떤 목적으로 처리하고 어떻게 보호하는지 설명합니다.
        </p>

        <h2 id="items">1. 처리하는 정보</h2>
        <ul>
          <li>
            <b>서비스 이용 계정</b> — 아이디, 비밀번호(복원할 수 없는 방식으로 암호화해 저장), 이름, 이메일, 전화번호,
            회사명. 광고주 담당자가 가입할 때 직접 입력합니다.
          </li>
          <li>
            <b>Meta(Facebook·Instagram) 연동 데이터</b> — 광고주가 Meta 비즈니스 파트너 권한으로 회사에 공유한
            Facebook 페이지와 Instagram 비즈니스 계정의 게시물 정보(본문 일부·게시일·게시물 링크·유형)와 성과
            집계 수치(도달·조회·좋아요·댓글·저장·공유 수), 팔로워 수. 모두 계정·게시물 단위의 집계값이며, 게시물을
            본 개별 이용자를 식별하는 정보는 받지 않습니다.
          </li>
          <li>
            <b>자동으로 생성되는 정보</b> — 로그인 상태 유지를 위한 세션 쿠키, 서비스 운영 서버의 접속 기록.
          </li>
        </ul>

        <h2 id="purpose">2. 처리 목적</h2>
        <ul>
          <li>광고주에게 Facebook·Instagram 게시물 성과와 팔로워 추이를 보고하기 위해</li>
          <li>서비스 이용 계정의 확인·관리와 접근 권한 통제를 위해</li>
        </ul>
        <p>회사는 위 목적 외에 정보를 이용하지 않으며, 광고 타기팅이나 제3자 판매에 쓰지 않습니다.</p>

        <h2 id="retention">3. 보유 기간</h2>
        <ul>
          <li>
            <b>Meta 게시물 정보·성과 수치</b> — 저장하지 않습니다. 대시보드 화면을 볼 때 Meta에서 조회하고, 속도를
            위해 최대 1시간 임시 보관한 뒤 지웁니다.
          </li>
          <li>
            <b>팔로워 수 일별 기록</b> — 추이를 보여주기 위해 하루 1번 저장하며, 광고주와의 계약이 끝나거나 삭제를
            요청받으면 지체 없이 파기합니다.
          </li>
          <li>
            <b>서비스 이용 계정</b> — 계정 삭제를 요청하거나 계약이 끝날 때까지 보유하고, 이후 지체 없이 파기합니다.
            법령에 따라 보존해야 하는 정보는 그 기간 동안 보관합니다.
          </li>
        </ul>

        <h2 id="third-party">4. 제3자 제공</h2>
        <p>회사는 정보주체의 개인정보를 제3자에게 제공하지 않습니다. 법령에 특별한 규정이 있는 경우는 예외로 합니다.</p>

        <h2 id="outsourcing">5. 처리 위탁과 국외 이전</h2>
        <p>서비스 운영을 위해 아래와 같이 처리를 위탁하며, 위탁받는 회사의 서버는 국외(미국)에 있습니다.</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[34rem] border-collapse text-sm">
            <thead>
              <tr className="border-b border-border text-left text-text-strong">
                <th className="py-2 pr-3 font-semibold">받는 자</th>
                <th className="py-2 pr-3 font-semibold">위탁 업무</th>
                <th className="py-2 pr-3 font-semibold">이전 국가·방법</th>
                <th className="py-2 font-semibold">이전 항목</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/70 align-middle">
                <td className="py-2 pr-3">Vercel Inc.</td>
                <td className="py-2 pr-3">서비스 호스팅·운영</td>
                <td className="py-2 pr-3">미국 · 서비스 이용 시 네트워크로 전송</td>
                <td className="py-2">1항의 정보 전체</td>
              </tr>
              <tr className="border-b border-border/70 align-middle">
                <td className="py-2 pr-3">Neon Inc.</td>
                <td className="py-2 pr-3">데이터베이스 보관</td>
                <td className="py-2 pr-3">미국 · 저장 시 네트워크로 전송</td>
                <td className="py-2">이용 계정, 팔로워 수 일별 기록</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>보유 기간은 3항과 같습니다. 국외 이전을 원하지 않으면 서비스 이용 계정 삭제를 요청할 수 있습니다.</p>

        <h2 id="data-deletion">6. 데이터 삭제 요청 방법</h2>
        <p>
          서비스는 Facebook 로그인으로 개인 이용자의 정보를 받지 않습니다. 광고주(페이지·Instagram 계정 소유
          비즈니스)는 아래 방법으로 연동 데이터 삭제를 요청할 수 있습니다.
        </p>
        <ol>
          <li>
            <b>조회 중단</b> — Meta 비즈니스 설정 → 파트너에서 회사({c.name_en})에 공유한 페이지·Instagram 계정
            권한을 회수하면 그 즉시 서비스의 조회가 멈춥니다.
          </li>
          <li>
            <b>저장된 기록 삭제</b> — <a className="font-semibold text-primary-strong underline underline-offset-2" href={`mailto:${c.email}?subject=${encodeURIComponent("[데이터 삭제 요청]")}`}>{c.email}</a>
            로 비즈니스명과 페이지·Instagram 계정을 적어 보내면, 저장된 팔로워 수 기록과 관련 이용 계정을 7일 안에
            삭제하고 결과를 회신합니다.
          </li>
        </ol>

        <h2 id="destruction">7. 파기 절차와 방법</h2>
        <p>
          보유 기간이 지나거나 처리 목적을 이룬 정보는 지체 없이 파기합니다. 전자 파일은 복구할 수 없는 방법으로
          삭제합니다.
        </p>

        <h2 id="rights">8. 정보주체의 권리</h2>
        <p>
          정보주체는 언제든지 자신의 개인정보 열람·정정·삭제·처리 정지를 요청할 수 있습니다. 아래 연락처로
          요청하면 지체 없이 조치하고 결과를 알려 드립니다.
        </p>

        <h2 id="security">9. 안전성 확보 조치</h2>
        <ul>
          <li>비밀번호 암호화 저장, 전 구간 암호화 통신(HTTPS)</li>
          <li>권한에 따른 접근 통제 — 광고주는 자기 브랜드 데이터만 볼 수 있습니다</li>
          <li>Meta 연동은 읽기 전용 권한만 사용하며, 연동 토큰은 서버에만 보관합니다</li>
        </ul>

        <h2 id="officer">10. 개인정보 보호책임자</h2>
        <ul>
          <li>보호책임자: {legal.privacy_officer}</li>
          <li>
            연락처:{" "}
            <a className="font-semibold text-primary-strong underline underline-offset-2" href={`mailto:${c.email}`}>
              {c.email}
            </a>{" "}
            · {c.phone}
          </li>
        </ul>
        <p>
          개인정보 침해에 관한 상담은 개인정보침해신고센터(국번 없이 118, privacy.kisa.or.kr)나
          개인정보분쟁조정위원회(1833-6972, www.kopico.go.kr)에도 할 수 있습니다.
        </p>

        <h2 id="business">11. 사업자 정보</h2>
        <ul>
          <li>상호: {legal.trade_name}</li>
          <li>대표자: {legal.ceo}</li>
          <li>사업자등록번호: {legal.biz_no}</li>
          <li>주소: {legal.address}</li>
        </ul>

        <h2 id="changes">12. 방침의 변경</h2>
        <p>이 방침을 바꾸면 시행 7일 전부터 이 페이지에 알립니다.</p>
      </article>
    </Container>
  );
}
