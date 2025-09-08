import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Exercise",
    description:
        "Privacy Policy for Exercise platform - Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPolicyPage() {
    return (
        <div
            className="min-h-screen"
            style={{
                background:
                    "linear-gradient(180deg, #121212 0%, #1F225B 20.22%, #35386D 39.59%, #2B7696 55.12%, #1C465C 69.89%, #15394A 85.23%, #0D2734 100%)",
            }}
        >
            <div className="container mx-auto px-6 py-16 lg:px-12 lg:py-24">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-gray-300">
                            Last updated:{" "}
                            {new Date().toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 lg:p-12 text-white">
                        <div className="prose prose-lg prose-invert max-w-none">
                            {/* Introduction */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-white">
                                    Introduction
                                </h2>
                                <p className="text-gray-200 leading-relaxed mb-4">
                                    Welcome to Exercise (&ldquo;we,&rdquo;
                                    &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We
                                    respect your privacy and are committed to
                                    protecting your personal data. This privacy
                                    policy will inform you about how we look
                                    after your personal data when you visit our
                                    website and tell you about your privacy
                                    rights and how the law protects you.
                                </p>
                                <p className="text-gray-200 leading-relaxed">
                                    This privacy policy applies to all
                                    information collected through our services,
                                    including our website, applications, and any
                                    related services.
                                </p>
                            </section>

                            {/* Information We Collect */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-white">
                                    Information We Collect
                                </h2>

                                <h3 className="text-xl font-semibold mb-3 text-purple-300">
                                    Personal Information
                                </h3>
                                <p className="text-gray-200 leading-relaxed mb-4">
                                    We may collect the following types of
                                    personal information:
                                </p>
                                <ul className="list-disc list-inside text-gray-200 mb-6 space-y-2">
                                    <li>
                                        Name and contact information (email
                                        address, phone number)
                                    </li>
                                    <li>Profile information and preferences</li>
                                    <li>Educational background and skills</li>
                                    <li>Resume and portfolio documents</li>
                                </ul>

                                <h3 className="text-xl font-semibold mb-3 text-purple-300">
                                    Automatically Collected Information
                                </h3>
                                <ul className="list-disc list-inside text-gray-200 mb-4 space-y-2">
                                    <li>
                                        Device information (IP address, browser
                                        type, operating system)
                                    </li>
                                    <li>
                                        Cookies and similar tracking
                                        technologies
                                    </li>
                                </ul>
                            </section>

                            {/* How We Use Information */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-white">
                                    How We Use Your Information
                                </h2>
                                <p className="text-gray-200 leading-relaxed mb-4">
                                    We use your personal information for the
                                    following purposes:
                                </p>
                                <ul className="list-disc list-inside text-gray-200 mb-4 space-y-2">
                                    <li>
                                        To provide and maintain our services
                                    </li>
                                    <li>
                                        To process your registration and manage
                                        your account
                                    </li>
                                    <li>
                                        To communicate with you about our
                                        services
                                    </li>
                                    <li>
                                        To send you updates, newsletters, and
                                        promotional materials
                                    </li>
                                    <li>To improve our website and services</li>
                                    <li>
                                        To analyze usage patterns and trends
                                    </li>
                                    <li>To comply with legal obligations</li>
                                    <li>
                                        To protect our rights and prevent fraud
                                    </li>
                                </ul>
                            </section>

                            {/* Information Sharing */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-white">
                                    Information Sharing and Disclosure
                                </h2>
                                <p className="text-gray-200 leading-relaxed mb-4">
                                    We do not sell, trade, or rent your personal
                                    information to third parties. We may share
                                    your information in the following
                                    circumstances:
                                </p>
                                <ul className="list-disc list-inside text-gray-200 mb-4 space-y-2">
                                    <li>
                                        <strong>Service Providers:</strong> With
                                        trusted third-party service providers
                                        who assist us in operating our website
                                        and services
                                    </li>
                                    <li>
                                        <strong>Legal Requirements:</strong>{" "}
                                        When required by law or to protect our
                                        rights and safety
                                    </li>
                                    <li>
                                        <strong>Business Transfers:</strong> In
                                        connection with a merger, acquisition,
                                        or sale of assets
                                    </li>
                                    <li>
                                        <strong>Consent:</strong> With your
                                        explicit consent for specific purposes
                                    </li>
                                </ul>
                            </section>

                            {/* Data Security */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-white">
                                    Data Security
                                </h2>
                                <p className="text-gray-200 leading-relaxed mb-4">
                                    We implement appropriate technical and
                                    organizational security measures to protect
                                    your personal information against
                                    unauthorized access, alteration, disclosure,
                                    or destruction. These measures include:
                                </p>
                                <ul className="list-disc list-inside text-gray-200 mb-4 space-y-2">
                                    <li>
                                        Encryption of data in transit and at
                                        rest
                                    </li>
                                    <li>
                                        Regular security assessments and updates
                                    </li>
                                    <li>
                                        Access controls and authentication
                                        measures
                                    </li>
                                    <li>
                                        Employee training on data protection
                                    </li>
                                </ul>
                            </section>

                            {/* Your Rights */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-white">
                                    Your Privacy Rights
                                </h2>
                                <p className="text-gray-200 leading-relaxed mb-4">
                                    Depending on your location, you may have the
                                    following rights regarding your personal
                                    information:
                                </p>
                                <ul className="list-disc list-inside text-gray-200 mb-4 space-y-2">
                                    <li>
                                        <strong>Access:</strong> Request access
                                        to your personal information
                                    </li>
                                    <li>
                                        <strong>Correction:</strong> Request
                                        correction of inaccurate personal
                                        information
                                    </li>
                                    <li>
                                        <strong>Deletion:</strong> Request
                                        deletion of your personal information
                                    </li>
                                    <li>
                                        <strong>Portability:</strong> Request
                                        transfer of your personal information
                                    </li>
                                    <li>
                                        <strong>Restriction:</strong> Request
                                        restriction of processing
                                    </li>
                                    <li>
                                        <strong>Objection:</strong> Object to
                                        processing of your personal information
                                    </li>
                                    <li>
                                        <strong>Withdraw Consent:</strong>{" "}
                                        Withdraw consent where processing is
                                        based on consent
                                    </li>
                                </ul>
                            </section>

                            {/* Cookies */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-white">
                                    Cookies and Tracking Technologies
                                </h2>
                                <p className="text-gray-200 leading-relaxed mb-4">
                                    We use cookies and similar tracking
                                    technologies to enhance your experience on
                                    our website. You can control cookie
                                    preferences through your browser settings.
                                    Types of cookies we use include:
                                </p>
                                <ul className="list-disc list-inside text-gray-200 mb-4 space-y-2">
                                    <li>
                                        <strong>Essential Cookies:</strong>{" "}
                                        Necessary for website functionality
                                    </li>
                                    <li>
                                        <strong>Analytics Cookies:</strong> Help
                                        us understand website usage
                                    </li>
                                    <li>
                                        <strong>Marketing Cookies:</strong> Used
                                        for advertising and personalization
                                    </li>
                                </ul>
                            </section>

                            {/* Children's Privacy */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-white">
                                    Children&apos;s Privacy
                                </h2>
                                <p className="text-gray-200 leading-relaxed">
                                    Our services are not intended for children
                                    under the age of 13. We do not knowingly
                                    collect personal information from children
                                    under 13. If you become aware that a child
                                    has provided us with personal information,
                                    please contact us, and we will take steps to
                                    remove such information.
                                </p>
                            </section>

                            {/* Updates */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-white">
                                    Updates to This Policy
                                </h2>
                                <p className="text-gray-200 leading-relaxed">
                                    We may update this privacy policy from time
                                    to time. We will notify you of any changes
                                    by posting the new privacy policy on this
                                    page and updating the &quot;Last
                                    updated&quot; date. We encourage you to
                                    review this privacy policy periodically for
                                    any changes.
                                </p>
                            </section>

                            {/* Contact */}
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4 text-white">
                                    Contact Us
                                </h2>
                                <p className="text-gray-200 leading-relaxed mb-4">
                                    If you have any questions about this privacy
                                    policy or our privacy practices, please
                                    contact us:
                                </p>
                                <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                                    <p className="text-gray-200 mb-2">
                                        <strong>Email:</strong>{" "}
                                        hr@exerciseftui.com
                                    </p>
                                    <p className="text-gray-200 mb-2">
                                        <strong>Address:</strong> Faculty of
                                        Engineering, University of Indonesia,
                                        Jl. Prof. DR. Ir R Roosseno, Kukusan,
                                        Beji, Depok City, West Java 16425
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
