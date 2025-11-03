import React, { useState } from "react";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { domToPng } from "modern-screenshot";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useAppContext } from "contexts/AppContext";

const SaveImageButton: React.FC<{ item: "SCRIPT" | "NIGHT_ORDER" }> = ({ item }) => {
  const {
    appState: {
      nightOrderFrontRef,
      nightOrderBackRef,
      scriptFrontRef,
      scriptBackRef,
      scriptName,
    },
  } = useAppContext();
  
  const DEFAULT_SCALE = 2;

  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState(DEFAULT_SCALE);

  // старая версия сохранения
  const saveAsJpg = async () => {
    const elements =
      item === "SCRIPT"
        ? [scriptFrontRef, scriptBackRef]
        : [nightOrderFrontRef, nightOrderBackRef];

    setLoading(true);
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (!element?.current) continue;
      try {
		const htmlElement = element.current as HTMLElement;
		
		// Сохраняем текущие стили, чтобы потом вернуть
		const originalTransform = htmlElement.style.transform;
		const originalTransformOrigin = htmlElement.style.transformOrigin;
		
		// Увеличиваем масштаб элемента для рендера
		htmlElement.style.transformOrigin = "top left";
		htmlElement.style.transform = `scale(${scale})`;
	
        const dataUrl = await domToPng(element.current, {
		  width: htmlElement.offsetWidth * scale, // Увеличиваем размеры элемента для улучшения качества
		  height: htmlElement.offsetHeight * scale, // Увеличиваем размеры элемента для улучшения качества
          //backgroundColor: "#ffffff", // Белый фон для улучшения контраста текста
          //filter: "contrast(1.5)", // Применяем контрастность для улучшения текстов
		});
		
        // Возвращаем элемент в исходное состояние
        htmlElement.style.transform = originalTransform;
        htmlElement.style.transformOrigin = originalTransformOrigin;
		
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download =
          item === "SCRIPT"
            ? `${scriptName}${i === 1 ? "-back" : ""}.jpg`
            : `${scriptName}-night-order${i === 1 ? "-back" : ""}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error saving JPG:", error);
      }
    }
    setLoading(false);
  };
  
  const saveAsPng = async () => {
    const elements =
      item === "SCRIPT"
        ? [scriptFrontRef, scriptBackRef]
        : [nightOrderFrontRef, nightOrderBackRef];

    setLoading(true);
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (!element?.current) continue;

      try {
        const htmlElement = element.current as HTMLElement;

        // Сохраняем transform, если был
        const originalTransform = htmlElement.style.transform;
        const originalTransformOrigin = htmlElement.style.transformOrigin;

        // Увеличиваем масштаб
        htmlElement.style.transformOrigin = "top left";
        htmlElement.style.transform = `scale(${scale})`;

        // Генерируем canvas
        const canvas = await html2canvas(htmlElement, {
          scale,
          useCORS: true,
          backgroundColor: "#ffffff", // белый фон
          logging: false,
        });

        // Восстанавливаем стиль
        htmlElement.style.transform = originalTransform;
        htmlElement.style.transformOrigin = originalTransformOrigin;

        const dataUrl = canvas.toDataURL("image/png");

        // Скачиваем
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download =
          item === "SCRIPT"
            ? `${scriptName}${i === 1 ? "-back" : ""}.png`
            : `${scriptName}-night-order${i === 1 ? "-back" : ""}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error saving PNG:", error);
      }
    }
    setLoading(false);
  };

  const saveAsPdf = async () => {
    const elements =
      item === "SCRIPT"
        ? [scriptFrontRef, scriptBackRef]
        : [nightOrderFrontRef, nightOrderBackRef];

    setLoading(true);
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (!element?.current) continue;
      try {
        // Используем html2canvas для совместимости
        const canvas = await import("html2canvas").then((mod) =>
          mod.default(element.current, { useCORS: true, scale: scale })
        );
        const imgData = canvas.toDataURL("image/png");

        // Создаём PDF с размерами холста
        const pdf = new jsPDF({
          orientation: "portrait",
          //unit: "pt", 
          unit: "px", // указать px, чтобы совпало с canvas
          format: [canvas.width, canvas.height],
        });

        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save(
          item === "SCRIPT"
            ? `${scriptName}${i === 1 ? "-back" : ""}.pdf`
            : `${scriptName}-night-order${i === 1 ? "-back" : ""}.pdf`
        );
      } catch (error) {
        console.error("Error saving PDF:", error);
      }
    }
    setLoading(false);
  };

  return (
    <Stack direction="column" spacing={2} alignItems="center" mb={1}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Button
          sx={{ width: 200 }}
          variant="contained"
          onClick={saveAsPng}
          disabled={loading}
        >
          Save {item === "SCRIPT" ? "Script" : "Night Order"} PNG
          {loading && <CircularProgress size={25} sx={{ ml: 1 }} />}
        </Button>
        <Button
          sx={{ width: 200 }}
          variant="outlined"
          onClick={saveAsPdf}
          disabled={loading}
        >
          Save {item === "SCRIPT" ? "Script" : "Night Order"} PDF
          {loading && <CircularProgress size={25} sx={{ ml: 1 }} />}
		</Button>
	  </Stack>
	  <TextField
		label="Scale"
		type="number"
		value={scale}
		onChange={(e) => setScale(Number(e.target.value))}
		inputProps={{ sx: { width: 100, color: "rgba(255, 255, 255, 0.7)" } }}
	  />
    </Stack>
  );
};

export default SaveImageButton;
