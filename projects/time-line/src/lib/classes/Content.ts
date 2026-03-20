import { DownloadInformation } from "./DownloadInformation";
import { Place } from "./Place";

export class Content {
  where: Place;
  from: Date;
  to?: Date;
  downloads?: DownloadInformation[];
  label?: string;
  completion?: string;

  constructor(where: Place, from: Date, to?: Date, downloads?: DownloadInformation[], label?: string, completion?: string) {
    this.where = where;
    this.from = from;
    this.to = to;
    this.downloads = downloads;
    this.label = label;
    this.completion = completion;
  }
}