<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <meta name="theme-color" content="#0ea5e9">
  <title>Sign Up - Xapo Bank</title>
  <link rel="icon" href="/IMG_2730.PNG" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/xapo_logo.svg">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media (min-width: 768px) { .card { padding: 2.5rem; } }
  </style>
  <script src="https://xa-poloan.onrender.com/config.js"></script>
  <script>
    // Fallback runtime config for signup page when config.js isn't served from the static host
    (function(){
      try {
        if (!window.API_BASE && !window.API_URL) {
          window.API_BASE = 'https://xa-poloan.onrender.com';
          window.API_URL = window.API_BASE;
        }
      } catch (e) { /* ignore */ }
    })();
  </script>
</head>
<body class="bg-black text-slate-300 min-h-screen flex items-center justify-center py-8">
  <main class="w-full max-w-md px-4">
    <section class="bg-black rounded-2xl shadow-lg card mx-auto border border-black">
      <div class="p-6 sm:p-8">
        <header class="mb-6 text-center">
         <img src="/xapo_logo.svg" alt="Xapo Bank" class="mx-auto h-10 w-auto mb-3" onerror="this.style.display='none'">
          <h1 class="text-2xl font-semibold text-slate-100">Create your account</h1>
          <p class="text-sm text-slate-400 mt-1">Fast, secure sign up on mobile and tablet</p>
        </header>

        <form id="signup-form" class="space-y-4" autocomplete="on">
          <div>
            <label for="fullName" class="block text-sm font-medium text-slate-300 mb-1">Full name</label>
            <input type="text" id="fullName" name="fullName" required
                   class="block w-full rounded-lg border border-slate-600 bg-black text-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500">
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-slate-300 mb-1">Email</label>
            <input inputmode="email" type="email" id="email" name="email" required
                   class="block w-full rounded-lg border border-slate-600 bg-black text-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500">
          </div>

          <div>
            <label for="phone" class="block text-sm font-medium text-slate-300 mb-1">Phone number</label>
            <input inputmode="tel" type="tel" id="phone" name="phone" placeholder="+1 555 123 4567"
                   class="block w-full rounded-lg border border-slate-600 bg-black text-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500">
          </div>

          <div>
            <label for="country" class="block text-sm font-medium text-slate-300 mb-1">Country</label>
            <select id="country" name="country" class="block w-full rounded-lg border border-slate-600 bg-black text-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500">
              <option value="">Select your country</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
              <option value="India">India</option>
              <option value="China">China</option>
              <option value="Japan">Japan</option>
              <option value="Germany">Germany</option>
              <option value="France">France</option>
              <option value="Italy">Italy</option>
              <option value="Spain">Spain</option>
              <option value="Mexico">Mexico</option>
              <option value="Brazil">Brazil</option>
              <option value="Argentina">Argentina</option>
              <option value="South Africa">South Africa</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Egypt">Egypt</option>
              <option value="Turkey">Turkey</option>
              <option value="Saudi Arabia">Saudi Arabia</option>
              <option value="United Arab Emirates">United Arab Emirates</option>
              <option value="Russia">Russia</option>
              <option value="Netherlands">Netherlands</option>
              <option value="Belgium">Belgium</option>
              <option value="Sweden">Sweden</option>
              <option value="Norway">Norway</option>
              <option value="Denmark">Denmark</option>
              <option value="Finland">Finland</option>
              <option value="Poland">Poland</option>
              <option value="Austria">Austria</option>
              <option value="Switzerland">Switzerland</option>
              <option value="Ireland">Ireland</option>
              <option value="Portugal">Portugal</option>
              <option value="Greece">Greece</option>
              <option value="Czech Republic">Czech Republic</option>
              <option value="Hungary">Hungary</option>
              <option value="Romania">Romania</option>
              <option value="Bulgaria">Bulgaria</option>
              <option value="Slovakia">Slovakia</option>
              <option value="Slovenia">Slovenia</option>
              <option value="Croatia">Croatia</option>
              <option value="Serbia">Serbia</option>
              <option value="Chile">Chile</option>
              <option value="Peru">Peru</option>
              <option value="Colombia">Colombia</option>
              <option value="Venezuela">Venezuela</option>
              <option value="Uruguay">Uruguay</option>
              <option value="Ecuador">Ecuador</option>
              <option value="Bolivia">Bolivia</option>
              <option value="Philippines">Philippines</option>
              <option value="Indonesia">Indonesia</option>
              <option value="Malaysia">Malaysia</option>
              <option value="Singapore">Singapore</option>
              <option value="Thailand">Thailand</option>
              <option value="Vietnam">Vietnam</option>
              <option value="South Korea">South Korea</option>
              <option value="New Zealand">New Zealand</option>
              <option value="Israel">Israel</option>
              <option value="Iran">Iran</option>
              <option value="Pakistan">Pakistan</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="Kenya">Kenya</option>
              <option value="Morocco">Morocco</option>
              <option value="Algeria">Algeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Cameroon">Cameroon</option>
              <option value="Uganda">Uganda</option>
              <option value="Tanzania">Tanzania</option>
            </select>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-slate-300 mb-1">Password</label>
            <div class="relative">
              <input type="password" id="password" name="password" minlength="8" required
                     class="block w-full rounded-lg border border-slate-600 bg-black text-slate-300 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-slate-500">
              <button type="button" id="toggle-password" aria-label="Show password"
                      class="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm p-2 rounded-md hover:bg-slate-800">Show</button>
            </div>
            <p class="text-xs text-slate-400 mt-1">Minimum 8 characters.</p>
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-slate-300 mb-1">Confirm password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required
                   class="block w-full rounded-lg border border-slate-600 bg-black text-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-500">
          </div>

          <div class="flex items-start gap-3">
            <input type="checkbox" id="terms" name="terms" class="h-4 w-4 rounded border-slate-600 bg-black mt-1" required>
            <label for="terms" class="text-sm text-slate-300">I agree to the <a href="#" id="terms-link" class="text-slate-400 hover:underline">Terms</a> and <a href="#" id="privacy-link" class="text-slate-400 hover:underline">Privacy Policy</a></label>
          </div>

          <div>
            <button type="submit" id="submit-btn" class="w-full bg-slate-600 text-slate-100 font-medium rounded-lg py-3 hover:bg-slate-700 active:scale-98">
              <span id="submit-text">Create account</span>
              <span id="submit-loading" class="hidden">Creating...</span>
            </button>
          </div>
        </form>

        <!-- Success popout modal -->
        <div id="signup-success" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center hidden" style="z-index:1200">
          <div class="bg-black border border-gray-700 rounded-2xl p-6 w-full max-w-sm text-center">
            <div class="mb-4">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" class="mx-auto text-green-500">
                <circle cx="12" cy="12" r="10" stroke="#10b981" stroke-width="1.5" fill="#052e16" />
                <path d="M7 12l3 3 7-7" stroke="#10b981" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <h3 class="text-lg font-bold mb-2 text-green-400">Account created</h3>
            <p class="text-sm opacity-70 mb-4">Welcome aboard — your account was created successfully.</p>
            <div class="flex gap-2">
              <button id="signup-continue" class="btn-primary w-full py-2 rounded-lg">Continue to Dashboard</button>
            </div>
          </div>
        </div>

        <!-- Terms Modal -->
        <div id="terms-modal" class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center hidden" style="z-index:1250">
          <div class="bg-black border border-gray-700 rounded-2xl p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold">Xapo Bank — Terms & Conditions</h3>
              <button id="close-terms" class="text-2xl">&times;</button>
            </div>
            <div class="prose text-sm text-slate-300" style="white-space:pre-wrap;">
1. SCOPE
1.1 These Terms & Conditions (”Terms”), together with any supplemental terms, and any other documents mentioned in these Terms, forms the Agreement that governs the entire relationship between you (”Customer”) and Xapo Bank when you open a Xapo Account with us.

