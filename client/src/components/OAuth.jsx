import { GoogleAuthProvider, FacebookAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Google from '../assets/google.png';
import Facebook from '../assets/facebook.png';

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('Could not sign in with Google', error);
    }
  };

  const handleFacebookClick = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('/api/auth/facebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: result.user.displayName, email: result.user.email, photo: result.user.photoURL }),
      });

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      console.log('Could not sign in with Facebook', error);
    }
  };

  return (
    <div className='flex flex-col gap-4 '>
      <button onClick={handleGoogleClick} type='button' className='bg-slate-400 text-white p-3 rounded-lg uppercase hover:opacity-75 flex flex-row-reverse justify-center gap-4'>Continue with Google
      <img src={Google} alt='google' className='h-6 w-6'/>
      </button>
      <button onClick={handleFacebookClick} type='button' className='bg-blue-700 text-white p-3 rounded-lg uppercase hover:opacity-75 flex flex-row-reverse justify-center gap-4'>Continue with Facebook
      <img src={Facebook} alt='facebook' className='h-7 w-7'/>
      </button>
    </div>
  );
}
