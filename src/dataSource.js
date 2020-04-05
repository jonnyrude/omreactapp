import Home, {
  frontMatter as homeFrontMatter
} from './content/home/homepage.mdx';
import OmNews, {
  frontMatter as omNewsFrontMatter
} from './content/news/omnews.mdx';
import Websites, {
  frontMatter as websiteFrontMatter
} from './content/resources/WebsitesAndLogins.mdx';
import PCLawIntoLawBase, {
  frontMatter as PCLawIntoLBFrontmatter
} from './content/LawBase/PCLawIntoLawBase.mdx';
import ConflictCheck, {
  frontMatter as ConflictCheckFrontmatter
} from './content/processes/ConflictCheck.mdx';
import SettlementCheck, {
  frontMatter as SettleCheckFrontmatter
} from './content/processes/SettlmentCheck.mdx';
import WebsitesAndLogins, {
  frontMatter as WebLoginFrontmatter
} from './content/resources/WebsitesAndLogins.mdx';
import CallForwarding, {
  frontMatter as CallFwdFrontMatter
} from './content/buildingandequipment/CallForwarding/CallForwarding.mdx';
// import , {
//   frontMatter as
// } from './content/.mdx'
// import , {
//   frontMatter as
// } from './content/.mdx'
// import , {
//   frontMatter as
// } from './content/.mdx'
// import , {
//   frontMatter as
// } from './content/.mdx'

// New MDX file needs to be
//   1. Imported and assinged a variable starting with a capital letter (above)
//   2. Added as a chapter below (or as starting page content for a tab)
//       First chapter will be default of the tab

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
        }
      ]
    },
    {
      name: 'Processes',
      path: '/processes',
      exact: false,
      chapters: [
        {
          name: 'Conflict Check',
          path: '/conflict-check',
          component: ConflictCheck,
          mdxFrontMatter: ConflictCheckFrontmatter
        },
        {
          name: 'Settlement Check',
          path: '/settlement-check',
          component: SettlementCheck,
          mdxFrontMatter: SettleCheckFrontmatter
        }
      ]
    },
    {
      name: 'IT & Software',
      path: '/technology',
      exact: false,
      chapters: [{ path: '/home', component: Home }]
    },
    {
      name: 'HR & Benefits',
      path: '/hr',
      exact: false,
      chapters: [{ path: '/home', component: Home }]
    },
    {
      name: 'LawBase',
      path: '/lawbase',
      exact: false,
      chapters: [
        {
          name: 'PC Law Data into LawBase',
          path: '/pc-law-to-lawbase',
          component: PCLawIntoLawBase,
          mdxFrontMatter: PCLawIntoLBFrontmatter
        }
      ]
    },
    {
      name: 'Building & Equipment',
      path: '/building-equipment',
      exact: false,
      chapters: [
        {
          name: 'Call Forwarding',
          path: '/call-forwarding',
          component: CallForwarding,
          mdxFrontMatter: CallFwdFrontMatter
        }
      ]
    }
  ]
};
