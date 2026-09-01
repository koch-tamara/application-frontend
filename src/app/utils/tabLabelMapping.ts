import { ETabId } from "../../../projects/page-layout/src/public-api";

export const tabLabelMapping = new Map<ETabId, string>([
  [ETabId.introduction, $localize`:@@tabs.introduction:Vorstellung`],
  [ETabId.experience, $localize`:@@tabs.experience:Erfahrung`],
  [ETabId.education, $localize`:@@tabs.education:Ausbildung`],
  [ETabId.skills, $localize`:@@tabs.skills:Fähigkeiten`],
  [ETabId.documents, $localize`:@@tabs.documents:Dokumente`],
  [ETabId.contact, $localize`:@@tabs.contact:Kontakt`]
]);