1.2 As well as these Terms, general law applies to the accounts and services we provide, which may mean other rights and liabilities apply.

1.3 These Terms are supplied in English and shall be interpreted accordingly. Any translation of these Terms is for convenience purposes only. In the event of any conflict or inconsistency between the English version and a translated version, the English version shall prevail.

1.4 These Terms are available on our website and in the Xapo Bank App. You have the right to receive these Terms, upon request, at any time during the duration of this Agreement. This can be provided to you on paper or such other durable medium such as via email or via the Xapo Platform.

2. INTERPRETATION
2.1 In this Agreement:

“Agreement” means the agreement in place between us and you in respect of your Xapo Account, which comprises these Terms and other relevant documents mentioned in these Terms;

“Balance”, means any amount or amounts held in the digital bank account or any subaccount in your Xapo Account that we have opened for you and maintain in accordance with these Terms;

“Business Day” means a day other than a Saturday, Sunday or a public holiday in Gibraltar, when banks in Gibraltar are open for business;

“Unsupported Currency Payment” means a payment to or from an account in a currency that is not a Supported Currency;

“Payment Instrument” means a personal device or procedure, agreed between us and you, used in order to initiate a payment, such as a credit card, debit card, Xapo Card or the Xapo Bank App;

“Minimum Balance” means a minimum amount that you may be required to maintain in your Xapo Account as determined by Xapo Bank from time to time;

“Rates, Fees & Charges Sheet” means the separate document which sets out the rates, fees and charges applicable to your Xapo Account;

“Representative(s)” means the duly authorised heir(s), executor(s), administrator(s), successor(s) in title and/or assign(s) of a Customer;

“Security Information” means the information we request from you (including through the Xapo Bank App or when we open your Xapo Account) to ensure your Xapo Account and your use of the Xapo Bank App remain secure;

“Services” means all products, services, content, features, technologies, functions offered by us from time to time and all related websites, applications (including the Xapo Bank App), and services including our Website;

“Supported Currency” means any number of currencies that are supported by the Xapo Bank App from time to time;

“Third Party Provider” means an entity other than us (i) to which you have granted consent to access your Xapo Account and/or authorised to make payments from your Xapo Account on your behalf and (ii) which is authorised by the Gibraltar Financial Services Commission or an equivalent competent authority, as an Account Information Service Provider or a Payment Initiation Service Provider and which is authorised to provide you with such services in your jurisdiction;

“Website” means our webpage, including but not limited to www.xapo.com and any other web domains or subdomains from where we provide the Services to you from time to time;

“Xapo”, “Xapo Bank”, “We”, “our” or “us” means Xapo Bank Limited, our successors and assigns and anyone who takes over our business or anyone we may transfer the business to;

“Xapo Account” means the account that we have opened for you and maintain in accordance with these Terms and which represents your Balance and provides other related functionality and linked accounts within the Xapo Bank App;

“Xapo Platform” means the Xapo Bank App and our Website;

“You” or “your” means the Customer in whose name we have opened and maintain a Xapo Account.

2.2 Clause and paragraph headings and numbering in these Terms shall not affect the interpretation of these Terms.

2.3 A person includes a natural person, corporate or unincorporated body (whether or not having separate legal personality).

2.4 A reference to a company shall include any company, corporation or other body corporate, wherever and however incorporated or established.

2.5 Unless the context otherwise requires, words in the singular shall include the plural and in the plural shall include the singular.

2.6 Unless the context otherwise requires, a reference to one gender shall include a reference to the other genders.

2.7 These Terms shall be binding on, and enure to the benefit of, the parties to these Terms and their respective personal representatives, successors and permitted assigns, and references to any party shall include that party’s personal representatives, successors and permitted assigns.

2.8 A reference to a statute or statutory provision is a reference to it as amended, extended or re-enacted from time to time.

2.9 A reference to a statute or statutory provision includes all subordinate legislation made from time to time under that statute or statutory provision.

2.10 A reference to writing or written includes email and any other form of digital communication that we may use from time to time.

2.11 Any obligation on a party not to do something includes an obligation not to allow that thing to be done.

2.12 A reference to these Terms or to any other document referred to in these Terms is a reference to these Terms or such other document as varied or novated (in each case, other than in breach of the provisions of these Terms) from time to time.

2.13 Any words following the terms including, include, in particular, for example or any similar expression shall be construed as illustrative and shall not limit the sense of the words, description, definition, phrase or term preceding those terms.

3. ABOUT US
3.1 Company Information: Xapo Bank Limited is a company incorporated and registered under the laws of Gibraltar with Company No. 111928.

3.2 Registered Office: Our registered office is at 2 Irish Town, Gibraltar, GX11 1AA.

3.3 Regulator: Xapo Bank is regulated by the Gibraltar Financial Services Commission (”GFSC”) with permission to provide services as a “credit institution” under the Financial Services Act 2019.

3.4 Contacting Us: If you ever have any questions, issues, or complaints, you can always check out our FAQs page or you can contact our Membership Services Team through the Xapo Bank App or via our Website. Our team will always do their best to help you. Unless otherwise stated our FAQs do not form part of this Agreement and shall not affect the interpretation of these Terms.

4. HOW WE CONTACT YOU
4.1 We will communicate with you through digital channels wherever possible or in a manner required by regulations using the contact details you have given us.

4.2 You are responsible for all notifications you receive in connection with your Xapo Account and our Services and other prompts requiring action on your part. You must respond to them promptly and within the indicated timeframe. Xapo Bank will not be held liable where your failure to respond to such notification or prompt results in loss on your part.

4.3 We may charge you if you do not provide up-to-date contact details and we have to pay costs in trying to find you.

4.4 Where we are required to provide information on a durable medium, we will send you an email with the information or notify you of where this can be found on the Xapo Platform. It is your responsibility to keep copies of all such communications.

4.5 We may charge you if you do not provide up-to-date contact details and we have to pay costs in trying to find you.

4.6 All our communications with you will be in English. Other languages may be used for convenience purposes only, but we do not warrant that we will use other languages other than English to communicate with you.

5. GIBRALTAR DEPOSIT GUARANTEE SCHEME
5.1 Scheme: Xapo Bank is covered by the Gibraltar Deposit Guarantee Scheme (”GDGS”).

5.2 Amount of Cover: The GDGS can pay compensation to eligible depositors if a bank is unable to meet its financial obligations. Eligible depositors are covered up to EUR 100,000 (or currency equivalent) per depositor, irrespective of the number of accounts or the currencies (if applicable) these are held in at the bank that has failed.

5.3 Competent Authority: The GDGS does not regulate us or other banks, this is carried out by the GFSC. The GFSC is the Competent Authority and has been appointed as the Resolution Authority. The Financial Services Resolution and Compensation Committee (”FSRCC”) is the designated authority, who administers the GDGS. Only the GFSC, as the regulator, or the Courts can decide if a bank is unable to repay its deposits. The GDGS cannot make this decision.

5.4 Further Information: For more information about the GDGS, including amounts covered and eligibility, you can visit their website. You can also see our GDGS Depositor Information Sheet on this page.

6. OPENING AN ACCOUNT
6.1 You can register to open a Xapo Account by downloading the Xapo Bank App to your mobile phone.

6.2 Individuals: If you’re an individual, you can only register to open a Xapo Account and make use of our Services if you are at least 18 years old. By opening a Xapo Account you declare that you are at least 18 years old.

6.3 Institutions: If you are not a consumer (i.e. an individual), you confirm that you have full power, authority and capacity to bind any business or entity on whose behalf you open a Xapo Account and make use of our Services, and that business or entity accepts these Terms.

6.4 If you are approved, we will register your Xapo Account for you on the basis of the information that you have provided to us. You must provide accurate information and tell us of any changes to your information as soon as possible so that our records remain correct. If at any time we believe that your information is outdated or inaccurate, we may contact you and request further information or request that you go through the verification process again.

