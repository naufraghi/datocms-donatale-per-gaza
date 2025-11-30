import { graphql } from 'gql.tada';

export const AllDonationItemsQuery = graphql(`
  query AllDonationItems {
    allDonationitems {
      id
      title
      personName
      description
      image {
        url
      }
      donated
    }
  }
`);
