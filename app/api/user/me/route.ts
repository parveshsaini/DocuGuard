import { withAPIAuthentication } from "../../../../utils";

const apiHandler = async () => {
  return new Response(
    JSON.stringify({
      name: "Parvesh Saini",
      address: { state: "ND", zip: "110055" },
    }),
    {
      headers: { "content-type": "application/json" },
    }
  );
};

export const GET = withAPIAuthentication(apiHandler);
