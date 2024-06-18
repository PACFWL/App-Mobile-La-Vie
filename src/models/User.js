const DEFAULT_IMG_URL =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png'

class User {
  constructor(fullName, email, phone) {
    this.fullName = fullName;
    this.email = email;
    this.phone = phone;
    this.imgUrl = DEFAULT_IMG_URL;
    this.favoriteRestaurants = [];
    this.addresses = [];
  }
}

export default User;