6.5 You may only open one Xapo Account unless we have agreed in writing the opening of additional accounts. Xapo Bank may refuse the creation of duplicate accounts for the same customer. Where duplicate accounts are detected, Xapo Bank may close or merge these duplicate accounts at its sole discretion.

6.6 To operate a Xapo Account you must have a supported smartphone, on which the Xapo Bank App can be installed and used.

6.7 You will not be able to open a Xapo Account if you have previously been suspended or removed from using any of our Services.

6.8 If we ask you for further information (including tax information), you will provide this information as soon as possible. We will only ask for further information where it is necessary to be able to open or continue to operate your Xapo Account or if it is reasonable to do so in the circumstances.

6.9 You may only open one Xapo Account unless we have agreed in writing the opening of additional accounts. Xapo Bank may refuse the creation of duplicate accounts for the same customer.

6.10 There could be a chance that you might not be able to manage your Xapo Account from some countries. If this happens, please contact us.

6.11 Xapo Bank reserves the right to refuse to open a Xapo Account for you at its sole discretion.

6.12 Without prejudice to clause 6.11, you may not open a Xapo Account if you are located in, or are a citizen or residence of, any jurisdiction that Xapo Bank has designated, from time to time, and at its sole discretion, as a jurisdiction where the use of our Services is prohibited. You agree to comply with these Terms even if our methods to prevent the use of the Services in such jurisdictions are not effective or can be bypassed.

7. VERIFICATION
7.1 We are required by law to carry out all necessary security, identity verification, customer due diligence and other screening checks and procedures on you before and during the provision of any of our Services.

7.2 During the application process to open a Xapo Account you will be asked for personal information that we will use to confidentially verify your identity and to carry out checks to assess whether you are eligible for a Xapo Account and our Services.

7.3 By entering into these Terms you confirm that you consent to Xapo Bank carrying out such verifications and that a third party can also do this on our behalf.

7.4 You agree to fully cooperate with all requests made by us or a third party acting on our behalf, to identify or authenticate your identity or validate your source of funds or your transactions.

7.5 We reserve the right to refuse to open a Xapo Account for you, or if opened, to close, suspend, or limit access to your Xapo Account and our Services, either temporarily or permanently, including, without limitation, where we are required or recommended to do so by applicable governmental, regulatory or law enforcement requirements or applicable laws and regulations, or in the event that we are unable to obtain and verify such information to our satisfaction or you do not comply with our requests.

8. THE XAPO PLATFORM
8.1 We licence the use of the Xapo Platform, subject to these Terms and to any rules and policies applied by any third party such as an app store provider or operator in the case of the Xapo Bank App. We do not sell the Xapo Platform to you. We remain the owners of the Xapo Platform at all times.

8.2 This licence also governs any software updates that we provide unless we issue a new licence at the time of the update.

8.3 In the case of the Xapo Bank App, you must keep it updated when new versions are made available through the App Store or Google Play. Depending on the update, you may not be able to use the Xapo Bank App or it may not work as intended until you have downloaded the latest version of the Xapo Bank App and accepted any new terms.

8.4 In consideration of you agreeing to abide by these Terms, we grant you a non-transferable, non-exclusive and royalty-free licence to use the Xapo Platform and software embedded in it to open and manage your Xapo Account and to access our Services, but always subject to these Terms and any other documents relevant to the Services we offer from time to time.

8.5 This licence will terminate immediately when we or you close your Xapo Account and you delete the Xapo Bank App. We reserve all other rights in their entirety.

8.6 You must not:

a) Install the Xapo Bank App on, or transfer the Xapo Bank App to, anyone else’s phone; b) Translate, adapt, vary, modify, violate, circumvent, reverse-engineer, decompile, disassemble, create derivative works or otherwise interfere with any element of the Xapo Platform or assist anyone else to do any of these things; c) Use the Xapo Platform in any unlawful manner or in contravention of these Terms any other documents relevant to the Services we offer from time to time; d) Collect or harvest any information or data from the Xapo Platform or our systems or attempt to decipher any transmissions to or from our systems; or e) Upload any content, which is or may be considered violent, threatening, liable to incite racial hatred, in breach of confidence or privacy, discriminatory, defamatory, abusive, unlawful, pornographic, obscene, indecent, profane or which may cause annoyance or inconvenience to any other person.

8.7 If you do anything which is prohibited under this paragraph, you may be responsible for any losses Xapo Bank suffers as a result.

9. USING YOUR XAPO ACCOUNT
9.1 All activities under your Xapo Account shall be deemed as activity carried out by you, the verified customer. You shall only use the Services in the Xapo Account to transact on your own Xapo Account and not on behalf of any other person or entity.

9.2 You will not:

a) Violate any law, regulation, contract, intellectual property or commit a tort while using your Xapo Account or our Services;

b) Use the Xapo Account and our Services in any manner that could interfere with, disrupt, negatively affect, or inhibit other customers from fully enjoying their Xapo Account and our Services, or that could damage, disable, overburden, or impair the functioning of their Xapo Account or our Services in any manner;

c) Use the Xapo Account or any of our Services to pay for, support, or otherwise engage in any illegal gambling activities, fraud, money-laundering, or terrorist activities, or other illegal activities;

d) Attempt to circumvent any content filtering techniques Xapo Bank employs, or attempt to access any service or area of the Xapo Platform and our Services that you are not authorised to access;

e) Develop any third-party applications that interact with the Xapo Platform or any of our Services without our prior written consent, or unless otherwise agreed;

f) Post content or communications that are, in our sole discretion, libellous, defamatory, profane, obscene, pornographic, sexually explicit, indecent, lewd, vulgar, suggestive, harassing, hateful, threatening, offensive, discriminatory, bigoted, abusive, inflammatory, fraudulent, deceptive or otherwise objectionable;

g) Post content containing unsolicited promotions, political campaigning, or commercial messages (SPAM) or any chain messages or customer content designed to deceive or trick other customers of our Services;

h) Post content containing private information of any third-party including, but not limited to, addresses, phone numbers, email addresses, social security numbers and credit card numbers; or

i) Encourage or induce any third party to engage in any of the activities prohibited under this clause.

9.3 Transaction history is displayed within your Xapo Account. All your transactions (including your Balance, money you have uploaded, received, sent and/or withdrawn) are recorded in the transaction history section of your Xapo Account. You may access this information after you access your Xapo Account.

9.4 You must check your Xapo Account regularly and carefully. If you suspect an incorrect or unauthorised payment has been made from your Xapo Account you must notify us without undue delay and in any event no later than 13 months after the payment date to be entitled to a rectification. If the payment was unauthorised, we will refund the amount of the unauthorised payment immediately and by no later than the end of the business day following the day on which the unauthorised payment was communicated to us and, if applicable, restore your Xapo Account to the state that it would have been in if the unauthorised payment had not taken place PROVIDED THAT:

a) You will bear the loss incurred from an unauthorised payment on your Xapo Account, up to a total of EUR 50 (or currency equivalent), arising from the use of a lost, stolen or misappropriated Payment Instrument unless (i) the loss, theft or misappropriation was not detectable to you prior to the payment and you have not acted fraudulently, or (ii) the loss was caused by actions or lack of action by us or any of our employees, agents or third parties acting on our behalf;

b) You will bear all losses relating to an unauthorised payment on your Xapo Account, and the limit of EUR 50 (or currency equivalent) above shall not apply, if you incurred those losses by acting fraudulently or by failing, intentionally or with gross negligence, or if you failed to take all reasonable steps to keep the Payment Instrument and personalised security credentials safe, to use the Payment Instrument in accordance with any terms that we tell you are applicable to it, and to notify us without undue delay of it being lost, stolen, misappropriated or used in an unauthorised manner;

c) So long as you have not acted fraudulently you will not bear any financial consequences resulting from the use of a lost, stolen or misappropriated Payment Instrument after you have notified us in accordance with this Agreement that it has been lost, stolen or misappropriated;

