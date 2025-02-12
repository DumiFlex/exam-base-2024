import EventEmitter from "../../utils/EventEmitter";
import { SERVER } from "../../config/global";

class UserStore {
  constructor() {
    this.data = {};
    this.emitter = new EventEmitter();
  }

  async login(email, password) {
    try {
      const response = await fetch(`${SERVER}/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (!response.ok) {
        throw response;
      }
      this.data = await response.json();
      localStorage.setItem("token", this.data.token);
      this.emitter.emit("LOGIN_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("LOGIN_ERROR");
    }
  }

  async logout() {
    try {
      console.log(this.data);
      const response = await fetch(`${SERVER}/auth/logout`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: this.data.token,
        }),
      });
      if (!response.ok) {
        throw response;
      }
      this.data = {};
      localStorage.removeItem("token");
      this.emitter.emit("LOGOUT_SUCCESS");
    } catch (err) {
      console.warn(err);
      this.emitter.emit("LOGOUT_ERROR");
    }
  }

  async validateToken() {
    const savedToken = localStorage.getItem("token");
    if (!savedToken) return false;
    try {
      const response = await fetch(`${SERVER}/auth/validate`, {
        method: "get",
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem("token");
        this.data = {};
        return false;
      }

      this.data = await response.json();
      return true;
    } catch (err) {
      this.emitter.emit("VALIDATE_ERROR");
    }
  }
}

export default UserStore;
