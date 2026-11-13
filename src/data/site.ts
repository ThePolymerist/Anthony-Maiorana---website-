export const site = {
  name: 'Anthony Maiorana',
  familiarName: 'Tony',
  url: 'https://anthonymaiorana.com',
  description: 'The personal workshop of Anthony Maiorana, PhD. Chemistry, medical devices, The Polymerist, and experiments in building useful things.',
  email: 'tonym87@gmail.com',
  location: 'Washington, DC',
  linkedin: 'https://www.linkedin.com/in/tonymaiorana/',
  github: 'https://github.com/ThePolymerist',
  repository: 'https://github.com/ThePolymerist/Anthony-Maiorana---website-',
  polymerist: 'https://polymerist.substack.com',
  leanLab: 'https://polymerist.substack.com/p/the-lean-lab',
};

export const navigation = [
  { href: '/about/', label: 'About' },
  { href: '/writing/', label: 'Writing' },
  { href: '/publications/', label: 'Publications' },
  { href: '/projects/', label: 'Projects' },
  { href: '/contact/', label: 'Contact' },
];

export function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(new Date(value));
}
