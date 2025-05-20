import React, { useState } from "react";

import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";

import photo1 from "../assets/images/photo-gallery-1.jpg";
import photo2 from "../assets/images/photo-gallery-2.jpg";
import photo3 from "../assets/images/photo-gallery-3.jpg";
import photo4 from "../assets/images/photo-gallery-4.jpg";
import photo5 from "../assets/images/photo-gallery-5.jpg";
import photo6 from "../assets/images/photo-gallery-6.jpg";

// Gallery data as nested arrays grouped by category
const galleryData = [
  {
    category: "Reparație display",
    images: [
      {
        title: "Înainte",
        src: photo1,
        alt: "Înainte reparație1",
      },
      {
        title: "După",
        src: photo2,
        alt: "După reparație1",
      },
    ],
  },
  {
    category: "Reparație daune provocate de apă",
    images: [
      {
        title: "Înainte",
        src: photo3,
        alt: "Înainte reparație",
      },
      {
        title: "După",
        src: photo4,
        alt: "După reparație",
      },
    ],
  },
  {
    category: "Reparație port de încărcare",
    images: [
      {
        title: "Înainte",
        src: photo5,
        alt: "Înainte reparație",
      },
      {
        title: "După",
        src: photo6,
        alt: "După reparație",
      },
    ],
  },
];

export default function Gallery() {
  // State for lightbox open + slide index
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxSlides, setLightboxSlides] = useState([]);

  // Open lightbox for a specific category and image index
  const openLightbox = (categoryIndex, imageIndex) => {
    // Extract the slides for that category in the format YARL expects
    const slides = galleryData[categoryIndex].images.map((img) => ({
      src: img.src,
    }));

    setLightboxSlides(slides);
    setLightboxIndex(imageIndex);
    setLightboxOpen(true);
  };

  return (
    <section className="py-5 bg-dark text-white gallery-section">
      <div className="container">
        <h2 className="text-center mb-5 gallery-title">
          Galerie: Înainte și După
        </h2>

        {galleryData.map(({ category, images }, catIdx) => (
          <div key={catIdx} style={{ marginBottom: "3rem" }}>
            <h4>{category}</h4>
            <div className="row g-4">
              {images.map(({ title, src, alt }, imgIdx) => (
                <div className="col-md-6" key={imgIdx}>
                  <div className="card shadow-sm bg-white">
                    <div className="card-body text-center">
                      <h5 className="card-title text-dark">{title}</h5>
                      <img
                        src={src}
                        alt={alt}
                        className="img-fluid rounded"
                        style={{ cursor: "pointer" }}
                        onClick={() => openLightbox(catIdx, imgIdx)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={lightboxSlides}
          index={lightboxIndex}
          plugins={[Thumbnails]}
        />
      </div>
    </section>
  );
}
