interface ProfileImage extends Omit<HTMLImageElement, 'src'> {
  src?: string;
}

export const loadImage = (
  url?: string,
  crossOrigin?: string | null | undefined
) => {
  const image: ProfileImage = new Image();

  // Support cross origin requests
  if (crossOrigin) image.crossOrigin = crossOrigin;

  return new Promise((resolve, reject) => {
    // Load Handler
    const loaded = (event: { target: any; srcElement: any }) => {
      // Cleanup our image element, we no longer need it
      unbindEvents(image);
      // Fulfill our promise with the event image element, even in older browsers
      resolve(event.target || event.srcElement);
    };

    // Error Handler
    const errored = (error: any) => {
      // Cleanup our image element, we no longer need it
      unbindEvents(image);
      // Forward our error to the user
      reject(error);
    };

    //We need to fulfill our promise when the image loads, and handle it failing as well.
    //This can be done with on event callbacks to set our handlers
    image.onload = loaded;
    image.onerror = errored;
    image.onabort = errored;

    // Tell the browser we are ready to begin downloading
    image.src = url;
  });
};

function unbindEvents(image: HTMLImageElement | ProfileImage) {
  // Reset callbacks
  image.onload = null;
  image.onerror = null;
  image.onabort = null;

  try {
    // Some browsers need you to remove the src
    // in order to garbage collect the image object
    delete image.src;
  } catch (e) {
    // Safari's strict mode throws, ignore
  }
}
