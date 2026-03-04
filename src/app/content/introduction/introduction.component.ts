import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ImageInformation, PageLayout } from 'page-layout';

@Component({
  selector: 'app-introduction',
  imports: [PageLayout, DatePipe],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss',
})
export class IntroductionComponent {

  salutation: string = 'Sehr geehrte Damen und Herren,';
  paragraphs: string[] = [
    'derzeit bin ich als Softwareentwicklerin mit Schwerpunkt auf Angular im Frontend und .NET im Backend tätig. Ich begleite Features von der Anforderungsanalyse bis zum produktiven Einsatz und schätze besonders die Verbindung aus technischer Umsetzung, strukturellem Denken und Teamarbeit. Für einen soliden Einstieg absolvierte ich ein 1,5-jähriges Traineeprogramm in der Full-Stack-Entwicklung.',
    'Mit dieser Bewerbung möchte ich den nächsten Schritt gehen: meine Rolle als Entwicklerin ausbauen, meinen Berufseinstieg hinter mir lassen und – wenn möglich – erste Einblicke in datengetriebene Anwendungen und analytische Entscheidungslogik gewinnen. Mein Bachelorabschluss in Mathematik sowie der geplante Master in Data Science werden mir helfen, Software zu entwickeln, die zuverlässig arbeitet und gleichzeitig datenbasierte Erkenntnisse einbezieht.',
    'Ich arbeite strukturiert, eigenverantwortlich und mit hohem Qualitätsanspruch. Gerne überzeuge ich Sie in einem persönlichen Gespräch, dass ich mein technisches und analytisches Profil gewinnbringend in Ihr Team einbringen kann – und dabei auch Spaß habe.'
  ]
  content: string = this.paragraphs.map(p => '<p>' + p + '</p>').join('');
  greeting: string = 'Mit freundlichen Grüßen';
  logo = {
    path: 'company/logo.png',
    altText: 'logo',
  };
  date = new Date();

  signatureImage: ImageInformation = {
    altText: 'Placeholder',
    path: 'placeholder_vertical.png',
  }

}