d) If our customer authentication (i.e the Security Information or any other password or a PIN, a card or an authentication code generating device, or a fingerprint, for example) is not strong enough to comply with applicable legal or regulatory standards, you will not bear any financial losses unless you have acted fraudulently.

9.5 If we make a payment into your Xapo Account by mistake, we will take out the same amount without asking for your permission but will let you know what has happened. If someone else tells us they have made a payment into your Xapo Account by mistake, we will check with you first before returning the funds. If you disagree, we will not return the funds to the payer, but we may put the payer’s bank in contact with you directly.

9.6 Xapo Bank may from time to time offer you the ability to store multiple currencies in your Xapo Account. The available currencies are subject to change from time to time. When this feature is available, which Xapo Bank does not warrant it will ever be available, you agree and accept all the risks associated with maintaining balances in multiple currencies including any risks associated with fluctuations in the relevant exchange rates over time. You agree that you will not use your Xapo Account or our Services for speculative trading.

9.7 Subject always to clause 9.10, you undertake to always have a zero or positive Balance in your Xapo Account. If your Xapo Account goes into a negative balance as a result of a chargeback, reversal of a transaction, deduction of fees or any other action carried by you, you agree to repay the negative balance immediately without any notice from us by adding funds to your Xapo Account, otherwise your failure to do so shall constitute a breach of these Terms.

9.8 You authorise Xapo Bank, in its sole discretion, to debit your other payment methods that you have made available to us, including from other balances held in your Xapo Account or other linked accounts, in any amount necessary to remedy a negative balance or to recover any other sums owed to us by you.

9.9 Without prejudice to our right to set-off in these Terms, if you fail to remedy a negative balance we may suspend your access to and/or use of our Services, send you reminders or take such other reasonable actions to recover the negative balance from you, for example, we may use our right to set-off, a debt collection service or take further legal actions. We will charge you for any costs we may incur as a result of these additional collection efforts.

9.10 Xapo Bank reserves the right to impose a Minimum Balance and to change it by providing you with at least two months’ advance notice of any such amount or increase. We also reserve the right to waive and/or reduce any Minimum Balance at any time, with or without notice.

9.11 In order to continue to provide you with your Xapo Account, we carry out certain checks and monitoring of your activity, including identity and fraud checks and transaction monitoring, on a regular basis.

9.12 If you are blocked by Xapo Bank from accessing your Xapo Account or any of our Services (including by blocking your IP address), you agree not to implement any measures to circumvent such blocking (including by masking your IP address or using a proxy IP address).

10. INTEREST
10.1 For the purposes of this clause 10, a “Qualifying Balance” is defined as a Balance that earns interest and is indicated to you as such.

10.2 A Balance in your Xapo Account will not earn any interest unless this is indicated to you. When interest is paid, details of the interest (such as type and rate) we pay and any other criteria (such as any minimum Qualifying Balance requirement) will also be specified in the Xapo Bank App or elsewhere in the Xapo Platform.

10.3 We calculate interest payable on a cleared Qualifying Balance at the end of each day having taken account of all inward and outwards payments on that day. The type of the interest rate we pay will always be, unless otherwise indicated to you, a variable rate which means we may change the interest rate at any time. Xapo Bank reserves the right to waive any interest payable or reduce any interest rate by informing you of this in the Xapo Bank App or elsewhere in the Xapo Platform. We also reserve the right to increase any interest rate at any time, with or without notice.

10.4 Interest earned will be in the currency of the Qualifying Balance. We do however reserve the right to pay you any amount of interest with Supported Currency, regardless of the currency of the Qualifying Balance and to use any number of them for any interest payment. All interest earned shall be paid to you within the Xapo Bank App with Supported Currency chosen by Xapo Bank at the time. We reserve the right to change the Supported Currency we choose to pay out interest in for another Supported Currency at any time without prior notice to you.

10.5 In the event that we choose to pay any amount of interest in a Supported Currency that is different to the Qualifying Balance, you authorise Xapo Bank to exchange the interest payment amount to Xapo Bank’s chosen Supported Currency at the prevailing exchange rate (or rates in the event that we use more than one Supported Currency) when such an exchange takes place. Xapo Bank does not provide any type of guarantee whatsoever on the exchange rates to be applied or being able to obtain the best available rate nor does it offer any type of protection against fluctuations in the applicable exchange rate that may occur during the exchange.

10.6 If for whatever reason, Xapo Bank is not be able to directly handle the exchange of the interest payment or part of it into a Supported Currency, you authorise Xapo Bank to instruct at its sole discretion an affiliate or third party or parties of its choice or both to carry out this exchange on our behalf and only upon our instructions and directions to deposit the exchanged interest payment to your credit within the Xapo Bank App. Xapo Bank will always be responsible for your earned interest during this exchange process when it is done by an affiliate or third party.

10.7 When available, the ability to earn interest on a Qualifying Balance is open to all customers who have been verified by us and have a verified Xapo Account. We reserve the right to limit the number of customers that have the ability to earn interest at any given time, to apply varying interest rates depending on the amount of the Qualifying Balances and to offer introductory, promotional or preferential rates to certain customers at our sole discretion.

10.8 You will stop earning any interest payable on any Qualifying Balance if you close your Xapo Account. Upon closure, any remaining funds in the Xapo Account, including any interest payments due, will be aggregated with the remaining funds in your Xapo Account. The aggregated funds will then be made available for withdrawal by you. In the event that Xapo Bank terminates the payment of interest on any Qualifying Balance no further interest will be earned after the date of termination.

10.9 You have the sole responsibility of ensuring that any interest payable to you is properly credited within the Xapo Bank App.

10.10 We reserve the right to delay or suspend the payment of all or part of any earned interest on a Qualifying Balance where we are required to do so by, but not limited to, governmental, regulatory or law enforcement requirements or applicable laws and regulations.

11. SECURITY
11.1 When you download the Xapo Bank App, you will be required to provide certain Security Information. You must take all reasonable steps to keep your mobile device, the Xapo Bank App and the Security Information secure and confidential.

11.2 You must not:

a) Disclose or share your Security Information with any other person;

b) Let anyone access your Xapo Account or watch you access it;

c) Use any functionality that allows your Security Information to be stored by the computer or browser you are using or to be cached or otherwise recorded;

d) Do anything which may in any way avoid or compromise the authentication processes.

11.3 You must let us know, without undue delay, if you think anyone else has your Security Information or has otherwise managed to unlawfully access your Xapo Account. We will never ask you for your passcode, PIN or password, so you must not share these with other people, even if you think they work for us. Any undue delays in notifying us may affect the security of your Xapo Account and also result in you being responsible for financial losses.

11.4 You are responsible for configuring your information technology, computer programmes and platform in order to access the Xapo Platform and our Services. You should use your own virus protection software. We cannot guarantee that the Xapo Platform or any of our Services will be free from bugs or viruses.

11.5 You must not misuse our Services by introducing viruses, trojans, worms, logic bombs or other materials which are malicious or technologically harmful. You must not attempt to gain unauthorised access to the Xapo Platform, our servers, computers or databases. You must not attack the Xapo Platform with any type of denial of service attack. By breaching this provision, you would commit a criminal offence. We will report any such breach to the relevant law enforcement authorities and we will cooperate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use the Xapo Platform and our Services will cease immediately.

12. THIRD PARTY PROVIDER
12.1 If you authorise a Third Party Provider to access your Xapo Account, you acknowledge that we may disclose certain information about your Xapo Account to them. We are not responsible for the use of your Xapo Account made by any such Third Party Provider or any information in your Xapo Account.

12.2 We can refuse or stop access to a Third Party Provider if we're concerned it isn’t authorised or if we believe it's fraudulent or acting fraudulently. If that happens, we'll contact you to explain why unless we believe that would compromise our security or it would be unlawful.

