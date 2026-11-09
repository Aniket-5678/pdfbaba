
import React, { useEffect } from 'react';
import Layout from '../Layout/Layout';
import { useTheme } from '../context/ThemeContext';

const PrivacyPolicy = () => {
  const [theme] = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const sections = [
    {
      title: '1. Information We Collect',
      content: [
        {
          subtitle: 'Personal Information',
          text: 'Codebricket may collect personal information when you register an account, purchase a digital product, contact us, or interact with our website features.',
          list: [
            'Name and email address.',
            'Account and profile information.',
            'Purchase and transaction details.',
            'Customer support requests and communications.',
            'Information voluntarily submitted through website forms.',
          ],
        },
        {
          subtitle: 'Technical and Usage Information',
          text: 'We may automatically collect technical information when you visit our website, including:',
          list: [
            'IP address.',
            'Browser type and version.',
            'Device and operating system information.',
            'Pages visited and navigation activity.',
            'Referring website and traffic sources.',
            'Date, time, and duration of website visits.',
            'Website interaction and diagnostic information.',
          ],
        },
        {
          subtitle: 'User-Submitted Information',
          text: 'Information you submit through coding exercises, website builder tools, feedback forms, or other interactive features may be processed to provide the requested functionality.',
        },
      ],
    },
    {
      title: '2. How We Use Your Information',
      text: 'We use collected information to operate, maintain, improve, and provide our website and services. This may include:',
      list: [
        'Creating and managing user accounts.',
        'Authenticating users and maintaining login sessions.',
        'Processing digital product purchases.',
        'Providing purchased source code and digital resources.',
        'Managing access to purchased products.',
        'Operating coding practice and educational features.',
        'Providing website builder functionality.',
        'Maintaining purchase and transaction history.',
        'Responding to customer support requests.',
        'Improving website functionality and user experience.',
        'Detecting fraud, spam, and unauthorized activities.',
        'Maintaining website security.',
        'Complying with applicable legal obligations.',
        'Communicating important service-related updates.',
      ],
      note: 'We do not sell your personal information to third parties.',
    },
    {
      title: '3. User Accounts and Authentication',
      text: 'Certain Codebricket services may require users to register or sign in using an account. Account information may be used to:',
      list: [
        'Verify users during login.',
        'Manage account access and authentication.',
        'Associate purchases with the correct account.',
        'Provide account-specific services.',
        'Maintain user preferences and activity where applicable.',
        'Protect accounts against unauthorized access.',
      ],
      extra: [
        'Users are responsible for maintaining the confidentiality of their passwords and login credentials.',
        'Do not share your account credentials with other individuals.',
        'If you suspect unauthorized access to your account, please contact our support team.',
      ],
    },
    {
      title: '4. Digital Products and Source Code Purchases',
      text: 'Codebricket offers digital products, including ready-made website projects, source code, development resources, templates, and other downloadable materials.',
      extra: [
        'Your purchase information may be associated with your registered account.',
        'Purchase information may be stored for order management and customer support.',
        'Digital product access may be provided through your account or designated download functionality.',
        'Access may be subject to conditions mentioned on the relevant product page.',
        'Users are responsible for downloading and securely storing purchased files.',
      ],
      note: 'Unless a specific product listing states otherwise, purchased source code access is generally available for 24 hours after purchase.',
      extra2: [
        'Users should download their purchased files within the available access period.',
        'Product details and applicable purchase conditions should be reviewed before completing an order.',
      ],
    },
    {
      title: '5. Payments and Razorpay',
      text: 'Codebricket uses Razorpay as a third-party payment gateway to facilitate online payments. Transactions are processed through Razorpay payment infrastructure.',
      extra: [
        'Payment ID and Order ID.',
        'Transaction amount.',
        'Payment status.',
        'Payment method information.',
        'Transaction date and time.',
      ],
      note: 'We do not directly store complete credit card numbers, debit card numbers, UPI PINs, or banking passwords on our servers. Payment credentials are handled through the payment provider.',
      links: [
        {
          label: 'Razorpay Privacy Policy',
          url: 'https://razorpay.com/privacy/',
        },
      ],
    },
    {
      title: '6. Refunds, Cancellations and Payment Issues',
      text: 'Codebricket primarily provides digital products and downloadable resources. Purchases are subject to our separate No Refund Policy.',
      extra: [
        'Refunds are not ordinarily provided for digital products, except where required under applicable law or expressly approved by Codebricket.',
        'If a payment is deducted but an order is not successfully confirmed, please contact our support team.',
        'If you experience a duplicate transaction or product access issue, contact us with the relevant transaction details.',
        'Please review the applicable Refund and Cancellation Policy before purchasing.',
      ],
    },
    {
      title: '7. Cookies and Similar Technologies',
      text: 'Codebricket may use cookies and similar technologies to support website functionality and improve the browsing experience.',
      list: [
        'Maintaining login sessions.',
        'Remembering user preferences.',
        'Supporting website functionality.',
        'Improving website performance.',
        'Understanding website usage.',
        'Maintaining security and detecting suspicious activity.',
      ],
      note: 'You can manage or disable cookies through your browser settings. Some website features may not function correctly if certain cookies are disabled.',
    },
    {
      title: '8. Coding Practice and Educational Resources',
      text: 'Codebricket provides educational and technical resources for developers and learners, which may include:',
      list: [
        'JavaScript and programming exercises.',
        'Coding practice questions and challenges.',
        'Technology and software development notes.',
        'Artificial Intelligence (AI) learning resources.',
        'Technical documentation.',
        'Programming tutorials.',
        'Developer roadmaps.',
        'Practical project learning materials.',
      ],
      extra: [
        'Information submitted through these features may be processed to provide requested services and maintain progress where applicable.',
        'Users should not submit passwords, API keys, confidential source code, or other sensitive credentials into public or interactive learning fields.',
      ],
    },
    {
      title: '9. Website Builder and User-Generated Content',
      text: 'Codebricket may provide website building tools and related development functionality that allow users to create, customize, or manage website content.',
      list: [
        'Website configuration details.',
        'Text and content entered by users.',
        'Design and customization preferences.',
        'Uploaded files or media, where supported.',
        'Code snippets and project-related information.',
      ],
      extra: [
        'Information submitted through these tools may be processed to operate the relevant features.',
        'Users are responsible for ensuring that uploaded or created content does not violate applicable laws or intellectual property rights.',
        'Avoid entering passwords, private keys, or confidential business information into fields that are not specifically designed and secured for that purpose.',
      ],
    },
    {
      title: '10. Intellectual Property and Digital Content',
      text: 'Codebricket may provide source code, templates, educational materials, tutorials, and other digital resources.',
      extra: [
        'Ownership and permitted usage of purchased materials are governed by the applicable product description, license terms, and Terms and Conditions.',
        'Purchasing or downloading a digital product does not automatically transfer ownership of all intellectual property rights.',
        'Users must not redistribute, resell, reproduce, or commercially exploit purchased materials beyond the permissions granted by the applicable license.',
      ],
    },
    {
      title: '11. Analytics and Website Performance',
      text: 'We may use website analytics and performance monitoring technologies to understand visitor activity and improve our services.',
      extra: [
        'Pages visited and session information.',
        'Browser and device details.',
        'Traffic sources and website interactions.',
        'Website performance and technical errors.',
      ],
      note: 'Analytics information may be used to identify technical problems, understand content performance, and improve website usability.',
      links: [
        {
          label: 'Google Privacy Policy',
          url: 'https://policies.google.com/privacy',
        },
      ],
    },
    {
      title: '12. Third-Party Services and External Links',
      text: 'Codebricket may use third-party services for payment processing, hosting, analytics, security, infrastructure, and other operational requirements.',
      extra: [
        'Third-party providers may process certain information according to their own privacy policies and applicable terms.',
        'Our website may contain links to external websites, documentation, tools, and resources.',
        'We do not control the privacy practices or content of external websites.',
        'We encourage users to review the privacy policies of third-party services they access.',
      ],
    },
    {
      title: '13. Data Sharing and Disclosure',
      text: 'We do not sell personal information to third parties. Information may be shared when reasonably necessary for legitimate operational or legal purposes, including:',
      list: [
        'With payment providers to process transactions.',
        'With hosting and infrastructure providers to operate the website.',
        'With service providers supporting website security and maintenance.',
        'When required by applicable laws or valid legal processes.',
        'To protect our rights, users, services, or website security.',
        'With service providers when users request specific functionality.',
      ],
    },
    {
      title: '14. Data Retention',
      text: 'We retain information for as long as reasonably necessary to provide our services and fulfill legitimate business, contractual, and legal purposes.',
      list: [
        'Maintain user accounts and authentication records.',
        'Manage digital product purchases and access.',
        'Maintain transaction and accounting records.',
        'Respond to support requests and resolve disputes.',
        'Prevent fraud and unauthorized activities.',
        'Comply with applicable legal obligations.',
      ],
      note: 'When information is no longer reasonably required, we may delete, anonymize, or securely dispose of it, subject to applicable retention obligations.',
    },
    {
      title: '15. Data Security',
      text: 'We take reasonable technical and organizational measures to protect information against unauthorized access, alteration, disclosure, misuse, or destruction.',
      extra: [
        'Security measures may include access controls, authentication mechanisms, infrastructure security, and monitoring, as appropriate to the services provided.',
        'However, no method of electronic transmission or storage can guarantee absolute security.',
      ],
    },
    {
      title: '16. Your Privacy Rights and Choices',
      text: 'Subject to applicable laws, you may have certain rights regarding your personal information.',
      list: [
        'Request access to personal information.',
        'Request correction of inaccurate information.',
        'Request deletion of personal information where applicable.',
        'Withdraw consent where processing is based on consent.',
        'Raise concerns regarding the processing of your information.',
        'Request information about relevant data processing activities.',
      ],
      extra: [
        'To exercise applicable rights, you may contact us using the contact information provided below.',
        'Certain information may need to be retained to comply with legal obligations, maintain transaction records, resolve disputes, or protect website security.',
      ],
    },
    {
      title: "17. Children's Privacy",
      text: 'Codebricket is intended for general audiences and is not specifically directed toward children under the age of 13.',
      extra: [
        'We do not knowingly collect personal information from children under 13 without appropriate authorization where required by applicable law.',
        'If you believe that a child has provided personal information to us, please contact us so that we can take appropriate action.',
      ],
    },
    {
      title: '18. International Data Processing',
      text: 'Depending on the infrastructure and third-party services used by Codebricket, information may be processed or stored on servers located in different locations.',
      extra: [
        'Where applicable, such processing will be subject to relevant legal requirements and appropriate safeguards.',
      ],
    },
    {
      title: '19. Changes to This Privacy Policy',
      text: 'We may update this Privacy Policy from time to time to reflect changes in our website, services, data practices, or legal requirements.',
      extra: [
        'Any updated version will be published on this page with a revised Last Updated date.',
        'We encourage users to review this page periodically to stay informed about our privacy practices.',
      ],
    },
    {
      title: '20. Contact and Privacy Requests',
      text: 'If you have questions, concerns, or requests regarding this Privacy Policy or the handling of your personal information, you may contact us.',
      contact: true,
    },
  ];

  const renderList = (items) => (
    <ul className="my-4 ml-5 list-disc space-y-2">
      {items.map((item, index) => (
        <li key={index} className="pl-1 leading-7">
          {item}
        </li>
      ))}
    </ul>
  );

  return (
    <Layout>
      <main
        className={`min-h-screen px-4 pb-16 pt-28 sm:px-6 sm:pt-32 ${
          isDark
            ? 'bg-[#0b0b0b] text-gray-100'
            : 'bg-gray-50 text-gray-800'
        }`}
      >
        <div className="mx-auto max-w-4xl">

          {/* Main Card */}
          <article
            className={`overflow-hidden rounded-2xl border shadow-sm ${
              isDark
                ? 'border-gray-800 bg-[#151515]'
                : 'border-gray-200 bg-white'
            }`}
          >

            {/* Header */}
            <header className="border-b border-gray-500/20 px-5 py-9 text-center sm:px-10">
              <div className="mb-3 inline-flex rounded-full bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-500">
                Legal Information
              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Privacy Policy
              </h1>

              <p
                className={`mt-3 text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                Last Updated: November 5, 2026
              </p>

              <p
                className={`mx-auto mt-6 max-w-2xl text-sm leading-7 sm:text-base ${
                  isDark ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Your privacy matters to us. Learn how Codebricket
                collects, uses, protects, and manages your
                information when you use our platform and services.
              </p>
            </header>

            {/* Introduction */}
            <div className="px-5 py-7 sm:px-10">
              <div
                className={`rounded-xl border p-5 ${
                  isDark
                    ? 'border-blue-900/50 bg-blue-950/20'
                    : 'border-blue-100 bg-blue-50'
                }`}
              >
                <h2 className="mb-2 text-lg font-semibold">
                  Welcome to Codebricket
                </h2>

                <p
                  className={`text-sm leading-7 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Welcome to Codebricket (https://codebricket.com).
                  We value your privacy and are committed to
                  handling your personal information responsibly.
                  This Privacy Policy explains what information
                  we collect, how we use it, when it may be shared,
                  and the choices available to you.
                </p>

                <p
                  className={`mt-3 text-sm leading-7 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  This policy applies to visitors, registered users,
                  customers purchasing digital products, and
                  individuals using Codebricket's educational
                  and development tools.
                </p>
              </div>

              {/* Sections */}
              <div className="divide-y divide-gray-500/20">
                {sections.map((section, index) => (
                  <section
                    key={index}
                    className="py-7 first:pt-8"
                    aria-labelledby={`privacy-section-${index}`}
                  >
                    <h2
                      id={`privacy-section-${index}`}
                      className="mb-4 flex items-start gap-3 text-lg font-bold leading-snug sm:text-xl"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-sm font-bold text-blue-500">
                        {index + 1}
                      </span>

                      {section.title.replace(/^\d+\.\s*/, '')}
                    </h2>

                    {section.text && (
                      <p
                        className={`mb-4 text-sm leading-8 sm:text-base ${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {section.text}
                      </p>
                    )}

                    {section.subtitle && (
                      <h3 className="mb-2 mt-5 font-semibold">
                        {section.subtitle}
                      </h3>
                    )}

                    {section.list && (
                      <div
                        className={
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }
                      >
                        {renderList(section.list)}
                      </div>
                    )}

                    {section.extra && (
                      <div
                        className={`text-sm leading-8 sm:text-base ${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {section.extra.map((item, i) => (
                          <p key={i} className="mb-3">
                            {item}
                          </p>
                        ))}
                      </div>
                    )}

                    {section.extra2 && (
                      <div
                        className={`mt-3 text-sm leading-8 sm:text-base ${
                          isDark ? 'text-gray-300' : 'text-gray-600'
                        }`}
                      >
                        {section.extra2.map((item, i) => (
                          <p key={i} className="mb-3">
                            {item}
                          </p>
                        ))}
                      </div>
                    )}

                    {section.note && (
                      <div
                        className={`mt-4 rounded-lg border-l-4 border-blue-500 px-4 py-3 text-sm leading-7 ${
                          isDark
                            ? 'bg-gray-800/70 text-gray-200'
                            : 'bg-blue-50 text-gray-700'
                        }`}
                      >
                        {section.note}
                      </div>
                    )}

                    {section.links && (
                      <div className="mt-4 space-y-2">
                        {section.links.map((link, i) => (
                          <p key={i} className="text-sm">
                            <span className="font-semibold">
                              {link.label}:{' '}
                            </span>

                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="break-all text-blue-500 underline decoration-blue-500/40 underline-offset-4 hover:text-blue-400"
                            >
                              {link.url}
                            </a>
                          </p>
                        ))}
                      </div>
                    )}

                    {section.contact && (
                      <div
                        className={`mt-5 rounded-xl border p-5 ${
                          isDark
                            ? 'border-gray-700 bg-gray-800/50'
                            : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        <div className="mb-4">
                          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                            Website
                          </p>

                          <a
                            href="https://codebricket.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-block text-sm font-medium text-blue-500 hover:underline"
                          >
                            https://codebricket.com
                          </a>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                            Email Support
                          </p>

                          <p className="mt-1 text-sm font-medium">
                            [Your Official Codebricket Support Email]
                          </p>
                        </div>

                        <p
                          className={`mt-4 text-sm leading-7 ${
                            isDark ? 'text-gray-300' : 'text-gray-600'
                          }`}
                        >
                          Please include sufficient details about
                          your request so that we can understand
                          and respond appropriately.
                        </p>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Footer */}
              <footer className="mt-5 border-t border-gray-500/20 pt-7 text-center">
                <p
                  className={`text-sm ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Thank you for trusting Codebricket.
                </p>

                <p
                  className={`mt-3 text-xs ${
                    isDark ? 'text-gray-500' : 'text-gray-400'
                  }`}
                >
                  © {new Date().getFullYear()} Codebricket.
                  All rights reserved.
                </p>
              </footer>
            </div>
          </article>

        </div>
      </main>
    </Layout>
  );
};

export default PrivacyPolicy;
