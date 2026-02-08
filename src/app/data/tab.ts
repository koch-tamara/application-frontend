import { ETabId } from "./tabs";

export class Tab {
  id: ETabId;
  label: string;

  constructor(id: string) {
    const tabId = this.tabIdFromPath(id);
    this.id = tabId;
    this.label = this.pathLabelMapping.get(tabId) ?? '--';
  }

  private tabIdFromPath(path: string): ETabId {
    const values = Object.values(ETabId) as string[];
    if (!values.includes(path)){
      throw new Error("This path doesn't match with the allowed tab ids.")
    }
    return path as ETabId;
  }

  private readonly pathLabelMapping = new Map<ETabId, string>([
    [ETabId.introduction, $localize`:@@tabs.introduction:Vorstellung`],
    [ETabId.experience, $localize`:@@tabs.experience:Erfahrung`],
    [ETabId.education, $localize`:@@tabs.education:Ausbildung`],
    [ETabId.skills, $localize`:@@tabs.skills:Fähigkeiten`],
    [ETabId.documents, $localize`:@@tabs.documents:Dokumente`],
    [ETabId.aboutMe, $localize`:@@tabs.about-me:Über mich`],
    [ETabId.contact, $localize`:@@tabs.contact:Kontakt`]
  ]);
}