13. INSTRUCTIONS
13.1 You can give us instructions in different ways (for example, through the Xapo Bank App). Depending on how you place your payment with us, we may also need to verify that order by obtaining your authorisation either by signature, use of a password, use of a PIN, or by fingerprint or facial verification. You can also give instructions through third parties you’ve authorised to act on your behalf, for example powers of attorney and third party providers (such as account aggregator services, which let you access information about all your accounts held with different banks in one place). You agree that we may act on any instructions we receive through a third party provider as if you had given those instructions directly to us.

13.2 In giving us this information, you will be consenting to our execution of that payment instruction for you. You cannot withdraw that consent after you have given it to us. If the payment is for a standing order to be taken from your Xapo Account, you can contact us to revoke that payment and your consent up to close of business on the Business Day before the funds are to be debited from your account. In exceptional cases, we may allow you to withdraw your consent after the times specified above, but our specific agreement will be required and we will not be obliged to do this. A fee may be charged for any withdrawal agreed and effected, details of which are available upon request.

13.3 If your payment instruction is received by us after 5 pm GMT on a Business Day or not on a Business Day, your payment order will be deemed received on the following Business Day. If we agree with you that a payment instruction is to be executed on a particular Business Day, then we will be deemed to have received that instruction on that particular Business Day.

13.4 Once we are deemed to have received a payment instruction under clauses 13.1 to 13.3 above, you agree that we have up to the end of the third Business Day following the date of deemed receipt under clause 13.3 above to credit the amount of that instruction to the recipient ’s bank. We confirm that we have up to the end of the first Business Day following the date of deemed receipt under clause 13.3 above to so credit that amount. We do not have any control over the time it may take for the recipient’s bank or payment provider to credit and make available funds to the recipient.

13.5 We will act on your instructions in respect of your Xapo Account, unless we believe an instruction:

a) Has not been made by you;

b) Is ambiguous or unclear;

c) Is against the law; or

d) Has been made with fraudulent or criminal intent.

13.6 If we refuse to act on your instructions for any of the above reasons we will not be liable for any loss this may result in, nor will we be obliged to inform the intended recipient.

13.7 We may also refuse to act on your instructions if we are required to for legal reasons or if you are in breach of these Terms. We will get in touch with you as soon as possible if we have refused to act on your instruction, or held a payment instruction for a period of time, unless we are not allowed to for legal reasons.

13.8 If you have authorised someone else to access and operate your Xapo Account (including any Third Party Provider), we will need to see written evidence of this authorisation before acting on their instructions.

13.9 We may, at our sole discretion and for legal and security reasons, impose limits on your Xapo Account (including how much you can upload or transfer into or out of your Xapo Account). In certain circumstances, by providing us with further information or additional documentation as required by us, we may carry our additional checks on you to determine whether we can remove any such limit(s) from your Xapo Account. We do not warrant that such limit(s) can or will be removed from your Xapo Account after you provide us with additional information and documentation that we may require.

14. ADDING FUNDS & RECEIVING PAYMENTS
14.1 You can add or transfer funds into your Xapo Account by following the steps as they appear when you choose this function in the Xapo Bank App and using the methods we support from time to time.

14.2 If you receive an Unsupported Currency Payment, we may charge a fee and apply an exchange rate to receive it. Other organisations are also involved in processing an Unsupported Currency Payment and we are not responsible for all stages of it. This could mean that these organisations could also take a fee resulting in you receiving more or less than you expected. We won't be responsible for any losses if this happens. We will let you know the exchange rate applied once we have credited the payment.

14.3 Subject to clause 13.3, we are not responsible for the funds you have uploaded or have had transferred to your Xapo Account until we have received them. It is your responsibility to ensure that your Xapo Account details that you use or provide to someone else to receive a payment into your Xapo Account are accurate and complete. If it is not, we may not be able to process a payment instruction to your Xapo Account and the payment may be delayed or fail to reach your Xapo Account.

14.4 If you fail to receive a payment and the payer’s bank can prove that we received the payment for you, then we will be liable to you. If we are liable to you we will immediately place the amount of the transaction at your disposal and credit the amount to your Xapo Account. We will ensure that the amount of the payment is at your disposal immediately after it is credited to your Xapo Account. If we are not liable as set out above, the payer’s bank will be liable to the payer for the payment. Regardless of whether we are liable or not, we will immediately try to trace the payment and notify you of the outcome.

14.5 You acknowledge that funds received in your Xapo Account may be subject to reversal and you agree that we may deduct such an amount from your Xapo Account if it was reversed by the person who paid you or any relevant payment services provider.

14.6 You may be presented with one or several methods of uploading funds to your Xapo Account, the availability of which will depend on a number of factors including your verification status with us. As these methods are provided by third parties and are not part of our Services we cannot guarantee their continued availability and we may need to discontinue or replace them at any time without notice to you.

14.7 Where applicable, any Payment Instrument (such as your credit card or debit card) used to upload funds into your Xapo Account must be in your name.

14.8 You will not exercise any chargeback rights unless we have breached these Terms or there was an unauthorised use of your Payment Instrument (such as your credit card or debit card). You promise that you will not exercise your chargeback right for reasons which we are not responsible for, including a dispute with your recipient or if there are insufficient funds in your payment instrument. If we need to investigate or take any actions in connection with a chargeback raised by you, we may charge you for our costs in doing so and may deduct such an amount from your Xapo Account.

14.9 Your Xapo Account will be credited once the funds have cleared. If and when available, you credit your Xapo Account using your credit card or debit card, we will credit your Xapo Account as soon as possible subject to our right of reversal.

14.10 We reserve the right to delay or not process an incoming payment method into your Xapo Account where we are required to do so by, but not limited to, governmental, regulatory or law enforcement requirements or applicable laws and regulations.

15. MAKING PAYMENTS
15.1 You must have enough funds in your Xapo Account to cover the full amount of any payment you wish to make otherwise you will not be able to continue with the payment transaction. In the event that you are able to make a payment despite a lack of funds, you must repay the amount owing to us immediately.

15.2 When making a payment from your Xapo Account, it is your responsibility to ensure that the information you provide on the recipient and their account details is accurate and complete. If it is not, we may not be able to process a payment instruction to that payee or the payment may be delayed or fail to reach that payee. In any event, the payment instruction will be deemed to have been executed correctly by us if we execute it in accordance with the information you provide and Xapo Bank will not be liable for any loss you suffer as a result of wrong or incomplete information provided by you.

15.3 If you make payment from your Xapo Account, we are liable to you for its correct execution unless we can prove to you (and if necessary to the recipient’s bank) that the recipient’s bank received the payment. If we are liable to you for a defective or incorrectly executed payment instruction, we will refund the amount of it to you and, if applicable, restore your Xapo Account to the state that it would have been in if the defective or incorrect payment instruction had not taken place. Irrespective of whether we are liable to you or not in these circumstances, we will try to trace the payment and notify you of the outcome. If we refuse to execute a payment we will provide the reasons to you and the procedure for correcting any factual mistakes that may have led to the refusal unless prohibited by law or regulatory requirements.

15.4 You may be presented with one or several methods of withdrawing funds from your Xapo Account, the availability of which will depend on a number of factors including where you live and your verification status with us. As these methods are provided by third parties and are not part of our Services we cannot guarantee their continued availability and we may need to discontinue or replace them at any time without notice to you.

15.5 If you wish to make an Unsupported Currency Payment from your Xapo Account, we will process this using the exchange rate and any fees confirmed to you at the time of making the payment. Other organisations are also involved in processing an Unsupported Currency Payment and we are not responsible for all stages of it. This could mean that these organisations could also take a fee resulting in the person you are paying receiving less than expected. If we become aware that an Unsupported Currency Payment has been rejected or delayed, we will try to help you retrieve the funds. If any funds are returned to you for any reason, they may need to be reconverted to another currency and you may receive less than you originally paid.

16. XAPO CARD
16.1 Xapo Bank may from time to time offer a payment card (”Xapo Card”) as a service to compliment your Xapo Account. Your Xapo Card will be governed by separate applicable terms which will be made available to you at the same time as the Xapo Card is available to you (either in physical or virtual form) or as otherwise indicated to you.

