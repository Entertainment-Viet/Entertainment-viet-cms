export const ENUM_VERIFY_MODE = {
  REG: 'REGISTER',
};

export const ENUM_FILE_TYPE = {
  image: '.png, .jpg, .jpeg, jpe, .gif',
  video: 'video/*',
  image3d: '.glb, .gltf',
  audio: 'audio/*',
  document: '.pdf',
  avatar: '.jpeg, .png',
  imageAndVideoAndDocument: [
    'video/*',
    '.png',
    '.jpg',
    '.jpeg',
    ' jpe',
    '.gif',
    '.pdf',
  ],
};

export const ENUM_PREVIEW_TYPE = {
  image: '2d',
  video: 'video_audio',
  image3d: '3d',
  document: 'document',
  avatar: 'avatar',
  audio: 'audio/*',
};

export const ENUM_ROLES = {
  ORG: 'organizer',
  TAL: 'talent',
  ADMIN: 'admin',
};

export const ENUM_PAGGING = {
  total: 0,
  page: 1,
  limit: 12,
};
