// Everything Mary might want changed lives here: contact info, hours, copy and photos.
// Photos are Unsplash placeholders (by ID) until we get Mary's own.

export const business = {
  name: "Mary's Pet Grooming Studio",
  shortName: "Mary's",
  phone: '905-807-3453',
  phoneHref: 'tel:+19058073453',
  smsHref: 'sms:+19058073453',
  street: '895 Main St E',
  city: 'Hamilton',
  region: 'ON',
  postal: 'L8M 1M4',
  rating: 4.9,
  reviewCount: 56,
  formerly: "Jake's Grooming Studio",
  mapsSearch:
    'https://www.google.com/maps/search/?api=1&query=Mary%27s+Pet+Grooming+Studio+895+Main+St+E+Hamilton',
  mapsDirections:
    'https://www.google.com/maps/dir/?api=1&destination=Mary%27s+Pet+Grooming+Studio+895+Main+St+E+Hamilton',
  mapsEmbed:
    'https://www.google.com/maps?q=Mary%27s+Pet+Grooming+Studio,+895+Main+St+E,+Hamilton,+ON&output=embed',
};

/** Minutes after midnight in Hamilton (America/Toronto). `null` = closed. Index 0 is Sunday. */
export const hours: ({ open: number; close: number } | null)[] = [
  null,
  { open: 540, close: 900 },
  { open: 540, close: 900 },
  { open: 540, close: 900 },
  { open: 540, close: 900 },
  { open: 540, close: 900 },
  { open: 540, close: 1020 },
];

export type Photo = { id: string; alt: string };

export const photos = {
  heroMain: { id: '1611173622933-91942d394b04', alt: 'Freshly bathed Pomeranian wrapped in a pink towel' },
  heroSecond: { id: '1733964659477-35534815c626', alt: 'Small white dog bundled up in a towel after a bath' },
  haircut: { id: '1719464454959-9cf304ef4774', alt: 'Small white dog getting a scissor trim' },
  puppy: { id: '1610866443075-9188b628003c', alt: 'Shih Tzu puppy looking up at the camera' },
  catGroom: { id: '1780732659746-8c2276f3ddc6', alt: 'Tortoiseshell cat being gently brushed on a blanket' },
  meetMary: { id: '1541384805307-b06ce5b161ef', alt: 'Groomer in a yellow cardigan holding a poodle puppy' },
} satisfies Record<string, Photo>;

export const gallery: (Photo & { caption: string })[] = [
  { id: '1781805330276-14c4c1bfaa4b', alt: 'Happy Shih Tzu wearing a blue bow tie', caption: 'Bow-tiful' },
  { id: '1647002380358-fc70ed2f04e0', alt: 'Dog sitting in a bathtub next to a blue towel', caption: 'Bath time!' },
  { id: '1625277743460-43716b93507a', alt: 'Black poodle with a neat trim', caption: 'Poodle perfection' },
  { id: '1727510190155-51abda425a82', alt: 'Dog being blow-dried after a bath', caption: 'Blow-dry day' },
  { id: '1669538465657-b6fb9d93b1df', alt: 'Two corgis wearing red bow ties', caption: 'Double trouble' },
  { id: '1616032776175-77c09e280ad8', alt: 'Yorkshire terrier puppy', caption: 'First groom jitters' },
  { id: '1678153188688-0dc45722708a', alt: 'Small dog in a green bandana after a groom', caption: 'Bandana ready' },
  { id: '1460572894071-bde5697f7197', alt: 'Fluffy grey Himalayan cat on a red blanket', caption: 'Cats welcome' },
];

export const beforeAfter = [
  {
    label: 'Shaggy face',
    before: { id: '1779628048010-a51015926c50', alt: 'Before: shaggy dog with hair falling over its eyes' },
    after: { id: '1627813274558-7d0872d783ed', alt: 'After: white dog with a tidy face and clear eyes' },
  },
  {
    label: 'Overgrown coat',
    before: { id: '1779627795019-06eb024c5b61', alt: 'Before: white dog with long fur covering its eyes' },
    after: { id: '1635433600433-843e8128d66a', alt: 'After: freshly trimmed white dog licking its lips' },
  },
];

