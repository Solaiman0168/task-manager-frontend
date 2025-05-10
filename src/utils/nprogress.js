import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({
  showSpinner: false,  
  trickleSpeed: 300,  
});

export const startProgress = () => NProgress.start();
export const stopProgress = () => NProgress.done();
export const setProgress = (progress: number) => NProgress.set(progress);