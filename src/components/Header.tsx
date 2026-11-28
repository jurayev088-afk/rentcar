import Header2 from "./Header2";

export default function Header() {
  return (
    <header
      id="home"
      className="relative z-[1] isolate min-h-[311px] bg-[linear-gradient(#e7e8ec_60%,#adb6bf)] max-[860px]:min-h-0 max-[860px]:pb-[clamp(16px,2.5vw,32px)] max-[600px]:bg-[#e5e8ec] max-[600px]:pb-0 lg:min-h-[calc(clamp(378px,36.9vw,561px)-clamp(67px,6.54vw,91px))]"
    >
      <div
        className="rent-hero-art pointer-events-none absolute inset-x-0 -top-[67px] z-[-1] h-[378px] max-[600px]:hidden lg:top-[calc(-1*clamp(67px,6.54vw,91px))]"
        aria-hidden="true"
      />
      <Header2 />
    </header>
  );
}
