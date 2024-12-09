import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Context from "../../context/Context";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, database } from "../../firebase/firebase";
import { Timestamp, addDoc, collection } from "firebase/firestore";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [locality, setLocality] = useState("");

  const context = useContext(Context);
  console.log("Context in SignUp:", context);
  if (!context) {
    console.error("Context is not defined. Ensure ContextProvider is wrapping the component.");
    return <div>Error: Context not found.</div>;
  }

  const { loading, setLoading } = context;

  const signup = async () => {
    setLoading(true);
    if (!name || !email || !password || !telephone || !address || !locality) {
      setLoading(false);
      return toast.error("All fields are required");
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = {
        name, 
        uid: result.user.uid,
        email: result.user.email,
        telephone,
        address,
        locality,
        time: Timestamp.now(),
      };

      const userRef = collection(database, "Users");
      await addDoc(userRef, user);

      toast.success("Sign up successful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setTimeout(() => {
        window.location.href = "/home";
      }, 2000);

      setName("");
      setEmail("");
      setPassword("");
      setTelephone("");
      setAddress("");
      setLocality("");
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error(`Error during sign up: ${error.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fundal">
      <div className="flex justify-center items-center h-screen">
        <div className="backdrop-filter backdrop-blur-lg backdrop-filter-dark px-10 py-10 rounded-xl">
          <div>
            <h1 className="text-center text-[#ff0084] text-xl mb-4 font-bold">Sign Up</h1>
          </div>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#ffe6f2] mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none"
              placeholder="Full name"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#ffe6f2] mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#ffe6f2] mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none"
              placeholder="Password"
            />
          </div>
          <div>
            <input
              type="number"
              value={telephone}
              onChange={(e) => setTelephone(e.target.value)}
              className="bg-[#ffe6f2] mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none"
              placeholder="Telephone"
            />
          </div>
          <div>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-[#ffe6f2] mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none"
              placeholder="Address"
            />
          </div>
          <div>
            <input
              type="text"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
              className="bg-[#ffe6f2] mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none"
              placeholder="Locality"
            />
          </div>
          <div className="flex justify-center mb-3">
            <button
              onClick={signup}
              className="bg-[#f9a8d4] w-full text-black font-bold px-2 py-2 rounded-lg"
            >
              Sign up
            </button>
          </div>
          <div>
            <h2 className="text-black">
              Have an account? <Link className="text-pink-600 font-bold" to={"/log-in"}>Log in</Link>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
