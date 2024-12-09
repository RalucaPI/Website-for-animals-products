import { Link } from 'react-router-dom'
import Context from '../../context/Context';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { auth } from '../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export function LogIn() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const context = useContext(Context)
    const { loading,setLoading} = context

    const signin = async () => {
      setLoading(true);
      try {
        const result = await signInWithEmailAndPassword(auth, email, password)
        localStorage.setItem('Users', JSON.stringify(result));
        toast.success('Done', {
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
        window.location.href = '/home';
    }, 2000);
        setLoading(false);
      } catch (error) {
        toast.error('Error', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
      }
    }
    return (
        <div className='fundal'>
            <div className=' flex justify-center items-center h-screen'>
           
            <div className=' backdrop-filter backdrop-blur-lg backdrop-filter-dark px-10 py-10 rounded-xl' >
                <div className="">
                    <h1 className='text-center text-[#ff0084] text-xl mb-4 font-bold'>Log in</h1>
                </div>
                <div>
                    <input type="email"
                            name='email'
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                            className=' bg-[#ffe6f2] mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                            placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className=' bg-[#ffe6f2] mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-black placeholder:text-black outline-none'
                        placeholder='Parola'
                    />
                </div>
                <div className='  mb-3'>
                        <button
                            onClick={signin}
                        className=' bg-[#f9a8d4] w-full lg:w-[20em] text-black font-bold   py-2 rounded-lg'>
                        Log in
                    </button>
                </div>
                <div>
                    <h2 className='text-black'>Don't have an account? <Link className=' text-[#ffcce5] font-bold' to={'/sign-up'}>Sign up</Link></h2>
                </div>
            </div>
            </div>
    </div>
    )
}
