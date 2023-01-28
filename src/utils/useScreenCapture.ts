import { useEffect, useState } from "react";

export default function useRecorder() {
  // Definição dos estados
  const [isRecording, setisRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [videoUrl, setvideoUrl] = useState<string>();

  useEffect(() => {
    // Adiciona os eventos de dataavailable e stop ao MediaRecorder
    if (mediaRecorder) {
      mediaRecorder.addEventListener("dataavailable", (e) => {
        const uri = URL.createObjectURL(e.data); // Cria um objeto URL para o Blob
        setvideoUrl(uri);
      });

      mediaRecorder.addEventListener("stop", () => {
        setMediaRecorder(null); // Limpa o estado do MediaRecorder
        setisRecording(false); // Limpa o estado de gravação
      });
    }
  }, [mediaRecorder, isRecording]);

  // Função para iniciar a gravação
  const startRecording = async () => {
    if (!isRecording && navigator.mediaDevices) {
      // Obtém o stream de vídeo e áudio, caso o navegador suporte

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true, // Adiciona o vídeo
        audio: true, // Adiciona o áudio
      });

      // Cria uma instância do MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(mediaRecorder);

      // Inicia a gravação e atualiza estado
      mediaRecorder.start();
      setisRecording(true);
    }
  };

  // Função para parar a gravação
  const stopRecording = async () => {
    if (isRecording) {
      // Para a gravação e o estado
      // OBS: Isso irá ativar o trigger onstop definido acima
      mediaRecorder?.stop();
      setisRecording(false);
    }
  };

  // Export dos estados e funções
  return { isRecording, startRecording, stopRecording, videoUrl };
}
