"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const router = useRouter();

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    setLoading(true)
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

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

      const body = await res.json()

      if (!body.success) {
        setError(true)
        setErrorMessage(body.message)
        throw new Error(body.message)
      }

      localStorage.setItem("token", body.data.token);

      router.push("/dashboard");
    } catch (err: any) {
      setError(true);
      setErrorMessage(err.message || "Something went wrong");
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-center">
      <form
        className="w-full max-w-md space-y-6 p-8 py-12 rounded-2xl bg-white shadow-sm"
        onSubmit={handleSubmit}
      >

        {error ? <p className="text-red-500 font-bold">{errorMessage}</p> : ""}
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
          disabled={loading}
        >
          {loading ? "Logging..." : "Login"}
        </button>
      </form>
    </div>
  )
}
