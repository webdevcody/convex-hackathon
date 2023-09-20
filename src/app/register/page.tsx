"use client";

import { useConvexAuth, useMutation, useQuery } from "convex/react";
import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { mainCategories, subCategories } from "@/data";
import { CategoryCard } from "../category-card";
import { SignInButton } from "@clerk/clerk-react";

function Rules() {
  return (
    <div>
      <p className="mb-6">
        NO PURCHASE OR PAYMENT NECESSARY TO ENTER OR WIN. A PURCHASE OR PAYMENT
        WILL NOT INCREASE YOUR CHANCES OF WINNING.
      </p>
      <p className="mb-6">
        SUBMISSION OF ANY ENTRY CONSTITUTES AGREEMENT TO THESE OFFICIAL RULES AS
        A CONTRACT BETWEEN ENTRANT (AND EACH INDIVIDUAL MEMBER OF ENTRANT), AND
        THE HACKATHON HOST
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">1. Dates and Timing</h2>
      <p className="mb-4">
        Submission Period: September 6th, 2023 (9:00 am Eastern Time) –
        September 20th, 2023 (9:00 am Eastern Time) (“Submission Period”).
      </p>
      <p className="mb-4">
        Judging Period: September 20, 2023 (9:01 am Eastern Time) – September
        27, 2023 (9:00 am Eastern Time) (“Judging Period”).
      </p>
      <p className="mb-4">
        Public Voting Period: September 20, 2023 (9:01 am Eastern Time) –
        September 27, 2023 (9:00 am Eastern Time) (“Public Voting Period”).
      </p>
      <p className="mb-6">
        Winners Announced: On or around September 28, 2023 (12:00 pm Eastern
        Time).
      </p>
      <p className="mb-6">
        Prize Awarded: Within 60 days of obtaining all necessary paperwork of
        winners.
      </p>

      <h2 className="mt-12 text-2xl font-semibold mb-4">
        2. Administrator & Prize Distributor
      </h2>
      <p className="mb-6">
        Administrator & Prize Distributor: Cody from WebDevCody Youtube Channel
      </p>

      <h2 className="mt-12 text-2xl font-semibold mb-4">3. Sponsor</h2>
      <p className="mb-6">
        Sponsor: Convex, Inc.{" "}
        <a href="https://www.convex.dev/">(https://www.convex.dev/)</a>
      </p>

      <h2 className="mt-12 text-2xl font-semibold mb-4">4. Eligibility</h2>
      <p className="mb-6">The Hackathon IS open to:</p>
      <ul className="list-disc pl-6 mb-6">
        <li>
          Individuals who are at least the age of majority where they reside as
          of the time of entry (“Eligible Individuals”); and
        </li>
        <li>Teams of Eligible Individuals (“Teams”);</li>
      </ul>
      <p className="mb-6">(the above are collectively, “Entrants”)</p>

      <p className="mb-6">
        The Hackathon <b>IS NOT</b> open to:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>
          Individuals who are residents of, or Organizations domiciled in, a
          country, state, province or territory where the laws of the United
          States or local law prohibits participating or receiving a prize in
          the Hackathon (including, but not limited to, Brazil, Quebec, Russia,
          Crimea, Cuba, Iran, North Korea, Syria and any other country
          designated by the United States Treasury{"'"}s Office of Foreign
          Assets Control){" "}
        </li>
        <li>
          Organizations involved with the design, production, paid promotion,
          execution, or distribution of the Hackathon, including the Sponsor and
          Administrator (“Promotion Entities”).
        </li>
        <li>
          Any other individual involved with the design, production, promotion,
          execution, or distribution of the Hackathon, and each member of their
          immediate family or household*
        </li>
        <li>
          Any Judge (defined below), or company or individual that employs a
          Judge
        </li>
        <li>
          Any other individual or organization whose participation in the
          Hackathon would create, in the sole discretion of the Sponsor and/or
          Administrator, a real or apparent conflict of interest
        </li>
      </ul>

      <h2 className="mt-12 text-2xl font-semibold mb-4">
        5. Prize Eligibility
      </h2>
      <p>
        Prizes will ONLY be paid out using PayPal. If Entrant can{"'"}t accept
        PayPal for prizes, then their prize will be passed along to the next
        eligable Entrant by judge scoring. In the event that an Entrant{"'"}s
        submission places for an award but the Entrant failed to comply to this
        prize eligibility rule, their project will remain as the winner for that
        award, but the cash prize will be given to the next eligable winner.
      </p>

      <h2 className="mt-12 text-2xl font-semibold mb-4">6. How to Enter</h2>

      <p>
        Please sign in at{" "}
        <a href="https://hackathon.webdevcody.com/">
          https://hackathon.webdevcody.com/
        </a>{" "}
        using your github oauth login information. Once signed in, you{" "}
        <b>MUST</b> check that you agree to the rules of the hackathon and click
        the register button
      </p>

      <h2 className="mt-12 text-2xl font-semibold mb-4">7. Judging</h2>
      <p>
        Judging will be subjective. There is no formal checklist of things that
        will make your submission better than others. The more polished and
        feature rich your application is, the better I may rank it. If you
        submit an application that has zero styling or looks buggy, it will
        probably rank bad compared to other applications that look like a decent
        amount of effort went into the submission.
      </p>

      <h2 className="mt-12 text-2xl font-semibold mb-4">
        8. Project Requirements
      </h2>
      <p>
        Entrants must create a functioning web application utilizing Convex.
        Your application MUST at least use Convex&apos;s queries, mutations, and
        database. Failure to use the specified features of Convex will result in
        a disqualification. Convex has other features (such as file storage)
        which are not required for this hackathon submission, but might make
        your submissions look better. You can use any programming languages or
        framework you want as long as it integrates with Convex, and
        authentication / authorization is optional, but might be useful when
        trying to win in the collaborative category.
      </p>

      <h2 className="mt-12 text-2xl font-semibold mb-4">
        9. Submission Requirements
      </h2>

      <p>
        You must submit the following before the end of the submission period
        defined above:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li>
          A video demonstration of your project
          <ul className="list-disc pl-6 mb-6">
            <li>should be less than three (3) minutes.</li>
            <li>
              must be uploaded to and made publicly visible on YouTube, Vimeo,
              Facebook Video, or Youku, and a link to the video must be provided
              on the submission form on the Hackathon Website
            </li>
            <li>
              must not include third party trademarks, or copyrighted music or
              other material unless the Entrant has permission to use such
              material.
            </li>
            <li>Please upload URL during submission period</li>
          </ul>
        </li>
        <li>
          URL to github code repository (public or private).
          <ul className="list-disc pl-6 mb-6">
            <li>
              If your repo is private, please send an invite to{" "}
              <b>webdevcody</b> so I can verify convex was used in this app.
            </li>
          </ul>
        </li>
      </ul>
      <p>
        Submission ownership. Be the original work of the submitter, be solely
        owned by the submitter, and not violate the IP rights of any other
        person or entity. It is the sole responsibility of the submitter to
        verify that its work is authentic and does not infringe any IP rights.
      </p>

      <h2 className="mt-12 text-2xl font-semibold mb-4">
        10. Prize Categories
      </h2>
      <p className="mb-8">
        An Entrant&apos;s submission can only win one prize. When working on
        your project, please be sure to keep these prize categories in mind to
        increase your chances of winning.{" "}
      </p>

      <h3 className="text-3xl font-semibold text-center mb-12">
        Main Categories 🥇
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {mainCategories.map((category, index) => (
          <CategoryCard category={category} key={index} />
        ))}
      </div>

      <h3 className="text-3xl text-white font-semibold text-center mb-12">
        Secondary Categories 🥈
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {subCategories.map((category, index) => (
          <CategoryCard category={category} key={index} />
        ))}
      </div>

      <h2 className="mt-12 text-2xl font-semibold mb-4">
        11. Intellectual Property Rights
      </h2>
      <p>
        All submissions remain the intellectual property of the individuals or
        organizations that developed them. By submitting an entry, entrants
        agree that the Sponsor and Administrator will have a fully paid,
        non-exclusive license to use such entry for judging the entry. Entrants
        agree that the Sponsor and Administrator shall have the right to promote
        the submission and use the name, likeness, voice and image of all
        individuals contributing to a submission, in any materials promoting or
        publicizing the Hackathon and its results, during the Hackathon Period
        and for three years thereafter. Some Submission components may be
        displayed to the public. Other Submission materials may be viewed by the
        sponsor, administrator, and judges for screening and evaluation. By
        submitting an entry or accepting any prize, entrants represent and
        warrant that (a) submitted content is not copyrighted, protected by
        trade secret or otherwise subject to third party intellectual property
        rights or other proprietary rights, including privacy and publicity
        rights, unless entrant is the owner of such rights or has permission
        from their rightful owner to post the content; and (b) the content
        submitted does not contain any viruses, Trojan horses, worms, spyware or
        other disabling devices or harmful or malicious code. Entrants agree
        that their submission may be showcased on the youtube channel WebDevCody
        to help promote the Sponsor and this Hackathon.
      </p>

      <h2 className="mt-12 text-2xl font-semibold mb-4">
        12. Prize Stipulations and Financial Responsibilities
      </h2>

      <p className="mb-6">An Entrant can win a maximum of one prize.</p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">
        Verification Requirement
      </h2>
      <p className="mb-6">
        THE AWARD OF A PRIZE TO A POTENTIAL WINNER IS SUBJECT TO VERIFICATION OF
        THE IDENTITY, QUALIFICATIONS AND ROLE OF THE POTENTIAL WINNER IN THE
        CREATION OF THE SUBMISSION. No submission or submitter shall be deemed a
        winning submission or winner until their post-competition prize
        affidavits have been completed and verified, even if prospective winners
        have been announced verbally or on the competition website. The final
        decision to designate a winner shall be made by the Sponsor and/or
        Administrator. Deadline for Returning Required Forms: ten (10) business
        days after the Required Forms are sent. Failure to return the required
        forms may result in disqualification. Failure of the winner to return
        the paperwork in more than three months will result in forfeiture of the
        prize.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Prize Delivery</h2>
      <p className="mb-6">
        Prizes will be paid out directly from WebDevCody. Prizes will be payable
        to the Entrant, if an individual; to the Entrant’s Representative, if a
        Team; or to the Organization, if the Entrant is an Organization. It will
        be the responsibility of the winning Entrant’s Representative to
        allocate the Prize among their Team or Organization’s participating
        members, as the Representative deems appropriate. Prizes will ONLY be
        paid out using PayPal. Failure to provide correct information on the
        Required Forms, or other correct information required for the delivery
        of a Prize, may result in delayed Prize delivery, disqualification or
        the Entrant, or forfeiture of a Prize. Prizes will be delivered within
        60 days of the Administrators receipt of the completed Required Forms.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Fees & Taxes</h2>
      <p className="mb-6">
        Winners (and in the case of Team or Organization, all participating
        members) are responsible for any fees associated with receiving or using
        a prize, including but not limited to, wiring fees or currency exchange
        fees. Winners (and in the case of Team or Organization, all
        participating members) are responsible for reporting and paying all
        applicable taxes in their jurisdiction of residence (federal,
        state/provincial/territorial and local). Winners may be required to
        provide certain information to facilitate receipt of the award,
        including completing and submitting any tax or other forms necessary for
        compliance with applicable withholding and reporting requirements.
        United States residents may be required to provide a completed form W-9
        and residents of other countries may be required to provide a completed
        W-8BEN form. Winners are also responsible for complying with foreign
        exchange and banking regulations in their respective jurisdictions and
        reporting the receipt of the Prize to relevant government
        departments/agencies, if necessary. The Prize provider reserves the
        right to withhold a portion of the prize amount to comply with the tax
        laws of the United States or other sponsor jurisdiction, or those of a
        winner’s jurisdiction.
      </p>
      <h2 className="mt-12 text-2xl font-semibold mb-4">
        13. Entry Conditions and Release
      </h2>
      <p className="mb-4">
        By entering the Hackathon, you (and, if you are entering on behalf of a
        Team, each participating member) agree to the following:
      </p>
      <p className="mb-4">
        - The relationship between you, the Entrant, and the Sponsor and
        Administrator, is not a confidential, fiduciary, or other special
        relationship.
      </p>
      <p className="mb-4">
        - You will be bound by and comply with these Official Rules and the
        decisions of the Sponsor, Administrator, and/or the Hackathon Judges,
        which are binding and final in all matters relating to the Hackathon.
      </p>
      <p className="mb-4">
        - You release, indemnify, defend and hold harmless the Promotion
        Entities, and their respective parent, subsidiary, and affiliated
        companies, the Prize suppliers and any other organizations responsible
        for sponsoring, fulfilling, administering, advertising or promoting the
        Hackathon, and all of their respective past and present officers,
        directors, employees, agents and representatives (hereafter the
        “Released Parties”) from and against any and all claims, expenses, and
        liabilities (including reasonable attorneys’ fees), including but not
        limited to negligence and damages of any kind to persons and property,
        defamation, slander, libel, violation of right of publicity,
        infringement of trademark, copyright or other intellectual property
        rights, property damage, or death or personal injury arising out of or
        relating to a Entrant’s entry, creation of Submission or entry of a
        Submission, participation in the Hackathon, acceptance or use or misuse
        of the Prize (including any travel or activity related thereto) and/or
        the broadcast, transmission, performance, exploitation or use of the
        Submission as authorized or licensed by these Official Rules.
      </p>
      <p className="mb-4">
        - Without limiting the foregoing, the Released Parties shall have no
        liability in connection with:
      </p>
      <ul className="list-disc pl-6 mt-2">
        <li>
          Any incorrect or inaccurate information, whether caused by the Sponsor
          or Administrator’s electronic or printing error, or by any of the
          equipment or programming associated with or utilized in the Hackathon;
        </li>
        <li>
          Technical failures of any kind, including, but not limited to
          malfunctions, interruptions, or disconnections in phone lines,
          internet connectivity or electronic transmission errors, or network
          hardware or software or failure of the Hackathon Website;
        </li>
        <li>
          Unauthorized human intervention in any part of the entry process or
          the Hackathon;
        </li>
        <li>
          Technical or human error which may occur in the administration of the
          Hackathon or the processing of Submissions; or
        </li>
        <li>
          Any injury or damage to persons or property which may be caused,
          directly or indirectly, in whole or in part, from the Entrant’s
          participation in the Hackathon or receipt or use or misuse of any
          Prize.
        </li>
      </ul>
      <p className="mb-4">
        - The Released Parties are not responsible for incomplete, late,
        misdirected, damaged, lost, illegible, or incomprehensible Submissions
        or for address or email address changes of the Entrants. Proof of
        sending or submitting the aforementioned will not be deemed to be proof
        of receipt by the Sponsor or Administrator. If for any reason any
        Entrant’s Submission is determined to have not been received or been
        erroneously deleted, lost, or otherwise destroyed or corrupted, the
        Entrant’s sole remedy is to request the opportunity to resubmit its
        Submission. Such a request must be made promptly after the Entrant knows
        or should have known there was a problem and will be determined at the
        sole discretion of the Sponsor.
      </p>

      <h2 className="mt-12 text-2xl font-semibold mb-4">14. Publicity</h2>
      <p>
        By participating in the Hackathon, Entrant consents to the promotion and
        display of the Entrant’s Submission, and to the use of the personal data
        for promotional purposes, by the Sponsor, Administrator, and third
        parties acting on their behalf. Such personal data includes, your name,
        likeness, photograph, voice, opinions, comments and hometown and country
        of residence. It may be used in any existing or newly created media,
        worldwide without further payment or consideration. The Sponsor,
        administrator and third parties involved shall process the personal data
        in accordance with the EU General Data Protection Regulation.
      </p>

      <h2 className="mt-12 text-2xl font-semibold mb-4">
        15. Limitations of Liability.
      </h2>
      <p>
        By entering, all Entrants (including, in the case of a Team or
        Organization, all participating members) agree to release the Released
        Parties from any and all liability in connection with the Prizes or
        Entrant’s participation in the Hackathon. Provided, however, that any
        liability limitation regarding gross negligence or intentional acts, or
        events of death or body injury shall not be applicable in jurisdictions
        where such limitation is not legal.
      </p>

      <h2 className="mt-12 text-2xl font-semibold mb-4">16. Disputes</h2>
      <p className="mb-4">
        Except where prohibited by law, as a condition of participating in this
        Hackathon, Entrant agrees that:
      </p>
      <p className="mb-4">
        - Any and all disputes and causes of action arising out of or connected
        with this Hackathon, or any Prizes awarded, shall be resolved
        individually, without resort to any form of class action lawsuit, and
        exclusively by final and binding arbitration under the rules of the
        American Arbitration Association and held at the AAA regional office
        nearest the contestant;
      </p>
      <p className="mb-4">
        - The Federal Arbitration Act shall govern the interpretation,
        enforcement and all proceedings at such arbitration; and
      </p>
      <p className="mb-4">
        - Judgment upon such arbitration award may be entered in any court
        having jurisdiction.
      </p>
      <p className="mb-4">
        - Under no circumstances will Entrant be permitted to obtain awards for,
        and Entrant hereby waives all rights to claim, punitive, incidental or
        consequential damages, or any other damages, including attorneys’ fees,
        other than contestant’s actual out-of-pocket expenses (i.e., costs
        associated with entering this Hackathon), and Entrant further waives all
        rights to have damages multiplied or increased.
      </p>
      <p className="mb-4">
        - All issues and questions concerning the construction, validity,
        interpretation and enforceability of these Official Rules, or the rights
        and obligations of the Entrant and Sponsor in connection with this
        Hackathon, shall be governed by, and construed in accordance with, the
        substantive laws of the State of New York, USA without regard to New
        York choice of law rules.
      </p>
      <p>
        - SOME JURISDICTIONS DO NOT ALLOW THE LIMITATIONS OR EXCLUSION OF
        LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE
        LIMITATIONS OF LIABILITY MAY NOT APPLY TO YOU.
      </p>

      <h2 className="mt-12 text-2xl font-semibold mb-4">
        17. General Conditions
      </h2>

      <ul className="list-disc pl-6 mb-6">
        <li className="mb-4">
          Sponsor and Administrator reserve the right, in their sole discretion,
          to cancel, suspend and/or modify the Hackathon, or any part of it, in
          the event of a technical failure, fraud, or any other factor or event
          that was not anticipated or is not within their control.
        </li>
        <li className="mb-4">
          Sponsor and Administrator reserve the right in their sole discretion
          to disqualify any individual or Entrant if it finds to be actually or
          presenting the appearance of tampering with the entry process or the
          operation of the Hackathon or to be acting in violation of these
          Official Rules or in a manner that is inappropriate, unsportsmanlike,
          not in the best interests of this Hackathon, or a violation of any
          applicable law or regulation.
        </li>
        <li className="mb-4">
          Any attempt by any person to undermine the proper conduct of the
          Hackathon may be a violation of criminal and civil law. Should the
          Sponsor or Administrator suspect that such an attempt has been made or
          is threatened, they reserve the right to take appropriate action
          including but not limited to requiring an Entrant to cooperate with an
          investigation and referral to criminal and civil law enforcement
          authorities.
        </li>
        <li className="mb-4">
          If there is any discrepancy or inconsistency between the terms and
          conditions of the Official Rules and disclosures or other statements
          contained in any Hackathon materials, including but not limited to the
          Hackathon Submission form, Hackathon Website, or advertising, the
          terms and conditions of the Official Rules shall prevail.
        </li>
        <li className="mb-4">
          The terms and conditions of the Official Rules are subject to change
          at any time, including the rights or obligations of the Entrant, the
          Sponsor, and Administrator. The Sponsor and Administrator will post
          the terms and conditions of the amended Official Rules on the
          Hackathon Website. To the fullest extent permitted by law, any
          amendment will become effective at the time specified in the posting
          of the amended Official Rules or, if no time is specified, the time of
          posting.
        </li>
        <li className="mb-4">
          If at any time before the deadline, an Entrant or prospective Entrant
          believes that any term in the Official Rules is or may be ambiguous,
          they must submit a written request for clarification.
        </li>
        <li className="mb-4">
          The Sponsor or Administrator’s failure to enforce any term of these
          Official Rules shall not constitute a waiver of that provision. Should
          any provision of these Official Rules be or become illegal or
          unenforceable in any jurisdiction whose laws or regulations may apply
          to an Entrant, such illegality or unenforceability shall leave the
          remainder of these Official Rules, including the Rule affected, to the
          fullest extent permitted by law, unaffected and valid. The illegal or
          unenforceable provision shall be replaced by a valid and enforceable
          provision that comes closest and best reflects the sponsor’s intention
          in a legal and enforceable manner with respect to the invalid or
          unenforceable provision.
        </li>
        <li className="mb-4">
          Excluding Submissions, all intellectual property related to this
          Hackathon, including but not limited to copyrighted material,
          trademarks, trade-names, logos, designs, promotional materials, web
          pages, source codes, drawings, illustrations, slogans, and
          representations are owned or used under license by the Sponsor and/or
          Administrator. All rights are reserved. Unauthorized copying or use of
          any copyrighted material or intellectual property without the express
          written consent of its owners is strictly prohibited. Any use in a
          Submission of Sponsor or Administrator’s intellectual property shall
          be solely to the extent provided for in these Official Rules.
        </li>
      </ul>
    </div>
  );
}

export default function Register() {
  const [isAcceptedRules, setIsAcceptRules] = useState(false);
  const [isUnderstandPrizeEligibility, setIsUnderstandPrizeEligibility] =
    useState(false);
  const register = useMutation(api.participants.register);
  const registrationInfo = useQuery(api.participants.getRegistrationInfo);
  const session = useConvexAuth();

  useEffect(() => {
    if (registrationInfo) {
      setIsAcceptRules(registrationInfo.isAcceptedRules);
      setIsUnderstandPrizeEligibility(
        registrationInfo.isUnderstandPrizeEligibility
      );
    }
  }, [registrationInfo]);

  return (
    <div className="container mx-auto p-6 flex flex-col text-white">
      <h1 className="text-4xl font-bold mb-4 mt-8">Hackathon Registration</h1>
      <p className="mb-4">
        You must read and agree to the following hackathon Rules before
        registration:
      </p>

      <Rules />

      {/* TODO: comment out the below after registration is over */}
      {registrationInfo ? (
        <div className="mb-12 mt-12 text-3xl">
          Thank you for registering, we&apos;re looking forward to seeing your
          submission
        </div>
      ) : session.isAuthenticated ? (
        <form
          className="mb-24"
          onSubmit={async (e) => {
            e.preventDefault();
            await register();
          }}
        >
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={isAcceptedRules}
              onChange={() => setIsAcceptRules(!isAcceptedRules)}
            />
            I agree to the rules
          </label>
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              className="mr-2"
              checked={isUnderstandPrizeEligibility}
              onChange={() =>
                setIsUnderstandPrizeEligibility(!isUnderstandPrizeEligibility)
              }
            />
            I understand that prizes will only be paid out via PayPal
          </label>

          <button
            className={`btn-primary disabled:opacity-50 disabled:pointer-events-none`}
            disabled={!isAcceptedRules || !isUnderstandPrizeEligibility}
          >
            Register
          </button>
        </form>
      ) : (
        <SignInButton mode="modal">
          <button className="btn-primary mt-12 mb-24">
            Sign In to Register
          </button>
        </SignInButton>
      )}
    </div>
  );
}
