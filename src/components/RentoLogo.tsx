import Image from "next/image";
import lightLogo from "@/src/assets/img/rento-logo-light.png";
import darkLogo from "@/src/assets/img/rento-logo-dark.png";

export default function RentoLogo({
  background = "light",
  className = "w-40",
}: {
  background?: "light" | "dark";
  className?: string;
}) {
  return (
    <Image
      src={background === "dark" ? darkLogo : lightLogo}
      alt="RENTO"
      width={176}
      className={`block h-auto ${className}`}
    />
  );
}
