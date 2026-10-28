# Recommendations for the campaign

Written 28 October 2026 for Darrell Wilkins, alongside the redesigned site. Ordered by what matters most.

## Before the new site goes live

1. **Read every page and the 30 templates.** Check that every fact matches your own knowledge. In particular:
   - the wording of the promise ("do it by the book"), and that it happened before the sale and again at a meeting;
   - the 27 June 2026 description;
   - the corrections log on the About page. It is optional. It shows good faith, but it also confirms two earlier errors. Delete it if you prefer;
   - that David Rowlinson is happy to be named. The site names him as the source of the pub's history, on the "What has happened" and "Asset of Community Value" pages;
   - that you took the 27 June 2026 photos from your own land or a public road. The About page says they were taken "from outside the site".
2. **Swap in better photos when you have them.** Wanted: the building from the road, the bend from the car park exit, the unlit lanes, and any old photos of the pub with permission from the people shown.
3. **Wire up the forms.** The review copy sends nothing. The complaint form uses the same field names as the live tool (`firstName`, `lastName`, `phone`, `email`, `postcode`, `spoken` and so on), so it can be connected to the existing Netlify functions. Two changes are needed in the back end:
   - add the new fields (`describe`, `seen`, `connection`, `spokenDetail`);
   - add the line "Prepared with help from the Save the Hundon Plough campaign website." to every PDF and email.
4. **Keep the live complaint URL.** The new form is at `/complaint/`, the same address as now, so leaflets and old emails still work.
5. **Remove the old templates** (`complaint/js/complaints.js`) and the old shared "Yes" answer from the live tool, and replace them with `content/complaint-templates.md`.
6. **Remove the review banner and the `noindex` settings** (`robots.txt`, the `X-Robots-Tag` header in `netlify.toml`, and the robots meta tag) only when you are ready to go public.

## Correct one reference

The old templates cite "Local Plan Policy LP31". In the adopted West Suffolk Local Plan (July 2025), LP31 is the policy on public realm improvements. The policy that protects pubs is **LP19, "Community facilities and services"**. My earlier suggested wording also used LP31, which was wrong.

- Use LP19 from now on, in the templates, in your draft letter to the enforcement officer and in anything else you write.
- You do not need to correct the complaints already sent. Planning officers will know the right policy.

## Evidence

7. **Keep a dated record of every event.** Note the date, start and finish times, the number of cars, coaches or minibuses, noise, and where you were. Photos should be taken from a public road or your own property. Keep the original files, which hold the date and time. For noise, the council uses its own noise diary sheets ([West Suffolk Council, noise](https://www.westsuffolk.gov.uk/environment/environmental-services/noise.cfm)). Residents who want to report noise should use those.
8. **Count cars on event days.** A simple tally of cars arriving and leaving, with times, is strong evidence on highway safety.
9. **Archive what the owners publish.** Save each new web page or post with the date. The Internet Archive's "Save Page Now" (web.archive.org) creates an independent, dated copy.
10. **Check the public registers every week.** Check the planning register for any application, certificate or appeal. Check the licensing register for any change to licence PL06372. The planning register lets you set up saved searches with email alerts if you create an account.

## The council

11. **Send the enforcement officer a short update before 1 December.** Your draft (Email/Drafts, 21 October) is a good basis. Before you send it:
    - change "LP31" to LP19;
    - leave out anything about Temporary Event Notices;
    - add the brochure facts: exclusive use of the whole site, hen and stag groups, coaches, and prices to December 2028;
    - add that the café will be closed on Fridays and Saturdays for private events;
    - ask what the council plans to do and roughly when, and ask to be told if an application is made.
12. **Ask the parish council to write to the enforcement team.** A letter from Hundon Parish Council carries weight. It nominated the pub as an Asset of Community Value, so it already has a stake.
13. **Brief your ward councillors.** Keep it to one page: the facts, the ask, and the case number EN/26/0160. A ward councillor can ask for any future planning application to go to the planning committee rather than being decided by officers.
14. **Ask the highway authority.** Suffolk County Council, as highway authority, gives its view on access and visibility when there is a planning application. You can also write to it now about the bend and event traffic. Check crashmap.co.uk for any recorded collisions on Hundon Road near The Plough.

## If a planning application is made

15. **Tell everyone on the updates list straight away.** The comment period is usually 21 days.
16. **Help each person write their own comment.** Stick to material planning considerations: highway safety, noise, the loss of a community facility (NPPF policy HC6 and Local Plan LP19), and the character of the area. Do not mention competition, property values or personal disputes.
17. **Ask for planning conditions as well as objecting.** Examples: hours, numbers, no amplified music outdoors, limits on coaches, parking. This shows the council you are being reasonable, and it protects you if permission is granted anyway.

## Licensing, only if needed

18. **If events cause late-night noise, there is a separate route.** Residents can ask the council to review the premises licence on the grounds of public nuisance (Licensing Act 2003, section 51). That needs evidence, so keep the event records. Do not threaten it. Use it only if the problem actually happens.

## Community ownership

19. **Prepare in case the owners ever sell.** Because The Plough is an Asset of Community Value, a community group gets six weeks to say it wants to bid once the owners notify the council of a sale. If it does, the sale has to wait for up to six months in total. That is not long, so:
    - set up a small steering group now;
    - read the Plunkett UK and CAMRA guidance on community pubs;
    - keep a list of people who would invest.
20. **Watch for changes to the rules.** The English Devolution and Community Empowerment Act 2026 received Royal Assent on 29 April 2026. It changes the Asset of Community Value scheme and adds a community right to buy, which gives community groups a right of first refusal. Those parts only take effect when the government makes commencement regulations. I could not confirm whether that has happened. Until it has, the old rules (six weeks, then up to six months) apply. Check the status with the council or Plunkett UK before relying on the new rules, and do not describe them on the website until they are in force.

## Data protection

The campaign collects names, addresses and complaints. That makes Darrell the "controller" under UK data protection law (the person who decides why and how personal data is used).

21. **Check whether you need to pay the ICO data protection fee.** Most organisations that process personal data must pay a small yearly fee to the Information Commissioner's Office. Some not-for-profit bodies are exempt. Use the ICO's online self-assessment (search "ICO data protection fee self-assessment") and keep a note of the answer.
22. **Keep the data in one place, with a password.** Delete complaints and event records when the privacy notice says you will.
23. **Answer any request for personal data within one month.** This includes a subject access request from the owners. Before you reply, remove other people's personal details, such as residents' names and addresses. Get advice if you receive one.

## Media and online

24. **Go to the press only when there is news,** such as a council decision, a planning application or a community ownership plan. Send a short, factual note with a photo of the pub in its heyday and one named contact (you).
25. **If you set up a Facebook page or group, moderate it.** Remove personal remarks about the owners, their family, staff or customers. Pin the campaign rules from the "Other ways to help" page.

## Things to avoid

- Personal remarks about the owners, their family, staff, guests or suppliers, anywhere.
- Contacting wedding couples or other customers, or leaving reviews of the business.
- Going onto the site, or photographing guests.
- Repeating anything you cannot prove.
- Using the old templates or the old "Yes" answer.

## One question for you

Your files mention a GitHub repository called `theploughcountrylodge.com`, and the handover notes say the venue's site was seen at that address. The owners use theploughcountrylodge**.co.uk**.

- If you, or anyone in the campaign, own the `.com` domain, take legal advice before doing anything with it. A domain that matches a business's name can lead to a passing-off claim (using another business's name in a way that misleads people) or a domain dispute.
- If it is only an archive copy of their site, keep it private.
