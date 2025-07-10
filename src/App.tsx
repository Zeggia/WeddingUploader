import { useState, type ChangeEvent, useRef } from 'react'
import { MdPhotoCamera } from "react-icons/md";
import styles from './App.module.css';

function App() {
  const [captured, setCaptured] = useState<string[]>([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const urls = Array.from(files).map(file => URL.createObjectURL(file));
      setCaptured(urls);
      setCurrent(0);
    }
  };

  const handleCardClick = () => {
    fileInputRef.current?.click();
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === 0 ? captured.length - 1 : prev - 1));
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((prev) => (prev === captured.length - 1 ? 0 : prev + 1));
  };

  const handleSubmit = () => {
    setLoading(true);
    // Lascia che il form venga inviato normalmente
  };

  return (
    <div className={styles.container}>
      <div className={styles.polaroid}>
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 0,
            width: "100%",
            textAlign: "center",
            fontFamily: "'Indie Flower', cursive, sans-serif",
            fontSize: "2rem",
            fontWeight: 700,
            color: "#a97142",
            letterSpacing: "1px",
            pointerEvents: "none",
            userSelect: "none"
          }}
        >
          Un ricordo per gli sposi
        </div>
        {captured.length > 0 ? (
          <>
            <div style={{ position: "relative", width: "100%" }}>
              <img
                className={styles.image}
                src={captured[current]}
                alt={`Anteprima ${current + 1}`}
                onClick={handleCardClick}
                style={{ cursor: 'pointer', marginBottom: 8 }}
              />
              {captured.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prevPhoto}
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(169,113,66,0.7)",
                      border: "none",
                      color: "#fff",
                      fontSize: 24,
                      borderRadius: "50%",
                      width: 36,
                      height: 36,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0
                    }}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={nextPhoto}
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "rgba(169,113,66,0.7)",
                      border: "none",
                      color: "#fff",
                      fontSize: 24,
                      borderRadius: "50%",
                      width: 36,
                      height: 36,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 0
                    }}
                  >
                    ›
                  </button>
                </>
              )}
            </div>
            
          </>
        ) : (
          <div
            className={styles.placeholder}
            onClick={handleCardClick}
            style={{ cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <MdPhotoCamera size={48} color="#a97142" />
              <span style={{ color: '#888', marginTop: 12, fontSize: 16 }}>
                Premi qui per accedere alla fotocamera
              </span>
            </div>
          </div>
        )}
        <form
              action="/cgi-bin/upload/upload.py"
              method="post"
              encType="multipart/form-data"
              className={styles.polaroidText}
              style={{ marginTop: 0 }}
              onSubmit={handleSubmit}
            >
              <input
                ref={fileInputRef}
                name="image"
                onChange={onChange}
                type="file"
                multiple
                accept="image/*"
                style={{ display: 'none' }}
              />
              {loading ? (
                <div className={`${styles.loading} ${styles.uploadButton}`} style={{height: 44}}>
                  <span className={styles.spinner} />
                </div>
              ) : (
                <button
                  type="submit"
                  style={{ display: captured.length > 0 ? 'initial' : 'none' }}
                  className={styles.uploadButton}
                  disabled={captured.length === 0}
                >
                  Invia agli sposi!
                </button>
              )}
            </form>
      </div>
    </div>
  )
}

export default App
