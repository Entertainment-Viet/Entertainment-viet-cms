export default function isValid(type, value) {
  switch (type) {
    case 'email':
      return isValidEmailAddress(value);
    case 'tel':
      return isValidPhoneNumber(value);
    case 'password':
      return isValidPassword(value);
    case 'number':
      return isValidDigit(value);
    case 'name':
      return isValidName(value);
    default:
      return isValidText(value);
  }
}

// Email Validation
export const isValidEmailAddress = value => {
  const pattern = new RegExp(
    /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
  );
  return pattern.test(value);
};
// Name Validation
export const isValidName = value => {
  // eslint-disable-next-line
    var pattern = new RegExp(/^[a-zA-Z \Â\â\ă\Ă\Đ\đ\ê\Ê\Ư\ư\Ô\ô\ơ\Ơ\À\à\Ằ\ằ\Ầ\ầ\È\è\Ề\ề\Ì\ì\Ò\ò\Ồ\ồ\Ờ\ờ\Ù\ù\Ừ\ừ\Ỳ\ỳ\Á\á\Ắ\ắ\Ấ\ấ\É\é\Ế\ế\Í\í\Ó\ó\Ố\ố\Ớ\ớ\Ú\ú\Ứ\ứ\Ý\ý\Ả\ả\Ẳ\ẳ\Ẩ\ẩ\Ẻ\ẻ\Ể\ể\Ỉ\ỉ\Ỏ\ỏ\Ổ\ổ\Ở\ở\Ủ\ủ\Ử\ử\Ỷ\ỷ\Ã\ã\Ẵ\ẵ\Ẫ\ẫ\Ẽ\ẽ\Ễ\ễ\Ĩ\ĩ\Õ\õ\Ỗ\ỗ\Ỡ\ỡ\Ũ\ũ\Ữ\ữ\Ỹ\ỹ\Ạ\ạ\Ặ\ặ\Ậ\ậ\Ẹ\ẹ\ệ\Ị\ị\Ọ\ọ\Ộ\ộ\Ợ\ợ\Ụ\ụ\Ự\ự\Ỵ\ỵ]{1,255}$/);
  return pattern.test(value);
};
// Text Validation
export const isValidText = value => {
  // eslint-disable-next-line
    var pattern = new RegExp(/^[a-zA-Z0-9 \Â\â\ă\Ă\Đ\đ\ê\Ê\Ư\ư\Ô\ô\ơ\Ơ\À\à\Ằ\ằ\Ầ\ầ\È\è\Ề\ề\Ì\ì\Ò\ò\Ồ\ồ\Ờ\ờ\Ù\ù\Ừ\ừ\Ỳ\ỳ\Á\á\Ắ\ắ\Ấ\ấ\É\é\Ế\ế\Í\í\Ó\ó\Ố\ố\Ớ\ớ\Ú\ú\Ứ\ứ\Ý\ý\Ả\ả\Ẳ\ẳ\Ẩ\ẩ\Ẻ\ẻ\Ể\ể\Ỉ\ỉ\Ỏ\ỏ\Ổ\ổ\Ở\ở\Ủ\ủ\Ử\ử\Ỷ\ỷ\Ã\ã\Ẵ\ẵ\Ẫ\ẫ\Ẽ\ẽ\Ễ\ễ\Ĩ\ĩ\Õ\õ\Ỗ\ỗ\Ỡ\ỡ\Ũ\ũ\Ữ\ữ\Ỹ\ỹ\Ạ\ạ\Ặ\ặ\Ậ\ậ\Ẹ\ẹ\ệ\Ị\ị\Ọ\ọ\Ộ\ộ\Ợ\ợ\Ụ\ụ\Ự\ự\Ỵ\ỵ]+$/);
  return pattern.test(value);
};
// Phone Number Validation
export const isValidPhoneNumber = value => {
  const pattern = new RegExp(/^(0|\+84)\d{9,10}$/);
  return pattern.test(value);
};
// Digit Validation
export const isValidDigit = value => {
  const pattern = new RegExp(/^[0-9]+$/);
  return pattern.test(value);
};
// Digit Validation
export const isValidUrl = value => {
  const pattern = new RegExp(/^https\?\:\/\/\.+$/);
  return pattern.test(value);
};
// Password Validation
export const isValidPassword = value => {
  const pattern = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,255}$/,
  );
  return pattern.test(value);
};
