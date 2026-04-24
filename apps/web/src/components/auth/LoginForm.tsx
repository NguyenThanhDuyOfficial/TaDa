"use client";

import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    console.log(email)
    console.log(password)

    try {
      const res = await fetch("http://localhost:5001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Login failed");
      }

      const data = await res.json()

      // SUCCESS
      console.log("User:", data);

      // Example: store token
      localStorage.setItem("token", data.token);

      // redirect
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  }

  return (
    <form
      className="w-full max-w-md space-y-6 p-8 py-12 rounded-2xl bg-white shadow-sm"
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <label
          className="block"
          htmlFor="email"
        >
          Email Address
        </label>
        <input
          name="email"
          className="w-full p-2 border border-gray-200 rounded outline-indigo-500"
          type="email"
          autoComplete="email"
          required
        />
      </div>

      <div>
        <label>Password</label>
        <div>
          <input
            name="password"
            className="w-full p-2 border border-gray-200 rounded outline-indigo-500"
            type="password"
            required
          />
        </div>
      </div>

      {/* Submit */}
      <button
        className="w-full py-2 rounded bg-indigo-500 hover:bg-indigo-600 text-white"
      >
        Sign in</button>

    </form>
  )
}

