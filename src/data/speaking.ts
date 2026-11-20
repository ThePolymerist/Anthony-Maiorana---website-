export interface SpeakingRecord {
  id: string;
  year: number;
  date: string;
  title: string;
  venue: string;
  role: string;
  description: string;
  authors?: string;
  recognition?: string;
  links: { label: string; url: string }[];
}

export const talks: SpeakingRecord[] = [
  {
    id: 'fda-town-hall', year: 2026, date: 'July 22, 2026',
    title: 'Content of Human Factors Information in Medical Device Marketing Submissions, Final Guidance',
    venue: 'FDA / CDRH Public Town Hall', role: 'Co-presenter with Andrea Fiala',
    description: 'Presented practical examples of the risk-based human factors submission framework and answered industry questions about its application to medical-device development and marketing submissions.',
    links: [
      { label: 'Watch the recording', url: 'https://youtu.be/9bbCbeSxWaU' },
      { label: 'FDA event page', url: 'https://www.fda.gov/medical-devices/medical-devices-news-and-events/town-hall-content-human-factors-information-medical-device-marketing-submissions-final-guidance' },
      { label: 'Presentation slides (PDF)', url: 'https://www.fda.gov/media/193939/download' },
      { label: 'Transcript (PDF)', url: 'https://www.fda.gov/media/193938/download' },
    ],
  },
  {
    id: 'diabetes-technology-meeting', year: 2024, date: '2024',
    title: 'How Is the FDA OIVT Evolving to Regulate New Technologies?',
    venue: 'Diabetes Technology Meeting', role: 'Speaker',
    description: 'A conference presentation on the evolving regulation of new technologies in the Office of In Vitro Diagnostics.',
    links: [],
  },
  {
    id: 'cpi-polyols', year: 2018, date: 'October 1–3, 2018',
    title: 'Novel Nitrogen Containing Aromatic Polyols for Rigid Polyurethane Foams',
    venue: '61st Polyurethanes Technical Conference · Atlanta, Georgia', role: 'Presenter & coauthor',
    description: 'Industrial materials research on aromatic polyols for rigid polyurethane foams.',
    authors: 'G. S. Viswanathan; A. Maiorana; P. Kukkala; V. Malhotra; I. Sendijarevic',
    recognition: 'Best Technical Paper · Chemistry and Fundamentals, CPI 2018',
    links: [{ label: 'Professional profile & award', url: 'https://www.linkedin.com/in/tonymaiorana/' }],
  },
  {
    id: 'acs-ferulic-thermosets', year: 2016, date: 'March 13–17, 2016',
    title: 'Degradable Ferulic Acid Based Epoxy Thermosets',
    venue: 'ACS National Meeting · San Diego, California · Division of Polymer Chemistry', role: 'Poster presenter',
    description: 'Graduate research on biobased epoxy thermosets, presented in the Excellence in Graduate Polymer Research symposium.',
    links: [{ label: 'ACS symposium program', url: 'https://polyacs.org/wp-content/uploads/2018/07/2016-Spring-Natl-ACS-meeting.pdf' }],
  },
];

