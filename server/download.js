import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
  new Promise((resolve, reject) => {
    const videoURL = "https://youtube.com/shorts/" + videoId
    console.log("download: ", videoId)

    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000
        console.log("A duração do vídeo é: ", seconds)
        if (seconds > 60) {
          throw new Error("A duração desse vídeo é maior do que 60 segundos.")
        }
      })
      .on("end", () => {
        console.log("Download finalizado.")
        resolve()
      })
      .on("error", (error) => {
        console.log("Não foi possível fazer o download do vídeo. Detalhe do erro:", error)
        reject(error)
      })
      .pipe(fs.createWriteStream("./tmp/audio.mp4"))
  })
