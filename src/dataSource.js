import Home, {
  frontMatter as homeFrontMatter
} from './content/home/homepage.mdx';
import OmNews, {
  frontMatter as omNewsFrontMatter
} from './content/home/omnews.mdx';
import Websites, {
  frontMatter as websiteFrontMatter
} from './content/resources/websites.mdx';
import InternalManuals, {
  frontMatter as interManualsFrontMatter
} from './content/resources/internal-manuals.mdx';
import SoftwareManuals, {
  frontMatter as softManualsFrontMatter
} from './content/resources/software-manuals.mdx';
import Procedures, {
  frontMatter as procedureFrontMatter
} from './content/resources/procedures.mdx';
import Roster, {
  frontMatter as rosterFrontMatter
} from './content/staff/roster.mdx';
import OrgChart, {
  frontMatter as orgChartFrontMatter
} from './content/staff/org-chart.mdx';

// New MDX file needs to be
//   1. Imported and assined a variable starting with a capital letter (above)
//   2. Added as a chapter below (or as starting page content for a tab)
//       First chapter should be to default path

export const Data = {
  tabs: [
    {
      name: 'Home',
      path: '/',
      exact: true,
      component: Home,
      chapters: [{ path: '/home', component: Home }]
    },
    {
      name: 'News',
      path: '/news',
      exact: false,
      chapters: [
        {
          name: 'Recent',
          path: '/recent',
          component: Home,
          mdxFrontMatter: homeFrontMatter
        },
        {
          name: 'Archive',
          path: '/archive',
          component: OmNews,
          mdxFrontMatter: omNewsFrontMatter
        }
      ]
    },
    {
      name: 'Resources',
      path: '/resources',
      exact: false,
      chapters: [
        {
          name: 'Websites & Logins',
          path: '/websites',
          component: Websites,
          mdxFrontMatter: websiteFrontMatter
        },
        {
          name: 'Firm Manuals',
          path: '/firm-manuals',
          component: InternalManuals,
          mdxFrontMatter: interManualsFrontMatter
        },
        {
          name: 'Software Support',
          path: '/software',
          component: SoftwareManuals,
          mdxFrontMatter: softManualsFrontMatter
        },
        {
          name: 'Formal Procedurs',
          path: '/procedures',
          component: Procedures,
          mdxFrontMatter: procedureFrontMatter
        }
      ]
    },
    {
      name: 'Staff',
      path: '/staff',
      exact: false,
      chapters: [
        {
          name: 'Roster',
          path: '/roster',
          component: Roster,
          mdxFrontMatter: rosterFrontMatter
        },
        {
          name: 'Org Chart',
          path: '/org-chart',
          component: OrgChart,
          mdxFrontMatter: orgChartFrontMatter
        }
      ]
    }
  ]
};
