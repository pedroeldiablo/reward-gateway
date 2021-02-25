import { useState, useEffect, useRef } from 'react';
import { loadImage } from '../utils/loadImage';

const cache = new Map();

export const Status = {
  LOADING: 'loading',
  LOADED: 'loaded',
  FAILED: 'failed',
};

export default function useImage(src: string) {
  const cachedImg = cache.get(src);
  const initialState = cachedImg ? Status.LOADED : Status.LOADING;
  const [status, setStatus] = useState(initialState);
  const mounted = useRef(false);

  useEffect(() => {
    if (!src || status === Status.LOADED) return;
    mounted.current = true;
    async function scopedLoad() {
      try {
        const image = await loadImage(src);
        if (!mounted.current) return;

        cache.set(src, image);
        setStatus(Status.LOADED);
      } catch (error) {
        if (!mounted.current) return;

        cache.delete(src);
        setStatus(Status.FAILED);
      }
    }
    scopedLoad();

    return () => {
      mounted.current = false;
    };
  }, [src, status]);

  return [status, cachedImg];
}
