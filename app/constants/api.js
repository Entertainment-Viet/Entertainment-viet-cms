export const API_SERVER = process.env.REACT_APP_API
  ? process.env.REACT_APP_API
  : 'http://54.254.26.72:8081';
/* COMMON */
// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/COMMON/post_upload
export const API_UPLOAD_FILE = '/upload';
// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/AUTH/post_auth_login
export const API_LOGIN = '/auth/login';
// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/AUTH/post_auth_login_extension
export const API_LOGIN_EXT = '/auth/login-extension';

// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/CUSTOMERS/post_customer_register
export const API_REGISTER = '/customer/register';
// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/USERS/post_user_resend_mail_confirm
export const API_RESEND_CONFIRM = '/user/resend-mail-confirm';
// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/USERS/post_user_forgot_password
export const API_FORGOT_PASS = '/user/forgot-password';
// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/USERS/post_user_change_password
export const API_CHANGE_PASS = '/user/change-password';

export const API_UPDATE_AVATAR = '/user/update-avatar';
/* ACCOUNT */
// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/USERS/post_user_active
export const API_USER_ACTIVE = '/user/active';
// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/USERS/get_user_followers
export const API_USER_FOLLOWERS = '/user/followers';
// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/USERS/get_user_follow_check__id
export const API_USER_FOLLOW_CHECK = '/user/follow-check/'; // :id
// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/USERS/post_user_follow__id
export const API_USER_FOLLOW = '/user/follow/'; // :id
// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/USERS/post_user_unfollow__id
export const API_USER_UNFOLLOW = '/user/unfollow/:id';
// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/USERS/get_user_get_information
export const API_USER_INFO = '/user/get-information';
export const API_GET_USER_DATA = '/user/info/';
export const API_CONVERT_TO_KAI = '/user/convert-wkai-kai';

/* NFT */
// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/NFTS/get_nft_list
export const API_NFT_LIST = '/nft/list';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/NFTS/get_nft_filter_option
export const API_NFT_FILTER = '/nft/filter-option';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/NFTS/post_nft_create
export const API_NFT_CREATE = '/nft/create';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/NFTS/get_nft_detail___id_
export const API_NFT_DETAIL = '/nft/detail/'; // :id
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/AUCTION/get_auction_bid_info
export const API_NFT_DETAIL_AUCTION_LIST = '/auction/bid-info';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/NFTS/get_nft_offer_list
export const API_NFT_DETAIL_BARGAIN_LIST = '/nft/offer-list';

export const API_NFT_DETAIL_HISTORY_LIST = '/nft/history';

export const API_NFT_DETAIL_TRANSACTION_LIST = '/nft/offer-list';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/NFTS/get_nft_balance_info
export const API_NFT_BALANCE_INFO = '/nft/balance-info';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/NFTS/post_nft_cancel_sale
export const API_NFT_CANCEL_SALE = '/nft/cancel-sale';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/NFTS/post_nft_cancel_offer
export const API_NFT_CANCEL_OFFER = '/nft/cancel-offer';

export const API_NFT_LIST_FOLLOW_NFT = '/nft/follow-list';

export const API_NFT_FOLLOW = '/nft/follow';

export const API_NFT_REQUEST_MINT = 'nft/request-mint/'; // :id

// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/NFTS/get_nft_my_nfts
export const API_MYNFTS = '/nft/my-nfts';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/NFTS/post_nft_verify_smc
export const API_NFT_APPROVE = '/nft/verify-smc';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/NFTS/post_nft_auction
export const API_NFT_AUCTION = '/nft/auction';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/AUCTION/post_auction_collect
export const API_NFT_AUCTIONON_COLLECT = '/auction/collect';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/AUCTION/post_auction_cancel
export const API_NFT_AUCTIONON_CANCEL = '/auction/cancel';
export const API_NFT_SEND = '/nft/send';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/NFTS/post_nft_sale
export const API_NFT_SELL = '/nft/sale';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/NFTS/post_nft_buy
export const API_NFT_BUY = '/nft/buy';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/AUCTION/post_auction_bid
export const API_NFT_AUCTION_BID = '/auction/bid';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/NFTS/post_nft_offer
export const API_NFT_BARGAIN = '/nft/offer';

export const API_NFT_OFFER = '/nft/accept-offer';

export const API_USER_BALANCE = '/user/balance';

export const API_USER_MY_EVENT = '/user/my-event';

export const API_USER_NOTI = '/user/notifications';
export const API_USER_PROFILE = '/user/profile';

export const API_USER_PROFILE_FOLLOWERS = '/user/followers-list';

// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/USERS/post_user_update_info
export const API_USER_INFO_UPDATE = '/user/update_info';
// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/CATEGORY/get_category_v2_get_all
export const API_GET_CATEGORIES = '/category/v2/get-all';
// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/COLLECTION/get_collection_get_all
export const API_GET_COLLECTIONS = '/collection/get-all';
// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/CURATOR/get_curator_get_all
export const API_GET_CURATORS = '/curator/get-all';
// https://app.swaggerhub.com/apis/SkyGate-Vn/skygate-api/1.0.0#/AUTHOR/get_author_list_for_NFT_CREATE
export const API_GET_AUTHORS = '/author/list-for-create-nft';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/CRYPTO/get_crypto_get_all
export const API_GET_CRYPTO = '/crypto/get-all';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/NFTS/get_nft_list_type
export const API_GET_LIST_TYPE = '/nft/list-type';
// https://app.swaggerhub.com/apis/SkyGate-API/v1.0.0/1.0.0#/USERS/post_user_kyc_create
export const API_CREATE_KYC = '/user/kyc/create';

/* PROJECT */
export const API_PROJECT_LIST = false;
export const API_PROJECT_DETAIL = false; // :id

/* NEWS */
export const API_NEWS_LIST = '/news/list';
export const API_NEWS_DETAIL = '/news/detail/'; // :id
export const API_METAVERSE_LIST = false;

/* CONTACT FORM */
export const API_SEND_QNA = '/qna/send';

/* NOTIFICATION */
export const API_SEND_DEVICE_TOKEN = '/user/firebase/register-token';
export const API_DEL_DEVICE_TOKEN = '/user/firebase/remove-token';
export const API_GET_UNREAD_NOTI = '/user/get-userinfo';
/* WITHDRAW */
export const API_WITHDRAW = '/user/transfer-token';
export const ALL_AUTHOR = '/author/list';
