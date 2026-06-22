import React, { useState, useRef, useEffect } from "react";
import { Camera, Image as ImageIcon, X } from "lucide-react";

function CameraPicker({ onImageCapture }) {
  const [stream, setStream] = useState(null);
  const [preview, setPreview] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // Limpeza de recursos ao desmontar o componente
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  async function startCamera() {
    try {
      setPreview(null);
      onImageCapture(null);

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });

      setStream(mediaStream);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play().catch(console.error);
        }
      }, 100);
    } catch (err) {
      alert("Erro ao acessar câmera: verifique se você deu permissão.");
    }
  }

  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setPreview(base64);
      onImageCapture(base64);
    };
    reader.readAsDataURL(file);
  }

  function capturePhoto() {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);

    const base64Image = canvas.toDataURL("image/jpeg", 0.7);
    setPreview(base64Image);
    onImageCapture(base64Image);
    stopCamera();
  }

  function stopCamera() {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }

  function handleRemove() {
    setPreview(null);
    onImageCapture(null);
    stopCamera();
  }

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center" }}>
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Input de arquivo corrigido para mobile */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          opacity: 0,
          overflow: "hidden",
        }}
      />

      <div
        style={{
          width: "100%",
          minHeight: "200px",
          background: "#060b16",
          borderRadius: "14px",
          border: "1px dashed rgba(255,255,255,0.15)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {preview ? (
          <img src={preview} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : stream ? (
          <video ref={videoRef} autoPlay playsInline muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <div style={{ color: "#9ca3af", fontSize: "0.9rem", padding: "20px" }}>Nenhuma foto selecionada</div>
        )}
      </div>

      <div style={{ display: "flex", gap: "10px", width: "100%" }}>
        {!stream && !preview && (
          <>
            <button type="button" onClick={startCamera} className="btn btn-secondary" style={{ flex: 1, padding: "10px" }}>
              <Camera size={20} /> Câmera
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-secondary"
              style={{ flex: 1, padding: "10px" }}
            >
              <ImageIcon size={20} /> Galeria
            </button>
          </>
        )}
        {stream && (
          <button type="button" onClick={capturePhoto} className="btn" style={{ flex: 1, background: "#ff7a00", color: "white", padding: "10px" }}>
            <Camera size={20} /> Capturar
          </button>
        )}
        {(stream || preview) && (
          <button type="button" onClick={handleRemove} className="btn" style={{ background: "rgba(239, 68, 68, 0.1)", color: "#f87171", padding: "10px" }}>
            <X size={20} /> Cancelar
          </button>
        )}
      </div>
    </div>
  );
}

export default CameraPicker;