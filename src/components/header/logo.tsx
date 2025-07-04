import { company_name } from "@/lib/constants";
import Image from "next/image";
export default function Logo() {
  return (
    <Image src="/space-x-logo.svg" alt={company_name} width={250} height={30} />
  );
}