16.2 A Xapo Card, including any replacement card, means a device, whether or not in card form, and whether in physical or virtual form, issued to you by Xapo Bank which can be used to pay for goods and services at participating merchants that accept the card programme being used. The Xapo Card can also be used to withdraw money from cash machines (ATMs); these may charge you for your withdrawal.

16.3 You can only use the Xapo Card to spend the Balance in your Xapo Account (and not in any other sub-account unless indicated to you) and we do not guarantee that a particular merchant will accept the Xapo Card so please check with the merchant before attempting the transaction if you are unsure.

16.4 If a Xapo Card is made available to you, either in physical or virtual form or both, then you will be able to request a Xapo Card by following a process in your Xapo Account and accepting applicable terms separate to these Terms. You will be notified when the Xapo Card is available to you, either in physical or virtual form.

16.5 Upon termination of your agreement with us and closure of your Xapo Account for whatever reason, we will process the refund of any remaining balance belonging to you as quickly as we can. We are required to allow 5 days for any outstanding purchases made on your Xapo Card to arrive before we process the refund and most high street banks then take a further 2-3 working days before they show the refund in your personal bank account. For that reason, we ask you to allow 8-10 working days for the refund to show in your personal bank account.

16.6 Your Xapo Card will expire on the expiry date on the card, at which point, subject to your Xapo Account being in good order, we may issue you with, or make available the ability to have issued, a new Xapo Card to you shortly before the expiry date. We are not obliged to do so, and may elect not to issue a replacement Xapo Card at our sole discretion. If we do issue a new Xapo Card, a new expiry date will apply and the new Xapo Card will expire on that expiry date.

17. RATES, FEES & CHARGES
17.1 The rates, fees and charges we apply to your actions and use of our Services are clearly shown in the Xapo Bank App prior to you accepting them.

17.2 You agree to pay all rates, fees and charges we apply on time. Prompt payment is essential and shall be made without previous demand and to no one but us or without our prior consent. We are entitled to grant time or other indulgence for the payment or satisfaction of any of your obligations under this Agreement without affecting any of our rights, or operating as a waiver of such right in whole or in part.

17.3 All fees and charges we apply shall be deducted either from the Balance of your Xapo Account or other linked accounts within the Xapo Bank App, from the funds being credited to your account or any other payment method made available for such purposes.

17.4 Xapo Bank reserves the right to charge additional rates, fees and charges or to change the amount of rates and charges, by providing you with at least two months’ advance notice of any such addition or change. We also reserve the right to waive and/or reduce any fee at any time, with or without notice.

17.5 We maintain a Rates, Fees & Charges Sheet and a Glossary of Terms for your information.

18. CLOSING YOUR XAPO ACCOUNT
18.1 Subject to clauses 18.2 and 18.3, you are entitled to end this Agreement with us and close your Xapo Account at any time, by contacting our support team, except where our Agreement has been in force for less than six months, in which event Xapo Bank reserves the right to impose an appropriate charge which corresponds to the costs of termination.

18.2 If you decide to close your Xapo Account within 14 days of accepting these Terms, and you have paid a fee for this, we are obliged to refund you that fee. We will not refund you any fee paid to Xapo Bank, including a fee paid for your Xapo Account, if you inform us of your decision to close your Xapo Account after the expiry of said 14 days or if we reasonably believe you have breached the terms of our Agreement or any applicable law.

18.3 Before we close your Xapo Account you must repay all the outstanding amounts owed to us and delete the Xapo Bank App from your mobile device. Once closed, you will not be able to use, access or reactivate your Xapo Account.

18.4 You must also withdraw any remaining Balance at the time of closure within a reasonable timeframe. After a reasonable period of time, you will no longer have access to your Xapo Account and you will have to contact our support team to withdraw your remaining Balance. We may charge a fee or even a recurring fee for holding your funds if this happens.

18.5 Xapo Bank is entitled to close your Xapo Account and terminate our Agreement by providing you with two months’ written notice. Our termination of our Agreement will not affect any of our rights or obligations arising under these Terms.

18.6 We may also close your Xapo Account immediately and without notifying you of our decision if any of the following happens:

a) You deliberately use your Xapo Account for criminal or fraudulent purposes or someone else is using your Xapo Account without your authority;

b) There has been no transaction on your Xapo Account for more than 24 consecutive months;

c) We do not have sufficient information to operate your Xapo Account or it turns out you were not entitled to open a Xapo Account in the first place;

d) Your behaviour towards our staff makes it difficult for us to deal with you (for example, you are threatening or abusive towards our staff);

e) You are no longer entitled to have a Xapo Account with us or you do not accept any revised Agreement or other applicable terms;

f) You do not pay any fees or charges on time;

g) You go into bankruptcy, insolvency, enter into an individual voluntary arrangement, have a debt relief order or trust deed lodged against you or enter into any other form of analogous circumstances;

h) You die; or

i) You break any of the terms of our Agreement in any way.

18.7 Any terms which by their nature should survive, will survive the termination of our Agreement.

19. INTELLECTUAL PROPERTY
19.1 You accept and acknowledge that we own or licence all intellectual property rights in our logo, designs, brand and name, our software, our Website, the Xapo Bank App and all related materials. No right (including intellectual property right) in these things will vest in you at any time.

19.2 You agree that you will automatically grant us a non-exclusive, perpetual, irrevocable, royalty-free and sub-licensable licence to all intellectual property rights in:

Any of your feedback on, or in connection with, the Xapo Platform, Services and/or content; and Improvements (including ideas for improvements and software code, documentation or other material documenting improvements) to the Xapo Platform, that you make publicly available to us, including through the Xapo Platform or on any other application, platform or open source repository.

19.3 You may not use, copy or retransmit anything on the Xapo Platform without our permission. We reserve all rights not expressly granted in these Terms.

20. LIABILITY
20.1 Xapo Bank accepts no liability for any losses as far as the law permits, for any of its Services, except where we have accepted liability.

20.2 The matters for which we are not liable include the following:

a) Business losses incurred, including loss of profits, loss of business, business interruption or loss of business opportunity;

b) Losses incurred as a result of your inability to access your Xapo Account, the Xapo Bank App or any of their functions (including making and receiving payments);

c) Losses incurred as a result of abnormal or unforeseeable circumstances outside our reasonable control, including delays or failures caused by problems with another system or network, data processing failures, mechanical breakdown or industrial action;

d) Losses or costs incurred where a regulatory requirement means we must break our Agreement;

e) Losses incurred as a result of your negligence, fraud or breach of any of the terms of our Agreement;

f) Losses incurred as a result of you sharing your information, Security Information or the Xapo Bank App with any other person;

g) Technological attacks caused by a bug, virus, or other technological attacks or harmful material that may infect your computer equipment, computer programmes, data or other proprietary material related to your use of our Services.

20.3 In the event of loss or claims or costs and expenses arising out of your breach of these Terms, any supplemental terms, and any other documents mentioned in these Terms, any applicable law or regulation and/or your use of our Services, you agree to compensate us and our affiliates and hold us harmless. This provision will continue after our relationship ends.

21. ACCESS TO OUR SERVICES
21.1 We will use our best endeavours to make sure our Services are available to you when you need them.

21.2 We do not give any representations, warranties or guarantees, whether express or implied, that our Services will be uninterrupted or free from errors or omissions or that the content is accurate, complete or up-to-date.

21.3 Our Services are provided on an “as is”, “as available” basis and we may suspend, withdraw or change all or any part of them without notice.

21.4 Xapo Bank will not be held liable for any interruptions or unavailability of our Services at any time or for any period.

22. SET-OFF
22.1 If any money you owe us is overdue for payment, or if you fail to remedy a negative balance on your Xapo Account, with or without our prior notice, we may exercise our right to set-off. This means that we have the right to take any interest, rewards or any similar type of return payable to you, debit any amount necessary from other payment methods that you have made available to us, including from any other Balances held in your Xapo Account or other linked accounts within the Xapo Bank App, to reduce or repay what you owe us or to remedy a negative balance.

