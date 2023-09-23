export function getYoutubeThumbnailUrl(url: string) {
  const regex1 =
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/;
  const regex2 = /(?:https?:\/\/)?youtu\.be\/([a-zA-Z0-9_-]+)/;
  const match1 = url.match(regex1);
  const match2 = url.match(regex2);
  const videoId = match1 ? match1[1] : match2 ? match2[1] : null;

  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/sddefault.jpg`;
  } else {
    return "";
  }
}
