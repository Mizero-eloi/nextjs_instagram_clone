import sanityClient from "@sanity/client";

// configuring client
export const client = sanityClient({
  projectId: "x0va6ill",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
