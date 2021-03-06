import { Wrapper } from "../components/helper-components";
import type { MarketingPages_Document } from "../.tina/__generated__/types";
import { LandingPage } from "../components/landing-page";
import { createLocalClient } from "../utils";

export const getStaticProps = async () => {
  const client = createLocalClient();
  return {
    props: await client.request(query, {
      variables: {},
    }),
  };
};

/**
 * The `HomePage` component here is used by Next.js to render your webpage, but what's
 * interesting is that we're also using this component in our "admin" equivalent
 * route. You can see that at we're importing this component for use at
 * "pages/admin/index.tsx"
 */
export default function HomePage(props: HomeQueryResponseType) {
  return (
    <>
      <Wrapper data={props.getMarketingPagesDocument.data}>
        <LandingPage {...props.getMarketingPagesDocument.data} />
      </Wrapper>
    </>
  );
}

export const query = (gql) => gql`
  query ContentQuery {
    # "index.md" is _relative_ to the "Marketing Pages" path property in your schema definition
    # you can inspect this file at "content/marketing-pages/index.md"
    getMarketingPagesDocument(relativePath: "index.md") {
      data {
        __typename
        ... on LandingPage_Doc_Data {
          blocks {
            __typename
            ... on Message_Data {
              messageHeader
              messageBody
            }
            ... on Hero_Data {
              heroHeader
              heroSubHeading
            }
            ... on Diagram_Data {
              diagramHeading
              diagramDescription
              diagramID
            }
          }
        }
      }
    }
  }
`;

export type HomeQueryResponseType = {
  getMarketingPagesDocument: MarketingPages_Document;
};
