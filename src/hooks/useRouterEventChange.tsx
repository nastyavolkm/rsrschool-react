import { setLoading } from '../store/features/loading/loading-slice';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const useRouterEventChange = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => dispatch(setLoading(true));
    const handleStop = () => dispatch(setLoading(false));
    const handleError = () => dispatch(setLoading(false));

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleError);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleError);
    };
  }, [router, dispatch]);
};
