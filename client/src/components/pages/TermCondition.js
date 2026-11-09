
import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import { useTheme } from "../context/ThemeContext";

const TermCondition = () => {
  const [theme] = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const sections = [
    {
      title: "1. Acceptance of Terms",
      paragraphs: [
        "By accessing or using the Codebricket website (https://codebricket.com), you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please discontinue using our website and services.",
      ],
    },
    {
      title: "2. Use of the Website",
      paragraphs: [
        "You may use Codebricket only for lawful purposes and in accordance with these Terms and Conditions.",
        "You agree not to misuse our website, attempt unauthorized access, interfere with website functionality, distribute harmful software, or engage in activities that may harm our platform or other users.",
      ],
    },
    {
      title: "3. Digital Products and Source Code",
      paragraphs: [
        "Codebricket provides digital products and educational resources, including ready-made website projects, source code, developer roadmaps, technical documentation, coding practice materials, and other web development resources.",
        "After successful payment, access to the purchased digital product will be provided through the website or the download method specified for that product.",
        "Unless otherwise mentioned on the product page, purchased source-code downloads or access will generally remain available for 24 hours after purchase. Users are responsible for downloading and securely storing their purchased files within the available access period.",
        "Product descriptions, features, technologies, and included files should be reviewed carefully before making a purchase.",
      ],
    },
    {
      title: "4. Pricing and Payments",
      paragraphs: [
        "Prices displayed on Codebricket are in Indian Rupees (INR), unless otherwise specified. Applicable taxes or additional charges, if any, will be displayed during checkout.",
        "Payments are processed through our payment partner, Razorpay. Payment processing may be subject to the payment provider's own terms, conditions, and privacy policy.",
        "You must provide accurate information during the checkout process. Codebricket is not responsible for payment failures caused by incorrect payment details, bank restrictions, or issues with third-party payment services.",
        "A purchase is considered successful only after payment confirmation is received.",
      ],
    },
    {
      title: "5. Refund and Cancellation Policy",
      paragraphs: [
        "Codebricket primarily provides digital products that may become accessible immediately after successful payment.",
        "Due to the digital nature of these products, refunds and cancellations are generally not available once the purchased content has been delivered or access has been granted.",
        "Please review the product description, features, compatibility, and other available information carefully before purchasing.",
        "This policy does not limit any refund, cancellation, or other rights that may be available to consumers under applicable laws. If a payment is deducted but the order is not successfully confirmed, please contact us with the relevant transaction details so that the issue can be reviewed.",
      ],
    },
    {
      title: "6. Intellectual Property and Usage Restrictions",
      paragraphs: [
        "Unless explicitly stated otherwise, the content available on Codebricket, including website design, branding, text, graphics, documentation, and other materials, is owned by or licensed to Codebricket.",
        "Purchased source code and digital products are provided for the usage permitted by their product description or applicable license.",
        "You must not resell, redistribute, publicly share, or commercially redistribute purchased digital products as standalone downloads without prior written permission from Codebricket or the applicable rights holder.",
        "You are responsible for ensuring that your use or modification of purchased source code complies with applicable licenses and third-party terms.",
      ],
    },
    {
      title: "7. User Accounts and Responsibilities",
      paragraphs: [
        "Certain features of Codebricket may require you to create an account.",
        "You are responsible for maintaining the confidentiality of your login credentials and for activities performed through your account.",
        "You agree to provide accurate information and to notify us if you become aware of unauthorized access to your account.",
        "Codebricket reserves the right to restrict or suspend accounts involved in misuse, fraudulent activity, or violations of these Terms and Conditions.",
      ],
    },
    {
      title: "8. Educational Content and Resources",
      paragraphs: [
        "Codebricket provides educational content, coding examples, technical notes, roadmaps, and development resources for learning and informational purposes.",
        "We aim to keep our resources useful and accurate, but we do not guarantee that every tutorial, code example, or technical explanation will always be error-free, complete, or compatible with every environment.",
        "Users should independently test code and verify technical information before using it in production or business-critical applications.",
      ],
    },
    {
      title: "9. Website Builder and Development Tools",
      paragraphs: [
        "Some features of Codebricket may allow users to create, customize, or work with website-related content and development tools.",
        "Users are responsible for the content they create, upload, or publish using these features.",
        "You must not use these tools to create unlawful, harmful, deceptive, or infringing content or to interfere with the operation of the platform.",
      ],
    },
    {
      title: "10. Third-Party Services and Links",
      paragraphs: [
        "Our website may contain links to third-party websites, tools, payment services, or resources.",
        "These third-party services operate independently and may have their own terms and privacy policies. Codebricket does not control or guarantee the accuracy, availability, or practices of external websites and services.",
        "Your use of third-party services is at your own discretion and subject to their applicable terms.",
      ],
    },
    {
      title: "11. Availability and Changes to Services",
      paragraphs: [
        "We aim to keep Codebricket available and functioning properly. However, we do not guarantee uninterrupted or error-free access to the website.",
        "We reserve the right to update, modify, suspend, or discontinue any feature, product, or service where reasonably necessary.",
        "We may also update these Terms and Conditions from time to time. Updated terms will be published on this page with a revised date.",
      ],
    },
    {
      title: "12. Limitation of Liability",
      paragraphs: [
        "To the extent permitted by applicable law, Codebricket will not be liable for indirect, incidental, special, or consequential losses arising from the use of the website, inability to access services, or use of digital products.",
        "Users are responsible for evaluating the suitability of any digital product, source code, or educational resource for their intended purpose.",
        "Nothing in these Terms excludes or limits liability where such exclusion or limitation is not permitted under applicable law.",
      ],
    },
    {
      title: "13. Indemnification",
      paragraphs: [
        "You agree to be responsible for claims, losses, or damages arising from your unlawful use of the website, violation of these Terms, or infringement of another person's rights, to the extent permitted by applicable law.",
      ],
    },
    {
      title: "14. Privacy",
      paragraphs: [
        "Your use of Codebricket is also subject to our Privacy Policy, which explains how information may be collected, used, and protected.",
        "Please review our Privacy Policy to understand our data-handling practices.",
      ],
      links: [
        {
          label: "Read our Privacy Policy",
          href: "/privacy",
        },
      ],
    },
    {
      title: "15. Termination of Access",
      paragraphs: [
        "We may restrict or terminate access to the website or particular services if a user violates these Terms, engages in fraudulent activity, or misuses the platform.",
        "Where appropriate, we may take such action to protect our users, services, and legal rights.",
      ],
    },
    {
      title: "16. Governing Law and Jurisdiction",
      paragraphs: [
        "These Terms and Conditions are governed by the laws of India.",
        "Subject to applicable law, disputes arising from the use of Codebricket will be subject to the jurisdiction of the competent courts in Maharashtra, India.",
      ],
    },
    {
      title: "17. Contact Information",
      paragraphs: [
        "If you have questions, concerns, or requests regarding these Terms and Conditions, you can contact us through the following email address:",
      ],
      email: "pdfbaba07@gmail.com",
      location: "Mumbai, Maharashtra, India",
    },
  ];

  const pageClass = isDark
    ? "bg-gray-950 text-gray-200"
    : "bg-white text-gray-800";

  const headingClass = isDark
    ? "text-white"
    : "text-gray-900";

  const paragraphClass = isDark
    ? "text-gray-300"
    : "text-gray-600";

  return (
    <Layout>
      <main
        className={`min-h-screen pt-28 pb-16 px-4 sm:px-6 ${pageClass}`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="text-center mb-12">
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${headingClass}`}
            >
              Terms and Conditions
            </h1>

            <p className={`text-sm sm:text-base ${paragraphClass}`}>
              Last updated: November 2026
            </p>

            <div className="w-20 h-1 bg-blue-600 rounded-full mx-auto mt-6" />
          </header>

          {/* Introduction */}
          <div
            className={`rounded-xl p-5 sm:p-6 mb-8 border ${
              isDark
                ? "bg-gray-900 border-gray-800"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <p className={`text-sm sm:text-base leading-7 ${paragraphClass}`}>
              Welcome to Codebricket. These Terms and Conditions explain the
              rules and guidelines for accessing and using our website,
              services, and digital products. Please read them carefully before
              using our platform.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-9">
            {sections.map((section, index) => (
              <section key={index}>
                <h2
                  className={`text-xl sm:text-2xl font-semibold mb-3 ${headingClass}`}
                >
                  {section.title}
                </h2>

                <div className="space-y-3">
                  {section.paragraphs?.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className={`text-sm sm:text-base leading-7 ${paragraphClass}`}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.links && (
                  <div className="mt-4">
                    {section.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.href}
                        className="inline-flex items-center text-blue-500 hover:text-blue-400 font-medium underline underline-offset-4 transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}

                {section.email && (
                  <div
                    className={`mt-4 rounded-lg p-4 border ${
                      isDark
                        ? "bg-gray-900 border-gray-800"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <p className={`text-sm sm:text-base mb-2 ${paragraphClass}`}>
                      <span className="font-semibold">Email: </span>
                      <a
                        href={`mailto:${section.email}`}
                        className="text-blue-500 hover:text-blue-400 underline underline-offset-4"
                      >
                        {section.email}
                      </a>
                    </p>

                    <p className={`text-sm sm:text-base ${paragraphClass}`}>
                      <span className="font-semibold">Location: </span>
                      {section.location}
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Footer */}
          <div
            className={`border-t mt-12 pt-6 text-center ${
              isDark ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <p className={`text-sm ${paragraphClass}`}>
              © {new Date().getFullYear()} Codebricket. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default TermCondition;
