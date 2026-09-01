import { Localized } from "shared-models";

export class Event {
  where: Place;
  from: Date;
  to?: Date;
  downloads?: DownloadInformation[];
  label?: string;
  completion?: string;

  constructor(
    where: Place,
    from: Date,
    to?: Date,
    downloads?: DownloadInformation[],
    label?: string,
    completion?: string) {
    this.where = where;
    this.from = from;
    this.to = to;
    this.downloads = downloads;
    this.label = label;
    this.completion = completion;
  }
}

export class Place {
  name: string;
  address: string;

  constructor(name: string, address: string) {
    this.name = name;
    this.address = address;
  }
}

export interface DownloadInformation {
  path: string,
  label: Localized<string>
}