import api from "../services/api";

type MediaUploadResult = {
  id: string;
  url: string;
  thumbnailUrl?: string | null;
};

/** Local UploadFile → media/yuklash → public URL */
export async function uploadImageFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const { data } = await api.post<MediaUploadResult>("/media/yuklash", form);
  return data.url;
}
