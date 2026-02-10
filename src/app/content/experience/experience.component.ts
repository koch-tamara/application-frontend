import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { ImageInformation, PageLayout } from 'page-layout';
import { TimeLineCreator } from './timeLineCreator';

@Component({
  imports: [PageLayout, NgTemplateOutlet],
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent implements AfterViewInit {
  @ViewChild('timeLineImage') timeLineImage?: ElementRef<HTMLDivElement>;
  signatureImage: ImageInformation = {
    altText: 'Placeholder',
    path: 'placeholder_horizontal.png',
  }

  ngAfterViewInit(): void {
    if (!this.timeLineImage) return;
    new TimeLineCreator(this.timeLineImage, timeLine).drawTimeLine();
  }
}

export interface TimeLineEntry {
  where: Location;
  from: Date,
  to?: Date,
  downloads?: string[],
  label?: string,
  completion?: string,
}

interface Location {
  name: string
  address: string,
}

const timeLine = [
    {
      where: {
        name: "Grabuschnigg",
        address: "Walgaustraße 16, 6833 Klaus"
      },
      label: "Leasing",
      from: new Date("2010-09-01T00:00:00+02:00"),
      to: new Date("2011-05-31T23:59:59+02:00"),
    },
    {
      where: {
        name: "SF Filterdienst GmbH",
        address: "6833 Weiler"
      },
      label: "Sachbearbeiterin",
      from: new Date("2011-06-01T00:00:00+02:00"),
      to: new Date("2011-11-30T23:59:59+02:00")
    },
    {
      where: {
        name: "Grabuschnigg",
        address: "Walgaustraße 16, 6833 Klaus"
      },
      label: "Graveurin",
      from: new Date("2011-12-01T00:00:00+02:00"),
      to: new Date("2016-04-30T00:00:00+02:00")
    },
    {
      where: {
        name: "Escatec Switzerland AG",
        address: "Heinrich-Wild-Strasse 203, 9435 Heerbrugg, Schweiz"
      },
      label: "Produktionsangestellte",
      downloads: ["employee-reference/escatec"],
      from: new Date("2016-05-01T00:00:00+02:00"),
      to: new Date("2019-07-31T00:00:00+02:00")
    },
    {
      where: {
        name: "Escatec Switzerland AG",
        address: "Heinrich-Wild-Strasse 203, 9435 Heerbrugg, Schweiz"
      },
      label: "Ferialjob",
      from: new Date("2020-07-01T00:00:00+02:00"),
      to: new Date("2020-09-31T00:00:00+02:00")
    },
    {
      where: {
        name: "Leica Geosystems AG",
        address: "Heinrich-Wild-Strasse 201, 9435 Heerbrugg, Schweiz"
      },
      label: "Ferialjob - Lager",
      from: new Date("2021-07-01T00:00:00+02:00"),
      to: new Date("2021-09-31T00:00:00+02:00")
    },
    {
      where: {
        "name": "Escatec Switzerland AG",
        "address": "Heinrich-Wild-Strasse 203, 9435 Heerbrugg, Schweiz"
      },
      label: "Ferialjob",
      from: new Date("2022-07-01T00:00:00+02:00"),
      to: new Date("2022-08-15T00:00:00+02:00")
    },
    {
      where: {
        name: "Leica Geosystems AG",
        address: "Heinrich-Wild-Strasse 201, 9435 Heerbrugg, Schweiz"
      },
      label: "Ferialjob - Lager",
      from: new Date("2022-08-16T00:00:00+02:00"),
      to: new Date("2022-09-31T00:00:00+02:00"),
      completion: "DEGREE"
    },
    {
      where: {
        name: "Servus Intralogistics GmbH",
        address: "Dr. Walter Zumtobel Straße 2, 6850 Dornbirn"
      },
      label: "Software Engineer",
      downloads: ["trainee-certificate", "employee-reference/servus"],
      from: new Date("2022-10-03T00:00:00+02:00"),
    }
  ];