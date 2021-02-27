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
  // if image in cache set initial to loaded else loading
  const initialState = cachedImg ? Status.LOADED : Status.LOADING;
  const [status, setStatus] = useState(initialState);
  const mounted = useRef(false);

  // call when src or status change
  useEffect(() => {
    // if no image src or already loaded return
    if (!src || status === Status.LOADED) return;
    mounted.current = true;

    async function scopedLoad() {
      try {
        // set image to loadImage
        const image = await loadImage(src);
        // if unmounted abort
        if (!mounted.current) return;
        // set the cache for this image url
        // console.log(image);
        cache.set(src, image);
        // as image now in cache set as loaded
        setStatus(Status.LOADED);
      } catch (error) {
        // if unmounted abort
        if (!mounted.current) return;
        // image not returned ensure not cached and set status to failed
        cache.delete(src);
        setStatus(Status.FAILED);
      }
    }
    scopedLoad();

    return () => {
      mounted.current = false;
    };
  }, [status, src]);
  //
  return [status, cachedImg];
}
