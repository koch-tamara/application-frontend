import { ETabId } from "./enum";

export class Tab {
  id: ETabId;
  label: string;

  constructor(id: string, label?: string) {
    const tabId = this.tabIdFromPath(id);
    this.id = tabId;
    this.label = label ?? '--';
  }

  private tabIdFromPath(path: string): ETabId {
    const values = Object.values(ETabId) as string[];
    if (!values.includes(path)) {
      return ETabId.introduction;
    }
    return path as ETabId;
  }
}