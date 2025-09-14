export default function IkmExpoSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">You’ve successfully claimed your Expo bonus!</h1>
      <p className="mb-6">Complete your submission before 19 Sep 2025 23:59 WIB to receive 100 points.</p>
      <a href="/upload" className="px-4 py-2 bg-blue-600 text-white rounded">Go to Upload</a>
    </div>
  );
}
