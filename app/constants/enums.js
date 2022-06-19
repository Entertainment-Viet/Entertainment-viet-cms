export const ENUM_USER_ROLE = {
  CUS: 'Customer',
  AUT: 'Author',
  MAN: 'Manager',
  SUP: 'SuperAdmin',
};
export const ENUM_VERIFY_MODE = {
  REG: 'REGISTER',
};

export const ENUM_PRICE_RANGE = {
  MIN: 0,
  MAX: 100000000,
  STEP: 100000,
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

export const ENUM_PRICE_TYPE = {
  buy: 'buynow',
  auc: 'auction',
  bar: 'bargain',
  off: 'offer',
  sal: 'sale',
};

export const ENUM_NFT_STATUS = {
  auction: 'auction',
  sale: 'sale',
  request: 'request',
  requestuser: 'requestUser',
  expired: 'expired',
  sold: 'sold',
};

export const ENUM_LOGINSTATE = {
  metamask: 'ethereum',
  kaibase: 'kaibase',
  kardiachain: 'kardiachain',
};

export const ENUM_PAGGING = {
  total: 0,
  page: 1,
  limit: 12,
};
