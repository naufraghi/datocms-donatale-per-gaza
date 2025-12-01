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
      donation {
        # Changed from donationEvent to donation
        id
        donatedBy
        donorName
        donorEmail
      }
      _status # Added
      _firstPublishedAt # Added
    }
  }
`);
