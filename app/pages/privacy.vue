<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})

const effectiveDate = 'July 19, 2025'
</script>

<template>
  <div class="min-h-screen">
    <UContainer class="py-20">
      <div class="max-w-4xl mx-auto">
        <div class="text-center space-y-4 mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-white">
            Privacy Policy
          </h1>
          <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            Your Privacy and Data Protection at TimeZyme
          </p>
          <p class="text-sm text-gray-500">
            Effective Date: {{ effectiveDate }}
          </p>
        </div>

        <div class="space-y-12">
          <!-- Introduction Section -->
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <UIcon
                name="i-lucide-shield"
                class="text-4xl text-primary"
              />
            </div>
            <p class="text-lg text-gray-300 max-w-3xl mx-auto">
              Welcome to TimeZyme. We are committed to protecting your privacy and being transparent about how we collect, use, and safeguard your information. This Privacy Policy explains our practices for our website, APIs, and related services.
            </p>
          </div>

          <!-- Privacy Sections -->
          <div class="space-y-8">
            <!-- Section 1: Introduction -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                1. Introduction
              </h2>
              <p class="text-gray-300 mb-4">
                This policy is designed to help you understand:
              </p>
              <ul class="space-y-3 text-gray-300 ml-4">
                <li class="flex items-start">
                  <UIcon
                    name="i-lucide-check-circle"
                    class="text-primary mr-3 mt-0.5 flex-shrink-0"
                  />
                  <span>What information we collect and why we collect it</span>
                </li>
                <li class="flex items-start">
                  <UIcon
                    name="i-lucide-check-circle"
                    class="text-primary mr-3 mt-0.5 flex-shrink-0"
                  />
                  <span>How we use that information and our policy on AI model training</span>
                </li>
                <li class="flex items-start">
                  <UIcon
                    name="i-lucide-check-circle"
                    class="text-primary mr-3 mt-0.5 flex-shrink-0"
                  />
                  <span>The choices you have about your information</span>
                </li>
              </ul>
              <p class="text-gray-300 mt-4">
                By using our Services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </div>

            <!-- Section 2: Information We Collect -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                2. Information We Collect
              </h2>
              <p class="text-gray-300 mb-6">
                We collect information to provide, maintain, and improve our Services. The types of information we collect depend on how you use our Services.
              </p>

              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-semibold mb-3 text-primary">
                    2.1. Information You Provide to Us
                  </h3>
                  <div class="space-y-4 text-gray-300">
                    <div>
                      <p class="font-medium mb-2">
                        Account Information
                      </p>
                      <p>When you create a TimeZyme account, we collect information such as your name, email address, and password. For paid subscriptions, we collect payment information, which is processed by our third-party payment processors (e.g., Stripe). We do not store your full credit card details.</p>
                    </div>
                    <div>
                      <p class="font-medium mb-2">
                        Your Input
                      </p>
                      <p>We collect the documents, text, and any other content you upload, submit, or otherwise provide to the Services to be transformed into Zymes ("Input").</p>
                    </div>
                    <div>
                      <p class="font-medium mb-2">
                        Communications
                      </p>
                      <p>If you contact us directly for support or other inquiries, we may receive additional information about you, such as the contents of your message and any attachments you may provide.</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-lg font-semibold mb-3 text-primary">
                    2.2. Information We Collect Automatically
                  </h3>
                  <div class="space-y-4 text-gray-300">
                    <div>
                      <p class="font-medium mb-2">
                        Usage and Log Data
                      </p>
                      <p>We automatically collect information about your interactions with our Services. This includes technical data like your Internet Protocol (IP) address, browser type, operating system, and the dates and times of your requests.</p>
                    </div>
                    <div>
                      <p class="font-medium mb-2">
                        Zyme Interaction Data
                      </p>
                      <p>We collect information about how you interact with Zymes and the Knowledge Graph. This includes which Zymes you create, view, or share, and the links you follow between ZymeNodes. This specific navigational data forms your unique "Graph Trail."</p>
                    </div>
                    <div>
                      <p class="font-medium mb-2">
                        Cookies and Similar Technologies
                      </p>
                      <p>We use cookies and similar technologies to operate and administer our Services, gather usage data, and improve your experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some parts of our Services.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Section 3: How We Use Your Information -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                3. How We Use Your Information
              </h2>
              <p class="text-gray-300 mb-6">
                We use the information we collect for several purposes, all aimed at providing and enhancing your experience with TimeZyme:
              </p>
              <ul class="space-y-3 text-gray-300 ml-4">
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>To Provide and Maintain the Services:</strong> We use your Input to generate Zymes and your Zyme Interaction Data to build and personalize your Knowledge Graph. Your Graph Trail is used to power features like proactive Zyme suggestions and your personal "My Zyme Map."</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>To Improve and Develop Our Services:</strong> We analyze usage data to understand how our Services are used, which helps us troubleshoot issues, develop new features, and improve the overall user experience.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>To Communicate With You:</strong> We use your contact information to send you service-related announcements, updates, security alerts, and support messages.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>For Safety and Security:</strong> We use information to protect against fraud, abuse, and security risks. This includes verifying accounts and monitoring for suspicious activity.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>To Comply with Legal Obligations:</strong> We may use your information where required by law, such as in response to a subpoena or other legal process.</span>
                </li>
              </ul>
            </div>

            <!-- Section 4: Our Policy on AI Model Training -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                4. Our Policy on AI Model Training
              </h2>
              <p class="text-gray-300 mb-6">
                User trust is the foundation of our platform. Our policy on using data for AI model training is designed to be clear and protective of your intellectual property.
              </p>
              <div class="space-y-4 text-gray-300">
                <div>
                  <p class="font-medium mb-2 text-primary">
                    For Paid Subscriptions (Pro, Team, Enterprise):
                  </p>
                  <p>We do not use your Input or the content of your generated Zymes to train, retrain, or otherwise improve our or any third-party's generative AI models. Your content is used exclusively to provide the Services to you.</p>
                </div>
                <div>
                  <p class="font-medium mb-2 text-primary">
                    For Free Tiers:
                  </p>
                  <p>For users of any free tier of our Services, we may use your Input and the resulting Zymes to improve our Services, which may include training our AI models. Where this is the case, we will provide you with clear notice and, where feasible, an option to opt-out.</p>
                </div>
                <div>
                  <p class="font-medium mb-2 text-primary">
                    Anonymized Interaction Data:
                  </p>
                  <p>We may use anonymized and aggregated Zyme Interaction Data (which does not include the substantive content of your Input or Zymes) to analyze trends and improve the core functionality of our platform, such as the quality of the Knowledge Graph connections.</p>
                </div>
              </div>
            </div>

            <!-- Section 5: How We Share Your Information -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                5. How We Share Your Information
              </h2>
              <p class="text-gray-300 mb-6">
                We do not sell your personal information. We may share your information only in the following limited circumstances:
              </p>
              <ul class="space-y-4 text-gray-300 ml-4">
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>With Your Consent:</strong> We may share your information with your consent, for example, if you choose to share a Zyme with another user or make it public.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Third-Party Service Providers:</strong> We work with third-party vendors and service providers to help us operate, secure, and improve our Services. These include payment processors, cloud hosting providers (e.g., AWS, Google Cloud), and analytics services. These providers have access to your information only to perform tasks on our behalf and are obligated to protect your information under strict confidentiality agreements.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Third-Party AI Models:</strong> To provide the Services, your Input may be processed by third-party AI models. We have contractual agreements with these providers that prohibit them from using your Input for their own purposes or for training their models, consistent with our commitments in Section 4.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Legal Requirements:</strong> We may disclose your information if we believe it is necessary to comply with a law, regulation, legal process, or governmental request; to protect the safety of any person; to address fraud, security, or technical issues; or to protect our rights or property.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Business Transfers:</strong> If TimeZyme is involved in a merger, acquisition, or asset sale, your information may be transferred as a business asset. We will provide notice before your information is transferred and becomes subject to a different privacy policy.</span>
                </li>
              </ul>
            </div>

            <!-- Section 6: Data Retention and Deletion -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                6. Data Retention and Deletion
              </h2>
              <p class="text-gray-300 mb-4">
                We retain your information for as long as your account is active or as needed to provide you with the Services.
              </p>
              <p class="text-gray-300">
                You can delete your account at any time through your account settings. When you delete your account, we will take steps to delete your personal information and Input from our active systems. Please note that some information may remain in our backup archives for a period of time for legal, tax, or regulatory reasons, or for legitimate and lawful business purposes.
              </p>
            </div>

            <!-- Section 7: Your Data Rights and Choices -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                7. Your Data Rights and Choices
              </h2>
              <p class="text-gray-300 mb-6">
                You have rights and choices regarding your information. Depending on your location, these may include:
              </p>
              <ul class="space-y-3 text-gray-300 ml-4">
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Access and Update:</strong> You can review and update your account information through your account settings.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Data Portability:</strong> You may have the right to request a copy of the information we hold about you in a structured, machine-readable format.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Deletion:</strong> You can request the deletion of your account and associated data as described in Section 6.</span>
                </li>
                <li class="flex items-start">
                  <span class="text-primary mr-2">•</span>
                  <span><strong>Object to Processing:</strong> You may have the right to object to our processing of your personal information under certain circumstances.</span>
                </li>
              </ul>
              <p class="text-gray-300 mt-4">
                To exercise any of these rights, please contact us at privacy@timezyme.com.
              </p>
            </div>

            <!-- Section 8: Security -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                8. Security
              </h2>
              <p class="text-gray-300 mb-4">
                We take the security of your information very seriously. We use a combination of technical, administrative, and physical controls to maintain the security of your data. This includes using encryption for data in transit and at rest and restricting access to personal information to employees and contractors who need to know that information to process it for us.
              </p>
              <p class="text-gray-300">
                However, no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
              </p>
            </div>

            <!-- Section 9: International Data Transfers -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                9. International Data Transfers
              </h2>
              <p class="text-gray-300">
                Your information may be transferred to, and maintained on, computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those in your jurisdiction. By using the Services, you consent to the transfer of your information to the United States and other locations where we or our service providers operate.
              </p>
            </div>

            <!-- Section 10: Children's Privacy -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                10. Children's Privacy
              </h2>
              <p class="text-gray-300">
                Our Services are not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13. If we learn that we have collected personal information from a child under 13, we will take steps to delete such information from our files as soon as possible.
              </p>
            </div>

            <!-- Section 11: Changes to This Privacy Policy -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                11. Changes to This Privacy Policy
              </h2>
              <p class="text-gray-300">
                We may update this Privacy Policy from time to time. If we make material changes, we will notify you by email, through the Services, or by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </div>

            <!-- Contact Section -->
            <div class="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4">
                12. Contact Us
              </h2>
              <p class="text-gray-300 mb-4">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div class="space-y-3 text-gray-300">
                <div class="flex items-center">
                  <UIcon
                    name="i-lucide-mail"
                    class="text-primary mr-3"
                  />
                  <span>Email: <a
                    href="mailto:privacy@timezyme.com"
                    class="text-primary hover:underline"
                  >privacy@timezyme.com</a></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Information -->
          <div class="text-center space-y-4">
            <p class="text-sm text-gray-500">
              By using TimeZyme, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="text-center mt-12 space-x-4">
          <UButton
            to="/"
            variant="soft"
            color="primary"
            size="lg"
            icon="i-lucide-arrow-left"
          >
            Back to Home
          </UButton>
          <UButton
            to="/terms"
            variant="outline"
            color="primary"
            size="lg"
            icon="i-lucide-scale"
            trailing
          >
            Terms of Service
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>