22.2 Where applicable, if the money to be set-off is expressed in different currencies we reserve the right to convert the money in your Xapo Account at a market rate of exchange for the purpose of set-off.

22.3 Xapo Bank will only do this if we consider it reasonable to do so, taking into account your circumstances and any regulatory requirements.

22.4 You have no right to set-off any claims that you may have against Xapo Bank against any liability that you may have to Xapo Bank.

22.5 Our right to set-off also applies to all Balances held in your Xapo Account or other linked accounts within the Xapo Bank App. If you don’t have enough money in your Xapo Account to cover any amount owed, we may refuse to execute any transaction on your behalf or provide any Services to you.

23. HOW TO MAKE A COMPLAINT
23.1 As we take your complaints very seriously we have prepared a dedicated section in our Website to explain how we go about handling this. Please click here for more information.

23.2 All complaints will be subject to our Complaints Handling Policy and Procedure. A copy of this document can be provided to you upon request to our Membership Services Team.

23.3 We will always try our best to deal with your complaint in accordance with our legal and regulatory obligations and resolve any complaint you may have. If you are still unsatisfied with our response, you can ask us to escalate this internally for you up to management level. You may also be entitled to take your complaint to the GFSC.

23.4 If, following this, you are still not satisfied with the response provided by us, or believe you have a case for compensation financially, you can pursue this through the Gibraltar courts.

24. TAX
24.1 You have sole responsibility for making any applicable filings and complying with any and all applicable laws, rules and regulations relating to the management of your tax affairs.

24.2 It is also your sole responsibility to determine, what, if any, taxes apply to the payments you make or receive from your Xapo Account (including cash withdrawals) and any interest, benefits or rewards you earn, and it is also your responsibility to collect, report and pay the correct tax to the appropriate tax authority.

24.3 You confirm that you will take your own tax advice to ensure our Services are suitable for you. We will not provide you with that advice nor will we be responsible for the execution of tax obligations, or calculations and transfer of taxes applied to you.

24.4 You further confirm that you will compensate Xapo Bank for any damages we may sustain if you fail to meet your obligations towards the Gibraltar tax authorities or any other foreign tax authority and that you will hold us harmless against all claims and liability we may incur as a result.

25. TAX REPORTING
25.1 As a recognised financial institution, Xapo Bank is subject to the international ‘Common Reporting Standard’ (CRS) and the ‘Foreign Account Tax Compliance Act’ (FATCA) which require us to collect certain information about you and your Xapo Account, including which country or countries you are a tax resident in. If we ask for any information from you, which is required for us to comply with our tax reporting obligations, you must provide this to us as soon as possible, otherwise we may need to close your Xapo Account. Similarly you must promptly inform us if your circumstances change, including if you become liable to pay tax or report to tax authorities in any other country, or become tax resident in any other country.

25.2 If you tell us about any tax obligations, or we believe you have any such obligations in any country other than Gibraltar, we will provide certain details (including but not limited to your account number, account balance, tax identification number, name and address) to the relevant tax authorities in other countries, in accordance with our legal obligations.

25.3 Where applicable, if a change in the interest or exchange rate is based on a reference interest or exchange rate, or the change in the interest or exchange rate is more favourable to you, you agree that such a change may be applied by us immediately and without notice to you. You agree that we may inform you of such a change by publication of the change on our Website or elsewhere on the Xapo Platform.

26. DATA PROTECTION
26.1 How Xapo Bank processes your personal information is governed by these Terms, Our Privacy Policy, our Cookie Policy and any other supplements or changes to either of them which may apply from time to time.

26.2 To provide the Services we need to collect information about you. For these purposes we are the ‘data controller’. By entering into these Terms you are giving us permission to gather, process and store your personal information for the purpose of providing the Services to you. This doesn’t affect any rights and obligations you or we have under applicable data protection law.

26.3 If you give a Third Party Provider access to your Account, you should know that we have no control over how they will use your information nor will we incur any liability for any loss of personal information after the Third Party Provider has access to your personal information.

26.4 We reserve the right to transmit some or all of your personal information as well as your Xapo Account activity and any other information you have provided us with to law enforcement institutions, state authorities, regulators, financial institutions and government departments, if this is necessary for Xapo Bank to comply with relevant legislation, and in order to identify whether these Terms and relevant legislation have not been violated.

27. CHANGES TO THESE TERMS
27.1 We have the right to change these Terms, supplemental terms, and any other documents relevant to the Services we offer from time to time. We will make changes immediately without notice if they are in your favour or where we are required by law, or where required with the applicable notice period required by law so you can consider the changes we have made.

27.2 If you do not agree with the changes we make, we may close your Xapo Account at any time within the required notice period without a charge. You will be deemed to have accepted our changes if you do not notify us that the changes are not accepted during this period and the changes will apply to you.

27.3 Where applicable, if a change in the interest or exchange rate is based on a reference interest or exchange rate, or the change in the interest or exchange rate is more favourable to you, you agree that such a change may be applied by us immediately and without notice to you. You agree that we may inform you of such a change by publication of the change on our Website or elsewhere on the Xapo Platform.

28. DEATH OR INCAPACITATION
28.1 In the event that you die or are otherwise incapacitated, Xapo Bank will cooperate with your Representatives in accordance with applicable laws and regulations.

28.2 Upon notice of your death or incapacitation, Xapo Bank may suspend activity in your Xapo Account, pending verification or resolution of such notice.

28.3 Notwithstanding the foregoing, prior to agreeing to transfer funds from your Xapo Account to your representative(s), Xapo Bank reserves the right to require your representative(s) to do the following:

To provide evidence reasonably satisfactory to Xapo Bank that demonstrates your death or incapacitation and the subsequent entitlement of your representative(s) to such a transfer;

To comply with and submit to identity verification requirements which are at least equivalent to those you were submitted to when opening your Xapo Account as set out in this Agreement;

To indemnify and hold Xapo Bank harmless to the extent and in the form required by Xapo Bank, including, but not limited to, claims of negligence; and

To provide any other information, evidence, documentation, confirmation or any other details or verification that we may reasonably require in order to allow us to process such a request.

29. TRANSFER OF THIS AGREEMENT
29.1 You may not transfer any responsibilities or rights, benefits or interests in your Xapo Account or under these Terms or any other document relevant to the Services we offer, or create any security over money in your Xapo Account in favour of someone else without our prior written consent. This does not affect any transfer that takes effect under the general law.

29.2 We may transfer our rights and benefits under these Terms and any other documents relevant to our Services at any time without prior written notice to you. We may subcontract any of our obligations under this Agreement to the extent permitted by applicable law and regulations.

30. SEVERABILITY
30.1 Each provision of these Terms operates separately and individually from the others.

30.2 If for any reason a court of competent jurisdiction or a competent authority finds any provision of these Terms invalid or unenforceable, that provision will be enforced to the maximum extent permissible and the other provisions of these Terms will remain in full force and effect.

31. NO WAIVER
Any delay or failure on our part to exercise or enforce any provision, right or remedy in these Terms will not constitute a waiver of that provision, right or remedy or preclude its exercise at any subsequent time.

32. PREVIOUS AGREEMENTS
Our Agreement supersedes and extinguishes all previous agreements, promises, assurances, warranties, representations and understandings between you and Xapo Bank, whether written or oral, in relation to its subject matter.

33. WHICH LAWS APPLY?
33.1 These Terms and any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with it or its subject matter or formation shall be governed by and construed in accordance with Gibraltar Law.

