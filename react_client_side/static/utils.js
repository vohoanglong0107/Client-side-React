import { defaultAvatar } from "./constants";
export const URIForBase64AndContentType = (base64, contentType) => {
  return `data:${contentType};base64,${base64}`;
};

export const AvatarOrDefault = (avatar, content_type) => {
  if (avatar) return URIForBase64AndContentType(avatar, content_type);
  else return defaultAvatar;
};