export const proceedings: SpeakingRecord[] = [
  {
    id: 'acs-epoxy-design', year: 2017, date: '2017',
    title: 'Bio-Based Epoxy Resins: Design, Structure and Properties',
    venue: 'ACS Fall National Meeting · POLY 559', role: 'Coauthor · Conference abstract',
    description: 'Research on renewable epoxy building blocks and tuning resin viscosity, toughness, and thermomechanical performance.',
    authors: 'A. Maiorana; S. Spinella; R. A. Gross',
    links: [{ label: 'ACS graphical abstract (PDF)', url: 'https://polyacs.org/wp-content/uploads/2021/07/2017-Fall-Graphical-Abstracts.pdf' }],
  },
  {
    id: 'pps-optoelectronics', year: 2016, date: 'July 25–29, 2016',
    title: 'Biobased Materials for Optoelectronics',
    venue: '32nd International Conference of the Polymer Processing Society · Lyon, France', role: 'Coauthor · Conference contribution',
    description: 'Collaborative research contribution on biobased materials for optoelectronics.',
    authors: 'N. Dawson; K. Singer; R. Gross; A. Maiorana; F. Liu; S. Spinella; M. McMaster; K. Peters; M. Ibrahim; S. Mekala',
    links: [{ label: 'Coauthor’s conference record (PDF)', url: 'https://www.hpu.edu/faculty/cv/cncs-faculty/nathan-dawson.pdf' }],
  },
  {
    id: 'spie-cellulose', year: 2015, date: '2015',
    title: 'Optical Properties of Cellulose Nanocrystals Decorated with Silver Nanospheres',
    venue: 'Proceedings of SPIE · Volume 9564, 956406', role: 'Coauthor · Published conference proceedings',
    description: 'Research on optical interactions in silver-decorated cellulose nanocrystals and their potential use in organic photovoltaic devices.',
    authors: 'N. J. Dawson; K. C. Peters; S. Spinella; A. Maiorana; R. A. Gross; K. D. Singer',
    links: [{ label: 'Proceedings · DOI: 10.1117/12.2187312', url: 'https://doi.org/10.1117/12.2187312' }],
  },
  {
    id: 'acs-bpa-replacements', year: 2014, date: 'August 10–14, 2014',
    title: 'Biobased Replacements of Bisphenol A Epoxy Resins',
    venue: '248th ACS National Meeting · San Francisco, California · POLY 741', role: 'First author · Conference abstract',
    description: 'Research on renewable alternatives to bisphenol A for epoxy thermosets.',
    authors: 'A. Maiorana; S. Spinella; R. A. Gross',
    links: [{ label: 'ACS graphical abstract (PDF)', url: 'https://polyacs.org/wp-content/uploads/2021/07/2014-Fall-Graphical-Abstracts.pdf' }],
  },
  {
    id: 'acs-cellulose-san-francisco', year: 2014, date: '2014',
    title: 'Cellulose Nanocrystals Decorated with Free Carboxylic Acids by One Step Hydrolysis/Fischer Esterification Reactions',
    venue: '248th ACS National Meeting · San Francisco, California · Abstracts of Papers of the American Chemical Society, 248', role: 'Coauthor · Conference abstract',
    description: 'Collaborative research on cellulose nanocrystal surface modification.',
    authors: 'S. M. Spinella; A. Maiorana; G. Lo Re; J.-M. Raquez; P. Dubois; R. A. Gross',
    links: [{ label: 'University conference record', url: 'https://publications.polymtl.ca/72435/' }],
  },
  {
    id: 'bpg-cellulose', year: 2014, date: 'May 2014',
    title: 'One Step Hydrolysis/Fischer Esterification Reactions to Decorate Cellulose Nanocrystals with Free Carboxylic Acids',
    venue: 'Belgian Polymer Group Annual Meeting · Ghent, Belgium', role: 'Coauthor · Conference poster',
    description: 'Collaborative research on cellulose nanocrystal surface modification.',
    authors: 'S. Spinella; G. Lo Re; A. Maiorana; J.-M. Raquez; P. Dubois; R. A. Gross',
    links: [{ label: 'University conference record', url: 'https://publications.polymtl.ca/72722/' }],
  },
  {
    id: 'acs-cellulose-dallas', year: 2014, date: 'March 2014',
    title: 'Cellulose Nanocrystals Decorated with Free Carboxylic Acids by One Step Hydrolysis/Fischer Esterification Reactions',
    venue: '247th ACS National Meeting · Dallas, Texas', role: 'Coauthor · Conference poster',
    description: 'Collaborative research on cellulose nanocrystal surface modification.',
    authors: 'S. Spinella; A. Maiorana; G. Lo Re; J.-M. Raquez; P. Dubois; R. A. Gross',
    links: [{ label: 'University conference record', url: 'https://publications.polymtl.ca/72724/' }],
  },
];