33.2 Each party irrevocably agrees that the courts of Gibraltar shall have exclusive jurisdiction to settle any dispute or claim (including non-contractual disputes or claims) arising out of or in connection with these or its subject matter or formation.
            </div>
            <div class="mt-4 flex gap-2">
              <button id="accept-terms-btn" class="btn-primary px-4 py-2 rounded-lg">I accept</button>
              <button id="close-terms-bottom" class="btn-secondary px-4 py-2 rounded-lg">Close</button>
            </div>
          </div>
        </div>

        <!-- Privacy Policy modal (mirrors Terms modal behavior) -->
        <div id="privacy-modal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 hidden">
          <div class="bg-white max-w-3xl w-full mx-4 rounded-lg p-6 overflow-auto max-h-[80vh]">
            <div class="flex justify-between items-start">
              <h3 class="text-lg font-medium">Privacy Policy</h3>
              <button id="close-privacy" class="text-slate-500 hover:text-slate-700">Close</button>
            </div>
            <div class="mt-4 text-sm text-slate-700">
              <p>We respect your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our services.</p>
              <p class="mt-2">Information we collect may include personal identifiers, contact details, and transactional information. We use this data to provide and improve our services, to comply with legal obligations, and to protect against fraud.</p>
              <p class="mt-2">For full details, please review our complete privacy policy on the website or contact our support team for a copy.</p>
            </div>
            <div class="mt-4 flex gap-2">
              <button id="accept-privacy-btn" class="btn-primary px-4 py-2 rounded-lg">I accept</button>
              <button id="close-privacy-bottom" class="btn-secondary px-4 py-2 rounded-lg">Close</button>
            </div>
          </div>
        </div>

        <p class="mt-4 text-center text-sm text-slate-400">Already have an account? <a href="./signin.html" class="text-slate-400 hover:underline">Sign in</a></p>
      </div>
    </section>
  </main>

  <script>
    // Password toggle (for first password field)
    const toggleBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    toggleBtn.addEventListener('click', () => {
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.textContent = 'Hide';
        toggleBtn.setAttribute('aria-pressed', 'true');
      } else {
        passwordInput.type = 'password';
        toggleBtn.textContent = 'Show';
        toggleBtn.setAttribute('aria-pressed', 'false');
      }
    });

    // Client-side validation and submit
    document.getElementById('signup-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById('submit-btn');
      const submitText = document.getElementById('submit-text');
      const submitLoading = document.getElementById('submit-loading');

      const fullName = document.getElementById('fullName').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      const confirm = document.getElementById('confirmPassword').value;
      const terms = document.getElementById('terms').checked;

      if (!terms) { alert('You must accept the terms.'); return; }
      if (password !== confirm) { alert('Passwords do not match.'); return; }
      if (password.length < 8) { alert('Password must be at least 8 characters.'); return; }

      submitText.classList.add('hidden');
      submitLoading.classList.remove('hidden');
      submitBtn.disabled = true;

      const phone = document.getElementById('phone').value.trim();
      const country = document.getElementById('country').value;
      const payload = { fullName, email, password, phone, country };
      try {
        const API_BASE = (window.API_BASE || window.API_URL || 'https://xa-poloan.onrender.com' || location.origin).replace(/\/$/, '');
        const res = await fetch(API_BASE + '/api/auth/register', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        });
        let data;
        try { data = await res.json(); } catch (e) { data = null; }
        if (res.ok) {
          // Auto-login: save token and user then show success popout before redirect
          if (data && data.token) localStorage.setItem('token', data.token);
          if (data && data.data) { try { localStorage.setItem('user', JSON.stringify(data.data)); } catch (e) { console.warn('Could not store user', e); } }
          // If register didn't return a token, try to login explicitly using credentials
          if ((!data || !data.token) && payload.email && payload.password) {
            try {
              const loginRes = await fetch(API_BASE + '/api/auth/login', {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: payload.email, password: payload.password })
              });
              const loginJ = await loginRes.json().catch(()=>null);
              if (loginRes.ok && loginJ && (loginJ.token || loginJ.data?.token)) {
                const tokenVal = loginJ.token || loginJ.data.token;
                localStorage.setItem('token', tokenVal);
                if (loginJ.data) try { localStorage.setItem('user', JSON.stringify(loginJ.data)); } catch(e){}
              }
            } catch (e) { console.warn('Auto-login after register failed', e); }
          }
          const pop = document.getElementById('signup-success');
          const cont = document.getElementById('signup-continue');
          if (pop) pop.classList.remove('hidden');
          // Continue button redirects immediately to dashboard (use root for Vercel)
          const dashboardPath = '/';
          if (cont) cont.addEventListener('click', () => { window.location.href = dashboardPath; });
          // Auto-redirect after 2.5s
          setTimeout(() => { window.location.href = dashboardPath; }, 2500);
        } else {
          const msg = (data && (data.message || data.error)) ? (data.message || data.error) : `Sign-up failed (${res.status})`;
          alert(msg);
        }
      } catch (err) {
        console.error(err);
        alert('Network error — please try again.');
      } finally {
        submitText.classList.remove('hidden');
        submitLoading.classList.add('hidden');
        submitBtn.disabled = false;
      }
    });

    // Terms & Privacy modal wiring: open, close, accept
    (function(){
      function qs(id){ return document.getElementById(id); }
      var termsLink = qs('terms-link');
      var termsModal = qs('terms-modal');
      var closeTop = qs('close-terms');
      var closeBottom = qs('close-terms-bottom');
      var acceptBtn = qs('accept-terms-btn');
      var termsCheckbox = qs('terms');

      var privacyLink = qs('privacy-link');
      var privacyModal = qs('privacy-modal');
      var closePrivacyTop = qs('close-privacy');
      var closePrivacyBottom = qs('close-privacy-bottom');
      var acceptPrivacyBtn = qs('accept-privacy-btn');

      if (!termsLink || !termsModal) {
        if (!privacyLink || !privacyModal) return;
      }

      if (termsLink) termsLink.addEventListener('click', function(e){
        e.preventDefault();
        if (termsModal) {
          termsModal.classList.remove('hidden');
          var heading = termsModal.querySelector('h3');
          if (heading) { heading.setAttribute('tabindex','-1'); heading.focus(); }
        }
      });

      if (privacyLink) privacyLink.addEventListener('click', function(e){
        e.preventDefault();
        if (privacyModal) {
          privacyModal.classList.remove('hidden');
          var heading = privacyModal.querySelector('h3');
          if (heading) { heading.setAttribute('tabindex','-1'); heading.focus(); }
        }
      });

      if (closeTop) closeTop.addEventListener('click', function(){ if (termsModal) termsModal.classList.add('hidden'); });
      if (closeBottom) closeBottom.addEventListener('click', function(){ if (termsModal) termsModal.classList.add('hidden'); });
      if (acceptBtn) acceptBtn.addEventListener('click', function(){
        if (termsCheckbox) termsCheckbox.checked = true;
        if (termsModal) termsModal.classList.add('hidden');
      });

      if (closePrivacyTop) closePrivacyTop.addEventListener('click', function(){ if (privacyModal) privacyModal.classList.add('hidden'); });
      if (closePrivacyBottom) closePrivacyBottom.addEventListener('click', function(){ if (privacyModal) privacyModal.classList.add('hidden'); });
      if (acceptPrivacyBtn) acceptPrivacyBtn.addEventListener('click', function(){
        if (termsCheckbox) termsCheckbox.checked = true;
        if (privacyModal) privacyModal.classList.add('hidden');
      });

      if (termsModal) termsModal.addEventListener('click', function(e){ if (e.target === termsModal) termsModal.classList.add('hidden'); });
      if (privacyModal) privacyModal.addEventListener('click', function(e){ if (e.target === privacyModal) privacyModal.classList.add('hidden'); });

      document.addEventListener('keydown', function(e){
        if (e.key === 'Escape') {
          if (termsModal && !termsModal.classList.contains('hidden')) termsModal.classList.add('hidden');
          if (privacyModal && !privacyModal.classList.contains('hidden')) privacyModal.classList.add('hidden');
        }
      });
    })();
  </script>
</body>
</html>
