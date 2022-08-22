import React, { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { fetchImages, fetchBreeds } from "../api/api";
import { Gallery, Form } from "../components";
import { FormData } from "../components/Form";

export const Main: React.FC = () => {
  const [urls, setUrls] = useState<string[] | null>(null);
  const [breedsArray, setBreedsArray] = useState<string[]>([]);
  const defaultValue = "shiba";
  const altText = "cute dog";


  useEffect(() => {
    const data = async () => {
      const urls = await fetchImages(defaultValue);
      setUrls(urls);
      const breedsArray = await fetchBreeds();
      setBreedsArray(breedsArray);
    };
    data();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const urls = await fetchImages(data.breed);
      setUrls(urls);
    } catch (error) {
      throw error;
    }
  };

  return (
    <main>
      <section className="section">
        <div className="container">
          <Form onSubmit={onSubmit} defaultValue={defaultValue} breedsArray={breedsArray}/>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <Gallery urls={urls} altText={altText} />
        </div>
      </section>
    </main>
  );
};
