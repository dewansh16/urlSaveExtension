"use client";

import { useEffect, useState } from "react";
import { onUrlsSnapshot } from "../utils/firebaseConfig";
import toast, { Toaster } from "react-hot-toast";

type Url = {
  id: string;
  url: string;
  timestamp: string;
};

const UrlList = () => {
  const [urls, setUrls] = useState<Url[]>([]);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast("url copied to clipboard.", {
      position: "top-right",
    });
  };

  useEffect(() => {
    const unsubscribe = onUrlsSnapshot((urls) => {
      // @ts-ignore
      setUrls(urls);
    });

    // Clean up the subscription on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Toaster />
      <div className="p-4 w-full">
        <h1 className="text-4xl text-center">Saved URLs</h1>
        <div className="w-3/4 mx-auto mt-12">
          <div className="w-full flex text-xl mb-5">
            <div className="w-1/2 flex justify-center">URLS</div>
            <div className="w-1/4 flex justify-center ">Save Time</div>
            <div className="w-1/4 flex justify-center">Copy url</div>
          </div>
          {urls.map((url) => {
            return (
              <div key={url.id} className="w-full flex my-8 ">
                <div className="w-1/2 flex justify-center">{url.url} </div>
                <div className="w-1/4 flex justify-center">
                  {new Date(url.timestamp).toLocaleString()}
                </div>
                <div className="w-1/4 flex justify-center">
                  <button
                    onClick={() => {
                      handleCopy(url.url);
                    }}>
                    copy
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default UrlList;