export const reviews = {
  featured: {
    quote: 'She fit him in same day and performed a miracle on him.',
    cite: "Gizmo's owner, after a home haircut went wrong",
  },
  list: [
    {
      quote: 'Less than an hour my Jade was back to being her beautiful self.',
      who: "Jade's owner",
      pet: 'long-haired cat',
      photo: { id: '1585137173132-cf49e10ad27d', alt: '' },
    },
    {
      quote: 'Mary by far exceeded my expectations and relieved my anxiety.',
      who: "Stanley's owner",
      pet: "Yorkie's first groom",
      photo: { id: '1629030502047-b6ac6d4a78b6', alt: '' },
    },
    {
      quote: 'Always comes home so soft, handsome and comfortable!',
      who: 'Bernese/Pyrenees owner',
      pet: 'big fluffy regular',
      photo: { id: '1621913460519-d357b2a435ca', alt: '' },
    },
    {
      quote: '10/10 customer service.',
      who: 'Standard Poodle owner',
      pet: 'poodle parent',
      photo: { id: '1614261812340-5ee9a3ed33a3', alt: '' },
    },
  ],
};

export type IconName =
  | 'scissors' | 'bath' | 'brush' | 'comb' | 'nails' | 'puppy' | 'ear' | 'bolt';

export const services: { title: string; text: string; icon: IconName; photo?: Photo }[] = [
  {
    title: 'Haircuts and styling',
    text: 'Breed trims, face and feet tidy-ups, and full haircuts for poodles, doodles, Shih Tzus and more.',
    icon: 'scissors',
    photo: photos.haircut,
  },
  { title: 'Bath and brush-out', text: 'A proper wash, dry and brush so they come home clean and fluffy.', icon: 'bath' },
  { title: 'Deshedding', text: 'For double coats that shed everywhere, especially at the change of season.', icon: 'brush' },
  { title: 'Mat removal', text: 'Gentle work on tangled, matted coats for dogs and long-haired cats.', icon: 'comb' },
  { title: 'Nail trims', text: "Quick trims for dogs and cats, including the ones that won't let you try at home.", icon: 'nails' },
  {
    title: 'First puppy grooms',
    text: "A calm first visit so young pups learn grooming isn't scary.",
    icon: 'puppy',
    photo: photos.puppy,
  },
  { title: 'Ear care', text: 'Ear cleaning and inner ear hair plucking.', icon: 'ear' },
  { title: 'Last-minute fixes', text: 'Home haircut gone wrong? Call and ask about same-day openings.', icon: 'bolt' },
];

export const steps = [
  { title: 'Call or text', text: "Tell Mary about your pet's breed, coat and anything she should know." },
  { title: 'Drop off', text: `Bring them to ${business.street} at your appointment time.` },
  { title: 'Pick up a happy pet', text: 'Clean, soft, tidy, and usually pretty pleased with themselves.' },
];

export const faqs = [
  { q: 'Do you groom cats?', a: 'Yes. Mary grooms cats as well as dogs, including nail trims and mat removal for long-haired cats.' },
  { q: "My dog's coat is badly matted. Can you help?", a: 'Yes. Mary works on matted and double coats regularly. Call so she can hear about the coat before your visit.' },
  { q: 'My dog is nervous. Is this a good place for them?', a: 'Grooms are one-on-one, and reviews often mention how calm anxious and first-time pets are with Mary.' },
  { q: 'Can I get a same-day appointment?', a: 'Sometimes. Call and ask. Mary has fit in last-minute fixes before when her schedule allows.' },
  { q: 'How much does a groom cost?', a: "It depends on size, coat and condition. Call or text with your pet's breed for a quote." },
];
