import { SignIn } from "@/components/sign-in";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold">Sign in to your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your email to receive a magic link
          </p>
        </div>
        <SignIn />
      </div>
    </div>
  );
}
