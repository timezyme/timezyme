<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})

const lastUpdated = new Date().toLocaleDateString('en-US', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})
</script>

<template>
  <div class="min-h-screen">
    <UContainer class="py-20">
      <div class="max-w-4xl mx-auto">
        <div class="text-center space-y-4 mb-16">
          <h1 class="text-4xl md:text-5xl font-bold text-white">
            Terms of Service
          </h1>
          <p class="text-xl text-gray-400 max-w-2xl mx-auto">
            Legal Agreement for TimeZyme Platform Usage
          </p>
          <p class="text-sm text-gray-500">
            Last updated: {{ lastUpdated }}
          </p>
        </div>

        <div class="space-y-12">
          <!-- Introduction Section -->
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <UIcon
                name="i-lucide-scale"
                class="text-4xl text-primary"
              />
            </div>
            <p class="text-lg text-gray-300 max-w-3xl mx-auto">
              Welcome to TimeZyme. These Terms of Service ("Terms") govern your use of the TimeZyme platform,
              including our AI-powered document transformation services, knowledge graph features, and related technologies
              (collectively, the "Service").
            </p>
          </div>

          <!-- Terms Sections -->
          <div class="space-y-8">
            <!-- Section 1 -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                1. Acceptance of Terms
              </h2>
              <p class="text-gray-300 mb-4">
                By accessing or using TimeZyme, you agree to be bound by these Terms. If you disagree with any part of these terms,
                you may not access the Service. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
              <p class="text-gray-300">
                Your use of our Service is also governed by our Privacy Policy, which describes how we collect, use, and protect your data.
              </p>
            </div>

            <!-- Section 2 -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                2. Description of Service
              </h2>
              <p class="text-gray-300 mb-4">
                TimeZyme provides an AI-powered platform that transforms complex documents into interactive,
                layered knowledge maps called "Zymes." Our Service includes:
              </p>
              <ul class="space-y-3 text-gray-300 ml-4">
                <li class="flex items-start">
                  <UIcon
                    name="i-lucide-check-circle"
                    class="text-primary mr-3 mt-0.5 flex-shrink-0"
                  />
                  <span>Document processing and transformation using AI technology</span>
                </li>
                <li class="flex items-start">
                  <UIcon
                    name="i-lucide-check-circle"
                    class="text-primary mr-3 mt-0.5 flex-shrink-0"
                  />
                  <span>Creation and management of interconnected knowledge graphs</span>
                </li>
                <li class="flex items-start">
                  <UIcon
                    name="i-lucide-check-circle"
                    class="text-primary mr-3 mt-0.5 flex-shrink-0"
                  />
                  <span>Progressive disclosure features for navigating complex information</span>
                </li>
                <li class="flex items-start">
                  <UIcon
                    name="i-lucide-check-circle"
                    class="text-primary mr-3 mt-0.5 flex-shrink-0"
                  />
                  <span>Collaboration and sharing features for teams</span>
                </li>
                <li class="flex items-start">
                  <UIcon
                    name="i-lucide-check-circle"
                    class="text-primary mr-3 mt-0.5 flex-shrink-0"
                  />
                  <span>Analytics and insights about document usage and connections</span>
                </li>
              </ul>
            </div>

            <!-- Section 3 -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                3. User Accounts & Responsibilities
              </h2>
              <div class="space-y-4 text-gray-300">
                <div>
                  <h3 class="text-lg font-semibold mb-2 text-primary">
                    Account Creation
                  </h3>
                  <p>
                    To use certain features of the Service, you must register for an account. You agree to provide accurate,
                    current, and complete information during registration and to update such information to keep it accurate,
                    current, and complete.
                  </p>
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2 text-primary">
                    Account Security
                  </h3>
                  <p>
                    You are responsible for safeguarding the password and for all activities that occur under your account.
                    You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                  </p>
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2 text-primary">
                    Prohibited Uses
                  </h3>
                  <p class="mb-2">
                    You agree not to use the Service to:
                  </p>
                  <ul class="space-y-2 ml-4">
                    <li class="flex items-start">
                      <span class="text-primary mr-2">•</span>
                      Violate any laws or regulations
                    </li>
                    <li class="flex items-start">
                      <span class="text-primary mr-2">•</span>
                      Infringe upon intellectual property rights
                    </li>
                    <li class="flex items-start">
                      <span class="text-primary mr-2">•</span>
                      Upload malicious code or interfere with the Service
                    </li>
                    <li class="flex items-start">
                      <span class="text-primary mr-2">•</span>
                      Attempt to gain unauthorized access to any portion of the Service
                    </li>
                    <li class="flex items-start">
                      <span class="text-primary mr-2">•</span>
                      Use the Service for any illegal or unauthorized purpose
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Section 4 -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                4. Content & Intellectual Property
              </h2>
              <div class="space-y-4 text-gray-300">
                <div>
                  <h3 class="text-lg font-semibold mb-2 text-primary">
                    Your Content
                  </h3>
                  <p>
                    You retain all rights to the documents and content you upload to TimeZyme ("User Content").
                    By uploading content, you grant us a limited license to process, analyze, and transform your
                    content as necessary to provide the Service.
                  </p>
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2 text-primary">
                    Generated Zymes
                  </h3>
                  <p>
                    The Zymes created from your content remain your property. However, the underlying technology,
                    algorithms, and methods used to create Zymes are and remain the exclusive property of TimeZyme.
                  </p>
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2 text-primary">
                    TimeZyme Property
                  </h3>
                  <p>
                    The Service, including its original content, features, and functionality, is owned by TimeZyme
                    and is protected by international copyright, trademark, patent, trade secret, and other intellectual
                    property laws.
                  </p>
                </div>
              </div>
            </div>

            <!-- Section 5 -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                5. Privacy & Data Security
              </h2>
              <div class="space-y-4 text-gray-300">
                <p>
                  Your use of TimeZyme is subject to our Privacy Policy, which details how we collect, use,
                  and protect your information. Key points include:
                </p>
                <ul class="space-y-3 ml-4">
                  <li class="flex items-start">
                    <UIcon
                      name="i-lucide-shield"
                      class="text-primary mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span><strong>Encryption:</strong> All documents are encrypted both in transit and at rest</span>
                  </li>
                  <li class="flex items-start">
                    <UIcon
                      name="i-lucide-shield"
                      class="text-primary mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span><strong>Access Control:</strong> You control who can access your Zymes and knowledge graphs</span>
                  </li>
                  <li class="flex items-start">
                    <UIcon
                      name="i-lucide-shield"
                      class="text-primary mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span><strong>Data Retention:</strong> You can delete your content at any time</span>
                  </li>
                  <li class="flex items-start">
                    <UIcon
                      name="i-lucide-shield"
                      class="text-primary mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span><strong>Compliance:</strong> We maintain SOC 2 Type II certification and GDPR compliance</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Section 6 -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                6. Subscription & Payment Terms
              </h2>
              <div class="space-y-4 text-gray-300">
                <div>
                  <h3 class="text-lg font-semibold mb-2 text-primary">
                    Billing
                  </h3>
                  <p>
                    Certain aspects of the Service are provided on a subscription basis. You will be billed in advance
                    on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set on a monthly or annual basis.
                  </p>
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2 text-primary">
                    Automatic Renewal
                  </h3>
                  <p>
                    Your subscription will automatically renew at the end of each Billing Cycle unless you cancel it
                    or we cancel it. You may cancel your subscription renewal through your account settings.
                  </p>
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2 text-primary">
                    Fee Changes
                  </h3>
                  <p>
                    We may revise the fees for the Service at any time. Any fee changes will become effective at the
                    end of the then-current Billing Cycle. We will provide you with reasonable prior notice of any change
                    in fees.
                  </p>
                </div>
              </div>
            </div>

            <!-- Section 7 -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                7. Warranties & Disclaimers
              </h2>
              <div class="space-y-4 text-gray-300">
                <p>
                  THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. TIMEZYME EXPRESSLY DISCLAIMS
                  ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED
                  WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
                <p>
                  We do not warrant that:
                </p>
                <ul class="space-y-2 ml-4">
                  <li class="flex items-start">
                    <span class="text-primary mr-2">•</span>
                    The Service will be uninterrupted, secure, or error-free
                  </li>
                  <li class="flex items-start">
                    <span class="text-primary mr-2">•</span>
                    The results obtained from the Service will be accurate or reliable
                  </li>
                  <li class="flex items-start">
                    <span class="text-primary mr-2">•</span>
                    Any errors in the Service will be corrected
                  </li>
                </ul>
              </div>
            </div>

            <!-- Section 8 -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                8. Limitation of Liability
              </h2>
              <p class="text-gray-300">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, TIMEZYME SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED
                DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING
                FROM YOUR USE OF THE SERVICE.
              </p>
            </div>

            <!-- Section 9 -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                9. Indemnification
              </h2>
              <p class="text-gray-300">
                You agree to defend, indemnify, and hold harmless TimeZyme and its affiliates, and their respective
                officers, directors, employees, and agents, from and against any claims, liabilities, damages, judgments,
                awards, losses, costs, expenses, or fees arising out of or relating to your violation of these Terms
                or your use of the Service.
              </p>
            </div>

            <!-- Section 10 -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                10. Termination
              </h2>
              <div class="space-y-4 text-gray-300">
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without prior
                  notice or liability, under our sole discretion, for any reason whatsoever, including without limitation
                  if you breach the Terms.
                </p>
                <p>
                  Upon termination, your right to use the Service will cease immediately. If you wish to terminate
                  your account, you may do so through your account settings or by contacting us.
                </p>
              </div>
            </div>

            <!-- Section 11 -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                11. Governing Law & Dispute Resolution
              </h2>
              <div class="space-y-4 text-gray-300">
                <div>
                  <h3 class="text-lg font-semibold mb-2 text-primary">
                    Governing Law
                  </h3>
                  <p>
                    These Terms shall be governed and construed in accordance with the laws of the United States,
                    without regard to its conflict of law provisions.
                  </p>
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2 text-primary">
                    Arbitration
                  </h3>
                  <p>
                    Any dispute arising out of or relating to these Terms or the Service shall be resolved through
                    binding arbitration in accordance with the rules of the American Arbitration Association.
                  </p>
                </div>
              </div>
            </div>

            <!-- Section 12 -->
            <div class="bg-gray-800/30 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4 gradient-text">
                12. Changes to Terms
              </h2>
              <p class="text-gray-300">
                We reserve the right to modify or replace these Terms at any time. If a revision is material,
                we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes
                a material change will be determined at our sole discretion.
              </p>
            </div>

            <!-- Contact Section -->
            <div class="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg p-8">
              <h2 class="text-2xl font-bold mb-4">
                Contact Information
              </h2>
              <p class="text-gray-300 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div class="space-y-3 text-gray-300">
                <div class="flex items-center">
                  <UIcon
                    name="i-lucide-mail"
                    class="text-primary mr-3"
                  />
                  <span>Email: <a
                    href="mailto:legal@timezyme.com"
                    class="text-primary hover:underline"
                  >legal@timezyme.com</a></span>
                </div>
                <div class="flex items-center">
                  <UIcon
                    name="i-lucide-globe"
                    class="text-primary mr-3"
                  />
                  <span>Website: <a
                    href="https://timezyme.com"
                    class="text-primary hover:underline"
                  >timezyme.com</a></span>
                </div>
                <div class="flex items-center">
                  <UIcon
                    name="i-lucide-map-pin"
                    class="text-primary mr-3"
                  />
                  <span>Address: TimeZyme, Plano, TX 75024</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Additional Information -->
          <div class="text-center space-y-4">
            <p class="text-sm text-gray-500">
              By using TimeZyme, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
            <p class="text-sm text-gray-500">
              These Terms constitute the entire agreement between you and TimeZyme regarding the use of the Service.
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
            to="/privacy"
            variant="outline"
            color="primary"
            size="lg"
            icon="i-lucide-shield"
            trailing
          >
            Privacy Policy
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>
