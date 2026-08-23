import { arrayOrganisasi } from "../../data/pengalaman";
import OrganisasiClient from "./PengalamanClient";

export const metadata = {
  title: "Organisasi | Putri",
  description:
    "Kegiatan organisasi dan pengalaman kepanitiaan Ulil Naumi Putri selama bersekolah di SMK Telkom Malang.",
};

export default function OrganisasiPage() {
  return <OrganisasiClient items={arrayOrganisasi} />;
}
