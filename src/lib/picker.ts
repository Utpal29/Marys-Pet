// "What does my pet need?" logic: turns a few taps into a suggested service and a ready-to-send text.

export type Kind = 'dog' | 'cat';
export type Size = 'tiny' | 'medium' | 'big';
export type Coat = 'short' | 'long';
export type Need = 'tidy' | 'haircut' | 'matted' | 'shedding' | 'nails' | 'bath';

export interface Answers {
  kind?: Kind;
  size?: Size;
  coat?: Coat;
  need?: Need;
  name?: string;
  first?: boolean;
}

export interface Suggestion {
  title: string;
  text: string;
  extras: string[];
}

const SUGGESTIONS: Record<Need, Suggestion> = {
  tidy: {
    title: 'Bath and brush-out',
    text: 'A proper wash, dry and brush, plus a face and feet tidy so they look sharp again.',
    extras: ['Nail trim', 'Ear care'],
  },
  bath: {
    title: 'Bath and brush-out',
    text: 'A gentle wash and a thorough brush so their coat is soft and tangle-free.',
    extras: ['Nail trim'],
  },
  haircut: {
    title: 'Haircut and styling',
    text: 'A full haircut or breed trim, with a bath and brush-out first.',
    extras: ['Nail trim', 'Ear care'],
  },
  matted: {
    title: 'Mat removal',
    text: 'Gentle work on tangles and mats. Mention how bad it is in your text so Mary can plan the right amount of time.',
    extras: ['Bath and brush-out'],
  },
  shedding: {
    title: 'Deshedding',
    text: 'Loose undercoat brushed and blown out, so less of it ends up on your couch.',
    extras: ['Bath and brush-out'],
  },
  nails: {
    title: 'Nail trim',
    text: "A quick in-and-out, even for pets who won't let you near their paws at home.",
    extras: [],
  },
};

export function isComplete(a: Answers): boolean {
  if (!a.kind || !a.need) return false;
  return a.kind === 'dog' ? Boolean(a.size) : Boolean(a.coat);
}

export function suggest(a: Answers): Suggestion | null {
  if (!isComplete(a) || !a.need) return null;
  const base = SUGGESTIONS[a.need];
  if (!a.first) return base;
  return {
    ...base,
    text:`${base.text} Since it's their first time, Mary will take it slow so they learn grooming isn't scary.`,
  };
}

const SIZE_WORDS: Record<Size, string> = {
  tiny: 'tiny',
  medium: 'medium-sized',
  big: 'big fluffy',
};

const NEED_PHRASES: Record<Need, string> = {
  tidy: 'They just need a bath and a tidy-up.',
  bath: 'They need a bath and brush-out.',
  haircut: "They're due for a haircut.",
  matted: 'Their coat is pretty matted.',
  shedding: "They're shedding everywhere.",
  nails: 'Just a nail trim, please.',
};

export function smsMessage(a: Answers): string {
  if (!isComplete(a) || !a.kind || !a.need) return '';
  const describe =
    a.kind === 'dog' && a.size
      ? `${SIZE_WORDS[a.size]} dog`
      : `${a.coat === 'long' ? 'long-haired' : 'short-haired'} cat`;
  const name = a.name?.trim();
  const who = name ? `${name}, my ${describe}` : `my ${describe}`;
  const parts = [`Hi Mary! I'd like to book a groom for ${who}.`, NEED_PHRASES[a.need]];
  if (a.first) parts.push("It's their first groom ever.");
  parts.push("When's your next opening?");
  return parts.join(' ');
}

/** `?&body=` works on both iOS and Android. */
export function smsHref(phoneSms: string, message: string): string {
  return `${phoneSms}?&body=${encodeURIComponent(message)}`;
}
