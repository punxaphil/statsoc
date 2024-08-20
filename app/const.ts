import { Category } from '@/app/types';

export const categories: Category[] = [
  {
    type: 'Spelbarhet',
    name: 'Antal erbjudna alternativ',
    description: 'Registrera när en spelare aktivt söker att skapa sig som ett passningsalternativ, även om hon inte får bollen.',
  },
  {
    type: 'Spelbarhet',
    name: 'Antal mottagna passningar',
    description: 'Notera varje gång en spelare tar emot en passning efter att ha gjort sig spelbar.',
  },
  {
    type: 'Speldjup',
    name: 'Antal djupledslöpningar',
    description: 'Mät antalet löpningar i djupled, oavsett om bollen spelas till dem eller inte.',
  },
  {
    type: 'Speldjup',
    name: 'Antal passningar i djupled',
    description: 'Räkna passningar som slås i djupled.',
  },
  {
    type: 'Spelbredd',
    name: 'Antal kantbyten',
    description: 'Notera varje gång bollen flyttas från en kant till den andra.',
  },
  {
    type: 'Spelavstånd',
    name: 'Antal spel till ny yta',
    description: 'Räkna antalet gånger spelet flyttas till en ny yta för att öppna upp försvar och skapa nya anfallsmöjligheter.',
  },
  {
    type: 'Spelavstånd',
    name: 'Avstånd till spelare 1 och 2',
    description: 'Notera i efterhand spelares specifika avstånd till sina lagkamrater vid specifika tidpunkter i matchen.',
  },
  {
    type: 'Specifika delar i spelet',
    name: 'Tacklingar/dueller',
    description: 'Registrera varje gång en spelare går in i en närkamp eller bryter en passning.',
  },
  {
    type: 'Specifika delar i spelet',
    name: 'Brytningar',
    description: 'Registrera varje gång en spelare bryter en passning.',
  },
  {
    type: 'Specifika delar i spelet',
    name: 'Återerövring',
    description: 'Räkna hur ofta laget eller individen återerövrar bollen inom 5 sekunder efter att ha förlorat den.',
  },
  {
    type: 'Specifika delar i spelet',
    name: 'Skott i zon 1 & 2',
    description: 'Notera antalet skott som tas i farliga zoner.',
  },
  {
    type: 'Specifika delar i spelet',
    name: 'Inlägg',
    description: 'Räkna antalet inlägg och analysera deras effektivitet.',
  },
  {
    type: 'Specifika delar i spelet',
    name: 'Först på bollen vid hörnor',
    description: 'Registrera när laget är först på bollen vid hörnor.',
  },
  {
    type: 'Specifika delar i spelet',
    name: 'Överlapp',
    description: 'Räkna antalet överlappande löpningar.',
  },
  {
    type: 'Specifika delar i spelet',
    name: 'Vunna och förlorade 1v1-situationer (bollförande)',
    description: 'Mät antalet vunna och förlorade 1v1-situationer.',
  },
  {
    type: 'Specifika delar i spelet',
    name: 'Nick',
    description: 'Räkna antalet nickar för att bedöma förmågan att hantera höjdbollar.',
  },
  {
    type: 'Specifika delar i spelet',
    name: 'Framgångsrika och misslyckade passningar',
    description: 'Mät passningssäkerheten genom att notera framgångsrika och misslyckade passningar.',
  },
  {
    type: 'Specifika delar i spelet',
    name: 'Passningar som satte lagkamrat i problem',
    description: 'Registrera passningar som sätter medspelare i svåra situationer.',
  },
];

export const names = ['Anna', 'Peter', 'John', 'Kent', 'Johnny', 'Sven', 'Lisa', 'Maja'];

export const colors = ['gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink'];
