import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
import * as acm from "aws-cdk-lib/aws-certificatemanager";

export default {
  config(_input) {
    return {
      name: "convex-hackathon",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const certificate = acm.Certificate.fromCertificateArn(
        stack,
        "Certificate",
        `arn:aws:acm:us-east-1:493255580566:certificate/d13e3d50-9583-4379-a921-674bc31a6d2d`
      );

      const site = new NextjsSite(stack, "site", {
        customDomain: {
          isExternalDomain: true,
          domainName: "hackathon.webdevcody.com",
          cdk: {
            certificate,
          },
        },
        environment: {
          CONVEX_DEPLOYMENT: process.env.CONVEX_DEPLOYMENT!,
          NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL!,
          NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
            process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
          CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY!,
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
