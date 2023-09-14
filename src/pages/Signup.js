import React, { useState } from "react";
import Button from "../components/Button";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const { createUser } = UserAuth();

  // USER'S INFOS
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  // SIGNUP METHOD
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      await createUser(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.code, error.message);
      if (error.code === "auth/weak-password") {
        setErrorMsg("Weak password (min 6 characters)");
      } else if (error.code === "auth/email-already-in-use") {
        setErrorMsg("Email already used");
      } else {
        setErrorMsg(error.message);
      }
    }
  };
  return (
    <div className="flex items-center justify-center flex-col h-screen bg-[#121317] px-4 md:px-0">
      <div class="bg-[#1A1C23] p-6 rounded-xl shadow-sm w-full md:w-1/3">
        <div class="mx-auto max-w-lg text-center ">
          <h1 class="text-2xl font-bold sm:text-3xl text-gray-300">Sign up</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          class="mx-auto mb-0 mt-8 max-w-md space-y-4"
        >
          <div>
            <label for="firstname" class="sr-only">
              First name
            </label>

            <input
              type="firstname"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm outline-none"
              placeholder="First name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label for="email" class="sr-only">
              Email
            </label>

            <input
              type="email"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm outline-none"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label for="password" class="sr-only">
              Password
            </label>

            <input
              type="password"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm outline-none"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div class="flex items-center justify-between">
            <p class="text-sm text-gray-500">
              Already have an account ?{" "}
              <Link to="/login" className="underline">
                Login
              </Link>
            </p>
            <Button message={"Sign up"} />
          </div>
        </form>
        {errormsg && (
                <p className="text-red-600 font-medium text-center text-xs">
                  {errormsg}
                </p>
              )}
      </div>
    </div>
  );
};

export default Signup;
